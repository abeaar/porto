import { getPortfolioData } from "@/lib/db";
import Hero from "@/components/landing/Hero";
import ProjectsGrid from "@/components/landing/ProjectsGrid";
import ExperienceTimeline from "@/components/landing/ExperienceTimeline";
import SkillsSection from "@/components/landing/SkillsSection";
import { EmailIcon, GitHubIcon, LinkedInIcon } from "@/components/icons/PlatformIcons";

export default async function LandingPage() {
  const data = await getPortfolioData();

  return (
    <main id="top">
      <Hero
        name={data.bio.name}
        title={data.bio.title}
        bio={data.bio.bio}
      />
      <ExperienceTimeline experience={data.experience} />
      <ProjectsGrid projects={data.projects} />
      <SkillsSection skills={data.skills} />
      <section id="contact" className="theme-border border-b px-5 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mt-16 rounded-2xl border border-neutral-700 bg-neutral-800 p-8 md:p-12 lg:p-16">
            <div className="max-w-3xl">
              <h2 className="type-subheadline text-3xl font-semibold text-white">Let&apos;s work together.</h2>
              <p className="type-body mt-6 max-w-2xl text-white/70">I&apos;m open to freelance work, full-time roles, and interesting side projects. If you have something in mind, reach out.</p>
              <a href="mailto:abraarjh@gmail.com" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-neutral-700 px-5 py-3 font-semibold text-white transition-colors hover:bg-neutral-600">
                <EmailIcon size={18} />
                Send me an email
              </a>
            </div>
            <div className="mt-12 grid gap-3">
              <a href="https://github.com/abeaar" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-lg border border-neutral-700 bg-neutral-900 px-5 py-3 font-semibold text-white transition-colors hover:bg-neutral-700">
                <GitHubIcon size={19} />
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/abraarjh/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-lg border border-neutral-700 bg-neutral-900 px-5 py-3 font-semibold text-white transition-colors hover:bg-neutral-700">
                <LinkedInIcon size={19} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
