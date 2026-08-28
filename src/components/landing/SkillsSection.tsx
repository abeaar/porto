interface SkillsSectionProps {
  skills: string[];
}

const stackGroups = [
  { title: "Tools", items: ["Docker", "Google Cloud", "CI/CD"] },
  { title: "Website", items: ["React", "Node.js", "Express.js", "FastAPI", "REST APIs"] },
  { title: "Mobile", items: ["Swift", "SwiftUI", "Flutter"] },
  { title: "AI Engineering", items: ["TensorFlow", "PyTorch", "Ollama", "Hugging Face", "MLX"] },
];

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const availableSkills = new Set(skills);
  const groups = stackGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => availableSkills.has(item)),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <section id="skills" className="theme-border border-b px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="theme-text type-body uppercase tracking-[0.24em]">
          Tech Stack
        </h2>

        {groups.length === 0 ? (
          <p className="theme-text mt-16">No skills added yet.</p>
        ) : (
          <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-14 xl:grid-cols-4">
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="theme-text type-body uppercase tracking-[0.1em]">
                  {group.title}
                </h3>
                <ul className="mt-7 space-y-4">
                  {group.items.map((skill) => (
                    <li key={skill} className="theme-text type-body">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
