import { getPortfolioData } from "@/lib/db";
import Hero from "@/components/landing/Hero";
import ProjectsGrid from "@/components/landing/ProjectsGrid";
import ExperienceTimeline from "@/components/landing/ExperienceTimeline";
import SkillsSection from "@/components/landing/SkillsSection";
import {
  EmailIcon,
  ExternalLinkIcon,
} from "@/components/icons/PlatformIcons";

export default async function LandingPage() {
  const data = await getPortfolioData();

  return (
    <main id="top">
      <Hero
        name={data.bio.name}
        title={data.bio.title}
        bio={data.bio.bio}
        skills={data.skills}
      />
      <ExperienceTimeline experience={data.experience} />
      <ProjectsGrid projects={data.projects} />
      <SkillsSection skills={data.skills} />
      <section id="contact" className="portfolio-section contact-section">
        <div className="portfolio-section__inner contact-section__inner">
          <div>
            <p className="section-kicker">04 / Open channel</p>
            <h2>Let&apos;s build.</h2>
          </div>

          <div className="contact-section__side">
            <p>
              I&apos;m open to freelance work, full-time roles, and thoughtful side
              projects. If the problem is useful and the ambition is real, let&apos;s
              talk.
            </p>
            <a href="mailto:abraarjh@gmail.com" className="portfolio-button">
              Start a conversation <EmailIcon size={17} />
            </a>
            <div className="contact-section__links">
              <a
                href="https://github.com/abeaar"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <ExternalLinkIcon size={14} />
              </a>
              <a
                href="https://www.linkedin.com/in/abraarjh/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <ExternalLinkIcon size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
