(() => {
  "use strict";

  // Footer yılı
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Mobil menü ----
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");

  const closeMenu = () => {
    if (!toggle || !links) return;
    toggle.classList.remove("open");
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });

    links.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  }

  // ---- Scroll reveal ----
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  // ---- Lightbox ----
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  let gallery = [];
  let index = 0;
  let fallback = null;

  const renderImage = () => {
    if (gallery.length === 0) return;
    lightboxImg.src = gallery[index];
    lightboxImg.alt = lightboxCaption.textContent;
    lightboxImg.onerror = () => {
      if (fallback && lightboxImg.src !== fallback) {
        lightboxImg.onerror = null;
        lightboxImg.src = fallback;
      }
    };

    // Çok görselli galerilerde ok butonlarını göster
    const multi = gallery.length > 1;
    prevBtn.style.display = multi ? "grid" : "none";
    nextBtn.style.display = multi ? "grid" : "none";
  };

  const openLightbox = (button) => {
    const images = (button.dataset.images || "").split("|").filter(Boolean);
    if (images.length === 0) return;

    gallery = images;
    index = 0;
    fallback = button.dataset.fallback || null;
    lightboxCaption.textContent = button.dataset.title || "";

    renderImage();
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lightboxImg.src = "";
  };

  const step = (dir) => {
    if (gallery.length === 0) return;
    index = (index + dir + gallery.length) % gallery.length;
    renderImage();
  };

  document.querySelectorAll(".project__media").forEach((button) => {
    button.addEventListener("click", () => openLightbox(button));
  });

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (prevBtn) prevBtn.addEventListener("click", () => step(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => step(1));

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  // ---- CV yazdır / PDF ----
  const printBtn = document.getElementById("print-cv");
  if (printBtn) {
    printBtn.addEventListener("click", () => window.print());
  }
})();
