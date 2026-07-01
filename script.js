if (typeof gsap !== "undefined") {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  window.addEventListener("load", () => {
    tl.to("#loader", {
      opacity: 0,
      duration: 0.8,
      delay: 0.8,
      onComplete: () => {
        const loader = document.getElementById("loader");
        if (loader) loader.style.display = "none";
      }
    })
    .from(".hero-accent", {
      height: 0,
      duration: 0.8,
      ease: "power4.out"
    }, "-=0.4")
    .from(".badge", {
      y: 20,
      opacity: 0,
      duration: 0.5
    }, "-=0.3")
    .from(".hero-line", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15
    }, "-=0.3")
    .from(".hero-divider", {
      width: 0,
      duration: 0.5
    }, "-=0.3")
    .from(".typing-wrapper", {
      y: 20,
      opacity: 0,
      duration: 0.5
    }, "-=0.2")
    .from(".hero-desc", {
      y: 20,
      opacity: 0,
      duration: 0.5
    }, "-=0.2")
    .from(".hero-buttons", {
      y: 20,
      opacity: 0,
      duration: 0.5
    }, "-=0.1")
    .from(".hero-meta", {
      y: 15,
      opacity: 0,
      duration: 0.4
    }, "-=0.1")
    .from(".hero-image-frame", {
      opacity: 0,
      duration: 0.4
    }, "-=0.2")
    .from(".hero-image-accent", {
      width: 0,
      duration: 0.3
    }, "-=0.3");
  });
}

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

function toggleMenu(open) {
  const isOpen = open !== undefined ? open : !mobileMenu.classList.contains("active");
  mobileMenu.classList.toggle("active", isOpen);
  const icon = isOpen ? "fa-xmark" : "fa-bars";
  menuBtn.innerHTML = `<i class="fa-solid ${icon}"></i>`;
}

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => toggleMenu());

  document.querySelectorAll("#mobileMenu a").forEach(link => {
    link.addEventListener("click", () => toggleMenu(false));
  });
}

const roles = [
  "Data Science Enthusiast",
  "Web Developer",
  "Informatics Student",
  "Technology Explorer"
];

const typing = document.getElementById("typing");

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  if (!typing) return;

  const current = roles[roleIndex];

  if (!deleting) {
    typing.textContent = current.substring(0, charIndex++);
  } else {
    typing.textContent = current.substring(0, charIndex--);
  }

  let speed = deleting ? 40 : 80;

  if (!deleting && charIndex === current.length + 1) {
    deleting = true;
    speed = 1200;
  }

  if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 300;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

window.addEventListener("scroll", () => {
  const progressBar = document.getElementById("progressBar");
  if (!progressBar) return;

  const scrollTop = document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const scrolled = (scrollTop / height) * 100;

  progressBar.style.width = scrolled + "%";
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");
const sectionNavLinks = document.querySelectorAll("#sectionNav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(sec => {
    const top = sec.offsetTop - 160;
    if (window.scrollY >= top) current = sec.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );
  });

  sectionNavLinks.forEach(link => {
    link.classList.toggle("active", link.dataset.target === current);
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll(
  ".section, .timeline-item, .skill-card, .project-card, .card-elevated, .stat-card"
).forEach(el => {
  el.classList.add("hidden");
  observer.observe(el);
});

const heroImage = document.querySelector(".hero-image img");

document.addEventListener("mousemove", (e) => {
  if (!heroImage) return;

  const moveX = (e.clientX - window.innerWidth / 2) / 40;
  const moveY = (e.clientY - window.innerHeight / 2) / 40;

  heroImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

if (typeof VanillaTilt !== "undefined") {
  VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.25
  });
}

fetch("https://api.github.com/users/ndadevdev/repos")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("githubProjects");
    if (!container || !Array.isArray(data)) return;

    const sorted = data
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, 6);

    container.innerHTML = "";

    sorted.forEach(repo => {
      container.innerHTML += `
        <div class="project-card tilt">
          <h3>${repo.name}</h3>
          <p>${repo.description || "No description available"}</p>
          <a href="${repo.html_url}" target="_blank">View Repository</a>
        </div>
      `;
    });

    if (typeof VanillaTilt !== "undefined") {
      VanillaTilt.init(document.querySelectorAll(".tilt"));
    }
  })
  .catch(err => console.log("GitHub API Error:", err));

const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm(
    "service_ufdpiuj",
    "template_9tsw574",
    this
  ).then(() => {
    alert("Email berhasil dikirim!");
    form.reset();
  }).catch((err) => {
    alert("Gagal mengirim email");
    console.log(err);
  });
});

const statNumbers = document.querySelectorAll(".stat-number");

function animateStat(el) {
  const target = parseInt(el.dataset.target);
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 30));
  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    el.textContent = current;
  }, 30);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      statNumbers.forEach(animateStat);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector(".stats");
if (statsSection) statsObserver.observe(statsSection);
