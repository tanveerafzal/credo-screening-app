'use client';

import { useEffect, useRef } from 'react';

/*
 * A guilloche field drawn in monospace glyphs: two sets of rings interfere the
 * way the line work on a licence or passport does. WebGL, 24 fps, paused
 * off-screen, one static frame under reduced motion.
 */
const GLYPHS = ' .·:+=x#';
const LOOP = 120;

const VERT = `
attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform sampler2D u_glyphs;
uniform vec2 u_resolution;
uniform float u_cell;
uniform float u_time;
uniform float u_dark;
uniform vec2 u_focus;
uniform float u_fade;

void main() {
  vec2 cell = floor(gl_FragCoord.xy / u_cell);
  vec2 local = fract(gl_FragCoord.xy / u_cell);
  vec2 uv = (cell + 0.5) * u_cell / u_resolution;
  uv.y = 1.0 - uv.y;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  float phase = mod(u_time, ${LOOP}.0) / ${LOOP}.0 * 6.2831853;

  vec2 c1 = vec2(u_focus.x * aspect, u_focus.y);
  vec2 c2 = c1 + vec2(0.34 * cos(phase), 0.22 * sin(phase));
  float r1 = length(p - c1);
  float r2 = length(p - c2);
  float rings = sin(r1 * 58.0 - phase * 4.0) * sin(r2 * 51.0 + phase * 3.0);
  float rosette = sin(atan(p.y - c1.y, p.x - c1.x) * 12.0 + r1 * 22.0 - phase * 2.0);
  float signal = 0.5 + 0.5 * (rings * 0.75 + rosette * 0.25);

  float reach = smoothstep(0.0, 0.85, 1.0 - r1 / 1.25);
  float fade = mix(1.0, smoothstep(u_fade, u_fade + 0.35, uv.x), step(0.001, u_fade));
  float level = signal * reach * fade;

  float index = floor(clamp(level, 0.0, 0.999) * ${GLYPHS.length}.0);
  vec2 glyphUv = vec2((index + local.x) / ${GLYPHS.length}.0, local.y);
  float glyph = texture2D(u_glyphs, glyphUv).a;

  vec3 ink = mix(vec3(0.27, 0.31, 0.30), vec3(0.051, 0.580, 0.533), smoothstep(0.55, 0.95, level));
  vec3 inkDark = mix(vec3(0.62, 0.70, 0.68), vec3(0.37, 0.86, 0.79), smoothstep(0.5, 0.95, level));
  vec3 color = mix(ink, inkDark, u_dark);
  float a = glyph * (0.25 + 0.75 * level);
  gl_FragColor = vec4(color * a, a);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s);
    return null;
  }
  return s;
}

function atlas() {
  const size = 48;
  const c = document.createElement('canvas');
  c.width = GLYPHS.length * size;
  c.height = size;
  const ctx = c.getContext('2d');
  if (!ctx) return null;
  ctx.fillStyle = 'white';
  ctx.font = '500 30px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  [...GLYPHS].forEach((g, i) => ctx.fillText(g, (i + 0.5) * size, size * 0.52));
  return c;
}

/** Static 2D-canvas frame for browsers without WebGL. Same field, no motion. */
function drawStatic(canvas: HTMLCanvasElement, tone: 'light' | 'dark', fx: number, fy: number, fade: number) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.scale(dpr, dpr);
  const cell = w < 640 ? 9 : 11;
  ctx.font = `500 ${cell}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const aspect = w / h;
  const phase = (18 / LOOP) * Math.PI * 2;
  const c1 = [fx * aspect, fy];
  const c2 = [c1[0] + 0.34 * Math.cos(phase), c1[1] + 0.22 * Math.sin(phase)];
  const smooth = (a: number, b: number, x: number) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };
  for (let y = 0; y < h; y += cell) {
    for (let x = 0; x < w; x += cell) {
      const u = (x + cell / 2) / w;
      const v = (y + cell / 2) / h;
      const px = u * aspect;
      const r1 = Math.hypot(px - c1[0], v - c1[1]);
      const r2 = Math.hypot(px - c2[0], v - c2[1]);
      const rings = Math.sin(r1 * 58 - phase * 4) * Math.sin(r2 * 51 + phase * 3);
      const rosette = Math.sin(Math.atan2(v - c1[1], px - c1[0]) * 12 + r1 * 22 - phase * 2);
      const signal = 0.5 + 0.5 * (rings * 0.75 + rosette * 0.25);
      const reach = smooth(0, 0.85, 1 - r1 / 1.25);
      const f = fade > 0 ? smooth(fade, fade + 0.35, u) : 1;
      const level = signal * reach * f;
      const glyph = GLYPHS[Math.floor(Math.min(0.999, Math.max(0, level)) * GLYPHS.length)];
      if (glyph === ' ') continue;
      const teal = smooth(0.55, 0.95, level);
      const alpha = 0.25 + 0.75 * level;
      ctx.fillStyle = tone === 'dark'
        ? `rgba(${Math.round(158 - 64 * teal)}, ${Math.round(179 + 40 * teal)}, ${Math.round(173 + 29 * teal)}, ${alpha})`
        : `rgba(${Math.round(69 - 56 * teal)}, ${Math.round(79 + 69 * teal)}, ${Math.round(77 + 59 * teal)}, ${alpha})`;
      ctx.fillText(glyph, x + cell / 2, y + cell / 2);
    }
  }
  canvas.dataset.ready = 'static';
}

export function AsciiField({
  tone = 'light',
  focus = [0.78, 0.45],
  fadeLeft = 0,
  className = '',
}: {
  tone?: 'light' | 'dark';
  /** Centre of the rings, in 0..1 of the canvas. */
  focus?: [number, number];
  /** Fade the field out to the left of this x (0..1); 0 disables. */
  fadeLeft?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [fx, fy] = focus;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: 'low-power' });
    if (!gl) {
      drawStatic(canvas, tone, fx, fy, fadeLeft);
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    const glyphs = atlas();
    const tex = gl.createTexture();
    const buf = gl.createBuffer();
    if (!vs || !fs || !program || !glyphs || !tex || !buf) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, glyphs);

    const u = (n: string) => gl.getUniformLocation(program, n);
    gl.uniform1i(u('u_glyphs'), 0);
    gl.uniform1f(u('u_dark'), tone === 'dark' ? 1 : 0);
    gl.uniform2f(u('u_focus'), fx, fy);
    gl.uniform1f(u('u_fade'), fadeLeft);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const started = performance.now();
    let visible = false;
    let frame: number | null = null;
    let last = 0;

    const draw = (now: number) => {
      frame = null;
      if (!visible) return;
      const still = reduce.matches;
      if (!still && now - last < 1000 / 24) {
        frame = requestAnimationFrame(draw);
        return;
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(u('u_resolution'), w, h);
      gl.uniform1f(u('u_cell'), (canvas.clientWidth < 640 ? 9 : 11) * dpr);
      gl.uniform1f(u('u_time'), still ? 18 : 18 + (now - started) / 1000);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      canvas.dataset.ready = 'true';
      last = now;
      if (!still) frame = requestAnimationFrame(draw);
    };
    const request = () => {
      if (visible && frame === null) frame = requestAnimationFrame(draw);
    };

    visible = true;
    request();
    const ro = new ResizeObserver(request);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) request();
      else if (frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
    });
    io.observe(canvas);
    reduce.addEventListener('change', request);

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      reduce.removeEventListener('change', request);
      gl.deleteBuffer(buf);
      gl.deleteTexture(tex);
      gl.deleteProgram(program);
    };
  }, [tone, fx, fy, fadeLeft]);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
