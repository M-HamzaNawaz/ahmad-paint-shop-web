"use client";

import { usePathname } from "next/navigation";

// Re-mounts on every route change (key=pathname) so the CSS `page-enter`
// animation in globals.css re-fires. Gives every page a smooth fade-in
// instead of a sudden snap, without touching individual pages.
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
