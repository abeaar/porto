import { getPortfolioData } from "@/lib/db";
import Hero from "@/components/landing/Hero";
import ProjectsGrid from "@/components/landing/ProjectsGrid";
import ExperienceTimeline from "@/components/landing/ExperienceTimeline";
import SkillsSection from "@/components/landing/SkillsSection";
import ContactSection from "@/components/landing/ContactSection";

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
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
