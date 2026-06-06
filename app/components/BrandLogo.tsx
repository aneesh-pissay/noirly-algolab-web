import Link from 'next/link';

type LogoVariant = 'header' | 'sidebar' | 'footer' | 'badge';

const variantClasses: Record<LogoVariant, string> = {
  header: 'h-10 w-10 shrink-0 rounded-lg object-contain sm:h-11 sm:w-11',
  sidebar: 'h-11 w-11 shrink-0 rounded-lg object-contain',
  footer: 'h-10 w-10 shrink-0 rounded-lg object-contain sm:h-11 sm:w-11',
  badge: 'h-12 w-12 shrink-0 rounded-lg object-contain sm:h-14 sm:w-14',
};

interface BrandLogoProps {
  variant?: LogoVariant;
  href?: string | null;
  className?: string;
  priority?: boolean;
}

export default function BrandLogo({
  variant = 'header',
  href = '/',
  className = '',
  priority = false,
}: BrandLogoProps) {
  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="Noirly AlgoLab"
      width={512}
      height={512}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      className={`${variantClasses[variant]} ${className}`.trim()}
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-block shrink-0 cursor-pointer">
        {image}
      </Link>
    );
  }

  return image;
}
