export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col">
      <nav className="sticky top-0 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-green-500 tracking-tight">Portfolio</div>
          <div className="hidden md:flex gap-8">
            <a href="#projects" className="text-zinc-300 hover:text-green-400 font-medium transition-colors">
              Projects
            </a>
            <a
              href="#experience"
              className="text-zinc-300 hover:text-green-400 font-medium transition-colors"
            >
              Experience
            </a>
            <a href="#skills" className="text-zinc-300 hover:text-green-400 font-medium transition-colors">
              Skills
            </a>
          </div>
        </div>
      </nav>
      <div className="flex-1">{children}</div>
      <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 py-8 px-4 text-sm">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Abraar Jihaad Hibatullah .</p>
        </div>
      </footer>
    </div>
  );
}
