'use client';

import { useEffect, useRef } from 'react';

export default function BlueprintBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let seed = 12345;
    const seededRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      seed = 12345;
      draw();
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const centerX = width / 2;
      const centerY = height / 2;

      const strokeColor = 'white';
      const strokeOpacity = 0.3;

      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = strokeColor;
      ctx.fillStyle = strokeColor;
      ctx.lineWidth = 0.5;

      // Draw grid
      ctx.globalAlpha = strokeOpacity * 0.3;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw fine grid
      ctx.globalAlpha = strokeOpacity * 0.15;
      const fineGridSize = 10;
      for (let x = 0; x < width; x += fineGridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += fineGridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Outer border
      ctx.globalAlpha = strokeOpacity * 0.6;
      ctx.lineWidth = 2;
      const bp = 25;
      ctx.strokeRect(bp, bp, width - bp * 2, height - bp * 2);
      ctx.lineWidth = 0.5;
      ctx.strokeRect(bp + 6, bp + 6, width - bp * 2 - 12, height - bp * 2 - 12);

      ctx.globalAlpha = strokeOpacity;
      ctx.lineWidth = 1;

      // Draw concentric hexagons
      const hexagonSizes = [50, 90, 130, 170, 210];
      hexagonSizes.forEach((size, index) => {
        ctx.globalAlpha = strokeOpacity * (1 - index * 0.15);
        drawHexagon(ctx, centerX, centerY, size);
      });

      // Draw outer square frame
      ctx.globalAlpha = strokeOpacity;
      const frameSize = 280;
      ctx.strokeRect(centerX - frameSize, centerY - frameSize, frameSize * 2, frameSize * 2);

      // Draw diagonal lines from corners
      ctx.beginPath();
      ctx.moveTo(centerX - frameSize, centerY - frameSize);
      ctx.lineTo(centerX - 170, centerY - 170);
      ctx.moveTo(centerX + frameSize, centerY - frameSize);
      ctx.lineTo(centerX + 170, centerY - 170);
      ctx.moveTo(centerX - frameSize, centerY + frameSize);
      ctx.lineTo(centerX - 170, centerY + 170);
      ctx.moveTo(centerX + frameSize, centerY + frameSize);
      ctx.lineTo(centerX + 170, centerY + 170);
      ctx.stroke();

      // Draw connection lines from hexagon
      const directions = [
        { x: 0, y: -1 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: -0.7, y: -0.7 },
        { x: 0.7, y: -0.7 },
        { x: -0.7, y: 0.7 },
        { x: 0.7, y: 0.7 },
      ];

      directions.forEach((dir) => {
        const startDist = 210;
        const endDist = Math.min(width, height) * 0.45;
        ctx.beginPath();
        ctx.moveTo(centerX + dir.x * startDist, centerY + dir.y * startDist);
        ctx.lineTo(centerX + dir.x * endDist, centerY + dir.y * endDist);
        ctx.stroke();
      });

      // Draw corner technical elements
      drawTechnicalElement(ctx, 80, 80, strokeOpacity);
      drawTechnicalElement(ctx, width - 80, 80, strokeOpacity);
      drawTechnicalElement(ctx, 80, height - 80, strokeOpacity);
      drawTechnicalElement(ctx, width - 80, height - 80, strokeOpacity);

      // Draw side control panels
      ctx.globalAlpha = strokeOpacity;
      drawControlPanel(ctx, width - 100, centerY - 150, 60, 300);
      drawControlPanel(ctx, 100, centerY - 100, 50, 200);

      // Draw measurement markers
      drawMeasurementLine(ctx, centerX - 300, height - 50, 600, true);
      drawMeasurementLine(ctx, 50, centerY - 200, 400, false);

      // === NEW: Title blocks, text annotations, specs ===

      const leftPanelX = 50;
      const rightPanelX = width - 50;

      // TOP LEFT - Title block
      ctx.globalAlpha = strokeOpacity * 0.8;
      ctx.lineWidth = 1;
      drawTitleBlock(ctx, leftPanelX, 50, 180, 120);
      drawText(ctx, leftPanelX + 10, 70, 'SCHEMATIC', 12);
      drawText(ctx, leftPanelX + 10, 88, 'REV. 2.4.1', 9);
      drawText(ctx, leftPanelX + 10, 105, 'DWG NO.', 8);
      drawText(ctx, leftPanelX + 60, 105, 'A-7742-01', 8);
      drawText(ctx, leftPanelX + 10, 122, 'SCALE', 8);
      drawText(ctx, leftPanelX + 60, 122, '1:100', 8);
      drawText(ctx, leftPanelX + 10, 139, 'DATE', 8);
      drawText(ctx, leftPanelX + 60, 139, '01.29.26', 8);

      // TOP RIGHT - Title block
      drawTitleBlock(ctx, rightPanelX - 180, 50, 180, 120);
      drawText(ctx, rightPanelX - 170, 70, 'SYSTEM', 12);
      drawText(ctx, rightPanelX - 170, 88, 'CORE MODULE', 9);
      drawText(ctx, rightPanelX - 170, 105, 'SHEET', 8);
      drawText(ctx, rightPanelX - 110, 105, '1 OF 12', 8);
      drawText(ctx, rightPanelX - 170, 122, 'ZONE', 8);
      drawText(ctx, rightPanelX - 110, 122, 'A-4', 8);
      drawText(ctx, rightPanelX - 170, 139, 'APPROVED', 8);
      drawText(ctx, rightPanelX - 110, 139, 'J.DOE', 8);

      // LEFT SIDE - Component list
      ctx.globalAlpha = strokeOpacity * 0.7;
      const compListY = 200;
      drawText(ctx, leftPanelX, compListY, 'COMPONENT LIST', 10);
      ctx.beginPath();
      ctx.moveTo(leftPanelX, compListY + 5);
      ctx.lineTo(leftPanelX + 140, compListY + 5);
      ctx.stroke();

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

      components.forEach((comp, i) => {
        const y = compListY + 25 + i * 22;
        drawText(ctx, leftPanelX, y, comp.id, 8);
        drawText(ctx, leftPanelX + 35, y, comp.name, 7);
        drawText(ctx, leftPanelX + 100, y, comp.val, 7);
        if (i % 3 === 0) drawCircle(ctx, leftPanelX + 130, y - 3, 4, false);
        else if (i % 3 === 1) ctx.strokeRect(leftPanelX + 126, y - 6, 8, 6);
        else drawTriangle(ctx, leftPanelX + 130, y - 3, 5);
      });

      // LEFT SIDE - Dimension annotations
      ctx.globalAlpha = strokeOpacity * 0.6;
      const dimY = compListY + 220;
      drawText(ctx, leftPanelX, dimY, 'DIMENSIONS (mm)', 10);
      ctx.beginPath();
      ctx.moveTo(leftPanelX, dimY + 5);
      ctx.lineTo(leftPanelX + 130, dimY + 5);
      ctx.stroke();

      drawDimensionLine(ctx, leftPanelX, dimY + 25, 120, true, '245.00');
      drawDimensionLine(ctx, leftPanelX, dimY + 55, 90, true, '182.50');
      drawDimensionLine(ctx, leftPanelX, dimY + 85, 60, true, '96.75');
      drawDimensionLine(ctx, leftPanelX + 140, dimY + 25, 150, false, '312.00');

      // LEFT SIDE - Notes section
      const notesY = dimY + 200;
      drawText(ctx, leftPanelX, notesY, 'NOTES:', 10);
      ctx.beginPath();
      ctx.moveTo(leftPanelX, notesY + 5);
      ctx.lineTo(leftPanelX + 80, notesY + 5);
      ctx.stroke();

      const notes = [
        '1. ALL DIMS IN MM',
        '2. TOLERANCE +/-0.5',
        '3. FINISH: MATTE',
        '4. MATERIAL: AL6061',
        '5. BREAK EDGES',
      ];
      notes.forEach((note, i) => {
        drawText(ctx, leftPanelX, notesY + 20 + i * 16, note, 7);
      });

      // RIGHT SIDE - Specifications
      ctx.globalAlpha = strokeOpacity * 0.7;
      const specY = 200;
      drawText(ctx, rightPanelX - 150, specY, 'SPECIFICATIONS', 10);
      ctx.beginPath();
      ctx.moveTo(rightPanelX - 150, specY + 5);
      ctx.lineTo(rightPanelX - 10, specY + 5);
      ctx.stroke();

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

      specs.forEach((spec, i) => {
        const y = specY + 25 + i * 22;
        drawText(ctx, rightPanelX - 150, y, spec.label, 7);
        drawText(ctx, rightPanelX - 80, y, spec.value, 8);
      });

      // RIGHT SIDE - Reference designators
      const refY = specY + 220;
      drawText(ctx, rightPanelX - 150, refY, 'REF DESIGNATORS', 10);
      ctx.beginPath();
      ctx.moveTo(rightPanelX - 150, refY + 5);
      ctx.lineTo(rightPanelX - 10, refY + 5);
      ctx.stroke();

      const refs = ['A1', 'B2', 'C3', 'D4', 'E5', 'F6'];
      refs.forEach((ref, i) => {
        const rx = rightPanelX - 150 + (i % 3) * 50;
        const ry = refY + 25 + Math.floor(i / 3) * 30;
        drawCircle(ctx, rx + 10, ry, 10, false);
        drawText(ctx, rx + 5, ry + 4, ref, 8);
      });

      // RIGHT SIDE - Coordinate system
      const coordY = refY + 100;
      drawText(ctx, rightPanelX - 150, coordY, 'COORDINATES', 10);
      ctx.beginPath();
      ctx.moveTo(rightPanelX - 150, coordY + 5);
      ctx.lineTo(rightPanelX - 50, coordY + 5);
      ctx.stroke();

      ctx.globalAlpha = strokeOpacity * 0.8;
      const arrowX = rightPanelX - 100;
      const arrowY = coordY + 50;
      // X axis
      ctx.beginPath();
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(arrowX + 50, arrowY);
      ctx.moveTo(arrowX + 45, arrowY - 4);
      ctx.lineTo(arrowX + 50, arrowY);
      ctx.lineTo(arrowX + 45, arrowY + 4);
      ctx.stroke();
      drawText(ctx, arrowX + 55, arrowY + 3, 'X', 8);
      // Y axis
      ctx.beginPath();
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(arrowX, arrowY - 50);
      ctx.moveTo(arrowX - 4, arrowY - 45);
      ctx.lineTo(arrowX, arrowY - 50);
      ctx.lineTo(arrowX + 4, arrowY - 45);
      ctx.stroke();
      drawText(ctx, arrowX - 3, arrowY - 55, 'Y', 8);
      drawText(ctx, arrowX - 5, arrowY + 15, 'ORIGIN: 0,0,0', 7);

      // BOTTOM LEFT - Revision table
      ctx.globalAlpha = strokeOpacity * 0.7;
      const revTableY = height - 120;
      drawText(ctx, leftPanelX, revTableY, 'REVISION HISTORY', 10);
      ctx.beginPath();
      ctx.moveTo(leftPanelX, revTableY + 5);
      ctx.lineTo(leftPanelX + 200, revTableY + 5);
      ctx.stroke();

      const revisions = [
        { rev: 'A', date: '01.15.26', desc: 'INITIAL RELEASE' },
        { rev: 'B', date: '01.22.26', desc: 'UPDATED DIMS' },
        { rev: 'C', date: '01.29.26', desc: 'ADDED NOTES' },
      ];

      drawText(ctx, leftPanelX, revTableY + 20, 'REV', 7);
      drawText(ctx, leftPanelX + 30, revTableY + 20, 'DATE', 7);
      drawText(ctx, leftPanelX + 90, revTableY + 20, 'DESCRIPTION', 7);
      ctx.beginPath();
      ctx.moveTo(leftPanelX, revTableY + 25);
      ctx.lineTo(leftPanelX + 200, revTableY + 25);
      ctx.stroke();

      revisions.forEach((rev, i) => {
        const y = revTableY + 40 + i * 18;
        drawText(ctx, leftPanelX, y, rev.rev, 7);
        drawText(ctx, leftPanelX + 30, y, rev.date, 7);
        drawText(ctx, leftPanelX + 90, y, rev.desc, 7);
      });

      // BOTTOM RIGHT - Approval block
      const approvalX = rightPanelX - 200;
      drawText(ctx, approvalX, revTableY, 'APPROVALS', 10);
      ctx.beginPath();
      ctx.moveTo(approvalX, revTableY + 5);
      ctx.lineTo(approvalX + 180, revTableY + 5);
      ctx.stroke();

      drawText(ctx, approvalX, revTableY + 25, 'DRAWN', 7);
      drawText(ctx, approvalX + 60, revTableY + 25, 'J. SMITH', 7);
      drawText(ctx, approvalX + 130, revTableY + 25, '01.10.26', 7);

      drawText(ctx, approvalX, revTableY + 43, 'CHECKED', 7);
      drawText(ctx, approvalX + 60, revTableY + 43, 'M. JONES', 7);
      drawText(ctx, approvalX + 130, revTableY + 43, '01.15.26', 7);

      drawText(ctx, approvalX, revTableY + 61, 'APPROVED', 7);
      drawText(ctx, approvalX + 60, revTableY + 61, 'R. DAVIS', 7);
      drawText(ctx, approvalX + 130, revTableY + 61, '01.20.26', 7);

      // Zone markers along edges
      ctx.globalAlpha = strokeOpacity * 0.5;
      const zones = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
      const zoneSpacing = (width - 100) / zones.length;
      zones.forEach((zone, i) => {
        const zx = 50 + zoneSpacing * i + zoneSpacing / 2;
        drawText(ctx, zx - 4, 40, zone, 10);
        drawText(ctx, zx - 4, height - 32, zone, 10);
      });

      const numZones = ['1', '2', '3', '4', '5', '6'];
      const numSpacing = (height - 100) / numZones.length;
      numZones.forEach((num, i) => {
        const zy = 50 + numSpacing * i + numSpacing / 2;
        drawText(ctx, 32, zy + 4, num, 10);
        drawText(ctx, width - 40, zy + 4, num, 10);
      });

      // Technical callouts pointing to center
      ctx.globalAlpha = strokeOpacity * 0.6;
      drawCallout(ctx, centerX - 180, centerY - 100, centerX - 250, centerY - 180, 'DETAIL A', 'SEE DWG A-7742-02');
      drawCallout(ctx, centerX + 180, centerY - 100, centerX + 250, centerY - 180, 'SECTION B-B', 'SCALE 2:1');
      drawCallout(ctx, centerX + 150, centerY + 120, centerX + 280, centerY + 200, 'NOTE 3', 'TYP. 6 PLACES');
      drawCallout(ctx, centerX - 150, centerY + 100, centerX - 280, centerY + 180, 'REF C1', '100uF 16V');

      // Scattered technical markers
      ctx.globalAlpha = strokeOpacity * 0.4;
      for (let i = 0; i < 30; i++) {
        const mx = seededRandom() * (width - 400) + 200;
        const my = seededRandom() * (height - 300) + 150;
        const dist = Math.sqrt((mx - centerX) ** 2 + (my - centerY) ** 2);
        if (dist > 280 && dist < 400) {
          const marker = Math.floor(seededRandom() * 20) + 1;
          drawCircle(ctx, mx, my, 8, false);
          drawText(ctx, mx - 4, my + 3, marker.toString(), 7);
        }
      }

      // Dashed connection lines from side panels to center
      ctx.globalAlpha = strokeOpacity * 0.2;
      ctx.setLineDash([3, 6]);
      ctx.beginPath();
      ctx.moveTo(leftPanelX + 150, compListY + 100);
      ctx.lineTo(centerX - frameSize, centerY);
      ctx.moveTo(rightPanelX - 150, specY + 100);
      ctx.lineTo(centerX + frameSize, centerY);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const drawHexagon = (
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      size: number,
    ) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        const hx = cx + size * Math.cos(angle);
        const hy = cy + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.stroke();
    };

    const drawCircle = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      radius: number,
      filled: boolean,
    ) => {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      if (filled) ctx.fill();
      else ctx.stroke();
    };

    const drawTriangle = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
    ) => {
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x - size, y + size);
      ctx.lineTo(x + size, y + size);
      ctx.closePath();
      ctx.stroke();
    };

    const drawText = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      text: string,
      size: number,
    ) => {
      ctx.font = `${size}px "Courier New", monospace`;
      ctx.fillText(text, x, y);
    };

    const drawTechnicalElement = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      opacity: number,
    ) => {
      ctx.globalAlpha = opacity;
      drawCircle(ctx, x, y, 30, false);
      drawCircle(ctx, x, y, 20, false);
      drawCircle(ctx, x, y, 5, true);

      // Cross lines
      ctx.beginPath();
      ctx.moveTo(x - 35, y);
      ctx.lineTo(x - 45, y);
      ctx.moveTo(x + 35, y);
      ctx.lineTo(x + 45, y);
      ctx.moveTo(x, y - 35);
      ctx.lineTo(x, y - 45);
      ctx.moveTo(x, y + 35);
      ctx.lineTo(x, y + 45);
      ctx.stroke();
    };

    const drawControlPanel = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
    ) => {
      ctx.strokeRect(x - w / 2, y, w, h);

      // Inner elements
      const padding = 10;
      const innerWidth = w - padding * 2;

      // Small circles
      for (let i = 0; i < 3; i++) {
        drawCircle(ctx, x, y + 30 + i * 40, 8, false);
        drawCircle(ctx, x, y + 30 + i * 40, 3, true);
      }

      // Small rectangles
      ctx.strokeRect(x - innerWidth / 2, y + h - 80, innerWidth, 20);
      ctx.strokeRect(x - innerWidth / 2, y + h - 50, innerWidth, 30);
    };

    const drawMeasurementLine = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      length: number,
      horizontal: boolean,
    ) => {
      ctx.beginPath();
      if (horizontal) {
        ctx.moveTo(x, y);
        ctx.lineTo(x + length, y);
        ctx.moveTo(x, y - 5);
        ctx.lineTo(x, y + 5);
        ctx.moveTo(x + length, y - 5);
        ctx.lineTo(x + length, y + 5);
        for (let i = 0; i <= length; i += 20) {
          const tickHeight = i % 100 === 0 ? 8 : 4;
          ctx.moveTo(x + i, y - tickHeight);
          ctx.lineTo(x + i, y + tickHeight);
        }
      } else {
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + length);
        ctx.moveTo(x - 5, y);
        ctx.lineTo(x + 5, y);
        ctx.moveTo(x - 5, y + length);
        ctx.lineTo(x + 5, y + length);
        for (let i = 0; i <= length; i += 20) {
          const tickWidth = i % 100 === 0 ? 8 : 4;
          ctx.moveTo(x - tickWidth, y + i);
          ctx.lineTo(x + tickWidth, y + i);
        }
      }
      ctx.stroke();
    };

    const drawTitleBlock = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
    ) => {
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x, y, w, h);
      ctx.lineWidth = 0.5;
      ctx.strokeRect(x + 3, y + 3, w - 6, h - 6);
      ctx.beginPath();
      ctx.moveTo(x, y + 30);
      ctx.lineTo(x + w, y + 30);
      ctx.moveTo(x, y + 50);
      ctx.lineTo(x + w, y + 50);
      ctx.moveTo(x, y + 70);
      ctx.lineTo(x + w, y + 70);
      ctx.moveTo(x, y + 90);
      ctx.lineTo(x + w, y + 90);
      ctx.moveTo(x + 50, y + 50);
      ctx.lineTo(x + 50, y + h);
      ctx.stroke();
    };

    const drawDimensionLine = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      length: number,
      horizontal: boolean,
      value: string,
    ) => {
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      if (horizontal) {
        ctx.moveTo(x, y);
        ctx.lineTo(x + length, y);
        ctx.moveTo(x, y - 4);
        ctx.lineTo(x + 6, y);
        ctx.lineTo(x, y + 4);
        ctx.moveTo(x + length, y - 4);
        ctx.lineTo(x + length - 6, y);
        ctx.lineTo(x + length, y + 4);
        ctx.stroke();
        drawText(ctx, x + length / 2 - 15, y - 6, value, 7);
      } else {
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + length);
        ctx.moveTo(x - 4, y);
        ctx.lineTo(x, y + 6);
        ctx.lineTo(x + 4, y);
        ctx.moveTo(x - 4, y + length);
        ctx.lineTo(x, y + length - 6);
        ctx.lineTo(x + 4, y + length);
        ctx.stroke();
        drawText(ctx, x + 6, y + length / 2, value, 7);
      }
    };

    const drawCallout = (
      ctx: CanvasRenderingContext2D,
      startX: number,
      startY: number,
      endX: number,
      endY: number,
      title: string,
      desc: string,
    ) => {
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      drawCircle(ctx, startX, startY, 3, true);
      drawText(ctx, endX + 5, endY, title, 8);
      drawText(ctx, endX + 5, endY + 12, desc, 7);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
