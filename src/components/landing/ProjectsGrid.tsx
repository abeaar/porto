import { Project } from "@/types";

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <section id="projects" className="py-20 px-4 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-white mb-12 text-center tracking-tight">
          Featured Projects
        </h2>
        {projects.length === 0 ? (
          <p className="text-center text-zinc-500">No projects added yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-6 hover:shadow-2xl hover:shadow-green-950/10 hover:border-zinc-700/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {project.image_url && (
                    <div className="mb-4 h-44 bg-zinc-800 rounded-lg overflow-hidden border border-zinc-800">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-green-950/50 text-green-400 border border-green-900/30 text-xs rounded-md font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 mt-auto">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-300 hover:text-green-400 text-sm font-medium transition-colors"
                    >
                      GitHub →
                    </a>
                  )}
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-300 hover:text-green-400 text-sm font-medium transition-colors"
                    >
                      Live Demo →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
