import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findMerchBySlug, heroProduct, accessories } from '@/lib/merchProducts';
import { getLiveStockLevels, withLiveStock } from '@/lib/stockLevels';
import MerchDetail from '@/components/MerchDetail';

// Refresh live stock at most every 30s rather than baking counts in permanently
// at build time — see lib/stockLevels.ts for how "live" is computed.
export const revalidate = 30;

export function generateStaticParams() {
  const slugs = [
    ...(heroProduct.variants ?? []).map((v) => v.slug),
    ...accessories.map((p) => p.slug).filter((slug): slug is string => Boolean(slug)),
  ];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const lookup = findMerchBySlug(slug);
  if (!lookup) return { title: 'Merch — UNSW Engineering Society' };
  const { product, variant } = lookup;
  const name = variant ? `${product.title} — ${variant.name}` : product.title;
  return {
    title: `${name} — EngSoc Merch`,
    description: product.description,
  };
}

export default async function MerchProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lookup = findMerchBySlug(slug);
  if (!lookup) notFound();

  const variant = lookup.variant
    ? withLiveStock(lookup.variant, await getLiveStockLevels())
    : undefined;

  return <MerchDetail product={lookup.product} variant={variant} />;
}
