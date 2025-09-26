document.addEventListener("DOMContentLoaded", () => {
  const fadeIns = document.querySelectorAll(".fade-in");
  const fadeObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    }
  }, { threshold: 0.12 });
  fadeIns.forEach((el) => fadeObserver.observe(el));
  
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
   SEND MAIL FUNCTION
========================== */
document.getElementById("contact-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.currentTarget;
  const btn = form.querySelector("button");
  btn.disabled = true;

  try {
    const SERVICE_ID = "service_fp7gnrh";
    const TEMPLATE_ID = "template_2b0n846";

    const data = {
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      service: form.service.value,
      message: form.message.value
    };

    await emailjs.send(SERVICE_ID, TEMPLATE_ID, data);
    Swal.fire({
      title: "✅ Envío exitoso",
      text: "Tu mensaje fue enviado. Te contactaremos pronto.",
      icon: "success",
      confirmButtonText: "OK"
    });
    form.reset();
  } catch (err) {
    Swal.fire({
      title: "❌ Error al enviar",
      text: "No se pudo enviar tu mensaje. Intenta de nuevo.",
      icon: "error",
      confirmButtonText: "OK"
    });
  } finally {
    btn.disabled = false;
  }
});
/* =========================
   END OF SEND MAIL FUNCTION
========================== */