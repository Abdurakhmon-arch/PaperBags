(function () {
  "use strict";

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const open = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("open", !open);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("open");
      });
    });
  }

  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  const chartFills = document.querySelectorAll(".chart-fill");
  const chartObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const fills = entry.target.querySelectorAll(".chart-fill");
        fills.forEach((fill) => {
          const w = fill.style.getPropertyValue("--w");
          fill.style.width = "0%";
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              fill.style.width = w;
            });
          });
        });
        chartObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.3 }
  );
  document.querySelectorAll(".impact-chart").forEach((chart) => chartObserver.observe(chart));

  const form = document.getElementById("pledge-form");
  const message = document.getElementById("form-message");

  if (form && message) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.querySelector("#email");
      if (!email || !email.value.trim()) return;

      message.textContent = "Thanks! You're on the Paper First pledge list.";
      message.classList.add("success");
      form.reset();
    });
  }
})();
