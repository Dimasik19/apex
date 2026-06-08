(function () {
  const widget = document.querySelector(".calculator-widget");
  if (!widget) {
    return;
  }

  const controls = {
    amount: widget.querySelector('[data-calc="amount"]'),
    usdShare: widget.querySelector('[data-calc="usdShare"]'),
    years: widget.querySelector('[data-calc="years"]')
  };
  const defaultReturns = {
    rub: 30,
    usd: 20,
    fx: 8
  };

  const output = {
    usdShare: widget.querySelector('[data-output="usdShare"]'),
    rubAllocation: widget.querySelector('[data-output="rubAllocation"]'),
    usdAllocation: widget.querySelector('[data-output="usdAllocation"]'),
    years: widget.querySelector('[data-output="years"]'),
    rateNote: widget.querySelector('[data-output="rateNote"]'),
    chartNote: widget.querySelector('[data-output="chartNote"]'),
    totalValue: widget.querySelector('[data-output="totalValue"]'),
    wholeProfit: widget.querySelector('[data-output="wholeProfit"]'),
    annualProfit: widget.querySelector('[data-output="annualProfit"]')
  };

  const chart = widget.querySelector(".growth-chart");
  const ctx = chart.getContext("2d");
  const money = new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: 0
  });
  const usdMoney = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0
  });
  let usdRubRate = 90;
  let rateSource = "fallback rate";
  const animatedValues = new WeakMap();

  function parseAmount(value) {
    return Number(String(value).replace(/[^\d]/g, ""));
  }

  function formatAmountInput(input) {
    const value = parseAmount(input.value);
    input.value = value ? money.format(value) : "";
  }

  function readNumber(input, fallback) {
    const value = input === controls.amount ? parseAmount(input.value) : Number(input.value);
    return Number.isFinite(value) ? value : fallback;
  }

  function formatRub(value) {
    return `${money.format(Math.round(value))} RUB`;
  }

  function formatNumber(value) {
    return money.format(Math.round(value));
  }

  function formatUsd(value) {
    return `${usdMoney.format(Math.round(value))} USD`;
  }

  function cssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function getLanguageCopy() {
    if (window.apexLang === "en") {
      return {
        year: "year",
        years: "years",
        rate: "USD/RUB rate",
        chartNote: (rubReturn, usdReturn, fxReturn) =>
          `avrg RUB yield after commission: ${rubReturn}%; avrg USD yield after commission: ${usdReturn}%; planned FX growth: +${fxReturn}%/year`,
        bars: ["RUB yield", "USD yield", "FX effect"]
      };
    }

    return {
      year: "год",
      years: "лет",
      rate: "Курс USD/RUB",
      chartNote: (rubReturn, usdReturn, fxReturn) =>
        `средн. доходность RUB после комиссии: ${rubReturn}%; средн. доходность USD после комиссии: ${usdReturn}%; плановый рост FX: +${fxReturn}%/год`,
      bars: ["Доходность RUB", "Доходность USD", "Эффект FX"]
    };
  }

  function animateValue(element, nextValue, formatter) {
    const previous = animatedValues.get(element);
    const from = previous ? previous.value : nextValue;
    const animation = previous && previous.animation ? previous.animation : null;

    if (animation) {
      window.cancelAnimationFrame(animation);
    }

    const start = performance.now();
    const duration = 520;

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = from + (nextValue - from) * eased;

      element.textContent = formatter(value);
      animatedValues.set(element, { value, animation: 0 });

      if (progress < 1) {
        const frame = window.requestAnimationFrame(tick);
        animatedValues.set(element, { value, animation: frame });
      } else {
        element.textContent = formatter(nextValue);
        animatedValues.set(element, { value: nextValue, animation: 0 });
      }
    }

    const frame = window.requestAnimationFrame(tick);
    animatedValues.set(element, { value: from, animation: frame });
  }

  function project(amount, rubShare, usdShare, rubReturn, usdReturn, fxReturn, years) {
    const months = years * 12;
    const rubRate = rubReturn / 100 / 12;
    const usdRate = usdReturn / 100 / 12;
    const fxRate = fxReturn / 100 / 12;
    const rubAllocation = amount * rubShare;
    const usdAllocationRub = amount * usdShare;
    const usdAllocation = usdRubRate > 0 ? usdAllocationRub / usdRubRate : 0;
    const futureUsdRubRate = usdRubRate * Math.pow(1 + fxRate, months);
    let rubBalance = rubAllocation;
    let usdBalance = usdAllocation;

    for (let month = 1; month <= months; month += 1) {
      rubBalance *= 1 + rubRate;
      usdBalance *= 1 + usdRate;
    }

    const rubYieldGain = rubBalance - rubAllocation;
    const usdYieldGainRub = (usdBalance - usdAllocation) * usdRubRate;
    const fxEffect = usdBalance * (futureUsdRubRate - usdRubRate);
    const total = rubBalance + usdBalance * futureUsdRubRate;

    return {
      rubAllocation,
      usdAllocation,
      rubBalance,
      usdBalance,
      futureUsdRubRate,
      rubYieldGain,
      usdYieldGainRub,
      fxEffect,
      total,
      bars: [rubYieldGain, usdYieldGainRub, fxEffect]
    };
  }

  function drawChart(values, labels) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const box = chart.getBoundingClientRect();
    chart.width = Math.floor(box.width * dpr);
    chart.height = Math.floor(box.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, box.width, box.height);

    const pad = 22;
    const labelHeight = 46;
    const width = box.width - pad * 2;
    const height = box.height - pad * 2 - labelHeight;
    const colors = [cssVar("--gold"), cssVar("--olive"), cssVar("--stone")];
    const bars = values.map((value, index) => ({ value, label: labels[index], color: colors[index] }));
    const max = Math.max(...bars.map((bar) => Math.abs(bar.value)), 1);
    const baseline = pad + height;

    ctx.strokeStyle = `rgba(${cssVar("--text-rgb")}, 0.08)`;
    ctx.lineWidth = 1;
    for (let i = 0; i <= 3; i += 1) {
      const y = pad + (height / 3) * i;
      ctx.beginPath();
      ctx.moveTo(pad, y);
      ctx.lineTo(pad + width, y);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.moveTo(pad, baseline);
    ctx.lineTo(pad + width, baseline);
    ctx.strokeStyle = `rgba(${cssVar("--text-rgb")}, 0.14)`;
    ctx.lineWidth = 1.4;
    ctx.stroke();

    const slot = width / bars.length;
    const barWidth = Math.min(86, slot * 0.48);

    bars.forEach((bar, index) => {
      const x = pad + slot * index + slot / 2 - barWidth / 2;
      const barHeight = Math.max(4, (Math.abs(bar.value) / max) * (height * 0.88));
      const y = baseline - barHeight;
      const radius = 10;

      ctx.fillStyle = bar.color;
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + barWidth - radius, y);
      ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius);
      ctx.lineTo(x + barWidth, baseline);
      ctx.lineTo(x, baseline);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = cssVar("--text");
      ctx.font = "800 15px Inter, Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(formatNumber(bar.value), x + barWidth / 2, Math.max(18, y - 10));

      ctx.fillStyle = cssVar("--muted");
      ctx.font = "800 12px Inter, Arial, sans-serif";
      ctx.fillText(bar.label, x + barWidth / 2, baseline + 24);
    });
  }

  function update() {
    const copy = getLanguageCopy();
    const amount = Math.max(readNumber(controls.amount, 0), 0);
    const usdShare = Math.min(Math.max(readNumber(controls.usdShare, 0), 0), 100) / 100;
    const rubShare = 1 - usdShare;
    const rubReturn = defaultReturns.rub;
    const usdReturn = defaultReturns.usd;
    const fxReturn = defaultReturns.fx;
    const years = readNumber(controls.years, 1);
    const result = project(amount, rubShare, usdShare, rubReturn, usdReturn, fxReturn, years);

    output.usdShare.textContent = `${Math.round(rubShare * 100)}% RUB / ${Math.round(usdShare * 100)}% USD`;
    animateValue(output.rubAllocation, result.rubAllocation, formatRub);
    animateValue(output.usdAllocation, result.usdAllocation, formatUsd);
    output.years.textContent = `${years} ${years === 1 ? copy.year : copy.years}`;
    output.rateNote.textContent = `${copy.rate}: 1 USD = ${money.format(usdRubRate)} RUB`;
    output.chartNote.textContent = copy.chartNote(rubReturn, usdReturn, fxReturn);
    animateValue(output.totalValue, result.total, formatNumber);
    animateValue(output.wholeProfit, result.total - amount, (value) => `+${formatNumber(value)}`);
    animateValue(output.annualProfit, (result.total - amount) / years, formatNumber);
    drawChart(result.bars, copy.bars);
  }

  async function loadUsdRate() {
    try {
      const response = await fetch("https://open.er-api.com/v6/latest/USD");
      if (!response.ok) {
        throw new Error("rate request failed");
      }

      const data = await response.json();
      const rate = Number(data && data.rates && data.rates.RUB);
      if (!Number.isFinite(rate) || rate <= 0) {
        throw new Error("rate is unavailable");
      }

      usdRubRate = rate;
      rateSource = "open.er-api.com";
      update();
    } catch (error) {
      rateSource = "fallback rate, API unavailable";
      update();
    }
  }

  Object.values(controls).forEach((control) => {
    control.addEventListener("input", update);
  });
  controls.amount.addEventListener("input", () => {
    formatAmountInput(controls.amount);
  });
  window.addEventListener("resize", update);
  window.addEventListener("apex:languagechange", update);
  window.addEventListener("apex:themechange", update);
  formatAmountInput(controls.amount);
  update();
  loadUsdRate();
})();
