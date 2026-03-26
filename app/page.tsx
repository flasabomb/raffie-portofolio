import { prisma } from "@/lib/prisma";
import AboutSection from "@/components/public/AboutSection";
import AchievementsSection from "@/components/public/AchievementsSection";
import ContactSection from "@/components/public/ContactSection";
import ExperienceTimeline from "@/components/public/ExperienceTimeline";
import Footer from "@/components/public/Footer";
import HeroSection from "@/components/public/HeroSection";
import Navbar from "@/components/public/Navbar";
import PreviewBanner from "@/components/public/PreviewBanner";
import ProjectsSection from "@/components/public/ProjectsSection";
import SkillsGrid from "@/components/public/SkillsGrid";
import TrustedBar from "@/components/public/TrustedBar";

export const dynamic = "force-dynamic";

interface HomePageProps {
  searchParams?: Promise<{ preview?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const isPreview = params?.preview === "true";

  const hero = await prisma.heroSettings.findUnique({ where: { id: 1 } });
  const cards = await prisma.card.findMany({
    where: isPreview ? {} : { is_visible: true },
    orderBy: { order_index: "asc" }
  });
  const contact = await prisma.contactInfo.findUnique({ where: { id: 1 } });

  return (
    <main className="bg-base text-[var(--text-primary)]">
      {isPreview ? <PreviewBanner /> : null}
      <Navbar />
      <HeroSection hero={hero} />
      <TrustedBar hero={hero} />
      <AboutSection />
      <SkillsGrid cards={cards.filter((c) => c.category === "skill")} />
      <ProjectsSection cards={cards.filter((c) => c.category === "project")} />
      <AchievementsSection cards={cards.filter((c) => c.category === "achievement")} />
      <ExperienceTimeline cards={cards.filter((c) => c.category === "experience")} />
      <ContactSection contact={contact} />
      <Footer />
    </main>
  );
}
