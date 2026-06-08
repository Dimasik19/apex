(function () {
  const translations = {
    ru: {
      "nav.solutions": "Решения",
      "nav.calculator": "Калькулятор",
      "cta.getStarted": "Начать",
      "hero.title": "Современные инвестиции.",
      "hero.subtitle": "Высокая доходность. Безопасно. Просто.",
      "stats.investors": "Активных инвесторов",
      "stats.margin": "Средняя маржинальность",
      "stats.funds": "Общий капитал",
      "solutions.global.title": "Доступ к глобальным рынкам.",
      "solutions.global.text": "Расширяйте инвестиционные возможности за пределами локального рынка через доступ к международным финансовым инструментам.",
      "solutions.arbitrage.title": "Арбитражные стратегии.",
      "solutions.arbitrage.text": "Используйте рыночно-нейтральные арбитражные возможности, рассчитанные на стабильную доходность при контролируемом уровне риска.",
      "solutions.security.title": "Высокий уровень защиты.",
      "solutions.security.text": "Ваш капитал защищен системой риск-менеджмента, прозрачными операционными процессами и строгими стандартами контроля.",
      "calculator.title": "Калькулятор доходности",
      "calculator.text": "Распределите инвестиции между RUB и USD и сразу посмотрите потенциальный результат.",
      "calculator.investment": "Инвестиции, RUB",
      "calculator.usdShare": "Доля USD",
      "calculator.rubAmount": "Сумма в RUB",
      "calculator.usdAmount": "Сумма в USD",
      "calculator.years": "Срок",
      "calculator.loadingRate": "Загрузка курса USD/RUB...",
      "calculator.totalLabel": "Итоговая стоимость в RUB за весь период после комиссии",
      "calculator.wholeProfit": "Прибыль за весь период",
      "calculator.annualProfit": "Годовая прибыль в RUB",
      "testimonials.title": "Нам доверяют инвесторы.",
      "testimonials.subtitle": "Что говорят наши клиенты.",
      "testimonials.one.text": "“Я вложил средства без лишней сложности. Процесс был понятным и безопасным, а доход теперь поступает регулярно.”",
      "testimonials.one.name": "Алексей М.",
      "testimonials.one.role": "Частный инвестор",
      "testimonials.two.text": "“Apex помог легко распределить капитал между RUB и USD. Я понимаю, где находятся мои средства и как они работают.”",
      "testimonials.two.name": "Мария С.",
      "testimonials.two.role": "Портфельный клиент",
      "testimonials.three.text": "“Контроль рисков дал мне уверенность начать. Подключение прошло просто, а регулярный доход стал частью моего финансового плана.”",
      "testimonials.three.name": "Дмитрий К.",
      "testimonials.three.role": "Долгосрочный инвестор",
      "signup.title": "Начните инвестировать.",
      "signup.subtitle": "Получите консультацию и все условия.",
      "form.name": "Имя",
      "form.phone": "Телефон",
      "form.button": "Начать инвестировать",
      "faq.one.question": "Как оформляется инвестирование?",
      "faq.one.answer": "Инвестирование оформляется через открытие брокерского счета на ваше имя. После этого управляющим Apex предоставляется доступ к управлению счетом в рамках согласованного инвестиционного мандата.",
      "faq.two.question": "Есть ли гарантии доходности?",
      "faq.two.answer": "Нет. Доходность не гарантируется и зависит от рыночной конъюнктуры. В калькуляторе показана потенциальная доходность на основе предыдущих периодов, она не является обещанием будущего дохода.",
      "faq.three.question": "Нужно ли платить налоги с дохода?",
      "faq.three.answer": "Налог с полученного дохода будет удержан автоматически вашим брокером согласно применимым правилам.",
      "footer.company": "Компания",
      "footer.about": "О нас",
      "footer.careers": "Карьера",
      "footer.blog": "Блог",
      "footer.products": "Продукты",
      "footer.features": "Возможности",
      "footer.calculator": "Калькулятор",
      "footer.support": "Поддержка",
      "footer.help": "Помощь",
      "footer.terms": "Условия",
      "footer.privacy": "Надежность",
      "footer.contact": "Контакты",
      "footer.partners": "Партнеры",
      "footer.press": "Пресса",
      "footer.contactUs": "Связаться"
    },
    en: {
      "nav.solutions": "Solutions",
      "nav.calculator": "Profit Calculator",
      "cta.getStarted": "Get Started",
      "hero.title": "Modern Investment.",
      "hero.subtitle": "High yield. Secure. Easy.",
      "stats.investors": "Active Investors",
      "stats.margin": "Average Profit Margin",
      "stats.funds": "Total Funds",
      "solutions.global.title": "Global Market Access.",
      "solutions.global.text": "Expand your investment opportunities beyond local boundaries with seamless access to international financial markets.",
      "solutions.arbitrage.title": "Arbitrage Strategies.",
      "solutions.arbitrage.text": "Benefit from market-neutral arbitrage opportunities designed to generate consistent returns with controlled risk exposure.",
      "solutions.security.title": "Top-grade security.",
      "solutions.security.text": "Your capital is protected through robust risk management frameworks, transparent operational processes, and strict compliance standards.",
      "calculator.title": "Profit Calculator",
      "calculator.text": "Split your investment between RUB and USD exposure, then see the projected result instantly.",
      "calculator.investment": "Investment, RUB",
      "calculator.usdShare": "USD share",
      "calculator.rubAmount": "RUB amount",
      "calculator.usdAmount": "USD amount",
      "calculator.years": "Years",
      "calculator.loadingRate": "Loading USD/RUB rate...",
      "calculator.totalLabel": "Total value in RUB for whole period after commission",
      "calculator.wholeProfit": "Profit for whole period",
      "calculator.annualProfit": "Annual profit in RUB",
      "testimonials.title": "Trusted by investors.",
      "testimonials.subtitle": "What our clients say.",
      "testimonials.one.text": "“I invested without the usual complexity. The process was clear, secure, and my returns now arrive on a steady schedule.”",
      "testimonials.one.name": "Alexey M.",
      "testimonials.one.role": "Private Investor",
      "testimonials.two.text": "“Apex made it easy to diversify between RUB and USD exposure. I always understand where my capital is and how it is working.”",
      "testimonials.two.name": "Maria S.",
      "testimonials.two.role": "Portfolio Client",
      "testimonials.three.text": "“The risk controls gave me confidence to start. The setup was simple, and the regular income has become part of my monthly plan.”",
      "testimonials.three.name": "Dmitry K.",
      "testimonials.three.role": "Long-term Investor",
      "signup.title": "Start your investment.",
      "signup.subtitle": "Get consultancy and all conditions.",
      "form.name": "Name",
      "form.phone": "phone",
      "form.button": "Start investment",
      "faq.one.question": "How is the investment arranged?",
      "faq.one.answer": "The investment is arranged through opening a brokerage account in your name. Access to manage the account is then provided to Apex managers under the agreed investment mandate.",
      "faq.two.question": "Do I have guaranteed returns?",
      "faq.two.answer": "No. Returns are not guaranteed and depend on market conditions. The calculator shows potential returns based on previous periods and should not be treated as a promise of future income.",
      "faq.three.question": "Do I need to pay taxes on the income?",
      "faq.three.answer": "Tax on the received income will be withheld automatically by your broker according to the applicable rules.",
      "footer.company": "Company",
      "footer.about": "About Us",
      "footer.careers": "Careers",
      "footer.blog": "Blog",
      "footer.products": "Products",
      "footer.features": "Features",
      "footer.calculator": "Calculator",
      "footer.support": "Support",
      "footer.help": "Help Center",
      "footer.terms": "Terms",
      "footer.privacy": "Privacy",
      "footer.contact": "Contact",
      "footer.partners": "Partners",
      "footer.press": "Press",
      "footer.contactUs": "Contact Us"
    }
  };

  function applyLanguage(lang) {
    const dictionary = translations[lang] || translations.ru;
    window.apexLang = lang;
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (dictionary[key]) {
        element.textContent = dictionary[key];
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const key = element.getAttribute("data-i18n-placeholder");
      if (dictionary[key]) {
        element.setAttribute("placeholder", dictionary[key]);
      }
    });

    document.querySelectorAll(".lang-button").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.lang === lang);
    });

    window.dispatchEvent(new CustomEvent("apex:languagechange", { detail: { lang } }));
  }

  window.apexApplyLanguage = applyLanguage;

  document.querySelectorAll(".lang-button").forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.lang));
  });

  applyLanguage("en");
})();
