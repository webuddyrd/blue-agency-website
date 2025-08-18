// script.js

document.addEventListener("DOMContentLoaded", () => {
  // Scroll animation
  const fadeIns = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.1
  });

  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      appearOnScroll.unobserve(entry.target);
    });
  }, appearOptions);

  fadeIns.forEach(fader => appearOnScroll.observe(fader));

  fadeIns.forEach(el => observer.observe(el));
  // Contact form submission (mock)
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you shortly.");
    contactForm.reset();
  });
});
