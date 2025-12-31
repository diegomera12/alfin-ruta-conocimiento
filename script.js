// Navigation Toggle for Mobile
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle?.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  navToggle.classList.toggle("active");
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// Navbar scroll effect
const navbar = document.getElementById("navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.padding = "0.5rem 0";
    navbar.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.3)";
  } else {
    navbar.style.padding = "1rem 0";
    navbar.style.boxShadow = "none";
  }

  lastScroll = currentScroll;
});

// Active link on scroll
const sections = document.querySelectorAll("section[id]");
const navLinksAll = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinksAll.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Smooth reveal animations on scroll
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all animatable elements
document
  .querySelectorAll(
    ".feature-card, .resource-card, .timeline-item, .process-step"
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// Add visible class styles
const style = document.createElement("style");
style.textContent = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Counter animation for results
const animateCounters = () => {
  const counters = document.querySelectorAll(".result-card span");

  counters.forEach((counter) => {
    const target = counter.textContent;
    const isNegative = target.includes("-");
    const isPercentage = target.includes("%");
    const value = parseInt(target.replace(/[^0-9]/g, ""));

    let current = 0;
    const increment = value / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        current = value;
        clearInterval(timer);
      }
      const prefix = isNegative ? "-" : "+";
      const suffix = isPercentage ? "%" : "";
      counter.textContent = `${prefix}${Math.floor(current)}${suffix}`;
    }, 30);
  });
};

// Trigger counter animation when case study is visible
const caseSection = document.getElementById("caso");
const caseObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        caseObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

if (caseSection) {
  caseObserver.observe(caseSection);
}

// Parallax effect for hero orbs
window.addEventListener("mousemove", (e) => {
  const orbs = document.querySelectorAll(".hero-orb");
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 20;
    orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});

console.log("🚀 ALFIN Website loaded successfully!");
