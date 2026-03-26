import ContactEditor from "@/components/admin/ContactEditor";
import TopBar from "@/components/admin/TopBar";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const contact = await prisma.contactInfo.findUnique({ where: { id: 1 } });

  if (!contact) return null;

  return (
    <div>
      <TopBar title="Contact Info" />
      <div className="p-4 md:p-6">
        <ContactEditor initialContact={contact} />
      </div>
    </div>
  );
}
