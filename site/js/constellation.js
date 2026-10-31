/**
 * constellation.js - Signature Dala Brain / Constellation Particle Cloud
 * Thousands of tiny chromatic triangular particles forming an organic neural constellation on black velvet.
 */

export function initConstellation(canvasId = 'constellation-canvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = canvas.parentElement?.clientWidth || 440);
  let height = (canvas.height = canvas.parentElement?.clientHeight || 440);

  const colors = [
    '#8052ff', // Electric Iris (violet)
    '#ffb829', // Saffron Spark (amber)
    '#15846e', // Deep Verdant (teal)
    '#b845ed', // Magenta
    '#38bdf8', // Azure
    '#ffffff'  // Bone White
  ];

  const particleCount = 280;
  const particles = [];

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      // Neural / Brain shape parametric distribution: two lobes
      const lobe = Math.random() > 0.5 ? 1 : -1;
      const angle = Math.random() * Math.PI * 2;
      const u = Math.random() + Math.random();
      const r = (u > 1 ? 2 - u : u) * (width * 0.32);

      const cx = width / 2 + lobe * (width * 0.1);
      const cy = height / 2;

      this.x = cx + Math.cos(angle) * r * 1.1;
      this.y = cy + Math.sin(angle) * r * 0.85;
      this.baseX = this.x;
      this.baseY = this.y;

      this.size = Math.random() * 3 + 2;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.7 + 0.3;
      this.angle = Math.random() * Math.PI * 2;
      this.spinSpeed = (Math.random() - 0.5) * 0.04;

      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
      this.pulse = Math.random() * Math.PI * 2;
    }

    update() {
      this.pulse += this.pulseSpeed;
      this.angle += this.spinSpeed;

      this.x += this.vx;
      this.y += this.vy;

      // Gentle spring back to base position to preserve brain shape
      this.x += (this.baseX - this.x) * 0.01;
      this.y += (this.baseY - this.y) * 0.01;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);

      const currentAlpha = Math.max(0.1, this.alpha * (0.8 + 0.2 * Math.sin(this.pulse)));
      ctx.globalAlpha = currentAlpha;
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 1;

      // Draw tiny equilateral triangle glyph
      const s = this.size;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.lineTo(s * 0.866, s * 0.5);
      ctx.lineTo(-s * 0.866, s * 0.5);
      ctx.closePath();
      ctx.stroke();

      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  let animationFrameId;

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting neural lines for nearby particles
    ctx.lineWidth = 0.5;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 42) {
          ctx.beginPath();
          ctx.strokeStyle = '#8052ff';
          ctx.globalAlpha = (1 - dist / 42) * 0.25;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Update and draw particles
    for (const p of particles) {
      p.update();
      p.draw();
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.clientWidth || 440;
    height = canvas.height = canvas.parentElement.clientHeight || 440;
    for (const p of particles) {
      p.reset(true);
    }
  });

  return () => {
    cancelAnimationFrame(animationFrameId);
  };
}
