"use strict";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation-links");
const navigationLinks = document.querySelectorAll(".navigation-link, .navigation-contact");
const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");

function closeMenu() {
  if (!menuButton || !navigation) return;

  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Navigation öffnen");
  navigation.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Navigation öffnen" : "Navigation schliessen");
    navigation.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  navigationLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
  });
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      document.querySelectorAll(".navigation-link").forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("is-active", isCurrent);
      });
    });
  }, { rootMargin: "-30% 0px -55% 0px" });

  sections.forEach((section) => sectionObserver.observe(section));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
