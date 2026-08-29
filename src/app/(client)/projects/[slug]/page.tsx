import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  GitHubIcon,
  GlobeIcon,
} from "@/components/icons/PlatformIcons";
import { getPortfolioData } from "@/lib/db";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { projects } = await getPortfolioData();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { projects } = await getPortfolioData();
  const project = projects.find((item) => item.slug === slug);

  return project
    ? {
        title: `${project.title} | Abraar Jihaad H`,
        description: project.description,
      }
    : { title: "Project not found | Abraar Jihaad H" };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const { projects } = await getPortfolioData();
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const project = projects[projectIndex];

  if (!project) notFound();

  const projectNumber = String(projectIndex + 1).padStart(2, "0");

  return (
    <main className="case-study">
      <header className="case-hero">
        <div className="case-hero__top">
          <Link href="/#projects">&larr; Back to selected work</Link>
          <span>Case study / {project.tags[0]}</span>
        </div>

        <h1 className="case-hero__title">{project.title}</h1>
        <div
          className="case-hero__orb"
          data-project-number={projectNumber}
          aria-hidden="true"
        />

        <div className="case-hero__description">
          <span className="case-hero__discipline">
            Product / Engineering / Delivery
          </span>
          <p>{project.description}</p>
        </div>
      </header>

      <section className="case-meta" aria-label="Project information">
        <div className="case-meta__item">
          <span>Role</span>
          <p>Developer / Builder</p>
        </div>
        <div className="case-meta__item">
          <span>Timeline</span>
          <p>{new Date(project.created_at).getFullYear()}</p>
        </div>
        <div className="case-meta__item">
          <span>Stack</span>
          <p>{project.tags.join(" / ")}</p>
        </div>
      </section>

      <section className="case-body">
        <p className="case-body__label">The thinking behind it / 01</p>
        <div className="case-body__content">
          <h2>A focused solution to a real problem.</h2>
          <p>
            {project.description} This project reflects a hands-on approach:
            understand the constraint, choose the right tools, then make the
            experience feel simple for the person using it.
          </p>

          <div className="case-body__contribution">
            <span>What I brought to the table / 02</span>
            <p>
              I worked across product decisions and implementation, connecting
              technical trade-offs to a clear outcome. The result is a project
              that can be explored, tested, and extended rather than just
              presented as a screenshot.
            </p>
          </div>

          <div className="case-body__actions">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-button"
              >
                <GitHubIcon size={17} /> View source
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-button"
              >
                <GlobeIcon size={17} /> Open live project
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
