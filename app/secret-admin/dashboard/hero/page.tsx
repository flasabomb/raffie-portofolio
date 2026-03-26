import HeroEditor from "@/components/admin/HeroEditor";
import TopBar from "@/components/admin/TopBar";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HeroPage() {
  const hero = await prisma.heroSettings.findUnique({ where: { id: 1 } });

  if (!hero) return null;

  return (
    <div>
      <TopBar title="Hero Section" />
      <div className="p-4 md:p-6">
        <HeroEditor initialHero={hero} />
      </div>
    </div>
  );
}
