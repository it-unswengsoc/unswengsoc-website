import { NextResponse } from 'next/server';
import { getLiveStockLevels } from '@/lib/stockLevels';

// Read by the catalog page (a client component, so it can't call Stripe or read
// STRIPE_SECRET_KEY directly) to show live "Limited · N" totals.
export async function GET() {
  const levels = await getLiveStockLevels();
  return NextResponse.json(levels, { headers: { 'Cache-Control': 's-maxage=30, stale-while-revalidate=60' } });
}
