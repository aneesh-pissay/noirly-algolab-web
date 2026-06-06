import PublicHeader from '../components/PublicHeader';
import SiteFooter from '../components/SiteFooter';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PublicHeader />
      <main className="flex flex-1 items-center justify-center px-4 pb-12 pt-16 sm:pt-[4.5rem]">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
