import MainHeader from "@/components/landing/MainHeader";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  return (
    <div className="theme-background theme-text flex min-h-screen flex-col">
      <MainHeader />
      <div className="flex-1">{children}</div>
      <footer className="theme-footer theme-text border-t px-5 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-center text-center">
          <p className="type-body">&copy; {new Date().getFullYear()} Abraar Jihaad H.</p>
        </div>
      </footer>
    </div>
  );
}
