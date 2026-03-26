import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raffie Arfa Nugraha | Digital Marketing Specialist",
  description: "Portfolio and admin CMS for Raffie Arfa Nugraha"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalTheme = await prisma.themeSettings.findFirst() || {
    font_heading: "Barlow Condensed",
    font_body: "DM Sans",
    color_base: "#0D0D0D",
    color_surface: "#1A1A1A",
    color_elevated: "#262626",
    color_accent: "#FF5C1A",
    color_text: "#FFFFFF",
    color_muted: "#AAAAAA",
    color_border: "#2A2A2A"
  };

  const sectionsTheme = await prisma.sectionTheme.findMany();

  // Create Google Font URL
  const fonts = Array.from(new Set([globalTheme.font_heading, globalTheme.font_body]))
    .map(f => `family=${f.replace(/ /g, '+')}:wght@400;500;600;800`)
    .join('&');
  const googleFontsUrl = `https://fonts.googleapis.com/css2?${fonts}&display=swap`;

  // Filter custom sections
  const customSections = sectionsTheme.filter(s => s.is_custom);

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={googleFontsUrl} rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --font-barlow: '${globalTheme.font_heading}', sans-serif;
            --font-dm: '${globalTheme.font_body}', sans-serif;
            
            --bg-base: ${globalTheme.color_base};
            --bg-surface: ${globalTheme.color_surface};
            --bg-elevated: ${globalTheme.color_elevated};
            --accent: ${globalTheme.color_accent};
            --text-primary: ${globalTheme.color_text};
            --text-muted: ${globalTheme.color_muted};
            --border: ${globalTheme.color_border};
          }

          ${customSections.map(sec => `
            #${sec.section_id} {
              --bg-base: ${sec.color_base || 'inherit'};
              --text-primary: ${sec.color_text || 'inherit'};
              --accent: ${sec.color_accent || 'inherit'};
              background-color: var(--bg-base);
              color: var(--text-primary);
            }
            #${sec.section_id} .text-[var(--text-primary)] {
               color: var(--text-primary);
            }
            #${sec.section_id} .text-accent {
               color: var(--accent);
            }
            #${sec.section_id} .bg-accent {
               background-color: var(--accent);
            }
             #${sec.section_id} .bg-base {
               background-color: var(--bg-base);
            }
             #${sec.section_id} .border-border {
               border-color: var(--border);
            }
          `).join('\n')}
        `}} />
      </head>
      <body>{children}</body>
    </html>
  );
}
