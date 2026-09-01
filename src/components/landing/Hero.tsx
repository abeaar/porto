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

interface HeroIdentityProps {
  name: string;
  title: string;
  bio: string;
}

function HeroIdentity({ name, title, bio }: HeroIdentityProps) {
  const [firstName, ...restOfName] = name.split(" ");

  return (
    <div className="portfolio-hero__identity">
      <h1 aria-label={name}>
        <span>{firstName}</span>
        <span>{restOfName.join(" ")}</span>
      </h1>

      <div className="portfolio-hero__footer">
        <div className="portfolio-hero__about">
          <p className="portfolio-hero__role">{title}</p>
          <p className="portfolio-hero__bio">{bio}</p>
        </div>
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
          <a
            href="/Abraar-Jihaad-Resume.pdf"
            className="portfolio-resume-link"
            download
          >
            Download resume
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Hero({ name, title, bio, skills }: HeroProps) {
  const marqueeSkills = skills.slice(0, 12);

  return (
    <>
      <section id="hero" className="portfolio-hero">
        <div className="portfolio-hero__heading">
          <HeroIdentity name={name} title={title} bio={bio} />
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
