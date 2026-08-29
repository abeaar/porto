import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons/PlatformIcons";
import Tags from "@/components/ui/Tags";
import { Project } from "@/types";

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <section id="projects" className="portfolio-section projects-section">
      <div className="portfolio-section__inner">
        <div className="projects-section__head">
          <div>
            <p className="section-kicker">02 / Selected builds</p>
            <h2 className="editorial-heading">Proof of work</h2>
          </div>
          <span className="projects-section__count" aria-label={`${projects.length} projects`}>
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        {projects.length === 0 ? (
          <p>No projects added yet.</p>
        ) : (
          <div className="projects-grid">
            {projects.map((project, index) => {
              const number = String(index + 1).padStart(2, "0");
              const artVariant = (index % 3) + 1;

              return (
                <article key={project.id} className="project-card">
                  <Link
                    href={`/projects/${project.slug}`}
                    aria-label={`View ${project.title} case study`}
                  >
                    <div className={`project-art project-art--${artVariant}`}>
                      {project.image_url && (
                        <Image
                          src={project.image_url}
                          alt=""
                          fill
                          sizes="(max-width: 560px) 100vw, (max-width: 1100px) 50vw, 33vw"
                          className="object-cover"
                        />
                      )}
                      <span className="project-art__number">{number}</span>
                    </div>

                    <div className="project-card__body">
                      <div className="project-card__meta">
                        <span>Case study / {number}</span>
                        <span>{new Date(project.created_at).getFullYear()}</span>
                      </div>
                      <h3>{project.title}</h3>
                      <p className="project-card__description">
                        {project.short_description ?? project.description}
                      </p>
                      <Tags tags={project.tags} />
                      <span className="project-card__cta">
                        Explore project <ArrowRightIcon size={15} />
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
