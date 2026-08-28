import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import Tags from "@/components/ui/Tags";

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <section
      id="projects"
      className="theme-border border-b px-5 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <div>
            <h3 className="type-headline mt-4">
              Projects
            </h3>
          </div>
        </div>

        {projects.length === 0 ? (
          <p className="theme-text">No projects added yet.</p>
        ) : (
          <div className="grid items-stretch gap-x-8 gap-y-12 md:grid-cols-2">
            {projects.map((project, index) => (
              <article
                key={project.id}
                className="theme-project group flex h-full cursor-pointer flex-col border-t pt-5 transition-colors"
              >
                <Link
                  href={`/projects/${project.slug}`}
                  aria-label={`View ${project.title} case study`}
                  className="flex flex-1 flex-col"
                >
                  <div className="theme-soft relative aspect-[16/10] w-full overflow-hidden">
                    {project.image_url ? (
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                      />
                    ) : (
                        <span className="theme-text type-headline absolute inset-0 flex items-center justify-center">
                        0{index + 1}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col pt-5">
                    <h3 className="theme-text type-subheadline mt-3 min-h-[3.5rem]">
                      {project.title}
                    </h3>
                    <p className="theme-text type-body mt-3">
                      {project.short_description ?? project.description}
                    </p>

                    <div className="mt-auto pt-6">
                      <Tags tags={project.tags} className="min-h-8 items-start" />
                    </div>
                  </div>
                </Link>

              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
