'use client';

import { useRef, useState, type RefObject } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Check, Copy, Lock, ShoppingBag } from 'lucide-react';
import { hexToRgba, isLightColor } from '@/lib/utils';
import { Product, ProductVariant } from './types';
import { MERCH_CONTACT_EMAIL, NIGHTSHIFT_RED, NIGHTSHIFT_BLACK } from '@/lib/merchProducts';
import { useDropStatus } from '@/lib/dropSchedule';
import { useIdleFloat } from '@/lib/useIdleFloat';
import DropCountdown from './DropCountdown';
import GridTexture from './GridTexture';
import SizingChart from './SizingChart';

function CornerMarks({ color }: { color: string }) {
  const corners = [
    { top: 10, left: 10, borderTop: true, borderLeft: true },
    { top: 10, right: 10, borderTop: true, borderRight: true },
    { bottom: 10, left: 10, borderBottom: true, borderLeft: true },
    { bottom: 10, right: 10, borderBottom: true, borderRight: true },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none">
      {corners.map((c, i) => (
        <span
          key={i}
          className="absolute w-4 h-4"
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

interface Slide {
  src: string;
  label: string;
  /** 'cover' for full-bleed poster art, 'contain' for an isolated product cutout on white. */
  mode: 'cover' | 'contain';
}

// Swipeable/scrollable image slider — defaults to the styled campaign photo,
// slides to the plain product photo (when there is one) for a clearer look at
// the actual garment. Native scroll-snap rather than a carousel library: works
// with touch swipe for free, no extra dependency.
function ImageSlider({ slides, alt, accent, floatSecondaryRef }: {
  slides: Slide[];
  alt: string;
  accent: string;
  floatSecondaryRef: RefObject<HTMLDivElement | null>;
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollToSlide = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
  };

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el || el.clientWidth === 0) return;
    setActiveSlide(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    // aspect-[3/4] matches the campaign photos' native 1013x1350 exactly, so that
    // (primary) slide needs zero crop. The plain product photo (4:5, close but not
    // identical) sits inside via object-contain, so it letterboxes very slightly
    // rather than losing any of the garment.
    <div className="relative w-full aspect-[3/4] border-2 overflow-hidden" style={{ borderColor: accent }}>
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none' }}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className="relative w-full h-full shrink-0 snap-center"
            style={{ backgroundColor: slide.mode === 'contain' ? '#ffffff' : NIGHTSHIFT_BLACK }}
          >
            {slide.mode === 'contain' ? (
              <div ref={i === 1 ? floatSecondaryRef : undefined} className="absolute inset-6 md:inset-10">
                <Image src={slide.src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain" priority={i === 0} />
              </div>
            ) : (
              <Image src={slide.src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority={i === 0} />
            )}
          </div>
        ))}
      </div>

      <CornerMarks color={accent} />

      {slides.length > 1 ? (
        <>
          <span
            className="absolute top-3 left-3 z-10 text-[9px] px-2 py-1 font-mono uppercase tracking-wide"
            style={{ backgroundColor: hexToRgba('#000000', 0.55), color: '#ffffff' }}
          >
            {slides[activeSlide].label}
          </span>

          <button
            type="button"
            onClick={() => scrollToSlide(Math.max(0, activeSlide - 1))}
            disabled={activeSlide === 0}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center disabled:opacity-0 transition-opacity cursor-pointer"
            style={{ backgroundColor: hexToRgba('#000000', 0.5), color: '#ffffff' }}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollToSlide(Math.min(slides.length - 1, activeSlide + 1))}
            disabled={activeSlide === slides.length - 1}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center disabled:opacity-0 transition-opacity cursor-pointer"
            style={{ backgroundColor: hexToRgba('#000000', 0.5), color: '#ffffff' }}
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => scrollToSlide(i)}
                aria-label={`Show ${slide.label}`}
                className="w-1.5 h-1.5 rounded-full transition-colors cursor-pointer"
                style={{ backgroundColor: i === activeSlide ? accent : hexToRgba('#ffffff', 0.4) }}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default function MerchDetail({ product, variant }: { product: Product; variant?: ProductVariant }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(() => {
    const sizes = product.sizes ?? [];
    const firstInStock = sizes.find((s) => (variant?.sizeStock?.[s]?.stock ?? 1) > 0);
    return firstInStock ?? sizes[0] ?? null;
  });
  const [copied, setCopied] = useState(false);
  const [checkoutState, setCheckoutState] = useState<'idle' | 'loading' | 'error'>('idle');
  const { hasMounted, isLive } = useDropStatus();

  const accent = variant?.accentHex ?? NIGHTSHIFT_RED;
  const bgHex = variant?.hex ?? NIGHTSHIFT_BLACK;
  const onLight = isLightColor(bgHex);
  const textColor = onLight ? NIGHTSHIFT_BLACK : '#ffffff';
  const mutedTextColor = onLight ? 'rgba(18,12,10,0.65)' : 'rgba(255,255,255,0.65)';
  const subtleBorder = onLight ? 'rgba(18,12,10,0.2)' : 'rgba(255,255,255,0.2)';
  const category = product.sizes ? 'Apparel' : 'Accessories';

  const image = variant?.image ?? product.image;
  const slides: Slide[] = image
    ? [
        { src: image, label: 'Campaign', mode: 'cover' },
        ...(variant?.secondaryImage ? [{ src: variant.secondaryImage, label: 'Product Photo', mode: 'contain' as const }] : []),
      ]
    : [];

  const selectedSizeEntry = variant?.sizeStock && selectedSize ? variant.sizeStock[selectedSize] : undefined;
  const buyPriceId = selectedSizeEntry?.stripePriceId ?? product.stripePriceId ?? null;
  const soldOutSelected = selectedSizeEntry?.stock === 0;

  // Idle float only on the plain product-photo slide — the campaign poster
  // already has a lot going on, and floating baked-in text reads as a bug.
  const imageFloatRef = useRef<HTMLDivElement>(null);
  useIdleFloat(imageFloatRef, { amplitude: 10, duration: 3.6 });

  const handleBuy = async () => {
    if (!buyPriceId || soldOutSelected) return;
    setCheckoutState('loading');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: buyPriceId }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? 'Checkout failed');
      window.location.href = data.url;
    } catch {
      setCheckoutState('error');
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — link is still visible in the address bar.
    }
  };

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: bgHex }}>
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <GridTexture color={accent} />
      </div>

      <div className="relative z-10 px-4 md:px-8 py-6">
        <Link
          href="/merch"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest transition-colors duration-500 hover:opacity-70"
          style={{ color: textColor }}
        >
          <ArrowLeft className="w-3 h-3" />
          Back to Merch
        </Link>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-20 items-start">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {slides.length > 0 ? (
            <ImageSlider
              slides={slides}
              alt={variant ? `${product.title} — ${variant.name}` : product.title}
              accent={accent}
              floatSecondaryRef={imageFloatRef}
            />
          ) : (
            <div className="relative w-full aspect-[3/4] border-2 overflow-hidden flex items-center justify-center" style={{ borderColor: accent, backgroundColor: NIGHTSHIFT_BLACK }}>
              <ShoppingBag className="w-12 h-12 opacity-30" style={{ color: accent }} />
              <CornerMarks color={accent} />
            </div>
          )}

          {product.specs ? (
            <div className="mt-4 border-2 p-4 md:p-5" style={{ borderColor: hexToRgba(accent, 0.4), backgroundColor: hexToRgba(accent, 0.07) }}>
              <span className="block font-mono text-[10px] tracking-widest uppercase mb-3" style={{ color: accent }}>
                Spec Sheet
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 font-mono text-xs" style={{ color: textColor }}>
                {product.specs.map((spec) => (
                  <li key={spec} className="flex items-center gap-2">
                    <span className="w-2 h-px shrink-0" style={{ backgroundColor: accent }} />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {product.sizes ? (
            <div className="mt-4">
              <SizingChart accent={accent} />
            </div>
          ) : null}
        </motion.div>

        {/* Purchase panel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <span className="block font-mono text-xs tracking-[0.2em] uppercase mb-3 transition-colors duration-500" style={{ color: mutedTextColor }}>
            {category} {variant ? `/ ${variant.name}` : ''}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-[0.95] mb-3 transition-colors duration-500" style={{ color: textColor }}>
            {product.title}
          </h1>
          <p className="font-mono font-bold text-2xl md:text-3xl mb-5 transition-colors duration-500" style={{ color: accent }}>
            {product.price}
          </p>
          <p className="text-sm md:text-base font-light mb-6 leading-relaxed transition-colors duration-500" style={{ color: mutedTextColor }}>
            {product.description}
          </p>

          {product.sizes ? (
            <div className="mb-6">
              <span className="block font-mono text-[10px] tracking-widest uppercase mb-2 transition-colors duration-500" style={{ color: mutedTextColor }}>
                Size
              </span>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const stock = variant?.sizeStock?.[size]?.stock;
                  const soldOut = stock === 0;
                  const selected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      disabled={soldOut}
                      onClick={() => setSelectedSize(size)}
                      className="w-14 h-16 flex flex-col items-center justify-center gap-0.5 text-sm font-mono border-2 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
                      style={
                        selected
                          ? { borderColor: accent, backgroundColor: accent, color: NIGHTSHIFT_BLACK, fontWeight: 'bold' }
                          : { borderColor: subtleBorder, color: mutedTextColor }
                      }
                    >
                      <span>{size}</span>
                      {typeof stock === 'number' ? (
                        <span
                          className="text-[8px] font-normal tracking-wide"
                          style={{ color: selected ? 'rgba(10,25,41,0.7)' : mutedTextColor }}
                        >
                          {soldOut ? 'Sold out' : `${stock} left`}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {!hasMounted ? (
            <div className="border-2 p-4 md:p-5 mb-6 h-[92px]" style={{ borderColor: subtleBorder }} />
          ) : !isLive ? (
            <div
              className="border-2 p-4 md:p-5 mb-6 flex items-center gap-3"
              style={{ borderColor: subtleBorder, backgroundColor: hexToRgba(accent, 0.04) }}
            >
              <Lock className="w-4 h-4 shrink-0" style={{ color: mutedTextColor }} />
              <p className="font-mono text-xs leading-relaxed transition-colors duration-500" style={{ color: mutedTextColor }}>
                Reservations open once Nightshift drops. The timer above will hit zero first.
              </p>
            </div>
          ) : (
            <div className="border-2 p-4 md:p-5 mb-6" style={{ borderColor: accent, backgroundColor: hexToRgba(accent, 0.08) }}>
              <button
                type="button"
                onClick={handleBuy}
                disabled={checkoutState === 'loading' || !buyPriceId || soldOutSelected}
                className="w-full flex items-center justify-center gap-2 text-sm font-bold tracking-widest uppercase px-4 py-3 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 mb-3"
                style={{ backgroundColor: accent, color: NIGHTSHIFT_BLACK }}
              >
                <ShoppingBag className="w-4 h-4" />
                {checkoutState === 'loading' ? 'Redirecting to checkout…' : soldOutSelected ? 'Sold Out' : `Buy Now — ${product.price}`}
              </button>
              <p className="font-mono text-xs leading-relaxed transition-colors duration-500" style={{ color: mutedTextColor }}>
                Secure checkout via Stripe.
              </p>
              {checkoutState === 'error' ? (
                <p className="font-mono text-xs mt-2" style={{ color: '#f87171' }}>
                  Something went wrong starting checkout. Try again, or email {MERCH_CONTACT_EMAIL}.
                </p>
              ) : null}
            </div>
          )}

          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest mb-8 transition-colors duration-500 cursor-pointer hover:opacity-70"
            style={{ color: textColor }}
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Link copied' : `Share this ${variant ? 'colourway' : 'item'}`}
          </button>

          <DropCountdown accentColor={accent} />
        </motion.div>
      </div>
    </div>
  );
}
