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
    <nav className="flex items-center gap-2 text-sm mb-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && (
            <span className="material-symbols-outlined text-on-surface-variant text-sm">
              chevron_right
            </span>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="text-on-surface-variant hover:text-primary transition-colors font-body-md"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-on-surface font-body-md font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
