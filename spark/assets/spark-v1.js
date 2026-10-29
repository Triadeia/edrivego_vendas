(() => {
  "use strict";
  const fields = Array.from(document.querySelectorAll("[data-field]"));
  const profileButtons = Array.from(document.querySelectorAll("[data-profile]"));
  const periodButtons = Array.from(document.querySelectorAll("[data-period]"));
  const normal = { kmDay: 180, daysWeek: 6, gasPrice: 6.2, kmL: 10, kwhPrice: 1.1, evKwh100: 13, manutMes: 300 };
  const intensive = { kmDay: 220, daysWeek: 6, gasPrice: 6.2, kmL: 9, kwhPrice: 1.1, evKwh100: 14, manutMes: 400 };
  let period = "mes";
  const formatBRL = value => "R$ " + value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const setResult = (key, value) => document.querySelectorAll('[data-result="' + key + '"]').forEach(el => { el.textContent = value; });
  function readValues() {
    return Object.fromEntries(fields.map(input => {
      let value = Number(input.value);
      if (!Number.isFinite(value)) value = 0;
      value = Math.max(0, value);
      if (input.dataset.field === "daysWeek") value = Math.min(7, value);
      return [input.dataset.field, value];
    }));
  }
  function calculate(v, chosenPeriod) {
    const workDaysMonth = v.daysWeek * 4.33;
    const maintenanceDay = workDaysMonth > 0 ? v.manutMes / workDaysMonth : 0;
    const gasKm = v.kmL > 0 ? v.gasPrice / v.kmL : 0;
    const evKm = v.evKwh100 / 100 * v.kwhPrice;
    const gasDay = v.kmDay * gasKm + maintenanceDay;
    const evDay = v.kmDay * evKm;
    const multiplier = { dia: 1, semana: v.daysWeek, mes: workDaysMonth, ano: workDaysMonth * 12 }[chosenPeriod];
    return { gasKm, evKm, gasDay, evDay, saving: Math.max(0, gasDay - evDay) * multiplier };
  }
  function update() {
    const v = readValues();
    const r = calculate(v, period);
    const invalid = v.kmL === 0 && v.kmDay > 0;
    setResult("calcGasDay", invalid ? "—" : formatBRL(r.gasDay));
    setResult("calcEvDay", formatBRL(r.evDay));
    setResult("calcSaving", invalid ? "—" : formatBRL(r.saving));
    setResult("calcPeriodLabel", { dia: "/dia", semana: "/semana", mes: "/mês", ano: "/ano" }[period]);
    setResult("costKmGas", invalid ? "Informe km/l" : formatBRL(r.gasKm) + "/km");
    setResult("costKmEv", formatBRL(r.evKm) + "/km");
    const bar = document.querySelector("[data-ev-bar]");
    if (bar) bar.style.width = (r.gasKm > 0 ? Math.min(100, Math.max(4, r.evKm / r.gasKm * 100)) : 0) + "%";
  }
  function selectProfile(name) {
    profileButtons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.profile === name)));
    const defaults = name === "normal" ? normal : name === "intensive" ? intensive : null;
    if (defaults) fields.forEach(input => { input.value = defaults[input.dataset.field]; });
    update();
  }
  fields.forEach(input => input.addEventListener("input", () => {
    if (Number(input.value) < 0) input.value = 0;
    if (input.dataset.field === "daysWeek" && Number(input.value) > 7) input.value = 7;
    selectProfile("custom");
  }));
  profileButtons.forEach(button => button.addEventListener("click", () => selectProfile(button.dataset.profile)));
  periodButtons.forEach(button => button.addEventListener("click", () => {
    period = button.dataset.period;
    periodButtons.forEach(item => item.setAttribute("aria-pressed", String(item === button)));
    update();
  }));
  document.querySelector("[data-intensive]").addEventListener("click", () => {
    selectProfile("intensive");
    document.getElementById("calculadora").scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  });
  update();
})();