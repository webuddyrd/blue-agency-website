// script.js — portfolio scroll-scrub + regular fade-ins
document.addEventListener("DOMContentLoaded", () => {
  // ---------------- Regular fade-in for sections (unchanged behavior for non-portfolio) ----------------
  const fadeIns = document.querySelectorAll(".fade-in");
  const fadeObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    }
  }, { threshold: 0.12 });
  fadeIns.forEach((el) => fadeObserver.observe(el));

  // ---------------- Portfolio scroll-scrub (construct on down, reverse on up) ----------------
  const portfolio = document.querySelector("#portfolio.portfolio-section");
  if (portfolio) {
    portfolio.classList.add("scrub");
    const items = Array.from(portfolio.querySelectorAll(".img-float"));

    // Helper: clamp 0..1
    const clamp01 = (v) => Math.max(0, Math.min(1, v));

    // Progress mapping: 0 when section top is near 90% of viewport; 1 when near 35%
    const computeProgress = (rectTop, vh) => {
      const start = vh * 0.80; // begin revealing
      const end = vh * 0.15; // fully revealed
      return clamp01((start - rectTop) / (start - end));
    };

    // Per-item stagger based on delay-N classes (0..0.5)
    const getStagger = (el) => {
      for (let i = 5; i >= 1; i--) {
        if (el.classList.contains(`delay-${i}`)) return i * 0.10; // 0.1, 0.2, ... 0.5
      }
      return 0;
    };

    let ticking = false;
    const update = () => {
      const rect = portfolio.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      const baseP = computeProgress(rect.top, vh);

      // Drive each image with a slightly delayed progress for cascade
      for (const el of items) {
        const d = getStagger(el);
        const p = clamp01((baseP - d) / (1 - d));
        const prev = parseFloat(getComputedStyle(el).getPropertyValue("--p")) || 0;
        if (Math.abs(p - prev) > 0.003) el.style.setProperty("--p", p.toFixed(3));
      }
      ticking = false;
    };

    const onScrollResize = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    // Initial paint & listeners
    onScrollResize();
    window.addEventListener("scroll", onScrollResize, { passive: true });
    window.addEventListener("resize", onScrollResize, { passive: true });
  }

  // ---------------- UI bits (with safety checks) ----------------
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => navLinks.classList.toggle("show"));
  }

  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const body = document.body;
      body.classList.toggle("light-mode");
      body.classList.toggle("dark-mode");
      const icon = themeToggle.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-sun");
        icon.classList.toggle("fa-moon");
      }
    });
  }

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for your message! We'll get back to you shortly.");
      contactForm.reset();
    });
  }

  const heroVideo = document.getElementById("hero-video");
  const heroFlag = document.getElementById("hero-flag");

  heroVideo.playbackRate = 0.5;
  heroFlag.playbackRate = 0.5;
});

// ===== Brands scroll-scrub (construct on down, reverse on up) =====
(function initBrandsScrub() {
  const section = document.querySelector("#brands.brands-section");
  if (!section) return;
  section.classList.add("scrub");

  const items = Array.from(section.querySelectorAll(".slider-row img"));
  if (!items.length) return;

  // Helpers
  const clamp01 = (v) => Math.max(0, Math.min(1, v));
  const computeProgress = (top, vh) => {
    // 0 when section top ~90% viewport; 1 when ~35%
    const start = vh * 0.80, end = vh * 0.40;
    return clamp01((start - top) / (start - end));
  };

  // Index-based stagger so logos cascade in (up to 0.4 total delay)
  const getStagger = (_, i) => Math.min(i * 0.04, 0.40);

  let ticking = false;
  const update = () => {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const rect = section.getBoundingClientRect();
    const baseP = computeProgress(rect.top, vh);

    items.forEach((el, i) => {
      const d = getStagger(el, i);
      const p = clamp01((baseP - d) / (1 - d)); // apply stagger
      const prev = parseFloat(getComputedStyle(el).getPropertyValue("--p")) || 0;
      if (Math.abs(p - prev) > 0.003) el.style.setProperty("--p", p.toFixed(3));
    });

    ticking = false;
  };

  const onScrollResize = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  // Initial paint + listeners
  onScrollResize();
  window.addEventListener("scroll", onScrollResize, { passive: true });
  window.addEventListener("resize", onScrollResize, { passive: true });
})();

//Observer to trigger animations in US SECTION
const usSection = document.querySelector('.us');
const badges = usSection.querySelectorAll('.badge');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      usSection.classList.add('active');
      badges.forEach(badge => badge.classList.add('show'));
    } else {
      // Reset when leaving → hide all instantly
      usSection.classList.remove('active');
      badges.forEach(badge => badge.classList.remove('show'));
    }
  });
}, { threshold: 0.3 });

observer.observe(usSection);
