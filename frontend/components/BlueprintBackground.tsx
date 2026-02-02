'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(DrawSVGPlugin);

interface BlueprintBackgroundProps {
  animateIn?: boolean;
  onDrawComplete?: () => void;
}

// Seeded random for consistent scattered markers
function createSeededRandom(initialSeed: number) {
  let seed = initialSeed;
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

// Generate hexagon points string for SVG polygon
function hexagonPoints(cx: number, cy: number, size: number): string {
  const points: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    points.push(`${cx + size * Math.cos(angle)},${cy + size * Math.sin(angle)}`);
  }
  return points.join(' ');
}

export default function BlueprintBackground({ animateIn = false, onDrawComplete }: BlueprintBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const annotationsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const idleAnimationRef = useRef<gsap.core.Timeline | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Track dimensions
  useEffect(() => {
    const update = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const { width, height } = dimensions;
  const cx = width / 2;
  const cy = height / 2;
  const bp = 25;
  const frameSize = 280;
  const hexSizes = [50, 90, 130, 170, 210];
  const strokeColor = 'rgba(255,255,255,0.3)';
  const strokeColorDim = 'rgba(255,255,255,0.18)';
  const strokeColorBright = 'rgba(255,255,255,0.24)';

  // Connection line directions
  const directions = [
    { x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 1, y: 0 },
    { x: -0.7, y: -0.7 }, { x: 0.7, y: -0.7 }, { x: -0.7, y: 0.7 }, { x: 0.7, y: 0.7 },
  ];
  const endDist = Math.min(width, height) * 0.45;

  // Corner positions
  const corners = [
    { x: 80, y: 80 }, { x: width - 80, y: 80 },
    { x: 80, y: height - 80 }, { x: width - 80, y: height - 80 },
  ];

  // Callouts
  const callouts = [
    { sx: cx - 180, sy: cy - 100, ex: cx - 250, ey: cy - 180, title: 'DETAIL A', desc: 'SEE DWG A-7742-02' },
    { sx: cx + 180, sy: cy - 100, ex: cx + 250, ey: cy - 180, title: 'SECTION B-B', desc: 'SCALE 2:1' },
    { sx: cx + 150, sy: cy + 120, ex: cx + 280, ey: cy + 200, title: 'NOTE 3', desc: 'TYP. 6 PLACES' },
    { sx: cx - 150, sy: cy + 100, ex: cx - 280, ey: cy + 180, title: 'REF C1', desc: '100uF 16V' },
  ];

  // Scattered markers (seeded random)
  const markers = useMemo(() => {
    if (width === 0) return [];
    const seededRandom = createSeededRandom(12345);
    const result: { x: number; y: number; num: number }[] = [];
    for (let i = 0; i < 30; i++) {
      const mx = seededRandom() * (width - 400) + 200;
      const my = seededRandom() * (height - 300) + 150;
      const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);
      if (dist > 280 && dist < 400) {
        result.push({ x: mx, y: my, num: Math.floor(seededRandom() * 20) + 1 });
      } else {
        seededRandom(); // consume to keep sequence consistent
      }
    }
    return result;
  }, [width, height, cx, cy]);

  // Text annotation data
  const leftPanelX = 50;
  const rightPanelX = width - 50;
  const compListY = 200;
  const dimY = compListY + 220;
  const notesY = dimY + 200;
  const specY = 200;
  const refY = specY + 220;
  const coordY = refY + 100;
  const revTableY = height - 120;
  const approvalX = rightPanelX - 200;

  const components = [
    { id: 'C-01', name: 'CAPACITOR', val: '100uF' },
    { id: 'R-02', name: 'RESISTOR', val: '10K' },
    { id: 'D-03', name: 'DIODE', val: '1N4148' },
    { id: 'U-04', name: 'IC CHIP', val: '74HC00' },
    { id: 'L-05', name: 'INDUCTOR', val: '22mH' },
    { id: 'Q-06', name: 'TRANSISTOR', val: '2N2222' },
    { id: 'X-07', name: 'CRYSTAL', val: '16MHz' },
    { id: 'J-08', name: 'CONNECTOR', val: 'DB-9' },
  ];

  const specs = [
    { label: 'VOLTAGE', value: '3.3V - 12V DC' },
    { label: 'CURRENT', value: '500mA MAX' },
    { label: 'POWER', value: '6W NOMINAL' },
    { label: 'FREQ', value: '2.4 GHz' },
    { label: 'TEMP', value: '-20 TO 85C' },
    { label: 'HUMIDITY', value: '5-95% RH' },
    { label: 'WEIGHT', value: '42.5g' },
    { label: 'MTBF', value: '>50000 HRS' },
  ];

  const notes = ['1. ALL DIMS IN MM', '2. TOLERANCE +/-0.5', '3. FINISH: MATTE', '4. MATERIAL: AL6061', '5. BREAK EDGES'];

  const revisions = [
    { rev: 'A', date: '01.15.26', desc: 'INITIAL RELEASE' },
    { rev: 'B', date: '01.22.26', desc: 'UPDATED DIMS' },
    { rev: 'C', date: '01.29.26', desc: 'ADDED NOTES' },
  ];

  const zones = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const zoneSpacing = width > 0 ? (width - 100) / zones.length : 0;
  const numZones = ['1', '2', '3', '4', '5', '6'];
  const numSpacing = height > 0 ? (height - 100) / numZones.length : 0;

  const refs = ['A1', 'B2', 'C3', 'D4', 'E5', 'F6'];

  // GSAP DrawSVG animation
  useEffect(() => {
    if (width === 0 || !svgRef.current) return;

    // Kill previous timeline on re-render
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const svg = svgRef.current;

    if (!animateIn) {
      // Show everything immediately
      if (gridRef.current) gridRef.current.style.opacity = '1';
      if (annotationsRef.current) annotationsRef.current.style.opacity = '1';
      gsap.set(svg.querySelectorAll('.svg-draw'), { drawSVG: '100%' });
      return;
    }

    // Start hidden
    if (gridRef.current) gridRef.current.style.opacity = '0';
    if (annotationsRef.current) annotationsRef.current.style.opacity = '0';
    gsap.set(svg.querySelectorAll('.svg-draw'), { drawSVG: '0%' });

    const tl = gsap.timeline({
      onComplete: () => onDrawComplete?.(),
    });
    timelineRef.current = tl;

    // Phase 1: Grid background fades in
    tl.to(gridRef.current, { opacity: 1, duration: 0.5 }, 0);

    // Phase 2: Borders draw in
    tl.fromTo(svg.querySelectorAll('.svg-border'),
      { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.8, stagger: 0.1, ease: 'power2.out' }, 0.3);

    // Phase 3: Hexagons draw in (smallest to largest)
    tl.fromTo(svg.querySelectorAll('.svg-hexagon'),
      { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.6, stagger: 0.08, ease: 'power2.out' }, 0.5);

    // Phase 4: Square frame
    tl.fromTo(svg.querySelectorAll('.svg-frame'),
      { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.6, ease: 'power2.out' }, 0.7);

    // Phase 5: Diagonal lines
    tl.fromTo(svg.querySelectorAll('.svg-diagonal'),
      { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.4, stagger: 0.05, ease: 'power2.out' }, 0.9);

    // Phase 6: Connection lines
    tl.fromTo(svg.querySelectorAll('.svg-connection'),
      { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.5, stagger: 0.04, ease: 'power2.out' }, 1.0);

    // Phase 7: Corner elements
    tl.fromTo(svg.querySelectorAll('.svg-corner'),
      { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.4, stagger: 0.03, ease: 'power2.out' }, 1.3);

    // Phase 8: Control panels + measurement lines
    tl.fromTo(svg.querySelectorAll('.svg-panel'),
      { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.4, stagger: 0.05, ease: 'power2.out' }, 1.4);

    // Phase 9: Callout lines + markers
    tl.fromTo(svg.querySelectorAll('.svg-callout'),
      { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.3, stagger: 0.04, ease: 'power2.out' }, 1.5);

    // Phase 10: Dashed lines
    tl.fromTo(svg.querySelectorAll('.svg-dashed'),
      { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.5, stagger: 0.1, ease: 'power2.out' }, 1.5);

    // Phase 11: Text annotations fade in
    tl.to(annotationsRef.current, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 1.6);

    return () => {
      tl.kill();
    };
  }, [width, height, animateIn, onDrawComplete]);

  // Idle animations for floating lines and subtle movements
  useEffect(() => {
    if (!svgRef.current || width === 0) return;

    const svg = svgRef.current;
    const idleTl = gsap.timeline({ repeat: -1 });

    // Pulse hexagons subtly
    idleTl.to('.svg-hexagon', {
      opacity: (i) => 0.7 - i * 0.1,
      duration: 3,
      stagger: 0.2,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    }, 0);

    // Animate scanning lines
    const scanLines = svg.querySelectorAll('.idle-scan-line');
    scanLines.forEach((line, i) => {
      idleTl.fromTo(line,
        { strokeDashoffset: 0 },
        { 
          strokeDashoffset: -1000,
          duration: 8 + i * 2,
          repeat: -1,
          ease: 'none',
        }, 
        i * 0.5
      );
    });

    // Floating data points
    const dataPoints = svg.querySelectorAll('.idle-data-point');
    dataPoints.forEach((point, i) => {
      idleTl.to(point, {
        opacity: 0.8,
        scale: 1.2,
        duration: 2 + (i % 3) * 0.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      }, i * 0.3);
    });

    idleAnimationRef.current = idleTl;

    return () => {
      idleTl.kill();
    };
  }, [width, height]);

  if (width === 0) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Grid background - CSS */}
      <div ref={gridRef} className="blueprint-bg" style={{ opacity: animateIn ? 0 : 1 }} />

      {/* SVG structural lines */}
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="fixed inset-0"
        style={{ overflow: 'visible' }}
      >
        {/* Outer borders */}
        <rect className="svg-draw svg-border" x={bp} y={bp} width={width - bp * 2} height={height - bp * 2}
          fill="none" stroke={strokeColor} strokeWidth={2} opacity={0.6} />
        <rect className="svg-draw svg-border" x={bp + 6} y={bp + 6} width={width - bp * 2 - 12} height={height - bp * 2 - 12}
          fill="none" stroke={strokeColor} strokeWidth={0.5} opacity={0.6} />

        {/* Hexagons (smallest to largest) */}
        {hexSizes.map((size, i) => (
          <polygon key={`hex-${i}`} className="svg-draw svg-hexagon"
            points={hexagonPoints(cx, cy, size)}
            fill="none" stroke={strokeColor} strokeWidth={1} opacity={1 - i * 0.15} />
        ))}

        {/* Square frame */}
        <rect className="svg-draw svg-frame"
          x={cx - frameSize} y={cy - frameSize} width={frameSize * 2} height={frameSize * 2}
          fill="none" stroke={strokeColor} strokeWidth={1} />

        {/* Diagonal lines from frame corners to hexagon corners */}
        <line className="svg-draw svg-diagonal" x1={cx - frameSize} y1={cy - frameSize} x2={cx - 170} y2={cy - 170} stroke={strokeColor} strokeWidth={1} />
        <line className="svg-draw svg-diagonal" x1={cx + frameSize} y1={cy - frameSize} x2={cx + 170} y2={cy - 170} stroke={strokeColor} strokeWidth={1} />
        <line className="svg-draw svg-diagonal" x1={cx - frameSize} y1={cy + frameSize} x2={cx - 170} y2={cy + 170} stroke={strokeColor} strokeWidth={1} />
        <line className="svg-draw svg-diagonal" x1={cx + frameSize} y1={cy + frameSize} x2={cx + 170} y2={cy + 170} stroke={strokeColor} strokeWidth={1} />

        {/* Connection lines from hexagon outward */}
        {directions.map((dir, i) => (
          <line key={`conn-${i}`} className="svg-draw svg-connection"
            x1={cx + dir.x * 210} y1={cy + dir.y * 210}
            x2={cx + dir.x * endDist} y2={cy + dir.y * endDist}
            stroke={strokeColor} strokeWidth={1} />
        ))}

        {/* Corner technical elements */}
        {corners.map((c, ci) => (
          <g key={`corner-${ci}`}>
            <circle className="svg-draw svg-corner" cx={c.x} cy={c.y} r={30} fill="none" stroke={strokeColor} strokeWidth={0.5} />
            <circle className="svg-draw svg-corner" cx={c.x} cy={c.y} r={20} fill="none" stroke={strokeColor} strokeWidth={0.5} />
            <circle className="svg-draw svg-corner" cx={c.x} cy={c.y} r={5} fill={strokeColor} stroke="none" />
            <line className="svg-draw svg-corner" x1={c.x - 35} y1={c.y} x2={c.x - 45} y2={c.y} stroke={strokeColor} strokeWidth={0.5} />
            <line className="svg-draw svg-corner" x1={c.x + 35} y1={c.y} x2={c.x + 45} y2={c.y} stroke={strokeColor} strokeWidth={0.5} />
            <line className="svg-draw svg-corner" x1={c.x} y1={c.y - 35} x2={c.x} y2={c.y - 45} stroke={strokeColor} strokeWidth={0.5} />
            <line className="svg-draw svg-corner" x1={c.x} y1={c.y + 35} x2={c.x} y2={c.y + 45} stroke={strokeColor} strokeWidth={0.5} />
          </g>
        ))}

        {/* Control panel - right side */}
        <rect className="svg-draw svg-panel" x={width - 130} y={cy - 150} width={60} height={300}
          fill="none" stroke={strokeColor} strokeWidth={0.5} />
        {[0, 1, 2].map(i => (
          <g key={`rp-circle-${i}`}>
            <circle className="svg-draw svg-panel" cx={width - 100} cy={cy - 150 + 30 + i * 40} r={8} fill="none" stroke={strokeColor} strokeWidth={0.5} />
            <circle cx={width - 100} cy={cy - 150 + 30 + i * 40} r={3} fill={strokeColor} stroke="none" />
          </g>
        ))}
        <rect className="svg-draw svg-panel" x={width - 120} y={cy + 70} width={40} height={20}
          fill="none" stroke={strokeColor} strokeWidth={0.5} />
        <rect className="svg-draw svg-panel" x={width - 120} y={cy + 100} width={40} height={30}
          fill="none" stroke={strokeColor} strokeWidth={0.5} />

        {/* Control panel - left side */}
        <rect className="svg-draw svg-panel" x={75} y={cy - 100} width={50} height={200}
          fill="none" stroke={strokeColor} strokeWidth={0.5} />
        {[0, 1, 2].map(i => (
          <g key={`lp-circle-${i}`}>
            <circle className="svg-draw svg-panel" cx={100} cy={cy - 100 + 30 + i * 40} r={8} fill="none" stroke={strokeColor} strokeWidth={0.5} />
            <circle cx={100} cy={cy - 100 + 30 + i * 40} r={3} fill={strokeColor} stroke="none" />
          </g>
        ))}
        <rect className="svg-draw svg-panel" x={85} y={cy + 20} width={30} height={20}
          fill="none" stroke={strokeColor} strokeWidth={0.5} />
        <rect className="svg-draw svg-panel" x={85} y={cy + 50} width={30} height={30}
          fill="none" stroke={strokeColor} strokeWidth={0.5} />

        {/* Measurement line - horizontal */}
        <line className="svg-draw svg-panel" x1={cx - 300} y1={height - 50} x2={cx + 300} y2={height - 50} stroke={strokeColor} strokeWidth={0.5} />
        <line className="svg-draw svg-panel" x1={cx - 300} y1={height - 55} x2={cx - 300} y2={height - 45} stroke={strokeColor} strokeWidth={0.5} />
        <line className="svg-draw svg-panel" x1={cx + 300} y1={height - 55} x2={cx + 300} y2={height - 45} stroke={strokeColor} strokeWidth={0.5} />

        {/* Measurement line - vertical */}
        <line className="svg-draw svg-panel" x1={50} y1={cy - 200} x2={50} y2={cy + 200} stroke={strokeColor} strokeWidth={0.5} />
        <line className="svg-draw svg-panel" x1={45} y1={cy - 200} x2={55} y2={cy - 200} stroke={strokeColor} strokeWidth={0.5} />
        <line className="svg-draw svg-panel" x1={45} y1={cy + 200} x2={55} y2={cy + 200} stroke={strokeColor} strokeWidth={0.5} />

        {/* Callout leader lines */}
        {callouts.map((c, i) => (
          <g key={`callout-${i}`}>
            <line className="svg-draw svg-callout" x1={c.sx} y1={c.sy} x2={c.ex} y2={c.ey} stroke={strokeColor} strokeWidth={0.5} />
            <circle cx={c.sx} cy={c.sy} r={3} fill={strokeColor} stroke="none" />
          </g>
        ))}

        {/* Scattered marker circles */}
        {markers.map((m, i) => (
          <circle key={`marker-${i}`} className="svg-draw svg-callout"
            cx={m.x} cy={m.y} r={8} fill="none" stroke={strokeColorDim} strokeWidth={0.5} />
        ))}

        {/* Dashed connection lines */}
        <line className="svg-draw svg-dashed"
          x1={leftPanelX + 150} y1={compListY + 100} x2={cx - 280} y2={cy}
          stroke={strokeColorDim} strokeWidth={0.5} strokeDasharray="3 6" />
        <line className="svg-draw svg-dashed"
          x1={rightPanelX - 150} y1={specY + 100} x2={cx + 280} y2={cy}
          stroke={strokeColorDim} strokeWidth={0.5} strokeDasharray="3 6" />

        {/* Title block outlines (SVG rects that draw in with annotations) */}
        <rect className="svg-draw svg-callout" x={leftPanelX} y={50} width={180} height={120}
          fill="none" stroke={strokeColorBright} strokeWidth={1.5} />
        <rect className="svg-draw svg-callout" x={leftPanelX + 3} y={53} width={174} height={114}
          fill="none" stroke={strokeColorBright} strokeWidth={0.5} />
        <rect className="svg-draw svg-callout" x={rightPanelX - 180} y={50} width={180} height={120}
          fill="none" stroke={strokeColorBright} strokeWidth={1.5} />
        <rect className="svg-draw svg-callout" x={rightPanelX - 177} y={53} width={174} height={114}
          fill="none" stroke={strokeColorBright} strokeWidth={0.5} />

        {/* Idle scanning lines that move continuously */}
        <line className="idle-scan-line"
          x1={bp} y1={cy - 100} x2={width - bp} y2={cy - 100}
          stroke="rgba(65, 145, 220, 0.3)" strokeWidth={1}
          strokeDasharray="40,20" />
        <line className="idle-scan-line"
          x1={bp} y1={cy + 100} x2={width - bp} y2={cy + 100}
          stroke="rgba(65, 145, 220, 0.25)" strokeWidth={0.8}
          strokeDasharray="30,15" />
        <line className="idle-scan-line"
          x1={cx - 200} y1={bp} x2={cx - 200} y2={height - bp}
          stroke="rgba(65, 145, 220, 0.2)" strokeWidth={0.8}
          strokeDasharray="50,25" />
        <line className="idle-scan-line"
          x1={cx + 200} y1={bp} x2={cx + 200} y2={height - bp}
          stroke="rgba(65, 145, 220, 0.2)" strokeWidth={0.8}
          strokeDasharray="45,20" />

        {/* Idle floating data points */}
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 300 + (i % 3) * 50;
          const px = cx + Math.cos(angle) * radius;
          const py = cy + Math.sin(angle) * radius;
          return (
            <circle key={`data-point-${i}`} className="idle-data-point"
              cx={px} cy={py} r={2}
              fill="rgba(65, 145, 220, 0.5)" opacity={0.3} />
          );
        })}

        {/* Pulsing grid markers */}
        {[...Array(8)].map((_, i) => {
          const gx = bp + 100 + (i % 4) * 250;
          const gy = bp + 100 + Math.floor(i / 4) * 300;
          return (
            <g key={`grid-marker-${i}`} className="idle-data-point">
              <circle cx={gx} cy={gy} r={3} fill="none" stroke="rgba(65, 145, 220, 0.3)" strokeWidth={0.5} opacity={0.4} />
              <circle cx={gx} cy={gy} r={1} fill="rgba(65, 145, 220, 0.6)" opacity={0.4} />
            </g>
          );
        })}
      </svg>

      {/* Text annotations layer */}
      <div ref={annotationsRef} className="fixed inset-0" style={{ opacity: animateIn ? 0 : 1 }}>
        {/* Top-left title block */}
        <div className="blueprint-annotation" style={{ left: leftPanelX + 10, top: 58, fontSize: 12, opacity: 0.8 }}>SCHEMATIC</div>
        <div className="blueprint-annotation" style={{ left: leftPanelX + 10, top: 76, fontSize: 9, opacity: 0.8 }}>REV. 2.4.1</div>
        <div className="blueprint-annotation" style={{ left: leftPanelX + 10, top: 93, fontSize: 8, opacity: 0.8 }}>DWG NO.</div>
        <div className="blueprint-annotation" style={{ left: leftPanelX + 60, top: 93, fontSize: 8, opacity: 0.8 }}>A-7742-01</div>
        <div className="blueprint-annotation" style={{ left: leftPanelX + 10, top: 110, fontSize: 8, opacity: 0.8 }}>SCALE</div>
        <div className="blueprint-annotation" style={{ left: leftPanelX + 60, top: 110, fontSize: 8, opacity: 0.8 }}>1:100</div>
        <div className="blueprint-annotation" style={{ left: leftPanelX + 10, top: 127, fontSize: 8, opacity: 0.8 }}>DATE</div>
        <div className="blueprint-annotation" style={{ left: leftPanelX + 60, top: 127, fontSize: 8, opacity: 0.8 }}>01.29.26</div>

        {/* Top-right title block */}
        <div className="blueprint-annotation" style={{ left: rightPanelX - 170, top: 58, fontSize: 12, opacity: 0.8 }}>SYSTEM</div>
        <div className="blueprint-annotation" style={{ left: rightPanelX - 170, top: 76, fontSize: 9, opacity: 0.8 }}>CORE MODULE</div>
        <div className="blueprint-annotation" style={{ left: rightPanelX - 170, top: 93, fontSize: 8, opacity: 0.8 }}>SHEET</div>
        <div className="blueprint-annotation" style={{ left: rightPanelX - 110, top: 93, fontSize: 8, opacity: 0.8 }}>1 OF 12</div>
        <div className="blueprint-annotation" style={{ left: rightPanelX - 170, top: 110, fontSize: 8, opacity: 0.8 }}>ZONE</div>
        <div className="blueprint-annotation" style={{ left: rightPanelX - 110, top: 110, fontSize: 8, opacity: 0.8 }}>A-4</div>
        <div className="blueprint-annotation" style={{ left: rightPanelX - 170, top: 127, fontSize: 8, opacity: 0.8 }}>APPROVED</div>
        <div className="blueprint-annotation" style={{ left: rightPanelX - 110, top: 127, fontSize: 8, opacity: 0.8 }}>J.DOE</div>

        {/* Component list */}
        <div className="blueprint-annotation" style={{ left: leftPanelX, top: compListY - 12, fontSize: 10, opacity: 0.7 }}>COMPONENT LIST</div>
        {components.map((comp, i) => (
          <div key={`comp-${i}`} className="blueprint-annotation" style={{ left: leftPanelX, top: compListY + 13 + i * 22, fontSize: 7, opacity: 0.7 }}>
            <span style={{ display: 'inline-block', width: 32 }}>{comp.id}</span>
            <span style={{ display: 'inline-block', width: 62 }}>{comp.name}</span>
            <span>{comp.val}</span>
          </div>
        ))}

        {/* Dimensions */}
        <div className="blueprint-annotation" style={{ left: leftPanelX, top: dimY - 12, fontSize: 10, opacity: 0.6 }}>DIMENSIONS (mm)</div>

        {/* Notes */}
        <div className="blueprint-annotation" style={{ left: leftPanelX, top: notesY - 12, fontSize: 10, opacity: 0.6 }}>NOTES:</div>
        {notes.map((note, i) => (
          <div key={`note-${i}`} className="blueprint-annotation" style={{ left: leftPanelX, top: notesY + 8 + i * 16, fontSize: 7, opacity: 0.6 }}>{note}</div>
        ))}

        {/* Specifications */}
        <div className="blueprint-annotation" style={{ left: rightPanelX - 150, top: specY - 12, fontSize: 10, opacity: 0.7 }}>SPECIFICATIONS</div>
        {specs.map((spec, i) => (
          <div key={`spec-${i}`} className="blueprint-annotation" style={{ left: rightPanelX - 150, top: specY + 13 + i * 22, fontSize: 7, opacity: 0.7 }}>
            <span style={{ display: 'inline-block', width: 70 }}>{spec.label}</span>
            <span style={{ fontSize: 8 }}>{spec.value}</span>
          </div>
        ))}

        {/* Reference designators */}
        <div className="blueprint-annotation" style={{ left: rightPanelX - 150, top: refY - 12, fontSize: 10, opacity: 0.7 }}>REF DESIGNATORS</div>
        {refs.map((r, i) => (
          <div key={`ref-${i}`} className="blueprint-annotation" style={{
            left: rightPanelX - 150 + (i % 3) * 50 + 2,
            top: refY + 13 + Math.floor(i / 3) * 30,
            fontSize: 8, opacity: 0.7,
          }}>{r}</div>
        ))}

        {/* Coordinates */}
        <div className="blueprint-annotation" style={{ left: rightPanelX - 150, top: coordY - 12, fontSize: 10, opacity: 0.7 }}>COORDINATES</div>
        <div className="blueprint-annotation" style={{ left: rightPanelX - 100 + 55, top: coordY + 38 - 4, fontSize: 8, opacity: 0.8 }}>X</div>
        <div className="blueprint-annotation" style={{ left: rightPanelX - 100 - 3, top: coordY + 50 - 55 - 8, fontSize: 8, opacity: 0.8 }}>Y</div>
        <div className="blueprint-annotation" style={{ left: rightPanelX - 100 - 5, top: coordY + 50 + 5, fontSize: 7, opacity: 0.7 }}>ORIGIN: 0,0,0</div>

        {/* Revision history */}
        <div className="blueprint-annotation" style={{ left: leftPanelX, top: revTableY - 12, fontSize: 10, opacity: 0.7 }}>REVISION HISTORY</div>
        <div className="blueprint-annotation" style={{ left: leftPanelX, top: revTableY + 8, fontSize: 7, opacity: 0.7 }}>
          <span style={{ display: 'inline-block', width: 28 }}>REV</span>
          <span style={{ display: 'inline-block', width: 58 }}>DATE</span>
          <span>DESCRIPTION</span>
        </div>
        {revisions.map((rev, i) => (
          <div key={`rev-${i}`} className="blueprint-annotation" style={{ left: leftPanelX, top: revTableY + 28 + i * 18, fontSize: 7, opacity: 0.7 }}>
            <span style={{ display: 'inline-block', width: 28 }}>{rev.rev}</span>
            <span style={{ display: 'inline-block', width: 58 }}>{rev.date}</span>
            <span>{rev.desc}</span>
          </div>
        ))}

        {/* Approvals */}
        <div className="blueprint-annotation" style={{ left: approvalX, top: revTableY - 12, fontSize: 10, opacity: 0.7 }}>APPROVALS</div>
        <div className="blueprint-annotation" style={{ left: approvalX, top: revTableY + 13, fontSize: 7, opacity: 0.7 }}>
          <span style={{ display: 'inline-block', width: 58 }}>DRAWN</span>
          <span style={{ display: 'inline-block', width: 68 }}>J. SMITH</span>
          <span>01.10.26</span>
        </div>
        <div className="blueprint-annotation" style={{ left: approvalX, top: revTableY + 31, fontSize: 7, opacity: 0.7 }}>
          <span style={{ display: 'inline-block', width: 58 }}>CHECKED</span>
          <span style={{ display: 'inline-block', width: 68 }}>M. JONES</span>
          <span>01.15.26</span>
        </div>
        <div className="blueprint-annotation" style={{ left: approvalX, top: revTableY + 49, fontSize: 7, opacity: 0.7 }}>
          <span style={{ display: 'inline-block', width: 58 }}>APPROVED</span>
          <span style={{ display: 'inline-block', width: 68 }}>R. DAVIS</span>
          <span>01.20.26</span>
        </div>

        {/* Zone markers - top/bottom */}
        {zones.map((zone, i) => (
          <div key={`zone-top-${i}`}>
            <div className="blueprint-annotation" style={{ left: 50 + zoneSpacing * i + zoneSpacing / 2 - 4, top: 28, fontSize: 10, opacity: 0.5 }}>{zone}</div>
            <div className="blueprint-annotation" style={{ left: 50 + zoneSpacing * i + zoneSpacing / 2 - 4, top: height - 44, fontSize: 10, opacity: 0.5 }}>{zone}</div>
          </div>
        ))}

        {/* Zone markers - left/right */}
        {numZones.map((num, i) => (
          <div key={`zone-num-${i}`}>
            <div className="blueprint-annotation" style={{ left: 28, top: 50 + numSpacing * i + numSpacing / 2 - 6, fontSize: 10, opacity: 0.5 }}>{num}</div>
            <div className="blueprint-annotation" style={{ left: width - 44, top: 50 + numSpacing * i + numSpacing / 2 - 6, fontSize: 10, opacity: 0.5 }}>{num}</div>
          </div>
        ))}

        {/* Callout text */}
        {callouts.map((c, i) => (
          <div key={`callout-text-${i}`}>
            <div className="blueprint-annotation" style={{ left: c.ex + 5, top: c.ey - 12, fontSize: 8, opacity: 0.6 }}>{c.title}</div>
            <div className="blueprint-annotation" style={{ left: c.ex + 5, top: c.ey, fontSize: 7, opacity: 0.6 }}>{c.desc}</div>
          </div>
        ))}

        {/* Scattered marker numbers */}
        {markers.map((m, i) => (
          <div key={`marker-text-${i}`} className="blueprint-annotation"
            style={{ left: m.x - 4, top: m.y - 5, fontSize: 7, opacity: 0.4 }}>{m.num}</div>
        ))}
      </div>
    </div>
  );
}
