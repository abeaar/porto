import Link from "next/link";
import { GitHubIcon, LinkedInIcon, EmailIcon, ArrowRightIcon } from "@/components/icons/PlatformIcons";

interface HeroProps { name: string; title: string; bio: string; }

export default function Hero({ name, title, bio }: HeroProps) {
  return (
    <section id="hero" className="px-5 pt-16 pb-12 md:pt-20 md:pb-14">
      <div className="max-w-6xl w-full mx-auto">
        <div role="status" className="theme-control theme-text type-body mb-7 inline-flex items-center gap-2 rounded-full border px-3.5 py-2 uppercase tracking-[0.14em]">
          <span aria-hidden="true" className="theme-status-dot h-2 w-2 rounded-full" />
          Open to work
        </div>
        <h1 className="theme-text type-display max-w-5xl">{name.split(" ").map((part, index) => <span key={`${part}-${index}`}>{part}{index < name.split(" ").length - 1 ? " " : ""}</span>)}</h1>

        <p className="theme-text type-subheadline mt-4">{title}</p>
        <p className="theme-text type-body mt-3 max-w-2xl">{bio}</p>
        <div className="flex flex-wrap gap-3 mt-7">
          <a href="https://github.com/abeaar" target="_blank" rel="noopener noreferrer" className="theme-control theme-text type-body inline-flex items-center gap-2 rounded-md border px-3 py-2"><GitHubIcon size={14} /> GitHub</a>
          <a href="https://www.linkedin.com/in/abraarjh/" target="_blank" rel="noopener noreferrer" className="theme-control theme-text type-body inline-flex items-center gap-2 rounded-md border px-3 py-2"><LinkedInIcon size={14} /> LinkedIn</a>
          <a href="mailto:abraarjh@gmail.com" className="theme-control theme-text type-body inline-flex items-center gap-2 rounded-md border px-3 py-2"><EmailIcon size={14} /> Email</a>
        </div>
        <div className="flex gap-4 mt-7">
          <Link href="#projects" className="theme-button theme-text type-body inline-flex items-center gap-2 rounded-md px-4 py-2.5">View Projects <ArrowRightIcon size={14} /></Link>
          <Link href="#contact" className="theme-control theme-text type-body rounded-md border px-4 py-2.5">Contact</Link>
        </div>
      </div>
    </section>
  );
}
