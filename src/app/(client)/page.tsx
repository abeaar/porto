import { getPortfolioData } from "@/lib/db";
import Hero from "@/components/landing/Hero";
import ProjectsGrid from "@/components/landing/ProjectsGrid";
import ExperienceTimeline from "@/components/landing/ExperienceTimeline";
import SkillsSection from "@/components/landing/SkillsSection";

export default async function LandingPage() {
  const data = await getPortfolioData();

  return (
    <main>
      <Hero
        name={data.bio.name}
        title={data.bio.title}
        bio={data.bio.bio}
      />
      <ProjectsGrid projects={data.projects} />
      <ExperienceTimeline experience={data.experience} />
      <SkillsSection skills={data.skills} />
    </main>
  );
}
