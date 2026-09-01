import Tags from "@/components/ui/Tags";
import { formatDateShort } from "@/lib/utils";
import { Experience } from "@/types";

interface ExperienceTimelineProps {
  experience: Experience[];
}

export default function ExperienceTimeline({
  experience,
}: ExperienceTimelineProps) {
  const sorted = [...experience].sort(
    (a, b) =>
      new Date(b.start_date).getTime() - new Date(a.start_date).getTime(),
  );

  return (
    <section
      id="experience"
      className="portfolio-section experience-section"
    >
      <div className="portfolio-section__inner">
        <div className="portfolio-section__head">
          <div>
            <h2 className="editorial-heading">Worked Experience</h2>
          </div>
        </div>

        {sorted.length === 0 ? (
          <p>No experience added yet.</p>
        ) : (
          <div className="experience-grid">
            {sorted.map((exp) => {
              const startYear = new Date(exp.start_date).getFullYear();

              return (
                <article key={exp.id} className="experience-card">
                  <div className="experience-card__visual" aria-hidden="true">
    
                    <span className="experience-card__year">{startYear}</span>
                  </div>

                  <div className="experience-card__body">
                    <div className="experience-card__meta">
                      <span>{exp.employment_type || "Professional"}</span>
                      <span>{exp.location || "Indonesia"}</span>
                    </div>

                    <h3>{exp.role}</h3>
                    <p className="experience-card__company">{exp.company}</p>
                    <p className="experience-card__description">
                      {exp.description}
                    </p>

                    <div className="experience-card__meta">
                      <span>
                        {formatDateShort(exp.start_date)} -{" "}
                        {exp.is_current
                          ? "Present"
                          : formatDateShort(exp.end_date || "")}
                      </span>
                    </div>
                    <Tags tags={exp.tags} />
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
