/**
 * Neural Noise Background Animation
 * Drop-in for asm0d3us5.github.io
 *
 * Targets: canvas#neural-bg
 * Respects: prefers-reduced-motion, page visibility
 * Performance: pauses when tab is hidden, cleans up on unload
 */

(function () {
  'use strict';

  // ── CONFIG ────────────────────────────────────────────────
  const CONFIG = {
    nodeCount: 38,           // number of floating nodes
    maxDist: 180,            // max px between connected nodes
    nodeMinR: 2,             // min node radius
    nodeMaxR: 4,             // max node radius
    speed: 0.28,             // base movement speed
    colorA: [74, 177, 255],  // blue  (#4ab1ff — matches --accent)
    colorB: [163, 113, 247], // purple (#a371f7 — matches skill-siem)
    bgAlpha: 0.0,            // canvas bg fill alpha (0 = fully transparent)
    lineAlpha: 0.22,         // max connection alpha
    nodeAlpha: 0.85,         // max node alpha
    glowThreshold: 0.7,      // pulse level above which glow renders
  };

  // ── INIT ──────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {

    // Respect reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = document.getElementById('neural-bg');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let nodes = [];
    let animId = null;
    let t = 0;

    // ── RESIZE ──────────────────────────────────────────────
    function resize() {
      const hero = canvas.parentElement;
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }

    // ── NODE FACTORY ────────────────────────────────────────
    function makeNode() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * CONFIG.speed,
        vy: (Math.random() - 0.5) * CONFIG.speed,
        r: Math.random() * (CONFIG.nodeMaxR - CONFIG.nodeMinR) + CONFIG.nodeMinR,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.018 + Math.random() * 0.022,
      };
    }

    function initNodes() {
      nodes = Array.from({ length: CONFIG.nodeCount }, makeNode);
    }

    // ── DRAW ────────────────────────────────────────────────
    function draw() {
      t++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subtle radial tint centred on canvas
      const grad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.65
      );
      grad.addColorStop(0, `rgba(${CONFIG.colorA.join(',')},0.04)`);
      grad.addColorStop(1, 'rgba(10,10,13,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Move nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        n.pulse += n.pulseSpeed;
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist >= CONFIG.maxDist) continue;

          const alpha = (1 - dist / CONFIG.maxDist) * CONFIG.lineAlpha;
          const lineGrad = ctx.createLinearGradient(
            nodes[i].x, nodes[i].y,
            nodes[j].x, nodes[j].y
          );
          lineGrad.addColorStop(0,   `rgba(${CONFIG.colorA.join(',')},${alpha})`);
          lineGrad.addColorStop(0.5, `rgba(${CONFIG.colorB.join(',')},${alpha * 0.6})`);
          lineGrad.addColorStop(1,   `rgba(${CONFIG.colorA.join(',')},${alpha})`);

          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = lineGrad;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const glow = (Math.sin(n.pulse) + 1) / 2;
        const alpha = 0.35 + glow * (CONFIG.nodeAlpha - 0.35);

        // Glow halo
        if (glow > CONFIG.glowThreshold) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${CONFIG.colorA.join(',')},${(glow - CONFIG.glowThreshold) * 0.18})`;
          ctx.fill();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${CONFIG.colorA.join(',')},${alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    // ── VISIBILITY API — pause when tab hidden ───────────────
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        draw();
      }
    });

    // ── RESPONSIVE ──────────────────────────────────────────
    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        cancelAnimationFrame(animId);
        resize();
        initNodes();
        draw();
      }, 150);
    });

    // ── START ───────────────────────────────────────────────
    resize();
    initNodes();
    draw();

    // ── CLEANUP ─────────────────────────────────────────────
    window.addEventListener('beforeunload', function () {
      cancelAnimationFrame(animId);
    });
  });

})();
