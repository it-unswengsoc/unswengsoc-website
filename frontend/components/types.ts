import { ReactNode } from 'react';

// Section types - updated mapping:
// - about: About Us / Our Team (center, animated sprite)
// - events: Events (flask)
// - jobs: Jobs Board (briefcase)
// - programs: Programs (gear)
// - sponsors: Sponsors (helmet)
export type Section = 'about' | 'events' | 'jobs' | 'programs' | 'sponsors' | null;

export type Screen = 'title' | 'blueprint' | 'merch' | 'contact';

export interface SectionData {
  title: string;
  subtitle: string;
  content: ReactNode;
  sectionKey?: Section;
}

export interface SectionConfig {
  id: string;
  layoutId: Section;
  label: string;
  sectionLetter: string;
  title: string;
  icon: ReactNode;
}

export interface TeamMember {
  name: string;
  role: string;
}

export interface Event {
  title: string;
  date: string;
  description: string;
  image?: string;
  link?: string;
}

export interface Sponsor {
  name: string;
  tier: 'gold' | 'silver' | 'bronze';
}

export interface Job {
  title: string;
  company: string;
  type: 'internship' | 'graduate' | 'part-time';
  description: string;
  location?: string;
  link?: string;
  logo?: string;
}

export interface Program {
  title: string;
  description: string;
  status: 'open' | 'coming-soon' | 'closed';
  image?: string;
  link?: string;
}

export interface SizeStockEntry {
  /** Units produced for this size. */
  stock: number;
  /** The Stripe Price ID for this exact size/colourway SKU. */
  stripePriceId: string;
}

export interface ProductVariant {
  name: string;
  hex: string;
  accentHex: string;
  /** Primary/default photo — the styled campaign shot. */
  image: string;
  /** Plain, uncluttered product photo — the second slide on the detail page, for a clearer look at the actual garment. */
  secondaryImage?: string;
  /** URL slug for this colourway's own /merch/[slug] purchase page. */
  slug: string;
  /** Per-size stock + the Stripe Price ID to buy that size, e.g. { S: { stock: 14, stripePriceId: 'price_...' } }. */
  sizeStock?: Record<string, SizeStockEntry>;
}

export interface Product {
  title: string;
  price: string;
  description: string;
  status: 'in-stock' | 'coming-soon' | 'sold-out';
  image?: string;
  link?: string;
  variants?: ProductVariant[];
  sizes?: string[];
  totalStock?: number;
  specs?: string[];
  /** URL slug for this product's own /merch/[slug] purchase page (products with no colourways). */
  slug?: string;
  /** The Stripe Price ID for products with no size/colourway variants (e.g. the keychain). */
  stripePriceId?: string;
}
