import { hexToRgba } from '@/lib/utils';

// Scoped copy of the .blueprint-bg grid texture (see globals.css) that stays inside
// its own box — the shared BlueprintGrid component is `position: fixed` by design
// (it's meant to be the one page-wide backdrop), so reusing it as decoration inside
// a normal-flow element would pin a full-viewport layer on top of the page and
// swallow all scroll/pointer input.
//
// Takes an explicit colour rather than reading the site's --grid-line/--grid-line-major
// CSS variables: those are only rethemed dynamically inside the SPA's animated
// Home flow (app/page.tsx) and default to the old blue accent everywhere else —
// which is exactly why this rendered blue on the standalone /merch routes before.
export default function GridTexture({ color = '#ecd9b0' }: { color?: string }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `
          linear-gradient(${hexToRgba(color, 0.08)} 1px, transparent 1px),
          linear-gradient(90deg, ${hexToRgba(color, 0.08)} 1px, transparent 1px),
          linear-gradient(${hexToRgba(color, 0.15)} 1px, transparent 1px),
          linear-gradient(90deg, ${hexToRgba(color, 0.15)} 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px, 20px 20px, 100px 100px, 100px 100px',
        backgroundPosition: '-1px -1px',
      }}
    />
  );
}
