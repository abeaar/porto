import {
  EmailIcon,
  GitHubIcon,
  LinkedInIcon,
} from "@/components/icons/PlatformIcons";

interface HeroProps {
  name: string;
  title: string;
  bio: string;
  skills: string[];
}

export default function Hero({ name, title, bio, skills }: HeroProps) {
  const [firstName, ...restOfName] = name.replace(/\.$/, "").split(" ");
  const marqueeSkills = skills.slice(0, 12);

  return (
    <>
      <section id="hero" className="portfolio-hero">
        <div className="portfolio-hero__topline">
          <span className="portfolio-hero__status">
            Available for selected work
          </span>
          <span>Based in Indonesia / GMT+7</span>
        </div>

        <div className="portfolio-hero__heading">
          <p className="portfolio-hero__eyebrow">
            Portfolio / Software Engineering / 2026
          </p>
          <h1 aria-label={name}>
            <span>{firstName}</span>
            <span>{restOfName.join(" ")}</span>
          </h1>

          <div className="signal-art" aria-hidden="true">
            <span className="signal-art__rays" />
            <span className="signal-art__ring signal-art__ring--one" />
            <span className="signal-art__ring signal-art__ring--two" />
            <span className="signal-art__axis" />
            <span className="signal-art__core">AJH</span>
          </div>
        </div>

        <div className="portfolio-hero__footer">
          <p className="portfolio-hero__role">{title}</p>
          <p className="portfolio-hero__bio">{bio}</p>
          <div className="portfolio-hero__links" aria-label="Social links">
            <a
              href="https://github.com/abeaar"
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-icon-link"
              aria-label="GitHub"
            >
              <GitHubIcon size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/abraarjh/"
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-icon-link"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={16} />
            </a>
            <a
              href="mailto:abraarjh@gmail.com"
              className="portfolio-icon-link"
              aria-label="Email"
            >
              <EmailIcon size={16} />
            </a>
          </div>
        </div>
      </section>

      <div
        className="skills-ticker"
        aria-label={`Selected skills: ${marqueeSkills.join(", ")}`}
      >
        <div className="skills-ticker__track" aria-hidden="true">
          {[0, 1].map((group) => (
            <div className="skills-ticker__group" key={group}>
              {marqueeSkills.map((skill) => (
                <span
                  className="skills-ticker__item"
                  key={`${group}-${skill}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
