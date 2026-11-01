/**
 * constellation.js - Advanced 3D Luminous Particle Constellation Engine
 * Strictly adhering to Dala Brand Spec: "constellation floating on black velvet"
 * 
 * Features:
 * 1. 1,100+ chromatic triangular particle glyphs with true 3D perspective projection.
 * 2. 3 Signature Volumetric Models:
 *    - 3D Neural Brain (Image 3 in Dala reference)
 *    - 3D Lightbulb of Insight (Image 4 in Dala reference)
 *    - 3D Cosmic Network Sphere (Image 5 in Dala reference)
 * 3. 18 Large ambient floating 3D wireframe triangles & pyramids drifting in space (Image 2).
 * 4. Real-time 3D rotation, damping spring physics, and mouse / touch gyro parallax.
 * 5. Smooth shape morphing interpolation between geometric states.
 * 6. Chromatic gradient: Saffron Amber (#ffb829) top -> Electric Iris (#8052ff) core -> Deep Verdant Teal (#15846e) base.
 */

export function initConstellation(canvasId = 'constellation-canvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const container = canvas.parentElement;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  let width = 500;
  let height = 500;

  function resize() {
    const rect = container ? container.getBoundingClientRect() : { width: 500, height: 500 };
    const side = Math.min(Math.max(rect.width || 500, 320), 560);
    width = side;
    height = side;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);
  }

  resize();

  // Colors from Dala Design Spec
  const COLOR_AMBER = '#ffb829';   // Saffron Spark
  const COLOR_VIOLET = '#8052ff';  // Electric Iris
  const COLOR_TEAL = '#15846e';    // Deep Verdant
  const COLOR_CYAN = '#38bdf8';    // Cyber Cyan
  const COLOR_MAGENTA = '#c084fc'; // Iris Accent
  const COLOR_WHITE = '#ffffff';   // Bone White

  const PARTICLE_COUNT = 1350;
  const WIREFRAME_COUNT = 22;

  let currentShape = 'brain';
  let targetShape = 'brain';
  let morphProgress = 1;

  // 3D Rotation angles & mouse tracking
  let rotX = 0.15;
  let rotY = 0.0;
  let targetRotX = 0.15;
  let targetRotY = 0.0;
  let autoSpinSpeed = 0.0035;

  let isDragging = false;
  let lastMouseX = 0;
  let lastMouseY = 0;

  // --------------------------------------------------------------------------
  // 3D Mathematical Shape Generators
  // --------------------------------------------------------------------------

  // 1. Dual-Hemisphere 3D Neural Brain
  function getBrainPoint(i, total, R = 170) {
    const hemisphere = i % 2 === 0 ? 1 : -1;
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);

    // Organic neural perturbations
    const rLobe = R * (0.85 + 0.18 * Math.sin(3 * phi) * Math.cos(2 * theta) + 0.08 * Math.sin(5 * theta));
    
    // Separate into left and right lobes with indentation
    const sep = R * 0.28 * hemisphere;
    let x = (rLobe * Math.sin(phi) * Math.cos(theta)) * 0.75 + sep;
    let y = (rLobe * Math.sin(phi) * Math.sin(theta)) * 0.88;
    let z = (rLobe * Math.cos(phi)) * 0.95;

    // Flatten medial fissure
    if (Math.abs(x) < R * 0.18) {
      x *= 0.7;
    }

    // Cerebellum bulge at base rear
    if (y > R * 0.3 && z < 0) {
      y += 18;
      x *= 1.12;
    }

    return { x, y: y - 10, z };
  }

  // 2. 3D Lightbulb of Insight
  function getLightbulbPoint(i, total, R = 175) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;

    if (v < 0.65) {
      // Upper spherical glass dome
      const phi = (v / 0.65) * (Math.PI * 0.75);
      const r = R * 0.95;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = -r * Math.cos(phi) - R * 0.25;
      const z = r * Math.sin(phi) * Math.sin(theta);
      return { x, y, z };
    } else if (v < 0.85) {
      // Tapered neck
      const t = (v - 0.65) / 0.2;
      const neckRadius = R * (0.65 - t * 0.3);
      const y = t * (R * 0.6) - R * 0.05;
      const x = neckRadius * Math.cos(theta);
      const z = neckRadius * Math.sin(theta);
      return { x, y, z };
    } else {
      // Screw base
      const t = (v - 0.85) / 0.15;
      const baseRadius = R * 0.32 * (1 + 0.08 * Math.sin(t * Math.PI * 6));
      const y = R * 0.55 + t * (R * 0.45);
      const x = baseRadius * Math.cos(theta);
      const z = baseRadius * Math.sin(theta);
      return { x, y, z };
    }
  }

  // 3. 3D Cosmic Network Sphere (Fibonacci Grid)
  function getGlobePoint(i, total, R = 175) {
    const phi = Math.acos(1 - 2 * (i + 0.5) / total);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;

    // Organic breathing ripple
    const r = R * (0.95 + 0.05 * Math.sin(theta * 3 + phi * 4));
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.cos(phi);
    const z = r * Math.sin(phi) * Math.sin(theta);

    return { x, y, z };
  }

  // --------------------------------------------------------------------------
  // Particle Class (1,100 Triangular Chromatic Glyphs)
  // --------------------------------------------------------------------------
  class ConstellationParticle {
    constructor(index) {
      this.index = index;

      // Positions in 3D
      this.current = { x: 0, y: 0, z: 0 };
      this.source = { x: 0, y: 0, z: 0 };
      this.target = { x: 0, y: 0, z: 0 };

      // Initialize brain shape
      const pt = getBrainPoint(index, PARTICLE_COUNT);
      this.current = { ...pt };
      this.source = { ...pt };
      this.target = { ...pt };

      // Aesthetics
      this.baseSize = Math.random() * 2.8 + 1.6;
      this.tiltAngle = Math.random() * Math.PI * 2;
      this.spinSpeed = (Math.random() - 0.5) * 0.03;
      this.pulseSpeed = Math.random() * 0.03 + 0.015;
      this.pulsePhase = Math.random() * Math.PI * 2;
      this.sparkle = Math.random() > 0.94;

      // Ambient jitter
      this.jitterX = (Math.random() - 0.5) * 1.5;
      this.jitterY = (Math.random() - 0.5) * 1.5;
      this.jitterZ = (Math.random() - 0.5) * 1.5;
    }

    setTargetShape(shapeName) {
      this.source = { ...this.current };
      let newPt;
      if (shapeName === 'brain') newPt = getBrainPoint(this.index, PARTICLE_COUNT);
      else if (shapeName === 'lightbulb') newPt = getLightbulbPoint(this.index, PARTICLE_COUNT);
      else newPt = getGlobePoint(this.index, PARTICLE_COUNT);

      this.target = newPt;
    }

    update(progress) {
      this.pulsePhase += this.pulseSpeed;
      this.tiltAngle += this.spinSpeed;

      // Morph interpolation with cubic ease
      if (progress < 1) {
        const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        this.current.x = this.source.x + (this.target.x - this.source.x) * ease;
        this.current.y = this.source.y + (this.target.y - this.source.y) * ease;
        this.current.z = this.source.z + (this.target.z - this.source.z) * ease;
      } else {
        this.current.x = this.target.x;
        this.current.y = this.target.y;
        this.current.z = this.target.z;
      }
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
      const fov = 380;
      const scale = fov / (fov + z2 + 200);

      const projX = cx + x1 * scale;
      const projY = cy + y2 * scale;
      const projSize = Math.max(0.8, this.baseSize * scale);

      // Chromatic Palette Mapping (Dala Gradient: Amber top -> Violet middle -> Teal base)
      let color = COLOR_VIOLET;
      const normalizedY = (y0 + 150) / 300;

      if (this.sparkle && Math.sin(this.pulsePhase * 3) > 0.8) {
        color = COLOR_WHITE;
      } else if (normalizedY < 0.28) {
        color = COLOR_AMBER;
      } else if (normalizedY < 0.65) {
        color = Math.random() > 0.3 ? COLOR_VIOLET : COLOR_MAGENTA;
      } else {
        color = Math.random() > 0.4 ? COLOR_TEAL : COLOR_CYAN;
      }

      // Alpha drops for particles in background
      const depthAlpha = Math.min(1, Math.max(0.12, (z2 + 200) / 400));
      const pulseAlpha = 0.85 + 0.15 * Math.sin(this.pulsePhase);
      const finalAlpha = depthAlpha * pulseAlpha;

      return {
        projX,
        projY,
        projSize,
        z: z2,
        color,
        alpha: finalAlpha,
        angle: this.tiltAngle,
        isForeground: z2 > 30
      };
    }
  }

  // --------------------------------------------------------------------------
  // Large Ambient Floating 3D Wireframe Triangles (Dala Signature Style)
  // --------------------------------------------------------------------------
  class FloatingWireframeTriangle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 220 + 80;
      this.x = Math.cos(angle) * dist;
      this.y = (Math.random() - 0.5) * 360;
      this.z = (Math.random() - 0.5) * 320;

      this.size = Math.random() * 24 + 14;
      this.rotX = Math.random() * Math.PI * 2;
      this.rotY = Math.random() * Math.PI * 2;
      this.rotZ = Math.random() * Math.PI * 2;

      this.vRotX = (Math.random() - 0.5) * 0.02;
      this.vRotY = (Math.random() - 0.5) * 0.02;
      this.vRotZ = (Math.random() - 0.5) * 0.02;

      this.vy = (Math.random() - 0.5) * 0.35;
      this.color = [COLOR_VIOLET, COLOR_AMBER, COLOR_TEAL, COLOR_WHITE][Math.floor(Math.random() * 4)];
      this.alpha = Math.random() * 0.35 + 0.15;
      this.isDouble = Math.random() > 0.6;
    }

    update() {
      this.rotX += this.vRotX;
      this.rotY += this.vRotY;
      this.rotZ += this.vRotZ;
      this.y += this.vy;

      if (this.y > 220) this.y = -220;
      if (this.y < -220) this.y = 220;
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

      const fov = 420;
      const scale = fov / (fov + z2 + 250);
      const px = cx + x1 * scale;
      const py = cy + y2 * scale;
      const s = this.size * scale;

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(this.rotZ);

      ctx.globalAlpha = Math.max(0.08, this.alpha * scale);
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
  // Mouse & Touch Interaction (Parallax & Gyro)
  // --------------------------------------------------------------------------
  function onPointerMove(e) {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const rect = canvas.getBoundingClientRect();
    const nx = (clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const ny = (clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    targetRotY = nx * 0.85;
    targetRotX = -ny * 0.55 + 0.15;

    if (isDragging) {
      const dx = clientX - lastMouseX;
      const dy = clientY - lastMouseY;
      rotY += dx * 0.008;
      rotX += dy * 0.008;
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

    const cx = width / 2;
    const cy = height / 2;

    // Smooth rotation damping & auto-spin
    if (!isDragging) {
      rotY += autoSpinSpeed;
      rotY += (targetRotY - rotY) * 0.04;
      rotX += (targetRotX - rotX) * 0.04;
    }

    // Morph interpolation
    if (morphProgress < 1) {
      morphProgress += 0.025;
      if (morphProgress > 1) morphProgress = 1;
    }

    // Update and compute render data for all particles
    const renderList = [];
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.update(morphProgress);
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

        if (distSq < 720) {
          const dist = Math.sqrt(distSq);
          ctx.beginPath();
          ctx.strokeStyle = COLOR_VIOLET;
          ctx.globalAlpha = (1 - dist / 26.8) * 0.22 * p1.alpha;
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
      ctx.lineWidth = 0.9;

      // Soft glow for foreground high-energy particles
      if (p.isForeground) {
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 4;
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
      if (s > 2.6) {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * 0.8;
        ctx.beginPath();
        ctx.arc(0, 0, 0.7, 0, Math.PI * 2);
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

  // --------------------------------------------------------------------------
  // Morph Controls Integration
  // --------------------------------------------------------------------------
  function setShape(newShape) {
    if (newShape === currentShape) return;
    targetShape = newShape;
    morphProgress = 0;
    for (const p of particles) {
      p.setTargetShape(newShape);
    }
    currentShape = newShape;
  }

  // Hook up UI buttons if present
  const morphButtons = document.querySelectorAll('.morph-pill');
  morphButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      morphButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const shape = btn.getAttribute('data-shape');
      if (shape) setShape(shape);
    });
  });

  window.addEventListener('resize', resize);

  return {
    setShape,
    destroy() {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', resize);
    }
  };
}
