/**
 * constellation.js - Monumental 3D Luminous Particle Lightbulb Engine
 * Strictly adhering to Dala Brand Spec: "Spark lightbulb moments floating on black velvet"
 * 
 * Features:
 * 1. 1,850+ chromatic triangular particle glyphs with true 3D perspective projection.
 * 2. Signature Monumental 3D Lightbulb of Insight with glowing internal filament.
 * 3. 34 Large ambient floating 3D wireframe triangles & pyramids drifting in space.
 * 4. Real-time 3D rotation, damping spring physics, and mouse / touch gyro parallax.
 * 5. Chromatic gradient: Saffron Amber (#ffb829) top -> Electric Iris (#8052ff) core -> Deep Verdant Teal (#15846e) base.
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
    height = Math.max(rect.height || 640, 500);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);
  }

  resize();

  // Colors from Dala Design Spec
  const COLOR_AMBER = '#ffb829';   // Saffron Spark (top glass glow)
  const COLOR_VIOLET = '#8052ff';  // Electric Iris (bulb body)
  const COLOR_TEAL = '#15846e';    // Deep Verdant (base)
  const COLOR_CYAN = '#38bdf8';    // Cyber Cyan
  const COLOR_MAGENTA = '#c084fc'; // Iris Accent
  const COLOR_WHITE = '#ffffff';   // Bone White / Filament

  const PARTICLE_COUNT = 1850;
  const WIREFRAME_COUNT = 34;

  // 3D Rotation angles & mouse tracking
  let rotX = 0.12;
  let rotY = 0.0;
  let targetRotX = 0.12;
  let targetRotY = 0.0;
  let autoSpinSpeed = 0.0032;

  let isDragging = false;
  let lastMouseX = 0;
  let lastMouseY = 0;

  // --------------------------------------------------------------------------
  // 3D Monumental Lightbulb Mathematical Generator
  // --------------------------------------------------------------------------
  function getLightbulbPoint(i, total, R = 275) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;

    // 12% of particles form the internal glowing incandescent filament loop
    if (i < total * 0.12) {
      const t = (i / (total * 0.12)) * Math.PI * 4;
      const filR = R * 0.26 * Math.sin(t * 0.5);
      const x = filR * Math.cos(t);
      const y = -R * 0.28 - (t / (Math.PI * 4)) * R * 0.35 + Math.sin(t * 4) * 6;
      const z = filR * Math.sin(t);
      return { x, y, z, isFilament: true };
    }

    if (v < 0.65) {
      // Upper spherical glass dome (Monumental bulb)
      const phi = (v / 0.65) * (Math.PI * 0.75);
      const r = R * 0.96;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = -r * Math.cos(phi) - R * 0.22;
      const z = r * Math.sin(phi) * Math.sin(theta);
      return { x, y, z, isFilament: false };
    } else if (v < 0.85) {
      // Tapered neck
      const t = (v - 0.65) / 0.2;
      const neckRadius = R * (0.65 - t * 0.3);
      const y = t * (R * 0.6) - R * 0.05;
      const x = neckRadius * Math.cos(theta);
      const z = neckRadius * Math.sin(theta);
      return { x, y, z, isFilament: false };
    } else {
      // Screw base
      const t = (v - 0.85) / 0.15;
      const baseRadius = R * 0.32 * (1 + 0.09 * Math.sin(t * Math.PI * 6));
      const y = R * 0.55 + t * (R * 0.45);
      const x = baseRadius * Math.cos(theta);
      const z = baseRadius * Math.sin(theta);
      return { x, y, z, isFilament: false };
    }
  }

  // --------------------------------------------------------------------------
  // Particle Class (Triangular Chromatic Glyphs)
  // --------------------------------------------------------------------------
  class ConstellationParticle {
    constructor(index) {
      this.index = index;

      // Base radius scaled dynamically to viewport
      const baseR = Math.min(Math.max(width * 0.24, 230), 295);
      const pt = getLightbulbPoint(index, PARTICLE_COUNT, baseR);

      this.current = { x: pt.x, y: pt.y, z: pt.z };
      this.isFilament = pt.isFilament;

      // Glyph properties
      this.baseSize = this.isFilament ? Math.random() * 2.8 + 2.0 : Math.random() * 2.2 + 1.2;
      this.pulsePhase = Math.random() * Math.PI * 2;
      this.pulseSpeed = Math.random() * 0.035 + 0.015;
      this.tiltAngle = Math.random() * Math.PI * 2;
      this.vTilt = (Math.random() - 0.5) * 0.015;

      this.sparkle = Math.random() > 0.88;
      this.jitterX = (Math.random() - 0.5) * 3;
      this.jitterY = (Math.random() - 0.5) * 3;
      this.jitterZ = (Math.random() - 0.5) * 3;
    }

    update() {
      this.pulsePhase += this.pulseSpeed;
      this.tiltAngle += this.vTilt;
    }

    getRenderData(rx, ry, cx, cy) {
      // Ambient floating micro-movement
      const wave = Math.sin(this.pulsePhase) * 2;
      const x0 = this.current.x + this.jitterX + wave * 0.5;
      const y0 = this.current.y + this.jitterY + wave;
      const z0 = this.current.z + this.jitterZ;

      // 3D Rotation Matrix
      // Rotate around Y axis
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = x0 * cosY - z0 * sinY;
      const z1 = z0 * cosY + x0 * sinY;

      // Rotate around X axis
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y2 = y0 * cosX - z1 * sinX;
      const z2 = z1 * cosX + y0 * sinX;

      // Perspective Projection
      const fov = 420;
      const scale = fov / (fov + z2 + 220);

      const projX = cx + x1 * scale;
      const projY = cy + y2 * scale;
      const projSize = Math.max(0.8, this.baseSize * scale);

      // Chromatic Palette Mapping (Dala Gradient: Amber top -> Violet middle -> Teal base)
      let color = COLOR_VIOLET;
      const normalizedY = (y0 + 200) / 440;

      if (this.isFilament) {
        color = Math.sin(this.pulsePhase * 2) > 0 ? COLOR_WHITE : COLOR_AMBER;
      } else if (this.sparkle && Math.sin(this.pulsePhase * 3) > 0.8) {
        color = COLOR_WHITE;
      } else if (normalizedY < 0.32) {
        color = COLOR_AMBER;
      } else if (normalizedY < 0.68) {
        color = Math.random() > 0.3 ? COLOR_VIOLET : COLOR_MAGENTA;
      } else {
        color = Math.random() > 0.4 ? COLOR_TEAL : COLOR_CYAN;
      }

      // Alpha drops for particles in deep background
      const depthAlpha = Math.min(1, Math.max(0.12, (z2 + 220) / 440));
      const pulseAlpha = 0.85 + 0.15 * Math.sin(this.pulsePhase);
      const finalAlpha = this.isFilament ? 0.95 : depthAlpha * pulseAlpha;

      return {
        projX,
        projY,
        projSize,
        z: z2,
        color,
        alpha: finalAlpha,
        angle: this.tiltAngle,
        isForeground: z2 > 20,
        isFilament: this.isFilament
      };
    }
  }

  // --------------------------------------------------------------------------
  // Large Ambient Floating 3D Wireframe Triangles & Pyramids
  // --------------------------------------------------------------------------
  class FloatingWireframeTriangle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * (width * 0.46) + 80;
      this.x = Math.cos(angle) * dist;
      this.y = (Math.random() - 0.5) * (height * 0.85);
      this.z = (Math.random() - 0.5) * 440;

      this.size = Math.random() * 28 + 14;
      this.rotX = Math.random() * Math.PI * 2;
      this.rotY = Math.random() * Math.PI * 2;
      this.rotZ = Math.random() * Math.PI * 2;

      this.vRotX = (Math.random() - 0.5) * 0.018;
      this.vRotY = (Math.random() - 0.5) * 0.018;
      this.vRotZ = (Math.random() - 0.5) * 0.018;

      this.vy = (Math.random() - 0.5) * 0.4;
      this.color = [COLOR_VIOLET, COLOR_AMBER, COLOR_TEAL, COLOR_WHITE][Math.floor(Math.random() * 4)];
      this.alpha = Math.random() * 0.35 + 0.12;
      this.isDouble = Math.random() > 0.55;
    }

    update() {
      this.rotX += this.vRotX;
      this.rotY += this.vRotY;
      this.rotZ += this.vRotZ;
      this.y += this.vy;

      const boundary = height * 0.5;
      if (this.y > boundary) this.y = -boundary;
      if (this.y < -boundary) this.y = boundary;
    }

    draw(rx, ry, cx, cy) {
      const cosY = Math.cos(ry * 0.5);
      const sinY = Math.sin(ry * 0.5);
      const x1 = this.x * cosY - this.z * sinY;
      const z1 = this.z * cosY + this.x * sinY;

      const cosX = Math.cos(rx * 0.5);
      const sinX = Math.sin(rx * 0.5);
      const y2 = this.y * cosX - z1 * sinX;
      const z2 = z1 * cosX + this.y * sinX;

      const fov = 440;
      const scale = fov / (fov + z2 + 280);
      const px = cx + x1 * scale;
      const py = cy + y2 * scale;
      const s = this.size * scale;

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(this.rotZ);

      ctx.globalAlpha = Math.max(0.06, this.alpha * scale);
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 1.2;

      // Draw outlined equilateral triangle
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.lineTo(s * 0.866, s * 0.5);
      ctx.lineTo(-s * 0.866, s * 0.5);
      ctx.closePath();
      ctx.stroke();

      // Inner nested triangle if double
      if (this.isDouble) {
        const s2 = s * 0.55;
        ctx.beginPath();
        ctx.moveTo(0, -s2);
        ctx.lineTo(s2 * 0.866, s2 * 0.5);
        ctx.lineTo(-s2 * 0.866, s2 * 0.5);
        ctx.closePath();
        ctx.stroke();
      }

      ctx.restore();
    }
  }

  // --------------------------------------------------------------------------
  // Instantiation
  // --------------------------------------------------------------------------
  const particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new ConstellationParticle(i));
  }

  const wireframes = [];
  for (let i = 0; i < WIREFRAME_COUNT; i++) {
    wireframes.push(new FloatingWireframeTriangle());
  }

  // --------------------------------------------------------------------------
  // Mouse & Touch Interaction (Parallax & 3D Gyro)
  // --------------------------------------------------------------------------
  function onPointerMove(e) {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const rect = canvas.getBoundingClientRect();
    const nx = (clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const ny = (clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    targetRotY = nx * 0.75;
    targetRotX = -ny * 0.45 + 0.12;

    if (isDragging) {
      const dx = clientX - lastMouseX;
      const dy = clientY - lastMouseY;
      rotY += dx * 0.007;
      rotX += dy * 0.007;
      lastMouseX = clientX;
      lastMouseY = clientY;
    }
  }

  function onPointerDown(e) {
    isDragging = true;
    lastMouseX = e.touches ? e.touches[0].clientX : e.clientX;
    lastMouseY = e.touches ? e.touches[0].clientY : e.clientY;
  }

  function onPointerUp() {
    isDragging = false;
  }

  window.addEventListener('mousemove', onPointerMove, { passive: true });
  canvas.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mouseup', onPointerUp);

  canvas.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);

  // --------------------------------------------------------------------------
  // Animation Loop
  // --------------------------------------------------------------------------
  let animationFrameId;

  function render() {
    ctx.clearRect(0, 0, width, height);

    // In RTL, text is on the right, so the bulb sits majestically on the left
    // On narrower screens (< 900px), it centers in the background
    const isDesktop = width > 900;
    const cx = isDesktop ? width * 0.30 : width * 0.5;
    const cy = isDesktop ? height * 0.52 : height * 0.48;

    // Smooth rotation damping & auto-spin
    if (!isDragging) {
      rotY += autoSpinSpeed;
      rotY += (targetRotY - rotY) * 0.035;
      rotX += (targetRotX - rotX) * 0.035;
    }

    // Update and compute render data for all particles
    const renderList = [];
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.update();
      const data = p.getRenderData(rotX, rotY, cx, cy);
      renderList.push(data);
    }

    // Sort by depth (z-index) so background renders before foreground
    renderList.sort((a, b) => a.z - b.z);

    // 1. Draw Background Wireframes
    for (const w of wireframes) {
      w.update();
      if (w.z < 0) w.draw(rotX, rotY, cx, cy);
    }

    // 2. Draw Synaptic Connecting Lines between Close Foreground Particles
    ctx.lineWidth = 0.65;
    for (let i = 0; i < renderList.length; i += 2) {
      const p1 = renderList[i];
      if (p1.z < -40) continue;

      for (let j = i + 1; j < Math.min(i + 8, renderList.length); j++) {
        const p2 = renderList[j];
        const dx = p1.projX - p2.projX;
        const dy = p1.projY - p2.projY;
        const distSq = dx * dx + dy * dy;

        if (distSq < 750) {
          const dist = Math.sqrt(distSq);
          ctx.beginPath();
          ctx.strokeStyle = COLOR_VIOLET;
          ctx.globalAlpha = (1 - dist / 27.4) * 0.24 * p1.alpha;
          ctx.moveTo(p1.projX, p1.projY);
          ctx.lineTo(p2.projX, p2.projY);
          ctx.stroke();
        }
      }
    }

    // 3. Draw Chromatic Triangular Particles
    for (let i = 0; i < renderList.length; i++) {
      const p = renderList[i];

      ctx.save();
      ctx.translate(p.projX, p.projY);
      ctx.rotate(p.angle);

      ctx.globalAlpha = p.alpha;
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 0.95;

      // Soft glow for foreground high-energy particles or filament
      if (p.isForeground || p.isFilament) {
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.isFilament ? 8 : 4;
      }

      // Draw tiny equilateral triangle
      const s = p.projSize;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.lineTo(s * 0.866, s * 0.5);
      ctx.lineTo(-s * 0.866, s * 0.5);
      ctx.closePath();
      ctx.stroke();

      // Core luminous dot for large particles
      if (s > 2.4 || p.isFilament) {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * 0.85;
        ctx.beginPath();
        ctx.arc(0, 0, 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    // 4. Draw Foreground Floating Wireframes
    for (const w of wireframes) {
      if (w.z >= 0) w.draw(rotX, rotY, cx, cy);
    }

    animationFrameId = requestAnimationFrame(render);
  }

  render();

  window.addEventListener('resize', resize);

  return {
    destroy() {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', resize);
    }
  };
}
