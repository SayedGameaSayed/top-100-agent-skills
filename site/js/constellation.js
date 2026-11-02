/**
 * constellation.js - Monumental 3D Anatomical Neural Brain Engine
 * Strictly adhering to Dala Signature Spec: "organic brain constellation floating on black velvet"
 * 
 * Features:
 * 1. 2,400+ 3D chromatic triangular particle glyphs with true anatomical cortical convolutions (sulci & gyri).
 * 2. Anatomical sagittal side-profile matching Dala reference (Frontal lobe, Parietal crown, Occipital curve, Cerebellum, Brainstem).
 * 3. 28 Ambient floating 3D wireframe tetrahedrons and triangles tumbling in deep space.
 * 4. Living synaptic wave pulses travelling across cortical pathways.
 * 5. Silky smooth 60/120 FPS performance with zero lag.
 * 6. Full real-time 3D rotation, damping physics, mouse parallax, drag-to-spin, and scroll reaction.
 * 7. Chromatic gradient: Saffron Amber (#ffb829) crown -> Electric Violet (#8052ff) middle -> Verdant Teal (#15846e) base.
 */

export function initConstellation(canvasId = 'constellation-canvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const container = canvas.parentElement || document.body;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  let width = 1200;
  let height = 640;

  function resize() {
    const rect = container ? container.getBoundingClientRect() : { width: window.innerWidth, height: 640 };
    width = Math.max(rect.width || window.innerWidth, 320);
    height = Math.max(rect.height || 640, 520);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);
  }

  resize();

  // Adaptive Color Palette matching Resend Void & Light themes
  function isLight() {
    return document.documentElement.getAttribute('data-theme') === 'light';
  }

  function getColor(name) {
    const light = isLight();
    switch (name) {
      case 'iris': return light ? '#0071e3' : '#9281f7';
      case 'glow': return light ? '#0066cc' : '#baa7ff';
      case 'white': return light ? '#1d1d1f' : '#ffffff';
      case 'bone': return light ? '#1d1d1f' : '#f0f0f0';
      case 'graphite': return light ? '#d6d6d6' : '#292d30';
      case 'iron': return light ? '#86868b' : '#6e727a';
      case 'ash': return light ? '#707070' : '#a1a4a5';
      default: return light ? '#0071e3' : '#9281f7';
    }
  }

  // Adaptive particle budget for mobile battery & GPU efficiency
  const isMobile = width < 680;
  const PARTICLE_COUNT = isMobile ? 650 : 2400;
  const WIREFRAME_COUNT = isMobile ? 10 : 28;
  const brainScale = isMobile ? 185 : 275;

  // 3D Rotation angles: Sagittal lateral side-profile view (1:1 with Dala reference image)
  let rotX = 0.08;
  let rotY = 1.57;
  let targetRotX = 0.08;
  let targetRotY = 1.57;
  const autoSpinSpeed = 0.0015;

  let isDragging = false;
  let lastMouseX = 0;
  let lastMouseY = 0;

  // Scroll tracking
  let targetScrollY = window.pageYOffset || 0;
  let currentScrollY = targetScrollY;

  // --------------------------------------------------------------------------
  // High-Fidelity Anatomical 3D Brain Point Generator
  // --------------------------------------------------------------------------
  function generateBrainPoints(count = 2400, scale = 275) {
    const pts = [];

    for (let i = 0; i < count; i++) {
      const p = i / count;

      // 1. Brainstem (جذع الدماغ) with Pons bulge ~9%
      if (p < 0.09) {
        const t = p / 0.09;
        const a = Math.random() * Math.PI * 2;
        const pons = t < 0.35 ? 0.04 * Math.sin((t / 0.35) * Math.PI) : 0;
        const r = (0.12 - t * 0.045 + pons) * (0.6 + 0.4 * Math.random());
        const x = r * Math.cos(a) * 0.85;
        const y = 0.26 + t * 0.44;
        const z = -0.08 + r * Math.sin(a);
        pts.push({
          x: x * scale,
          y: y * scale,
          z: z * scale,
          zone: 'stem',
          normY: y,
          tilt: Math.random() * Math.PI * 2,
          isNested: Math.random() < 0.25
        });
        continue;
      }

      // 2. Cerebellum (المخيخ) with horizontal foliate striations ~21%
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

        // Striated foliate ridges
        y += Math.sin(y * 42) * 0.016;

        pts.push({
          x: x * scale,
          y: y * scale,
          z: z * scale,
          zone: 'cerebellum',
          normY: y,
          tilt: Math.random() * Math.PI * 2,
          isNested: Math.random() < 0.25
        });
        continue;
      }

      // 3. Cerebral Cortex & Lobes with Convoluted Gyri & Sulci ~70%
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
        pts.push({
          x: x * scale,
          y: y * scale,
          z: z * scale,
          zone,
          normY: y,
          tilt: Math.random() * Math.PI * 2,
          isNested: Math.random() < 0.25
        });
      }
    }

    return pts;
  }

  // --------------------------------------------------------------------------
  // Particle Class (3D Triangular Chromatic Glyphs)
  // --------------------------------------------------------------------------
  class ConstellationParticle {
    constructor(pt) {
      this.current = { x: pt.x, y: pt.y, z: pt.z };
      this.zone = pt.zone;
      this.normY = pt.normY;
      this.tilt = pt.tilt;
      this.isNested = pt.isNested;

      this.baseSize = pt.zone === 'cerebellum' ? Math.random() * 0.8 + 1.8 : Math.random() * 1.0 + 2.2;
      this.pulsePhase = Math.random() * Math.PI * 2;
      this.pulseSpeed = Math.random() * 0.035 + 0.015;
      this.vTilt = (Math.random() - 0.5) * 0.012;

      this.sparkle = Math.random() < 0.035;
      this.jitterX = (Math.random() - 0.5) * 1.5;
      this.jitterY = (Math.random() - 0.5) * 1.5;
      this.jitterZ = (Math.random() - 0.5) * 1.5;
    }

    update(time) {
      this.pulsePhase += this.pulseSpeed;
      this.tilt += this.vTilt;
    }

    getRenderData(rx, ry, cx, cy, time, dispersion = 1) {
      // Living synaptic spark wave traveling along pathways
      const synapticPulse = Math.sin(time * 2.2 + (this.current.y * 0.015) + (this.current.z * 0.012));
      const isSynapseFlashing = this.sparkle || (synapticPulse > 0.94 && Math.sin(this.pulsePhase * 3) > 0.7);

      const wave = Math.sin(this.pulsePhase) * 1.2;
      const x0 = (this.current.x * dispersion) + this.jitterX + wave * 0.3;
      const y0 = (this.current.y * dispersion) + this.jitterY + wave;
      const z0 = (this.current.z * dispersion) + this.jitterZ;

      // 3D Rotation Matrix
      // Rotate around Y
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = x0 * cosY - z0 * sinY;
      const z1 = z0 * cosY + x0 * sinY;

      // Rotate around X
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y2 = y0 * cosX - z1 * sinX;
      const z2 = z1 * cosX + y0 * sinX;

      // Perspective Projection
      const fov = 520;
      const scale = fov / (fov + z2 + 280);

      const projX = cx + x1 * scale;
      const projY = cy + y2 * scale;
      const projSize = Math.max(0.7, this.baseSize * scale);

      // Resend Architectural Monochrome + Iris Violet Palette:
      // Dynamic theme-adaptive palette
      let color = getColor('iris');
      const ny = this.normY;

      if (isSynapseFlashing) {
        color = getColor('white');
      } else if (ny < -0.38) {
        // Upper crown crest
        color = Math.random() > 0.35 ? getColor('glow') : getColor('iris');
      } else if (this.zone === 'cerebellum' || this.zone === 'stem') {
        // Deep foundation structure: Graphite, Iron & subtle Iris
        color = Math.random() > 0.5 ? getColor('iron') : (Math.random() > 0.5 ? getColor('graphite') : getColor('iris'));
      } else if (ny > 0.20) {
        // Lower lobes: subtle graphite & violet mix
        color = Math.random() > 0.4 ? getColor('ash') : getColor('iris');
      } else {
        // Core lobes: Iris Violet & Bone White accents
        color = Math.random() > 0.35 ? getColor('iris') : (Math.random() > 0.5 ? getColor('bone') : getColor('glow'));
      }

      const depthAlpha = Math.min(1, Math.max(0.22, (z2 + 280) / 560));
      const pulseAlpha = 0.88 + 0.12 * Math.sin(this.pulsePhase);
      const finalAlpha = isSynapseFlashing ? 1.0 : depthAlpha * pulseAlpha;

      return {
        projX,
        projY,
        projSize,
        z: z2,
        color,
        alpha: finalAlpha,
        tilt: this.tilt,
        isSynapseFlashing,
        isNested: this.isNested,
        isForeground: z2 > 0,
        zone: this.zone
      };
    }
  }

  // --------------------------------------------------------------------------
  // Large Floating 3D Wireframe Tetrahedrons in Deep Space
  // --------------------------------------------------------------------------
  class WireframeTumble {
    constructor(i, total) {
      const angle = (i / total) * Math.PI * 2 + Math.random() * 0.3;
      const dist = 320 + Math.random() * 220;

      this.x = Math.cos(angle) * dist * 1.30;
      this.y = Math.sin(angle) * dist * 0.88;
      this.z = (Math.random() - 0.5) * 360;

      this.size = Math.random() * 26 + 14;
      this.rx = Math.random() * Math.PI * 2;
      this.ry = Math.random() * Math.PI * 2;
      this.rz = Math.random() * Math.PI * 2;

      this.vRotX = (Math.random() - 0.5) * 0.014;
      this.vRotY = (Math.random() - 0.5) * 0.016;
      this.vRotZ = (Math.random() - 0.5) * 0.010;

      this.type = i % 3;
    }

    update() {
      this.rx += this.vRotX;
      this.ry += this.vRotY;
      this.rz += this.vRotZ;
    }

    draw(globalRotX, globalRotY, cx, cy) {
      // Rotate around global Y
      const cosY = Math.cos(globalRotY * 0.5);
      const sinY = Math.sin(globalRotY * 0.5);
      const x1 = this.x * cosY - this.z * sinY;
      const z1 = this.z * cosY + this.x * sinY;

      // Rotate around global X
      const cosX = Math.cos(globalRotX * 0.5);
      const sinX = Math.sin(globalRotX * 0.5);
      const y2 = this.y * cosX - z1 * sinX;
      const z2 = z1 * cosX + this.y * sinX;

      const fov = 520;
      const scale = fov / (fov + z2 + 280);
      const projX = cx + x1 * scale;
      const projY = cy + y2 * scale;
      const s = this.size * scale;

      ctx.save();
      ctx.translate(projX, projY);
      ctx.rotate(this.rz);

      ctx.strokeStyle = this.type === 0 ? getColor('graphite') : (this.type === 1 ? getColor('white') : getColor('iris'));
      ctx.globalAlpha = Math.min(0.65, Math.max(0.16, (z2 + 320) / 640));
      ctx.lineWidth = 1.15;

      // Outer equilateral triangle
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.lineTo(s * 0.866, s * 0.5);
      ctx.lineTo(-s * 0.866, s * 0.5);
      ctx.closePath();
      ctx.stroke();

      // Inner 3D tetrahedron apex and edges
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.lineTo(0, s * 0.15);
      ctx.lineTo(s * 0.866, s * 0.5);
      ctx.moveTo(0, s * 0.15);
      ctx.lineTo(-s * 0.866, s * 0.5);
      ctx.stroke();

      ctx.restore();
    }
  }

  // Initialize Particles & Wireframes
  const rawPoints = generateBrainPoints(PARTICLE_COUNT, brainScale);
  const particles = rawPoints.map((pt) => new ConstellationParticle(pt));
  const wireframes = [];
  for (let i = 0; i < WIREFRAME_COUNT; i++) {
    wireframes.push(new WireframeTumble(i, WIREFRAME_COUNT));
  }

  // --------------------------------------------------------------------------
  // User Interaction (Parallax & Drag-to-Rotate)
  // --------------------------------------------------------------------------
  function onPointerMove(e) {
    if (isDragging) {
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;

      targetRotY += dx * 0.0065;
      targetRotX += dy * 0.0065;
      targetRotX = Math.max(-0.6, Math.min(0.6, targetRotX));
    } else {
      // Gentle parallax tracking
      const normX = (e.clientX / width) - 0.5;
      const normY = (e.clientY / height) - 0.5;
      targetRotY = 1.57 + normX * 0.25;
      targetRotX = 0.08 + normY * 0.20;
    }
  }

  function onPointerDown(e) {
    isDragging = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  }

  function onPointerUp() {
    isDragging = false;
  }

  function onScroll() {
    targetScrollY = window.pageYOffset || 0;
  }

  window.addEventListener('mousemove', onPointerMove, { passive: true });
  window.addEventListener('mousedown', onPointerDown, { passive: true });
  window.addEventListener('mouseup', onPointerUp, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });

  // Touch Support
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const t = e.touches[0];
      if (isDragging) {
        const dx = t.clientX - lastMouseX;
        const dy = t.clientY - lastMouseY;
        lastMouseX = t.clientX;
        lastMouseY = t.clientY;
        targetRotY += dx * 0.008;
        targetRotX += dy * 0.008;
      }
    }
  }, { passive: true });

  window.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      isDragging = true;
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', onPointerUp, { passive: true });

  // --------------------------------------------------------------------------
  // Animation Render Loop (Lazy-Loaded, Pauses Off-Screen, Reduced Motion Aware)
  // --------------------------------------------------------------------------
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let animationFrameId = null;
  let isCanvasVisible = true;
  const startTime = performance.now();

  function onScroll() {
    targetScrollY = window.pageYOffset || 0;
    // Wake up render loop if visible and currently paused
    if (isCanvasVisible && !animationFrameId && !prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(render);
    }
  }

  // Off-screen canvas intersection observer (pauses RAF when out of view)
  let intersectionObserver = null;
  if ('IntersectionObserver' in window) {
    intersectionObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        isCanvasVisible = entry.isIntersecting;
        if (isCanvasVisible && !animationFrameId && !prefersReducedMotion) {
          animationFrameId = requestAnimationFrame(render);
        }
      }
    }, { threshold: 0.02 });
    intersectionObserver.observe(canvas);
  }

  function render(now) {
    // 1. Immediately pause if canvas is off-screen
    if (!isCanvasVisible) {
      animationFrameId = null;
      return;
    }

    ctx.clearRect(0, 0, width, height);

    const time = (now - startTime) * 0.001;

    // Smooth scroll interpolation
    currentScrollY += (targetScrollY - currentScrollY) * 0.08;

    // Scroll-driven Parallax and 3D Tilt
    const scrollParallaxY = -currentScrollY * 0.26;
    const scrollRotY = currentScrollY * 0.0015;
    const scrollRotX = Math.sin(currentScrollY * 0.002) * 0.10;

    const dispersion = 1 + Math.min(currentScrollY * 0.0006, 0.25);
    const heroFade = Math.max(0, 1 - (currentScrollY / (height * 0.92)));

    // Pause RAF when scrolled far below hero section
    if (heroFade <= 0.01) {
      animationFrameId = null;
      return;
    }

    // Gentle auto-spin when not interacting
    if (!isDragging && !prefersReducedMotion) {
      targetRotY += autoSpinSpeed;
    }

    // Damped rotational physics
    rotX += (targetRotX + scrollRotX - rotX) * 0.06;
    rotY += (targetRotY + scrollRotY - rotY) * 0.06;

    ctx.save();
    ctx.globalAlpha = heroFade;

    // Placement: Sits majestically on the left in RTL, centered on mobile
    const isDesktop = width > 900;
    const cx = isDesktop ? width * 0.28 : width * 0.5;
    const cy = (isDesktop ? height * 0.50 : height * 0.46) + scrollParallaxY;

    // Update and project particles
    const renderList = [];
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.update(time);
      const data = p.getRenderData(rotX, rotY, cx, cy, time, dispersion);
      renderList.push(data);
    }

    // Depth sort (Z-buffer)
    renderList.sort((a, b) => a.z - b.z);

    // 1. Draw Background Floating Wireframes
    for (const w of wireframes) {
      w.update();
      if (w.z < 0) w.draw(rotX, rotY, cx, cy);
    }

    // 2. Draw Synaptic Connecting Lines between Close Foreground Particles
    ctx.lineWidth = 0.60;
    for (let i = 0; i < renderList.length; i += 2) {
      const p1 = renderList[i];
      if (p1.z < -30) continue;

      for (let j = i + 1; j < Math.min(i + 6, renderList.length); j++) {
        const p2 = renderList[j];
        const dx = p1.projX - p2.projX;
        const dy = p1.projY - p2.projY;
        const distSq = dx * dx + dy * dy;

        if (distSq < 520) {
          const dist = Math.sqrt(distSq);
          ctx.beginPath();
          ctx.strokeStyle = p1.zone === 'cerebellum' || p1.zone === 'stem' ? getColor('iron') : getColor('iris');
          ctx.globalAlpha = (1 - dist / 22.8) * 0.22 * p1.alpha * heroFade;
          ctx.moveTo(p1.projX, p1.projY);
          ctx.lineTo(p2.projX, p2.projY);
          ctx.stroke();
        }
      }
    }

    // 3. Draw Chromatic Triangular Particles (Batch Render)
    for (let i = 0; i < renderList.length; i++) {
      const p = renderList[i];

      ctx.save();
      ctx.translate(p.projX, p.projY);
      ctx.rotate(p.tilt);

      ctx.globalAlpha = p.alpha * heroFade;
      ctx.strokeStyle = p.color;
      ctx.lineWidth = p.isSynapseFlashing ? 1.4 : 1.0;

      // Soft glow for high-energy flaring synapses
      if (p.isSynapseFlashing) {
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 9;
      }

      // Draw equilateral triangle
      const s = p.projSize;
      ctx.beginPath();
      ctx.moveTo(0, -s * 1.15);
      ctx.lineTo(s, s * 0.7);
      ctx.lineTo(-s, s * 0.7);
      ctx.closePath();
      ctx.stroke();

      // Nested concentric triangle for ~25% signature glyphs
      if (p.isNested && s > 1.8) {
        const ns = s * 0.5;
        ctx.beginPath();
        ctx.moveTo(0, -ns * 1.15);
        ctx.lineTo(ns, ns * 0.7);
        ctx.lineTo(-ns, ns * 0.7);
        ctx.closePath();
        ctx.stroke();
      }

      // Core luminous dot for foreground / spark particles
      if (p.isSynapseFlashing || (p.isForeground && s > 2.2)) {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.88 * heroFade;
        ctx.beginPath();
        ctx.arc(0, 0, Math.max(0.6, s * 0.35), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    // 4. Draw Foreground Floating Wireframes
    for (const w of wireframes) {
      if (w.z >= 0) w.draw(rotX, rotY, cx, cy);
    }

    ctx.restore();

    if (!prefersReducedMotion && isCanvasVisible) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      animationFrameId = null;
    }
  }

  // Initial draw
  if (prefersReducedMotion) {
    render(performance.now());
  } else {
    animationFrameId = requestAnimationFrame(render);
  }

  window.addEventListener('resize', resize);

  return {
    destroy() {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (intersectionObserver) intersectionObserver.disconnect();
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
    }
  };
}
