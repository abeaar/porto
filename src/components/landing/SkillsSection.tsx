const stackGroups = [
  {
    title: "Mobile systems",
    items: ["SwiftUI", "Flutter", "Local Storage"],
  },
  {
    title: "Web and APIs",
    items: ["JavaScript", "React", "Node.js", "Express.js", "FastAPI", "REST APIs"],
  },
  {
    title: "AI Workflow",
    items: ["TensorFlow", "PyTorch", "Ollama", "Hugging Face", "MLX"],
  },
  {
    title: "Infrastructure",
    items: ["Docker", "Google Cloud"],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="portfolio-section skills-section">
      <div className="portfolio-section__inner">
        <div className="portfolio-section__head">
          <div>
            <h2 className="editorial-heading">Skills</h2>
          </div>
        </div>

        <div className="skills-grid">
          {stackGroups.map((group) => (
            <article className="skill-group" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
