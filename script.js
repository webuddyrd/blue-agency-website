document.addEventListener("DOMContentLoaded", () => {
  const fadeIns = document.querySelectorAll(".fade-in");
  const fadeObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    }
  }, { threshold: 0.12 });
  fadeIns.forEach((el) => fadeObserver.observe(el));

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => navLinks.classList.toggle("show"));
  }

  const heroVideo = document.getElementById("hero-video");
  const heroFlag = document.getElementById("hero-flag");

  heroVideo.playbackRate = 0.5;
  heroFlag.playbackRate = 0.5;
});

/* =========================
   US SECTION LOGIC 
========================== */
const usSection = document.querySelector('.us');
const badges = usSection.querySelectorAll('.badge');

const usSectionObserver = new IntersectionObserver((entries) => {
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

usSectionObserver.observe(usSection);
/* =========================
   END OF US SECTION LOGIC
========================== */

/* =========================
   SERVICE SECTION LOGIC
========================== */
const wrapper = document.getElementById("services");
const overlayImg = document.getElementById("overlayImg");
const imageToOverlay = document.getElementById("imageToOverlay");

window.addEventListener("scroll", () => {
  const windowHeight = window.innerHeight  + 150;
  const wrapperTop = wrapper.offsetTop;
  const wrapperHeight = wrapper.offsetHeight;

  // Scroll distance inside wrapper
  let scrollInside = window.scrollY - wrapperTop;
  let maxScroll = wrapperHeight - windowHeight;
  scrollInside = Math.min(Math.max(scrollInside, 0), maxScroll);

  // Normalize progress 0 → 1
  let progress = scrollInside / maxScroll;

  // ---- Stage 1: Move 5.1 upward until it sticks ----
  if (progress <= 0.5) {
    const stageProgress = progress / 0.5; // 0 → 1 within first half
    imageToOverlay.style.transform = `translateY(${100 - stageProgress * 100}%)`; // 100% → 0%
    overlayImg.style.transform = `translateY(100%)`; // keep hidden
  }
  // ---- Stage 2: Hold 5.1 at top, slide 5.2 over it ----
  else {
    imageToOverlay.style.transform = `translateY(0%)`; // fixed at top
    const stageProgress = (progress - 0.5) / 0.5; // 0 → 1 within second half
    overlayImg.style.transform = `translateY(${100 - stageProgress * 200}%)`; // 100% → 0%
  }
});
/* =========================
   END OF SERVICE SECTION LOGIC
========================== */

/* =========================
   END OF SERVICE SECTION LOGIC
========================== */

/* =========================
   CHANGE STYLE ON USIMAGE SECTION
========================== */
const navbar = document.getElementById("nav");
const imagesContainer = document.getElementById("usImages");

window.addEventListener("scroll", () => {
  const navRect = navbar.getBoundingClientRect();
  const sectionRect = imagesContainer.getBoundingClientRect();

  // Navbar fully inside blue section
  const isInside =
    navRect.top >= sectionRect.top && navRect.bottom <= sectionRect.bottom;

  if (isInside) {
    navbar.classList.add("contrast");   // white text
  } else {
    navbar.classList.remove("contrast"); // black text
  }
});
/* =========================
   END OF CHANGE STYLE ON USIMAGE SECTION
========================== */