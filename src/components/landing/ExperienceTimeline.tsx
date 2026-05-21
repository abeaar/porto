import { Experience } from "@/types";
import { formatDateShort, getMonthsDifference } from "@/lib/utils";

interface ExperienceTimelineProps {
  experience: Experience[];
}

export default function ExperienceTimeline({
  experience,
}: ExperienceTimelineProps) {
  const sorted = [...experience].sort(
    (a, b) =>
      new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
  );

  return (
    <section id="experience" className="py-20 px-4 bg-zinc-950/50 border-t border-zinc-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-white mb-12 text-center tracking-tight">
          Experience
        </h2>
        {sorted.length === 0 ? (
          <p className="text-center text-zinc-500">No experience added yet.</p>
        ) : (
          <div className="space-y-8">
            {sorted.map((exp, index) => (
              <div key={exp.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mt-2 ring-4 ring-green-950" />
                  {index < sorted.length - 1 && (
                    <div className="w-0.5 flex-1 bg-zinc-800 mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {exp.role}
                  </h3>
                  <p className="text-green-400 font-semibold">{exp.company}</p>
                  <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider font-medium">
                    {formatDateShort(exp.start_date)} &ndash;{" "}
                    {exp.is_current
                      ? "Present"
                      : formatDateShort(exp.end_date || "")}
                    {" · "}
                    {getMonthsDifference(exp.start_date, exp.is_current ? undefined : exp.end_date)}
                  </p>
                  <p className="text-zinc-400 mt-2 text-sm leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
