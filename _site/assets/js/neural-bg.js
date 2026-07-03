/**
 * Neural Noise Background Animation
 * Targets: canvas#neural-bg inside div.neural-hero
 * Respects prefers-reduced-motion + pauses on hidden tab
 */
(function () {
  'use strict';

  var CONFIG = {
    nodeCount: 55,       // more nodes = denser network across full page
    maxDist: 200,        // longer connections for wider spread
    nodeMinR: 1.5,
    nodeMaxR: 3.5,
    speed: 0.22,         // slightly slower = more elegant
    colorA: [74, 177, 255],
    colorB: [163, 113, 247],
    lineAlpha: 0.18,
    nodeAlpha: 0.9,
    glowThreshold: 0.65,
  };

  document.addEventListener('DOMContentLoaded', function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var canvas = document.getElementById('neural-bg');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var nodes = [];
    var animId = null;

    function resize() {
      var hero = canvas.parentElement;           // .neural-hero
      canvas.width  = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }

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
      nodes = [];
      for (var i = 0; i < CONFIG.nodeCount; i++) nodes.push(makeNode());
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subtle radial tint
      var grad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.65
      );
      grad.addColorStop(0, 'rgba(' + CONFIG.colorA + ',0.04)');
      grad.addColorStop(1, 'rgba(10,10,13,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Move
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        n.pulse += n.pulseSpeed;
      }

      // Connections
      for (var i = 0; i < nodes.length; i++) {
        for (var j = i + 1; j < nodes.length; j++) {
          var dx = nodes[i].x - nodes[j].x;
          var dy = nodes[i].y - nodes[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist >= CONFIG.maxDist) continue;
          var alpha = (1 - dist / CONFIG.maxDist) * CONFIG.lineAlpha;
          var lg = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
          lg.addColorStop(0,   'rgba(' + CONFIG.colorA + ',' + alpha + ')');
          lg.addColorStop(0.5, 'rgba(' + CONFIG.colorB + ',' + (alpha * 0.6) + ')');
          lg.addColorStop(1,   'rgba(' + CONFIG.colorA + ',' + alpha + ')');
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = lg;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Nodes
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        var glow = (Math.sin(n.pulse) + 1) / 2;
        var alpha = 0.35 + glow * (CONFIG.nodeAlpha - 0.35);
        if (glow > CONFIG.glowThreshold) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(' + CONFIG.colorA + ',' + ((glow - CONFIG.glowThreshold) * 0.18) + ')';
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + CONFIG.colorA + ',' + alpha + ')';
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    // Visibility API
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { cancelAnimationFrame(animId); }
      else { draw(); }
    });

    // Debounced resize
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        cancelAnimationFrame(animId);
        resize();
        initNodes();
        draw();
      }, 150);
    });

    // Cleanup
    window.addEventListener('beforeunload', function () {
      cancelAnimationFrame(animId);
    });

    resize();
    initNodes();
    draw();
  });
})();
