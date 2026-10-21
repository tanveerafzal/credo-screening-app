'use client';

import { useEffect, useState, type ReactNode } from 'react';

/*
 * Route transition. Next remounts the template on every navigation, so a
 * fresh instance means "a client-side route change". The first mount (the
 * server-rendered load) is left alone so LCP paints at full opacity; later
 * mounts get `data-route-enter`, which globals.css fades and lifts the page
 * content, leaving the fixed header untouched.
 */
let navigated = false;

export default function Template({ children }: { children: ReactNode }) {
  const [enter] = useState(() => navigated);
  useEffect(() => {
    navigated = true;
  }, []);
  return (
    <div className="flex min-h-full flex-1 flex-col" data-route-enter={enter || undefined}>
      {children}
    </div>
  );
}
