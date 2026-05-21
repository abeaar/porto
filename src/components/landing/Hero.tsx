import Link from "next/link";

interface HeroProps {
  name: string;
  title: string;
  bio: string;
}

export default function Hero({ name, title, bio }: HeroProps) {
  return (
    <section id="hero" className="min-h-screen bg-zinc-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.12),rgba(255,255,255,0))] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
          {name}
        </h1>
        <p className="text-2xl text-green-400 font-semibold mb-6 tracking-wide">{title}</p>
        <p className="text-lg text-zinc-400 mb-8 leading-relaxed font-normal">{bio}</p>
        <div className="flex gap-4 justify-center">
          <Link
            href="#projects"
            className="px-6 py-3 text-lg bg-green-600 text-white font-medium rounded hover:bg-green-500 transition-colors shadow-lg shadow-green-900/30"
          >
            View My Work
          </Link>
          <Link
            href="#experience"
            className="px-6 py-3 text-lg bg-zinc-800 text-zinc-200 font-medium rounded hover:bg-zinc-700 transition-colors border border-zinc-700/50"
          >
            Experience
          </Link>
        </div>
      </div>
    </section>
  );
}
