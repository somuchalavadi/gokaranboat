// Lighthouse against a production server, 3 runs each, median reported.
// Presets: "mobile" and "desktop" are Lighthouse's defaults (mobile = simulated Slow 4G: 1.6 Mbps, 150 ms RTT,
// 4× CPU). "mobile-4g" applies real DevTools throttling with a 4G profile (9 Mbps down, 1.5 Mbps up, 165 ms
// request latency, 4× CPU) to measure LCP on 4G rather than simulate it.
// Chromium (Playwright's headless shell) is started with a debugging port that Lighthouse attaches to.
// Usage: npm run build && npx next start -p 3100, then `node scripts/qa/lighthouse.mjs`
//        (env: QA_PATHS=/,/packages  QA_RUNS=3  QA_PRESETS=mobile,desktop,mobile-4g).
import lighthouse from "lighthouse";
import desktopConfig from "lighthouse/core/config/desktop-config.js";
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.env.QA_URL ?? "http://localhost:3100";
const paths = (process.env.QA_PATHS ?? "/").split(",");
const runs = Number(process.env.QA_RUNS ?? 3);
const mobile4gConfig = {
  extends: "lighthouse:default",
  settings: {
    throttlingMethod: "devtools",
    throttling: { requestLatencyMs: 165, downloadThroughputKbps: 9000, uploadThroughputKbps: 1500, cpuSlowdownMultiplier: 4 },
  },
};
const presetConfigs = { mobile: undefined, desktop: desktopConfig, "mobile-4g": mobile4gConfig };
const presets = (process.env.QA_PRESETS ?? "mobile,desktop").split(",").map((name) => [name, presetConfigs[name]]);
const categories = ["performance", "accessibility", "best-practices", "seo"];
const metrics = { LCP: "largest-contentful-paint", FCP: "first-contentful-paint", CLS: "cumulative-layout-shift", TBT: "total-blocking-time", SI: "speed-index" };
const median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];

await mkdir("artifacts/qa/lighthouse", { recursive: true });
const port = 9333;
const browser = await chromium.launch({ args: [`--remote-debugging-port=${port}`] });
const summary = [];
try {
  for (const path of paths) {
    // Warm the server (first-hit image optimisation and route compilation shouldn't count).
    await fetch(base + path);
    for (const [preset, config] of presets) {
      const samples = [];
      for (let i = 0; i < runs; i++) {
        const result = await lighthouse(base + path, { port, output: "json", logLevel: "error", onlyCategories: categories }, config);
        const lhr = result.lhr;
        samples.push({
          scores: Object.fromEntries(categories.map((c) => [c, Math.round(lhr.categories[c].score * 100)])),
          metrics: Object.fromEntries(Object.entries(metrics).map(([name, id]) => [name, lhr.audits[id].numericValue])),
          failing: Object.values(lhr.audits)
            .filter((a) => a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== "informative" && a.scoreDisplayMode !== "notApplicable" && a.scoreDisplayMode !== "manual")
            .map((a) => `${a.id} (${a.displayValue ?? a.score})`),
        });
        if (i === runs - 1) await writeFile(`artifacts/qa/lighthouse/${preset}${path === "/" ? "-home" : path.replace(/\//g, "-")}.json`, result.report);
      }
      const row = {
        path,
        preset,
        scores: Object.fromEntries(categories.map((c) => [c, median(samples.map((s) => s.scores[c]))])),
        metrics: Object.fromEntries(Object.keys(metrics).map((m) => [m, median(samples.map((s) => s.metrics[m]))])),
        runs: samples.map((s) => s.scores),
        failing: [...new Set(samples.flatMap((s) => s.failing))],
      };
      summary.push(row);
      const m = row.metrics;
      console.log(
        `${path.padEnd(12)} ${preset.padEnd(8)} perf ${row.scores.performance}  a11y ${row.scores.accessibility}  bp ${row.scores["best-practices"]}  seo ${row.scores.seo}   LCP ${(m.LCP / 1000).toFixed(2)}s  FCP ${(m.FCP / 1000).toFixed(2)}s  CLS ${m.CLS.toFixed(3)}  TBT ${Math.round(m.TBT)}ms  SI ${(m.SI / 1000).toFixed(2)}s`,
      );
      if (row.failing.length) console.log(`             below 0.9: ${row.failing.join(", ")}`);
    }
  }
} finally {
  await browser.close();
}
await writeFile(`artifacts/qa/lighthouse/summary-${presets.map(([name]) => name).join("+")}.json`, JSON.stringify(summary, null, 2));
