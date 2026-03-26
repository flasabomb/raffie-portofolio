import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.heroSettings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 }
  });

  await prisma.contactInfo.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 }
  });

  await prisma.themeSettings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 }
  });

  const sections = ["hero", "about", "projects", "skills", "contact"];
  for (const section of sections) {
    await prisma.sectionTheme.upsert({
      where: { section_id: section },
      update: {},
      create: { section_id: section }
    });
  }

  await prisma.card.deleteMany();

  await prisma.card.createMany({
    data: [
      {
        title: "Sales Campaign - Footwear",
        category: "project",
        tag: "Instagram",
        metric: "↑ Engagement & Purchase Interest",
        description:
          "Designed a visual content strategy with persuasive copywriting for a footwear brand. Focused on storytelling and product aesthetics to drive purchase intent through Instagram.",
        order_index: 0
      },
      {
        title: "Marketplace Optimization",
        category: "project",
        tag: "Shopee / Tokopedia",
        metric: "↑ Product Visibility",
        description:
          "Implemented SEO-optimized product titles, keyword research, and high-quality visual assets to improve search ranking and click-through rate on Shopee and Tokopedia.",
        order_index: 1
      },
      {
        title: "Content Branding Strategy",
        category: "project",
        tag: "Instagram",
        metric: "↑ Brand Consistency",
        description:
          "Developed a cohesive personal and product branding system using consistent visual language, tone of voice, and storytelling approach across all content touchpoints.",
        order_index: 2
      },
      {
        title: "Digital Marketing",
        category: "skill",
        tag: "Core Expertise",
        metric: "Multi-platform strategy",
        description:
          "Full-funnel digital marketing across social media, marketplaces, and content platforms.",
        order_index: 0
      },
      {
        title: "Social Media Strategy",
        category: "skill",
        tag: "Instagram · TikTok",
        metric: "Organic growth",
        description:
          "Content planning, scheduling, and community engagement to build brand presence and follower growth.",
        order_index: 1
      },
      {
        title: "Sales Strategy",
        category: "skill",
        tag: "B2C · B2B",
        metric: "Target-driven",
        description:
          "Lead generation, follow-up systems, and conversion optimization to consistently hit monthly sales targets.",
        order_index: 2
      },
      {
        title: "Copywriting",
        category: "skill",
        tag: "Ads · Captions · Landing Pages",
        metric: "Persuasive content",
        description:
          "Writing compelling copy that converts - from social media captions and product descriptions to ad creatives.",
        order_index: 3
      },
      {
        title: "Marketplace Optimization",
        category: "skill",
        tag: "Shopee · Tokopedia",
        metric: "↑ Search ranking",
        description:
          "Product listing SEO, pricing strategy, and visual optimization to increase visibility and sales on Indonesian marketplaces.",
        order_index: 4
      },
      {
        title: "Financial Management",
        category: "skill",
        tag: "Cash Flow · Reporting",
        metric: "Operational support",
        description:
          "Basic financial reporting, cash flow management, and budget tracking to support business operations.",
        order_index: 5
      },
      {
        title: "Increased Digital Sales",
        category: "achievement",
        tag: "Digital Marketing",
        metric: "↑ Revenue Growth",
        description:
          "Drove measurable sales growth through targeted digital marketing campaigns across social media and marketplace platforms.",
        order_index: 0
      },
      {
        title: "Improved Conversion Rates",
        category: "achievement",
        tag: "Sales",
        metric: "↑ Lead-to-Customer Rate",
        description:
          "Built and implemented structured follow-up systems that significantly improved prospect-to-customer conversion rates.",
        order_index: 1
      },
      {
        title: "3+ Industries Served",
        category: "achievement",
        tag: "Agriculture · Automotive · Retail",
        metric: "Cross-industry experience",
        description:
          "Successfully applied marketing and sales strategies across agriculture, automotive, and retail industries.",
        order_index: 2
      },
      {
        title: "Marketing & Finance",
        category: "experience",
        tag: "Agriculture Company",
        metric: "2+ Years",
        description:
          "Managed end-to-end marketing strategies for agricultural products. Increased sales through online channels. Handled cash flow, basic financial reporting, and maintained relationships with customers and distributors.",
        order_index: 0
      },
      {
        title: "Marketing Specialist",
        category: "experience",
        tag: "Automotive Company",
        metric: "Sales Target Achiever",
        description:
          "Consistently achieved monthly sales targets for vehicle products. Developed digital promotion strategies and managed leads from social media and marketplace platforms. Conducted follow-ups and converted prospects into customers.",
        order_index: 1
      }
    ]
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
