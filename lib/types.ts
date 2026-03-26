export type CardCategory = "project" | "skill" | "achievement" | "experience";

export interface CardPayload {
  id?: number;
  title: string;
  category: CardCategory;
  description?: string;
  tag?: string;
  metric?: string;
  image_url?: string | null;
  image_public_id?: string | null;
  order_index?: number;
  is_visible?: boolean;
}

export interface HeroPayload {
  headline_1: string;
  headline_2: string;
  headline_3: string;
  quote: string;
  bio: string;
  portrait_url?: string | null;
  portrait_public_id?: string | null;
  service_tag_1: string;
  service_tag_2: string;
  service_tag_3: string;
  service_tag_4: string;
  trusted_bar_label: string;
  trusted_1: string;
  trusted_2: string;
  trusted_3: string;
  trusted_4: string;
}

export interface ContactPayload {
  email: string;
  whatsapp: string;
  instagram: string;
  linkedin: string;
  cta_text: string;
}
