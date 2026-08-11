import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import GridTexture from '@/components/GridTexture';
import { NIGHTSHIFT_BLACK, NIGHTSHIFT_RED } from '@/lib/merchProducts';

export default function MerchNotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center" style={{ backgroundColor: NIGHTSHIFT_BLACK }}>
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <GridTexture color={NIGHTSHIFT_RED} />
      </div>
      <div className="relative z-10 text-center px-4">
        <p className="font-mono text-xs tracking-[0.3em] uppercase mb-3 text-[#a3212f]">404 / Unknown SKU</p>
        <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white mb-6">
          That item doesn&apos;t exist
        </h1>
        <Link
          href="/merch"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white border-2 border-[#a3212f] px-4 py-2 hover:bg-[#a3212f] hover:text-[#120c0a] transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to Merch
        </Link>
      </div>
    </div>
  );
}
