import MediaLibrary from "@/components/admin/MediaLibrary";
import TopBar from "@/components/admin/TopBar";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  const cards = await prisma.card.findMany({ where: { image_url: { not: null } } });
  const hero = await prisma.heroSettings.findUnique({ where: { id: 1 } });

  const items = [
    ...cards
      .filter((card) => Boolean(card.image_url))
      .map((card) => ({
        image_url: card.image_url!,
        image_public_id: card.image_public_id,
        usedIn: card.title,
        canDelete: false
      })),
    ...(hero?.portrait_url
      ? [
          {
            image_url: hero.portrait_url,
            image_public_id: hero.portrait_public_id,
            usedIn: "Hero portrait",
            canDelete: false
          }
        ]
      : [])
  ];

  return (
    <div>
      <TopBar title="Media Library" />
      <div className="p-4 md:p-6">
        <MediaLibrary items={items} />
      </div>
    </div>
  );
}
