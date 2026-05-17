/* FIX: prevent browser restoring scroll position */
history.scrollRestoration = "manual";
window.scrollTo(0, 0);

/* =============================================
   LOCK SCROLL DURING INTRO
============================================= */
document.body.classList.add("intro-active");

/* =============================================
   INTRO → MAIN TRANSITION
============================================= */
const startBtn = document.getElementById("start-btn");
const introScreen = document.getElementById("intro-screen");
const mainContent = document.getElementById("main-content");

startBtn.addEventListener("click", () => {
  introScreen.style.opacity = "0";
  introScreen.style.transition = "opacity 0.8s ease";

  setTimeout(() => {
    introScreen.style.display = "none";
    mainContent.style.display = "block";

    /* Unlock scrolling */
    document.body.classList.remove("intro-active");
    document.body.style.overflow = "auto";

    /* Go to top */
    window.scrollTo({ top: 0, behavior: "instant" });

    /* Trigger initial fade-up check */
    showOnScroll();
  }, 900);
});

/* =============================================
   SCROLL REVEAL ANIMATIONS
============================================= */
function showOnScroll() {
  const fadeElements = document.querySelectorAll(".fade-up");
  fadeElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", showOnScroll, { passive: true });

/* =============================================
   HAMBURGER MENU (mobile)
============================================= */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

/* Close menu when a nav link is clicked */
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

/* =============================================
   CONTACT FORM (Web3Forms)
============================================= */
const form = document.getElementById("contact-form");
const successMsg = document.getElementById("success-msg");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const btn = form.querySelector("button[type='submit']");
  btn.textContent = "Sending…";
  btn.disabled = true;

  try {
    const formData = new FormData(form);
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      successMsg.textContent = "✅ Message sent successfully!";
      successMsg.style.color = "#00ff99";
      form.reset();
    } else {
      successMsg.textContent = "❌ Something went wrong. Please try again.";
      successMsg.style.color = "#ff4d4d";
    }
  } catch (err) {
    successMsg.textContent = "❌ Network error. Please check your connection.";
    successMsg.style.color = "#ff4d4d";
  } finally {
    btn.textContent = "Send Message";
    btn.disabled = false;
  }
});
