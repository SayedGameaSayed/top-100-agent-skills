import fs from 'node:fs';

// Mathematical generator for High-Fidelity 3D Anatomical Human Brain (matching Dala reference)
export function getAnatomicalBrainPoint(i, total, R = 230) {
  // Region assignment:
  // 0.00 - 0.15: Brainstem (جذع الدماغ)
  // 0.15 - 0.35: Cerebellum (المخيخ)
  // 0.35 - 0.50: Deep Neural Core / Synapses (العمق العصبي)
  // 0.50 - 1.00: Cerebral Cortex (قشرة الدماغ بتلافيفها)
  
  const p = i / total;
  
  // 1. Brainstem (Downward stalk)
  if (p < 0.12) {
    const t = p / 0.12;
    const angle = Math.random() * Math.PI * 2;
    const stemR = R * (0.16 - t * 0.06);
    const x = stemR * Math.cos(angle);
    const y = R * 0.38 + t * (R * 0.48);
    const z = -R * 0.12 + stemR * Math.sin(angle);
    return { x, y, z, zone: 'stem', isCore: false };
  }

  // 2. Cerebellum (Bottom rear cauliflower / striated lobes)
  if (p < 0.28) {
    const t = (p - 0.12) / 0.16;
    const angle = Math.random() * Math.PI * 2;
    const u = Math.random();
    const rCereb = R * 0.38 * Math.cbrt(u);
    // Folia / horizontal ridges modulation
    const folia = Math.sin(rCereb * 0.3) * 6;
    const x = rCereb * Math.cos(angle) * 1.15;
    const y = R * 0.26 + (Math.random() - 0.5) * R * 0.28 + folia;
    const z = -R * 0.36 - Math.abs(Math.sin(angle)) * R * 0.32;
    return { x, y, z, zone: 'cerebellum', isCore: false };
  }

  // 3. Deep Neural Core (Glowing internal synaptic network)
  if (p < 0.42) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = R * 0.55 * Math.cbrt(Math.random());
    const x = r * Math.sin(phi) * Math.cos(theta) * 0.75;
    const y = -R * 0.05 + r * Math.sin(phi) * Math.sin(theta) * 0.7;
    const z = r * Math.cos(phi) * 0.9;
    return { x, y, z, zone: 'core', isCore: true };
  }

  // 4. Cerebral Cortex (Main brain lobes with sulci & gyri convolutions)
  const u = Math.random();
  const v = Math.random();
  const theta = u * 2.0 * Math.PI;
  const phi = Math.acos(2.0 * v - 1.0);

  // Cortex hemispheric separation
  const hemisphere = Math.random() > 0.5 ? 1 : -1;
  const sep = R * 0.08 * hemisphere;

  // Sulci & Gyri (Brain convolutions / cortical wrinkles)
  const gyrusWave1 = Math.sin(7.0 * phi) * Math.cos(5.0 * theta) * 14.0;
  const gyrusWave2 = Math.cos(12.0 * theta) * Math.sin(4.0 * phi) * 8.0;
  const gyrusWave3 = Math.sin(18.0 * phi + 8.0 * theta) * 5.0;
  const convolutions = gyrusWave1 + gyrusWave2 + gyrusWave3;

  // Anatomical elongation (longer front-to-back, tall arched top)
  let rx = R * 0.72;
  let ry = R * 0.78;
  let rz = R * 0.92;

  // Frontal lobe expansion (front is +Z, curves forward and arched)
  if (Math.cos(phi) > 0.1) {
    rz *= 1.08;
    ry *= 1.04;
  }

  // Temporal lobe bulge (lower sides)
  const isTemporal = Math.sin(phi) > 0.6 && Math.abs(Math.sin(theta)) < 0.5;
  if (isTemporal) {
    rx *= 1.12;
  }

  // Upper dome height
  let yOffset = -R * 0.14;
  if (Math.sin(phi) * Math.sin(theta) < -0.2) {
    yOffset -= R * 0.08; // higher parietal crown
  }

  const rBase = (R + convolutions);
  let x = (rBase / R) * rx * Math.sin(phi) * Math.cos(theta) + sep;
  let y = (rBase / R) * ry * Math.sin(phi) * Math.sin(theta) + yOffset;
  let z = (rBase / R) * rz * Math.cos(phi);

  // Longitudinal medial fissure (groove between left & right hemispheres)
  if (Math.abs(x) < R * 0.14) {
    x *= 0.72;
    y += Math.abs(x) * 0.2; // slight dip along the seam
  }

  // Zone classification for chromatic rendering
  let zone = 'parietal';
  if (y < -R * 0.25) zone = 'crown'; // Amber top
  else if (z > R * 0.25) zone = 'frontal';
  else if (z < -R * 0.2) zone = 'occipital';
  else zone = 'temporal';

  return { x, y, z, zone, isCore: false };
}
