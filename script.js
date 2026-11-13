const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const menuOverlay = document.querySelector(".nav-overlay");
const mobileBreakpoint = window.matchMedia("(max-width: 580px)");
const menuLinks = [...mobileMenu.querySelectorAll("a")];

function setMenuOpen(open) {
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute(
    "aria-label",
    open ? "Close navigation menu" : "Open navigation menu",
  );
  mobileMenu.classList.toggle("is-open", open);
  menuOverlay.classList.toggle("is-open", open);
  mobileMenu.inert = mobileBreakpoint.matches && !open;
  mobileMenu.setAttribute(
    "aria-hidden",
    String(mobileBreakpoint.matches && !open),
  );
  document.body.classList.toggle("menu-open", open && mobileBreakpoint.matches);
}

setMenuOpen(false);
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  setMenuOpen(open);
  if (open) menuLinks[0].focus();
  else menuToggle.focus();
});
menuOverlay.addEventListener("click", () => {
  setMenuOpen(false);
  menuToggle.focus();
});
menuLinks.forEach((link) =>
  link.addEventListener("click", () => setMenuOpen(false)),
);
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuToggle.getAttribute("aria-expanded") === "true"
  ) {
    setMenuOpen(false);
    menuToggle.focus();
  }
});
mobileBreakpoint.addEventListener("change", () => setMenuOpen(false));

const sectionLinks = [...document.querySelectorAll(".nav-links a")];
const sections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        sectionLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${entry.target.id}`)
            link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      }
    }
  },
  { rootMargin: "-25% 0px -65% 0px" },
);
sections.forEach((section) => observer.observe(section));
