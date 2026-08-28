import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPortfolioData } from "@/lib/db";
import { GitHubIcon, GlobeIcon } from "@/components/icons/PlatformIcons";

interface ProjectPageProps { params: Promise<{ slug: string }>; }

export async function generateStaticParams() {
  const { projects } = await getPortfolioData();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { projects } = await getPortfolioData();
  const project = projects.find((item) => item.slug === slug);
  return project ? { title: `${project.title} | Abraar Jihaad H`, description: project.description } : { title: "Project not found | Abraar Jihaad H" };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const { projects } = await getPortfolioData();
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return <main><header className="theme-border border-b px-5 pt-16 pb-20 md:pt-24 md:pb-28"><div className="max-w-6xl mx-auto"><Link href="/#projects" className="theme-link theme-text type-body">← Back to selected work</Link><div className="mt-16 grid md:grid-cols-[1fr_0.55fr] gap-10 items-end"><div><p className="theme-text type-body eyebrow">Case study / {project.tags[0]}</p><h1 className="theme-text type-headline mt-5">{project.title}</h1></div><p className="theme-text type-body">{project.description}</p></div></div></header>
     <section className="theme-border border-b px-5 py-12"><div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-8"><div><p className="theme-text eyebrow">Role</p><p className="theme-text mt-2">Developer / Builder</p></div><div><p className="theme-text eyebrow">Timeline</p><p className="theme-text mt-2">{new Date(project.created_at).getFullYear()}</p></div><div><p className="theme-text eyebrow">Stack</p><p className="theme-text mt-2">{project.tags.join(" / ")}</p></div></div></section>
      <section className="px-5 py-20 md:py-28"><div className="max-w-6xl mx-auto grid md:grid-cols-[0.7fr_1.3fr] gap-10 md:gap-24"><p className="theme-text type-body eyebrow">The thinking behind it</p><div className="space-y-14"><div><h2 className="theme-text type-headline">A focused solution to a real problem.</h2><p className="theme-text type-body mt-5">{project.description} This project reflects a hands-on approach: understand the constraint, choose the right tools, then make the experience feel simple for the person using it.</p></div><div><p className="theme-text type-body eyebrow">What I brought to the table</p><p className="theme-text type-body mt-4">I worked across product decisions and implementation, connecting technical trade-offs to a clear outcome. The result is a project that can be explored, tested, and extended rather than just presented as a screenshot.</p></div><div className="flex flex-wrap gap-5 pt-3">{project.github_url && <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="theme-button theme-text type-body inline-flex items-center gap-2 rounded-full px-5 py-3"><GitHubIcon size={18} /> View source</a>}{project.live_url && <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="theme-control theme-text type-body inline-flex items-center gap-2 rounded-full border px-5 py-3"><GlobeIcon size={18} /> Open live project</a>}</div></div></div></section></main>;
}
