"use client";

import { useState } from "react";
import { useMediaQuery } from "@/lib/hooks";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { CompareTable } from "@/components/sections/CompareTable";

// Bottom sheet on phones, inline expand from 768px.
export function ComparePackages({ detailsHref }: { detailsHref?: string }) {
  const wide = useMediaQuery("(min-width: 768px)");
  const [inlineOpen, setInlineOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="mt-6 lg:mt-10">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {wide ? (
          <Button variant="secondary" aria-expanded={inlineOpen} aria-controls="compare-inline" onClick={() => setInlineOpen((open) => !open)}>
            {inlineOpen ? "Hide comparison" : "Compare all packages"}
          </Button>
        ) : (
          <Button variant="secondary" aria-haspopup="dialog" onClick={() => setSheetOpen(true)}>
            Compare all packages
          </Button>
        )}
        {detailsHref && (
          <Button href={detailsHref} variant="text">
            View package details
          </Button>
        )}
      </div>
      <div id="compare-inline" hidden={!wide || !inlineOpen} className="mt-6">
        {wide && inlineOpen && <CompareTable />}
      </div>
      <Dialog open={!wide && sheetOpen} onClose={() => setSheetOpen(false)} label="Compare all packages">
        <div className="p-4 pt-16">
          <p className="mb-4 px-1 font-display text-h3">Compare all packages</p>
          <CompareTable />
        </div>
      </Dialog>
    </div>
  );
}
