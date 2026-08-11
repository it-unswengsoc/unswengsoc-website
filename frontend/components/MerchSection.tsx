'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import { hexToRgba, shade, isLightColor } from '@/lib/utils';
import { ProductVariant } from './types';
import { heroProduct, accessories, totalVariantStock, NIGHTSHIFT_RED, NIGHTSHIFT_BLACK } from '@/lib/merchProducts';
import DropCountdown from './DropCountdown';

// Small viewfinder-style corner marks that frame a catalog tile's photo on hover.
// Pure CSS (group-hover), inset rather than overhanging so they never get clipped
// by the tile's overflow-hidden edge.
function ImageCornerMarks({ color }: { color: string }) {
  const corners = [
    { top: 8, left: 8, borderTop: true, borderLeft: true },
    { top: 8, right: 8, borderTop: true, borderRight: true },
    { bottom: 8, left: 8, borderBottom: true, borderLeft: true },
    { bottom: 8, right: 8, borderBottom: true, borderRight: true },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      {corners.map((c, i) => (
        <span
          key={i}
          className="absolute w-3 h-3"
          style={{
            top: c.top,
            left: c.left,
            right: c.right,
            bottom: c.bottom,
            borderTop: c.borderTop ? `2px solid ${color}` : undefined,
            borderLeft: c.borderLeft ? `2px solid ${color}` : undefined,
            borderRight: c.borderRight ? `2px solid ${color}` : undefined,
            borderBottom: c.borderBottom ? `2px solid ${color}` : undefined,
          }}
        />
      ))}
    </div>
  );
}

// Full-bleed campaign banner — reused for both the main (top-of-page) and the
// accessories banner, since both are the same "finished poster artwork" beat.
// The container matches the source art's own 3039x1350 ratio exactly (9:4), so
// nothing gets cropped off the edges the way a fixed-height band would.
function CampaignBanner({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative w-full aspect-[9/4] overflow-hidden"
    >
      <Image src={src} alt={alt} fill priority={priority} sizes="100vw" className="object-cover" />
    </motion.div>
  );
}

// Full-width ticker band bridging the main banner into the Apparel section — a
// hairline top/bottom border and a faint accent wash so it reads as its own beat
// rather than just floating in the page's padded content column.
function CountdownBand({ accentColor }: { accentColor: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative w-full py-10 md:py-14 px-4 border-y transition-colors duration-700"
      style={{ borderColor: hexToRgba(accentColor, 0.25), backgroundColor: hexToRgba(accentColor, 0.05) }}
    >
      <div className="max-w-xl mx-auto">
        <DropCountdown accentColor={accentColor} />
      </div>
    </motion.div>
  );
}

function SectionHeader({
  label,
  itemCount,
  accentColor,
  textColor,
}: {
  label: string;
  itemCount: number;
  accentColor: string;
  textColor: string;
}) {
  return (
    <div className="flex items-center gap-4 mb-5 md:mb-6">
      <h3
        className="text-lg md:text-xl font-bold uppercase tracking-widest whitespace-nowrap transition-colors duration-500"
        style={{ color: textColor }}
      >
        {label}
      </h3>
      <div className="h-px flex-1 transition-colors duration-500" style={{ backgroundColor: hexToRgba(accentColor, 0.3) }} />
      <span
        className="font-mono text-[10px] md:text-xs tracking-widest whitespace-nowrap transition-colors duration-500"
        style={{ color: accentColor }}
      >
        {String(itemCount).padStart(2, '0')} ITEM{itemCount === 1 ? '' : 'S'}
      </span>
    </div>
  );
}

// Clean catalog tile: photo, name, price — the whole tile is a link straight to
// that item's own /merch/[slug] page, no inline colour/size pickers here.
function CatalogTile({
  href,
  image,
  title,
  subtitle,
  price,
  bgHex,
  accent,
  badge,
}: {
  href: string;
  image?: string;
  title: string;
  subtitle?: string;
  price: string;
  bgHex: string;
  accent: string;
  badge?: string;
}) {
  const onLight = isLightColor(bgHex);
  const textColor = onLight ? NIGHTSHIFT_BLACK : '#ffffff';
  const mutedTextColor = onLight ? 'rgba(18,12,10,0.6)' : 'rgba(255,255,255,0.6)';
  const badgeTextColor = isLightColor(accent) ? NIGHTSHIFT_BLACK : '#ffffff';

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block border-2 overflow-hidden transition-colors duration-500 w-full max-w-sm cursor-pointer"
      style={{
        borderColor: accent,
        backgroundColor: bgHex,
        boxShadow: `0 0 28px ${hexToRgba(accent, 0.25)}`,
      }}
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden" style={{ backgroundColor: NIGHTSHIFT_BLACK }}>
        {image ? (
          <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-105">
            <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 384px" className="object-cover" />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 opacity-30" style={{ color: accent }} />
          </div>
        )}
        <ImageCornerMarks color={accent} />
        {badge ? (
          <span
            className="absolute top-3 left-3 z-10 text-[10px] px-2 py-1 font-bold tracking-wide font-mono uppercase"
            style={{ backgroundColor: accent, color: badgeTextColor }}
          >
            {badge}
          </span>
        ) : null}
      </div>

      <div className="p-5 md:p-6">
        <h3 className="text-lg font-bold tracking-tight mb-0.5 transition-colors duration-500" style={{ color: textColor }}>
          {title}
        </h3>
        {subtitle ? (
          <p className="text-xs font-mono tracking-wide mb-3 transition-colors duration-500" style={{ color: mutedTextColor }}>
            {subtitle}
          </p>
        ) : (
          <div className="mb-3" />
        )}
        <div className="flex items-center justify-between">
          <span className="font-mono font-bold text-base transition-colors duration-500" style={{ color: accent }}>
            {price}
          </span>
          <span
            className="inline-flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity duration-300"
            style={{ color: accent }}
          >
            View
            <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// Black is the default catalog theme — individual /merch/[slug] pages still theme
// themselves to whichever colourway they're actually for, regardless of this default.
function getDefaultVariantIndex(variants: ProductVariant[]): number {
  const blackIndex = variants.findIndex((v) => v.name.toLowerCase().includes('black'));
  return blackIndex >= 0 ? blackIndex : 0;
}

export default function MerchSection({ onThemeChange }: { onThemeChange?: (accentHex: string) => void }) {
  const variantIndex = getDefaultVariantIndex(heroProduct.variants ?? []);
  const theme = heroProduct.variants?.[variantIndex] ?? null;
  const themeAccent = theme?.accentHex ?? NIGHTSHIFT_RED;
  const pageBg = theme?.hex ?? shade(themeAccent, -70);
  const pageOnLight = isLightColor(pageBg);
  const headingColor = pageOnLight ? NIGHTSHIFT_BLACK : '#ffffff';
  const variants = heroProduct.variants ?? [];

  // Live per-size stock from Stripe (see /api/stock) — falls back to the static
  // initial counts (via totalVariantStock) until this resolves, or if it fails.
  const [liveStock, setLiveStock] = useState<Record<string, Record<string, number>> | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch('/api/stock')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data) setLiveStock(data);
      })
      .catch(() => {
        // Live stock is a nice-to-have on this page — the static badge is still shown.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Let the parent screen retheme the persistent blueprint-grid background to match
  useEffect(() => {
    onThemeChange?.(themeAccent);
  }, [themeAccent, onThemeChange]);

  return (
    <section id="merch" className="relative z-10 pb-12 md:pb-20 overflow-hidden">
      {/* Solid colour wash tied to whichever hoodie colourway is selected */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: pageBg }}
      />

      {/* Main campaign banner — the very first thing on the page */}
      <CampaignBanner
        src="/merch/nightshift-banner-main.png"
        alt="UNSW EngSoc Nightshift — 2026 Merch Collection"
        priority
      />

      {/* Countdown ticker — bridges the main banner into the Apparel section */}
      <CountdownBand accentColor={themeAccent} />

      <div className="relative px-4 md:px-8 pt-10 md:pt-14">
        <div className="max-w-5xl mx-auto">
          <SectionHeader label="Apparel" itemCount={variants.length} accentColor={themeAccent} textColor={headingColor} />
          <div className="flex flex-wrap gap-6 md:gap-8">
            {variants.map((v) => {
              const liveSizes = liveStock?.[v.slug];
              const stock = liveSizes
                ? Object.values(liveSizes).reduce((sum, n) => sum + n, 0)
                : totalVariantStock(v);
              return (
                <CatalogTile
                  key={v.slug}
                  href={`/merch/${v.slug}`}
                  image={v.image}
                  title={heroProduct.title}
                  subtitle={v.name}
                  price={heroProduct.price}
                  bgHex={v.hex}
                  accent={v.accentHex}
                  badge={stock !== null ? `Limited · ${stock}` : 'Limited Run'}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Accessory campaign banner — placed right before its own section */}
      <div className="my-12 md:my-16">
        <CampaignBanner
          src="/merch/nightshift-banner-accessories.png"
          alt="EngSoc Clickers — Blind Bag Keychains"
        />
      </div>

      <div className="relative px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <SectionHeader label="Accessories" itemCount={accessories.length} accentColor={themeAccent} textColor={headingColor} />
          <div className="flex flex-wrap gap-6 md:gap-8">
            {accessories.map((product) => (
              <CatalogTile
                key={product.slug}
                href={`/merch/${product.slug}`}
                image={product.image}
                title={product.title}
                price={product.price}
                bgHex={NIGHTSHIFT_BLACK}
                accent={themeAccent}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
