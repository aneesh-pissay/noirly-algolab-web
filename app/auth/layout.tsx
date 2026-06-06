import PublicHeader from '../components/PublicHeader';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main className="flex min-h-screen items-center justify-center px-4 pb-12 pt-24">
        {children}
      </main>
    </div>
  );
}
