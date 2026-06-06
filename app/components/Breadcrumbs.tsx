import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="mb-4 flex items-center gap-2 overflow-x-auto pb-1 text-sm sm:mb-6">
      {items.map((item, index) => (
        <div key={index} className="flex shrink-0 items-center gap-2">
          {index > 0 && (
            <span className="material-symbols-outlined text-sm text-on-surface-variant">chevron_right</span>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="whitespace-nowrap font-body-md text-on-surface-variant transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ) : (
            <span className="max-w-[12rem] truncate font-body-md font-medium text-on-surface sm:max-w-none">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
