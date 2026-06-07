// =====================================
// GSAP CHECK (SAFE INIT)
// =====================================

if (typeof gsap !== "undefined") {

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    window.addEventListener("load", () => {

        // LOADER
        tl.to("#loader", {
            opacity: 0,
            duration: 0.8,
            delay: 0.8,
            onComplete: () => {
                const loader = document.getElementById("loader");
                if (loader) loader.style.display = "none";
            }
        })

        // HERO
        .from(".hero-content", {
            y: 60,
            opacity: 0,
            duration: 1
        }, "-=0.3")

        .from(".hero-image", {
            x: 80,
            opacity: 0,
            duration: 1
        }, "-=0.7");
    });
}

// =====================================
// MOBILE MENU (SAFE)
// =====================================

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");

        const icon = mobileMenu.classList.contains("active")
            ? "fa-xmark"
            : "fa-bars";

        menuBtn.innerHTML = `<i class="fa-solid ${icon}"></i>`;
    });

    document.querySelectorAll("#mobileMenu a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}

// =====================================
// THEME (SYSTEM + LOCAL STORAGE)
// =====================================

const themeBtn = document.getElementById("themeBtn");
const savedTheme = localStorage.getItem("theme");

// auto system theme fallback
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme === "light" || (!savedTheme && !systemDark)) {
    document.body.classList.add("light");
}

function updateThemeIcon() {
    if (!themeBtn) return;

    const isLight = document.body.classList.contains("light");

    themeBtn.innerHTML = isLight
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
}

updateThemeIcon();

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light");

        const mode = document.body.classList.contains("light")
            ? "light"
            : "dark";

        localStorage.setItem("theme", mode);
        updateThemeIcon();
    });
}

// =====================================
// TYPING EFFECT (SMOOTH CONTROL)
// =====================================

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

// =====================================
// SCROLL PROGRESS BAR (FIXED)
// =====================================

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

// =====================================
// ACTIVE NAV (OPTIMIZED)
// =====================================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

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
});

// =====================================
// SCROLL REVEAL (INTERSECTION OBSERVER)
// =====================================

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.12
});

document.querySelectorAll(
    ".section, .timeline-item, .skill-card, .project-card, .glass-card, .stat-card"
).forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
});

// =====================================
// PARALLAX (SMOOTHER)
// =====================================

const heroImage = document.querySelector(".hero-image img");

document.addEventListener("mousemove", (e) => {
    if (!heroImage) return;

    const moveX = (e.clientX - window.innerWidth / 2) / 40;
    const moveY = (e.clientY - window.innerHeight / 2) / 40;

    heroImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// =====================================
// VANILLA TILT
// =====================================

if (typeof VanillaTilt !== "undefined") {
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.25
    });
}

// =====================================
// GITHUB PROJECTS (SAFE + CLEAN)
// =====================================

fetch("https://api.github.com/users/ndadev/repos")
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
                    <a href="${repo.html_url}" target="_blank">
                        View Repository
                    </a>
                </div>
            `;
        });

        if (typeof VanillaTilt !== "undefined") {
            VanillaTilt.init(document.querySelectorAll(".tilt"));
        }
    })
    .catch(err => console.log("GitHub API Error:", err));

// =====================================
// CONTACT FORM
// =====================================
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