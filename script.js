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

window.addEventListener("scroll", () => {
  const windowHeight = window.innerHeight;
  const wrapperTop = wrapper.offsetTop;
  const wrapperHeight = wrapper.offsetHeight;

  // How much we've scrolled inside the wrapper
  let scrollInside = window.scrollY - wrapperTop;

  // Clamp to 0–(wrapperHeight - viewportHeight)
  let maxScroll = wrapperHeight - windowHeight;
  scrollInside = Math.min(Math.max(scrollInside, 0), maxScroll);

  // Normalize to 0–1
  let progress = scrollInside / maxScroll;

  // Move overlay fully from hidden → cover
  overlayImg.style.transform = `translateY(${100 - progress * 200}%)`;
});
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