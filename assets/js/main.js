// ===============================
//  Stuchi Editora - JS Global
//  Menu • Scroll • Progress • Reveal • BackToTop • Active link
// ===============================

// ===== Menu mobile =====
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

function closeMenu() {
  if (!navMenu || !menuBtn) return;
  navMenu.classList.remove("is-open");
  menuBtn.classList.remove("is-open");
  menuBtn.setAttribute("aria-expanded", "false");
}

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    const open = navMenu.classList.toggle("is-open");
    menuBtn.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // Fecha menu ao clicar em um link
  navMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => closeMenu());
  });

  // Fecha menu clicando fora
  document.addEventListener("click", (e) => {
    const clickedInside = navMenu.contains(e.target) || menuBtn.contains(e.target);
    if (!clickedInside) closeMenu();
  });

  // Fecha menu ao dar scroll (mobile)
  window.addEventListener("scroll", () => {
    if (navMenu.classList.contains("is-open")) closeMenu();
  }, { passive: true });
}

// ===== Header efeito ao rolar =====
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  if (!header) return;
  if (window.scrollY > 10) header.classList.add("header--scrolled");
  else header.classList.remove("header--scrolled");
}, { passive: true });

// ===== Progress bar =====
const progressBar = document.getElementById("progressBar");
window.addEventListener("scroll", () => {
  if (!progressBar) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const p = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${p}%`;
}, { passive: true });

// ===== Reveal animations =====
const items = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(el => io.observe(el));
} else {
  items.forEach(el => el.classList.add("is-visible"));
}

// ===== Back to top (garantido) =====
const backToTop = document.getElementById("backToTop");
if (backToTop) {
  backToTop.addEventListener("click", () => {
    closeMenu();
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });
}

// ===== Marca link ativo (multipágina) =====
(function markActiveNav() {
  const links = document.querySelectorAll(".nav a[href]");
  if (!links.length) return;

  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  links.forEach(a => a.classList.remove("is-active"));

  links.forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (!href) return;

    // mark active page
    if (href === path) a.classList.add("is-active");
  });
})();

// ===== Cookie Banner =====
document.addEventListener("DOMContentLoaded", () => {
  const consent = localStorage.getItem("cookie_consent");
  const consentTime = localStorage.getItem("cookie_consent_time");
  
  // Check if 6 months have passed (roughly 180 days)
  const isExpired = consentTime && (Date.now() - parseInt(consentTime, 10)) > 1000 * 60 * 60 * 24 * 180;
  
  if (!consent || isExpired) {
    if (isExpired) {
      localStorage.removeItem("cookie_consent");
      localStorage.removeItem("cookie_consent_time");
    }

    const banner = document.createElement("div");
    banner.className = "cookie-banner";

    // Adjust translations based on language
    let bannerText = "Utilizamos cookies para melhorar sua experiência. Ao continuar, você concorda com nossa <a href='./politica-de-privacidade.html'>Política de Privacidade</a>.";
    let btnAcceptText = "Aceitar";
    let btnCloseText = "Fechar";

    if (window.location.pathname.includes('/en/')) {
      bannerText = "We use cookies to improve your experience. By continuing, you agree to our <a href='./privacy-policy.html'>Privacy Policy</a>.";
      btnAcceptText = "Accept";
      btnCloseText = "Close";
    } else if (window.location.pathname.includes('/es/')) {
      bannerText = "Usamos cookies para mejorar tu experiencia. Al continuar, aceptas nuestra <a href='./politica-de-privacidad.html'>Política de Privacidad</a>.";
      btnAcceptText = "Aceptar";
      btnCloseText = "Cerrar";
    }

    banner.innerHTML = `
      <div class="cookie-text">
        ${bannerText}
      </div>
      <div class="cookie-actions">
        <button id="acceptCookies" class="btn btn--sm">${btnAcceptText}</button>
        <button id="closeCookies" class="btn btn--outline btn--sm">${btnCloseText}</button>
      </div>
    `;

    document.body.appendChild(banner);

    // Small delay for smooth animation
    setTimeout(() => {
      banner.classList.add("is-visible");
    }, 100);

    const handleConsent = (status) => {
      localStorage.setItem("cookie_consent", status);
      localStorage.setItem("cookie_consent_time", Date.now().toString());
      banner.classList.remove("is-visible");
      setTimeout(() => {
        banner.remove();
      }, 500); // Wait for transition
    };

    document.getElementById("acceptCookies").addEventListener("click", () => handleConsent("accepted"));
    document.getElementById("closeCookies").addEventListener("click", () => handleConsent("dismissed"));
  }
});

// ===== FAQ Accordion =====
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  if (question && answer) {
    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove("is-open");
        const otherAnswer = otherItem.querySelector(".faq-answer");
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      // Toggle current item
      if (!isOpen) {
        item.classList.add("is-open");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  }
});
