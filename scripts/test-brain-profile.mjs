import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Brain Test Profile Refined</title>
  <style>
    body { margin: 0; background: #07070a; overflow: hidden; display: flex; align-items: center; justify-content: center; height: 100vh; }
    canvas { width: 1000px; height: 750px; }
  </style>
</head>
<body>
  <canvas id="canvas" width="2000" height="1500"></canvas>
  <script type="module">
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const width = 1000;
    const height = 750;
    const dpr = 2;
    ctx.scale(dpr, dpr);

    const COLOR_AMBER = '#ffb829';
    const COLOR_GOLD = '#fbbf24';
    const COLOR_VIOLET = '#8052ff';
    const COLOR_PURPLE = '#9333ea';
    const COLOR_MAGENTA = '#c084fc';
    const COLOR_TEAL = '#15846e';
    const COLOR_CYAN = '#38bdf8';
    const COLOR_EMERALD = '#10b981';
    const COLOR_WHITE = '#ffffff';

    function generateTrueAnatomicalBrain(count = 2500, scale = 275) {
      const points = [];

      for (let i = 0; i < count; i++) {
        const p = i / count;

        // 1. Brainstem (جذع الدماغ والجسر المخي) ~9%
        if (p < 0.09) {
          const t = p / 0.09;
          const a = Math.random() * Math.PI * 2;
          // Pons bulge at upper stem (t < 0.35)
          const pons = t < 0.35 ? 0.04 * Math.sin(t / 0.35 * Math.PI) : 0;
          const r = (0.12 - t * 0.045 + pons) * (0.6 + 0.4 * Math.random());
          const x = r * Math.cos(a) * 0.85;
          const y = 0.26 + t * 0.44;
          const z = -0.08 + r * Math.sin(a);
          points.push({
            x: x * scale,
            y: y * scale,
            z: z * scale,
            zone: 'stem',
            normY: y,
            tilt: Math.random() * Math.PI * 2
          });
          continue;
        }

        // 2. Cerebellum (المخيخ) with foliate ridges ~21%
        if (p < 0.30) {
          const u = Math.random();
          const v = Math.random();
          const a = u * Math.PI * 2;
          const r = Math.sqrt(v);

          const cx = 0;
          const cy = 0.31;
          const cz = -0.48;

          const rx = 0.42 * r;
          const ry = 0.24 * (Math.random() * 0.9 + 0.1);
          const rz = 0.32 * Math.sqrt(Math.max(0, 1 - (ry / 0.24) ** 2));

          const x = cx + rx * Math.cos(a);
          let y = cy + ry * (Math.random() > 0.5 ? 1 : -1);
          const z = cz + rz * Math.sin(a);

          // Horizontal foliate ridges (striations)
          y += Math.sin(y * 42) * 0.016;

          points.push({
            x: x * scale,
            y: y * scale,
            z: z * scale,
            zone: 'cerebellum',
            normY: y,
            tilt: Math.random() * Math.PI * 2
          });
          continue;
        }

        // 3. Cerebral Cortex & Lobes ~70%
        let valid = false;
        let x, y, z, zone;

        for (let attempt = 0; attempt < 60; attempt++) {
          z = (Math.random() * 2 - 1) * 0.96;
          y = (Math.random() * 1.35) - 0.90;
          const hemisphere = Math.random() > 0.5 ? 1 : -1;
          const xMax = 0.68 * Math.sqrt(Math.max(0, 1 - (z / 1.0) ** 2)) * Math.sqrt(Math.max(0, 1 - ((y + 0.25) / 0.75) ** 2));
          x = (Math.random() * 0.82 + 0.18) * xMax * hemisphere;

          // Upper coronal dome
          const yTop = -0.86 * Math.sqrt(Math.max(0, 1 - (z / 1.06) ** 2));
          if (y < yTop) continue;

          // Bottom contours
          let yBottom = 0.24;
          if (z > 0.15) {
            // Frontal pole curve
            yBottom = 0.16 + (1 - z) * 0.18;
          }
          if (z >= -0.15 && z <= 0.55) {
            // Temporal lobe bulge
            yBottom = 0.38 - Math.abs(z - 0.2) * 0.14;
          }
          if (z < -0.15) {
            // Cerebellar notch indent
            yBottom = 0.12 - (z + 0.15) * 0.09;
          }

          if (y > yBottom) continue;

          // Intricate gyri & sulci convolutions (multi-frequency cortical folds)
          const foldFreq = 16.0;
          const g1 = Math.sin(foldFreq * z) * Math.cos(foldFreq * y) * Math.sin(12.0 * x) * 0.045;
          const g2 = Math.cos(24.0 * z + 12.0 * y) * 0.020;
          const gyri = g1 + g2;
          x += gyri;
          y += gyri * 0.75;
          z += gyri * 0.75;

          // Longitudinal medial fissure between hemispheres
          if (Math.abs(x) < 0.075) {
            x *= 0.65;
            y += (0.075 - Math.abs(x)) * 0.35;
          }

          // Zone classification
          if (y < -0.22) zone = 'crown';
          else if (z > 0.30) zone = 'frontal';
          else if (z < -0.35) zone = 'occipital';
          else if (y > 0.08) zone = 'temporal';
          else zone = 'parietal';

          valid = true;
          break;
        }

        if (valid) {
          points.push({
            x: x * scale,
            y: y * scale,
            z: z * scale,
            zone,
            normY: y,
            tilt: Math.random() * Math.PI * 2
          });
        }
      }

      return points;
    }

    // 3D wireframe pyramids
    function createWireframes(count = 28) {
      const frames = [];
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.3;
        const dist = 320 + Math.random() * 210;
        const x = Math.cos(angle) * dist * 1.30;
        const y = Math.sin(angle) * dist * 0.88;
        const z = (Math.random() - 0.5) * 360;
        const size = Math.random() * 26 + 14;
        const isAmber = i % 3 === 0;
        const isTeal = i % 3 === 1;
        const color = isAmber ? COLOR_AMBER : (isTeal ? COLOR_TEAL : COLOR_VIOLET);
        frames.push({ x, y, z, size, color });
      }
      return frames;
    }

    const points = generateTrueAnatomicalBrain(2600, 275);
    const wireframes = createWireframes(28);

    const rotX = 0.08;
    const rotY = 1.57;

    const cx = width * 0.5;
    const cy = height * 0.5;

    const renderList = [];
    for (const pt of points) {
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = pt.x * cosY - pt.z * sinY;
      const z1 = pt.z * cosY + pt.x * sinY;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y2 = pt.y * cosX - z1 * sinX;
      const z2 = z1 * cosX + pt.y * sinX;

      const fov = 520;
      const scale = fov / (fov + z2 + 280);
      const projX = cx + x1 * scale;
      const projY = cy + y2 * scale;
      const projSize = Math.max(0.8, (pt.zone === 'cerebellum' ? 2.1 : 2.5) * scale);

      // Chromatic gradient matching Dala image
      let color = COLOR_VIOLET;
      const ny = pt.normY;

      if (ny < -0.45) {
        // Pure Saffron Amber crown
        color = Math.random() > 0.2 ? COLOR_AMBER : COLOR_GOLD;
      } else if (ny < -0.15) {
        // Amber transition into Magenta
        const rVal = Math.random();
        if (rVal < 0.55) color = COLOR_AMBER;
        else if (rVal < 0.85) color = COLOR_GOLD;
        else color = COLOR_MAGENTA;
      } else if (pt.zone === 'cerebellum') {
        // Deep Verdant Teal & Emerald
        color = Math.random() > 0.35 ? COLOR_TEAL : COLOR_EMERALD;
      } else if (pt.zone === 'stem') {
        // Cyber Cyan stalk
        color = Math.random() > 0.4 ? COLOR_CYAN : COLOR_TEAL;
      } else if (ny > 0.18) {
        // Lower lobes transition towards teal
        color = Math.random() > 0.45 ? COLOR_PURPLE : COLOR_TEAL;
      } else {
        // Core lobes: Electric Iris & Magenta
        color = Math.random() > 0.4 ? COLOR_VIOLET : (Math.random() > 0.5 ? COLOR_PURPLE : COLOR_MAGENTA);
      }

      // 3.5% crisp white synaptic sparks
      const isSparkle = Math.random() < 0.035;
      if (isSparkle) color = COLOR_WHITE;

      renderList.push({
        projX,
        projY,
        projSize,
        z: z2,
        color,
        isSparkle,
        tilt: pt.tilt,
        zone: pt.zone
      });
    }

    renderList.sort((a, b) => a.z - b.z);

    // Draw background wireframes
    for (const w of wireframes) {
      if (w.z < 0) drawWireframe(w);
    }

    // Synaptic connections (subtle delicate lines)
    ctx.lineWidth = 0.6;
    for (let i = 0; i < renderList.length; i += 2) {
      const p1 = renderList[i];
      if (p1.z < -40) continue;
      for (let j = i + 1; j < Math.min(i + 5, renderList.length); j++) {
        const p2 = renderList[j];
        const dx = p1.projX - p2.projX;
        const dy = p1.projY - p2.projY;
        const dSq = dx * dx + dy * dy;
        if (dSq < 440) {
          const d = Math.sqrt(dSq);
          ctx.beginPath();
          ctx.strokeStyle = p1.zone === 'cerebellum' || p1.zone === 'stem' ? COLOR_TEAL : COLOR_VIOLET;
          ctx.globalAlpha = (1 - d / 20.9) * 0.22;
          ctx.moveTo(p1.projX, p1.projY);
          ctx.lineTo(p2.projX, p2.projY);
          ctx.stroke();
        }
      }
    }

    // Draw chromatic triangular glyphs
    for (const p of renderList) {
      ctx.save();
      ctx.translate(p.projX, p.projY);
      ctx.rotate(p.tilt);
      const s = p.projSize;

      ctx.strokeStyle = p.color;
      ctx.lineWidth = p.isSparkle ? 1.4 : 1.0;
      ctx.globalAlpha = p.isSparkle ? 1.0 : Math.min(1, Math.max(0.24, (p.z + 280) / 560));

      if (p.isSparkle) {
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 9;
      }

      ctx.beginPath();
      ctx.moveTo(0, -s * 1.15);
      ctx.lineTo(s, s * 0.7);
      ctx.lineTo(-s, s * 0.7);
      ctx.closePath();
      ctx.stroke();

      if (p.isSparkle || s > 2.3) {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.88;
        ctx.beginPath();
        ctx.arc(0, 0, Math.max(0.6, s * 0.35), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    // Draw foreground wireframes
    for (const w of wireframes) {
      if (w.z >= 0) drawWireframe(w);
    }

    function drawWireframe(w) {
      ctx.save();
      const scale = 520 / (520 + w.z + 280);
      const wx = cx + w.x * scale;
      const wy = cy + w.y * scale;
      const ws = w.size * scale;

      ctx.strokeStyle = w.color;
      ctx.globalAlpha = Math.min(0.65, Math.max(0.18, (w.z + 320) / 640));
      ctx.lineWidth = 1.2;

      ctx.beginPath();
      ctx.moveTo(wx, wy - ws);
      ctx.lineTo(wx + ws, wy + ws * 0.7);
      ctx.lineTo(wx - ws, wy + ws * 0.7);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(wx, wy - ws);
      ctx.lineTo(wx, wy + ws * 0.2);
      ctx.lineTo(wx + ws, wy + ws * 0.7);
      ctx.moveTo(wx, wy + ws * 0.2);
      ctx.lineTo(wx - ws, wy + ws * 0.7);
      ctx.stroke();

      ctx.restore();
    }
  </script>
</body>
</html>
`;

fs.writeFileSync('temp_brain_test.html', testHtml, 'utf8');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 750 });
  await page.goto('file://' + path.resolve('temp_brain_test.html'), { waitUntil: 'load' });
  await new Promise((r) => setTimeout(r, 600));

  await page.screenshot({ path: 'screenshots/temp-brain-render-3.png', fullPage: false });
  console.log('Saved temp-brain-render-3.png');

  await browser.close();
  fs.unlinkSync('temp_brain_test.html');
})();
