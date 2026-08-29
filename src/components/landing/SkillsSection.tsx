interface SkillsSectionProps {
  skills: string[];
}

const stackGroups = [
  {
    title: "Mobile systems",
    items: ["Swift", "SwiftUI", "Flutter"],
  },
  {
    title: "Web and APIs",
    items: ["JavaScript", "React", "Node.js", "Express.js", "FastAPI", "REST APIs"],
  },
  {
    title: "AI and data",
    items: ["Python", "TensorFlow", "PyTorch", "Ollama", "Hugging Face", "MLX"],
  },
  {
    title: "Infrastructure",
    items: ["Docker", "Google Cloud", "CI/CD"],
  },
];

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const availableSkills = new Set(skills);
  const knownSkills = new Set(stackGroups.flatMap((group) => group.items));
  const groups = stackGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => availableSkills.has(item)),
    }))
    .filter((group) => group.items.length > 0);
  const uncategorized = skills.filter((skill) => !knownSkills.has(skill));

  if (uncategorized.length > 0) {
    groups.push({ title: "Additional tools", items: uncategorized });
  }

  return (
    <section id="skills" className="portfolio-section skills-section">
      <div className="portfolio-section__inner">
        <div className="skills-section__head">
          <div>
            <p className="section-kicker">03 / Working toolkit</p>
            <h2 className="editorial-heading">Capabilities</h2>
          </div>
          <p className="skills-section__copy">
            I choose tools by the problem, then connect product thinking,
            implementation, and delivery into one practical workflow.
          </p>
        </div>

        {groups.length === 0 ? (
          <p>No skills added yet.</p>
        ) : (
          <div className="skills-grid">
            {groups.map((group, index) => (
              <article className="skill-group" key={group.title}>
                <p className="skill-group__index">
                  <span>Module / {String(index + 1).padStart(2, "0")}</span>
                </p>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
