import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const globalTheme = await prisma.themeSettings.findFirst() || {
      template: "Dark Modern",
      font_heading: "Barlow Condensed",
      font_body: "DM Sans",
      color_base: "#0D0D0D",
      color_surface: "#1a1a1a",
      color_elevated: "#262626",
      color_accent: "#facc15",
      color_accent_dark: "#eab308",
      color_muted: "#a3a3a3",
      color_border: "#333333",
      color_text: "#ffffff"
    };

    const sectionsTheme = await prisma.sectionTheme.findMany();

    return NextResponse.json({ globalTheme, sectionsTheme });
  } catch (error) {
    console.error("Theme GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch theme" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { globalTheme, sectionsTheme } = body;

    if (globalTheme) {
      await prisma.themeSettings.upsert({
        where: { id: 1 },
        update: {
          template: globalTheme.template,
          font_heading: globalTheme.font_heading,
          font_body: globalTheme.font_body,
          color_base: globalTheme.color_base,
          color_surface: globalTheme.color_surface,
          color_elevated: globalTheme.color_elevated,
          color_accent: globalTheme.color_accent,
          color_accent_dark: globalTheme.color_accent_dark,
          color_muted: globalTheme.color_muted,
          color_border: globalTheme.color_border,
          color_text: globalTheme.color_text
        },
        create: {
          id: 1,
          ...globalTheme
        }
      });
    }

    if (sectionsTheme && Array.isArray(sectionsTheme)) {
      for (const st of sectionsTheme) {
        await prisma.sectionTheme.upsert({
          where: { section_id: st.section_id },
          update: {
            is_custom: st.is_custom,
            color_base: st.color_base,
            color_text: st.color_text,
            color_accent: st.color_accent
          },
          create: {
            section_id: st.section_id,
            is_custom: st.is_custom,
            color_base: st.color_base,
            color_text: st.color_text,
            color_accent: st.color_accent
          }
        });
      }
    }

    return NextResponse.json({ message: "Theme updated successfully" });
  } catch (error) {
    console.error("Theme POST Error:", error);
    return NextResponse.json({ error: "Failed to update theme" }, { status: 500 });
  }
}
