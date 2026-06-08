(function () {
  const canvas = document.querySelector(".grid-landscape");
  if (!canvas) {
    return;
  }

  const ctx = canvas.getContext("2d", { alpha: true });
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointer = {
    x: 0,
    y: 0,
    active: false,
    strength: 0
  };

  let width = 0;
  let height = 0;
  let dpr = 1;
  let rafId = 0;

  function cssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function rgba(name, alpha) {
    return `rgba(${cssVar(name)}, ${alpha})`;
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function terrainY(x, depth, time) {
    const horizon = height * 0.24;
    const ground = height * 0.92;
    const perspective = depth * depth;
    const base = horizon + (ground - horizon) * perspective;
    const fade = Math.pow(1 - depth, 1.2);
    const mountain = Math.sin(x * 0.0035 + time * 0.00018) * 18 * fade;
    const ridge = Math.sin(x * 0.0065 - time * 0.00012) * 7 * fade;
    return base + mountain + ridge;
  }

  function pointerWave(x, y, time) {
    if (pointer.strength < 0.01) {
      return 0;
    }

    const dx = x - pointer.x;
    const dy = y - pointer.y;
    const distance = Math.hypot(dx, dy);
    const radius = Math.min(width, height) * 0.34;

    if (distance > radius) {
      return 0;
    }

    const falloff = 1 - distance / radius;
    const ripple = Math.sin(distance * 0.038 - time * 0.005);
    return ripple * falloff * falloff * 22 * pointer.strength;
  }

  function drawLine(points, color, lineWidth) {
    if (points.length < 2) {
      return;
    }

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length - 1; i += 1) {
      const current = points[i];
      const next = points[i + 1];
      const midX = (current.x + next.x) * 0.5;
      const midY = (current.y + next.y) * 0.5;
      ctx.quadraticCurveTo(current.x, current.y, midX, midY);
    }

    const last = points[points.length - 1];
    ctx.lineTo(last.x, last.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }

  function render(time) {
    ctx.clearRect(0, 0, width, height);

    pointer.strength += ((pointer.active ? 1 : 0) - pointer.strength) * 0.08;

    const horizon = height * 0.24;
    const bottom = height * 0.96;
    const centerX = width * 0.5;
    const rows = 22;
    const columns = 28;
    const rowColor = rgba("--gold-rgb", 0.12);
    const columnColor = rgba("--olive-rgb", 0.12);
    const glowColor = rgba("--gold-rgb", 0.08 + pointer.strength * 0.28);

    ctx.save();
    ctx.globalCompositeOperation = "multiply";

    for (let r = 1; r <= rows; r += 1) {
      const depth = r / rows;
      const points = [];
      const spread = width * (0.1 + depth * 0.58);
      const segments = 120;

      for (let s = 0; s <= segments; s += 1) {
        const t = s / segments;
        const x = centerX - spread + spread * 2 * t;
        const y = terrainY(x, depth, time) + pointerWave(x, terrainY(x, depth, time), time);
        points.push({ x, y });
      }

      drawLine(points, r % 5 === 0 ? glowColor : rowColor, r % 5 === 0 ? 1.2 : 0.8);
    }

    for (let c = -columns; c <= columns; c += 1) {
      const points = [];
      const offset = c / columns;
      const segments = 112;

      for (let s = 0; s <= segments; s += 1) {
        const depth = s / segments;
        const spread = width * (0.1 + depth * 0.58);
        const x = centerX + offset * spread;
        const baseY = terrainY(x, depth, time);
        const y = baseY + pointerWave(x, baseY, time);
        points.push({ x, y });
      }

      drawLine(points, c % 5 === 0 ? glowColor : columnColor, c % 5 === 0 ? 1.1 : 0.75);
    }

    const gradient = ctx.createLinearGradient(0, horizon, 0, bottom);
    gradient.addColorStop(0, rgba("--background-rgb", 0.78));
    gradient.addColorStop(0.32, rgba("--background-rgb", 0.16));
    gradient.addColorStop(1, rgba("--background-rgb", 0.72));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, horizon - 80, width, bottom - horizon + 140);
    ctx.restore();

    rafId = window.requestAnimationFrame(render);
  }

  function start() {
    if (!rafId) {
      rafId = window.requestAnimationFrame(render);
    }
  }

  function stop() {
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    }
  }

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = true;
  });
  window.addEventListener("pointerleave", () => {
    pointer.active = false;
  });
  window.addEventListener("blur", () => {
    pointer.active = false;
  });

  reduceMotion.addEventListener("change", () => {
    if (reduceMotion.matches) {
      stop();
      render(0);
      stop();
    } else {
      start();
    }
  });

  resize();
  if (reduceMotion.matches) {
    render(0);
    stop();
  } else {
    start();
  }
})();
