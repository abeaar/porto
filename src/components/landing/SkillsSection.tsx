interface SkillsSectionProps {
  skills: string[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-20 px-4 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-white mb-12 text-center tracking-tight">
          Skills &amp; Technologies
        </h2>
        {skills.length === 0 ? (
          <p className="text-center text-zinc-500">No skills added yet.</p>
        ) : (
          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-zinc-900 text-zinc-300 border border-zinc-800 rounded-full text-sm font-medium hover:bg-green-950/40 hover:text-green-400 hover:border-green-800/50 transition-all duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
