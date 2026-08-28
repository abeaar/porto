import { Experience } from "@/types";
import { formatDateShort } from "@/lib/utils";
import Tags from "@/components/ui/Tags";

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
    <section
      id="experience"
      className="px-5 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <h3 className="type-headline mt-4">
            Work Experience
          </h3>
        </div>

        {sorted.length === 0 ? (
          <p className="theme-text">No experience added yet.</p>
        ) : (
          <div>
            {sorted.map((exp) => (
              <article
                key={exp.id}
                className="theme-border grid gap-7 border-t py-10 md:grid-cols-[280px_1fr] md:grid-rows-[auto_auto] md:gap-x-12 md:gap-y-7 md:py-14"
              >
                <div className="order-1 md:col-start-2 md:row-start-1">
                  <h3 className="theme-text type-subheadline">
                    {exp.role}
                  </h3>
                  <p className="theme-text type-body mt-3">
                    {exp.employment_type || "Professional experience"} &middot; {exp.location || "Indonesia"}
                  </p>
                </div>

                <div className="order-2 flex flex-col gap-5 md:col-start-1 md:row-span-2 md:row-start-1">
                  <p className="theme-text type-subheadline order-1 md:order-2">{exp.company}</p>
                  <p className="theme-text type-body order-2 md:order-1">
                    {formatDateShort(exp.start_date)} - {exp.is_current ? "Present" : formatDateShort(exp.end_date || "")}
                  </p>
                </div>

                <div className="order-3 md:col-start-2 md:row-start-2">
                  <p className="theme-text type-body max-w-3xl">
                    {exp.description}
                  </p>
                  <Tags tags={exp.tags} className="mt-7" />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
