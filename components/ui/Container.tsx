import type { ReactNode } from "react";

// 1200px content width with a 16px gutter on phones and 24px from 640px up.
export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-[1248px] px-4 sm:px-6 ${className}`}>{children}</div>;
}
