/*
 * Guilloche geometry. Pure functions, no randomness beyond a seeded PRNG, so the
 * same seed always yields the same engraving. Coordinates live in a 1000 x 600
 * viewBox; the rosette sits on the right edge and everything sweeps left from it.
 */

export type Pt = [number, number];
/* `fade` is the x span over which a stroke ramps from invisible to full, so ends dissolve into the page. */
export type Stroke = { d: string; tone: 'teal' | 'grey'; width: number; opacity: number; fade?: [number, number] };
export type Dot = { x: number; y: number; r: number; tone: 'teal' | 'grey'; opacity: number };
export type Engraving = { strokes: Stroke[]; dots: Dot[] };

export const VIEW_W = 1000;
export const VIEW_H = 600;

const TAU = Math.PI * 2;

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Ramer-Douglas-Peucker: drop samples that sit within `eps` of the chord. */
function simplify(pts: Pt[], eps: number): Pt[] {
  if (pts.length < 3) return pts;
  const keep = new Uint8Array(pts.length);
  keep[0] = keep[pts.length - 1] = 1;
  const stack: Array<[number, number]> = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop()!;
    const [ax, ay] = pts[a];
    const [bx, by] = pts[b];
    const dx = bx - ax;
    const dy = by - ay;
    const len = Math.hypot(dx, dy) || 1;
    let worst = 0;
    let idx = -1;
    for (let i = a + 1; i < b; i++) {
      const dist = Math.abs(dy * (pts[i][0] - ax) - dx * (pts[i][1] - ay)) / len;
      if (dist > worst) {
        worst = dist;
        idx = i;
      }
    }
    if (worst > eps && idx > 0) {
      keep[idx] = 1;
      stack.push([a, idx], [idx, b]);
    }
  }
  return pts.filter((_, i) => keep[i]);
}

/* One subpath: absolute start, then relative moves on a 0.1 grid (rounded before differencing, so no drift). */
function toPath(raw: Pt[]): string {
  const pts = simplify(raw, 0.06);
  let px = Math.round(pts[0][0] * 10);
  let py = Math.round(pts[0][1] * 10);
  let out = `M${px / 10} ${py / 10}l`;
  for (let i = 1; i < pts.length; i++) {
    const x = Math.round(pts[i][0] * 10);
    const y = Math.round(pts[i][1] * 10);
    const dx = x - px;
    const dy = y - py;
    if (dx === 0 && dy === 0) continue;
    out += `${i > 1 && dx >= 0 ? ' ' : ''}${dx / 10}${dy >= 0 ? ' ' : ''}${dy / 10}`;
    px = x;
    py = y;
  }
  return out;
}

function sample(n: number, f: (u: number) => Pt): Pt[] {
  const pts: Pt[] = new Array(n + 1);
  for (let i = 0; i <= n; i++) pts[i] = f(i / n);
  return pts;
}

/* Cubic Bezier centreline with its unit normal. */
type Curve = (t: number) => { p: Pt; n: Pt };
function bezier(p0: Pt, p1: Pt, p2: Pt, p3: Pt): Curve {
  return (t) => {
    const s = 1 - t;
    const x = s * s * s * p0[0] + 3 * s * s * t * p1[0] + 3 * s * t * t * p2[0] + t * t * t * p3[0];
    const y = s * s * s * p0[1] + 3 * s * s * t * p1[1] + 3 * s * t * t * p2[1] + t * t * t * p3[1];
    const dx = 3 * s * s * (p1[0] - p0[0]) + 6 * s * t * (p2[0] - p1[0]) + 3 * t * t * (p3[0] - p2[0]);
    const dy = 3 * s * s * (p1[1] - p0[1]) + 6 * s * t * (p2[1] - p1[1]) + 3 * t * t * (p3[1] - p2[1]);
    const len = Math.hypot(dx, dy) || 1;
    return { p: [x, y], n: [-dy / len, dx / len] };
  };
}

/*
 * Ribbon: N strands, each a sine riding the centreline with a phase offset of
 * TAU * i / N. Neighbouring strands cross, which is what makes the lattice.
 * `width(t)` is the half-width envelope; `twist` is crossings along the length.
 */
function ribbon(
  curve: Curve,
  opts: { strands: number; twist: number; width: (t: number) => number; drift?: number; seed: number },
): string {
  const { strands, twist, width, drift = 0, seed } = opts;
  const rand = mulberry32(seed);
  const phase0 = rand() * TAU;
  const parts: string[] = [];
  for (let i = 0; i < strands; i++) {
    const phase = phase0 + (TAU * i) / strands;
    const pts = sample(Math.ceil(twist * 40), (t) => {
      const { p, n } = curve(t);
      // A second, slower harmonic gives the billow the original had without breaking periodicity.
      const off = width(t) * (Math.sin(TAU * twist * t + phase) + drift * Math.sin(TAU * 0.5 * twist * t + 2 * phase));
      return [p[0] + n[0] * off, p[1] + n[1] * off];
    });
    parts.push(toPath(pts));
  }
  return parts.join('');
}

/*
 * Rosette ring: N closed curves r_i(th) = base(th) + amp * sin(k * th + TAU * i / N).
 * base() carries a slow lobe so the ring undulates like a banknote border.
 */
function ring(
  c: Pt,
  opts: { strands: number; k: number; base: (th: number) => number; amp: number; from?: number; to?: number },
): string {
  const { strands, k, base, amp, from = 0, to = TAU } = opts;
  const parts: string[] = [];
  for (let i = 0; i < strands; i++) {
    const phase = (TAU * i) / strands;
    const pts = sample(Math.ceil(k * 28 * ((to - from) / TAU)), (u) => {
      const th = from + (to - from) * u;
      const r = base(th) + amp * Math.sin(k * th + phase);
      return [c[0] + r * Math.cos(th), c[1] + r * Math.sin(th)];
    });
    parts.push(toPath(pts));
  }
  return parts.join('');
}

/* Hypotrochoid: a circle of radius r rolling inside R, pen at distance d. p/q = R/r in lowest terms. */
function hypotrochoid(c: Pt, scale: number, p: number, q: number, d: number, rot: number): string {
  const R = 1;
  const r = q / p;
  const k = (R - r) / r;
  const span = TAU * q;
  const norm = scale / (R - r + d);
  const pts = sample(p * 36, (u) => {
    const t = span * u;
    const x = (R - r) * Math.cos(t) + d * Math.cos(k * t);
    const y = (R - r) * Math.sin(t) - d * Math.sin(k * t);
    const cr = Math.cos(rot);
    const sr = Math.sin(rot);
    return [c[0] + norm * (x * cr - y * sr), c[1] + norm * (x * sr + y * cr)];
  });
  return toPath(pts);
}

/* Rose curve r = a * cos(k * th), k = n/d, used for the fine centre bloom. */
function rose(c: Pt, a: number, n: number, dd: number, rot: number): string {
  const k = n / dd;
  const span = dd % 2 === 1 && n % 2 === 1 ? Math.PI * dd : TAU * dd;
  const pts = sample(Math.ceil(n * 40), (u) => {
    const th = span * u;
    const r = a * Math.cos(k * th);
    return [c[0] + r * Math.cos(th + rot), c[1] + r * Math.sin(th + rot)];
  });
  return toPath(pts);
}

/* Dots stepped at equal arc length along a curve, radius swelling mid-trail. */
function dotTrail(
  curve: Curve,
  opts: { step: number; rMax: number; rMin: number; peak: number; tone: Dot['tone']; opacity: number; offset?: number },
): Dot[] {
  const { step, rMax, rMin, peak, tone, opacity, offset = 0 } = opts;
  const fine = 2000;
  const lut: number[] = [0];
  let prev = curve(0).p;
  for (let i = 1; i <= fine; i++) {
    const p = curve(i / fine).p;
    lut.push(lut[i - 1] + Math.hypot(p[0] - prev[0], p[1] - prev[1]));
    prev = p;
  }
  const total = lut[fine];
  const dots: Dot[] = [];
  let j = 0;
  for (let s = offset; s <= total; s += step) {
    while (j < fine && lut[j + 1] < s) j++;
    const t = (j + (s - lut[j]) / Math.max(lut[j + 1] - lut[j], 1e-9)) / fine;
    const p = curve(Math.min(t, 1)).p;
    const u = s / total;
    const swell = Math.exp(-(((u - peak) / 0.22) ** 2));
    dots.push({ x: p[0], y: p[1], r: rMin + (rMax - rMin) * swell, tone, opacity: opacity * (0.35 + 0.65 * swell) });
  }
  return dots;
}

export function buildEngraving(seed = 7): Engraving {
  const rand = mulberry32(seed);
  const O: Pt = [985, 265];
  const strokes: Stroke[] = [];

  // Centre bloom: a hypotrochoid with pen distance R - r, so every loop passes through the centre, with a rose laid over it.
  strokes.push({ d: hypotrochoid(O, 128, 72, 31, 1 - 31 / 72, rand() * TAU), tone: 'teal', width: 0.4, opacity: 0.75 });
  strokes.push({ d: rose(O, 52, 37, 6, rand() * TAU), tone: 'grey', width: 0.35, opacity: 0.35 });

  // Undulating rings around the bloom: open lattices that read as banknote borders.
  strokes.push({
    d: ring(O, { strands: 14, k: 24, amp: 22, base: (th) => 168 + 14 * Math.sin(7 * th + 0.4) }),
    tone: 'grey', width: 0.45, opacity: 0.65,
  });
  strokes.push({
    d: ring(O, { strands: 16, k: 20, amp: 30, base: (th) => 238 + 26 * Math.sin(5 * th + 1.1) }),
    tone: 'teal', width: 0.5, opacity: 0.8,
  });
  strokes.push({
    d: ring(O, { strands: 16, k: 26, amp: 26, base: (th) => 322 + 34 * Math.sin(4 * th + 2.3) + 10 * Math.sin(9 * th) }),
    tone: 'grey', width: 0.45, opacity: 0.55,
  });

  // Sweeping sheets: many strands, few crossings, so the lines run lengthwise and cross at shallow angles.
  // The envelope swells a little toward the far end and the stroke fades out there, so nothing pinches to a point.
  const env = (w: number, billow = 0.25, k = 1.5) => (t: number) =>
    w * Math.sin(Math.PI * Math.min(1, t / 0.12) * 0.5) * (0.75 + 0.45 * t * t) * (1 + billow * Math.sin(TAU * k * t));
  const sheet = (
    pts: [Pt, Pt, Pt, Pt],
    o: { strands: number; twist: number; w: number; billow?: number; k?: number },
    tone: Stroke['tone'],
    width: number,
    opacity: number,
    salt: number,
  ) => {
    strokes.push({
      d: ribbon(bezier(...pts), { strands: o.strands, twist: o.twist, width: env(o.w, o.billow, o.k), seed: seed + salt }),
      tone,
      width,
      opacity,
      fade: [pts[3][0], pts[3][0] + 280],
    });
  };
  sheet([[1060, 640], [880, 470], [640, 360], [240, 320]], { strands: 34, twist: 2.5, w: 64 }, 'grey', 0.4, 0.6, 1);
  sheet([[980, 680], [820, 560], [620, 450], [330, 440]], { strands: 30, twist: 2, w: 54, billow: 0.3, k: 1 }, 'teal', 0.45, 0.6, 2);
  sheet([[1040, -40], [880, 60], [700, 170], [360, 150]], { strands: 32, twist: 2.5, w: 58, billow: 0.3, k: 1.2 }, 'teal', 0.45, 0.6, 3);
  sheet([[860, -60], [780, 40], [640, 160], [330, 240]], { strands: 26, twist: 2, w: 42 }, 'grey', 0.35, 0.45, 4);
  // A sheer wisp: the faintest work on the plate, carrying the pattern furthest left.
  sheet([[1060, 330], [760, 260], [520, 250], [160, 290]], { strands: 40, twist: 1.5, w: 72, billow: 0.2, k: 0.8 }, 'teal', 0.35, 0.3, 5);

  // Dotted trails: one bold diagonal, fine companions.
  const dots: Dot[] = [
    ...dotTrail(bezier([560, 10], [640, 130], [700, 230], [770, 300]), { step: 9, rMax: 1.5, rMin: 0.55, peak: 0.6, tone: 'grey', opacity: 0.85 }),
    ...dotTrail(bezier([770, 300], [690, 335], [600, 370], [440, 415]), { step: 11, rMax: 3, rMin: 0.6, peak: 0.42, tone: 'teal', opacity: 0.9 }),
    ...dotTrail(bezier([750, 318], [660, 365], [560, 425], [400, 485]), { step: 7, rMax: 1.0, rMin: 0.4, peak: 0.4, tone: 'grey', opacity: 0.55 }),
    ...dotTrail(bezier([740, 282], [650, 262], [560, 252], [430, 262]), { step: 7, rMax: 0.9, rMin: 0.4, peak: 0.35, tone: 'teal', opacity: 0.45 }),
  ];

  return { strokes, dots };
}
