import Link from 'next/link';

export interface Crumb {
  label: string;
  href?: string;
}

/** Trail that always starts at Credo. The last item is the current page. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ label: 'Credo', href: '/' }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-tertiary">
      <ol className="flex flex-wrap items-center">
        {trail.map((item, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center">
              {index > 0 ? (
                <span className="mx-2 text-border-hover" aria-hidden="true">/</span>
              ) : null}
              {last || !item.href ? (
                <span className="text-muted" aria-current={last ? 'page' : undefined}>{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-foreground">{item.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
