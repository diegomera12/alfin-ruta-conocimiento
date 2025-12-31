// Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 2000);
});

// Navigation
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');

navToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Scroll effects
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    
    // Navbar
    if (scrollPos > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Progress bar
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollPos / docHeight) * 100;
    document.getElementById('scrollProgress').style.width = scrollPercent + '%';
    
    // Scroll to top button
    const scrollTop = document.getElementById('scrollTop');
    if (scrollPos > 500) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

// Scroll to top
document.getElementById('scrollTop')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll animations
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// Hero stats counter
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 30);
};

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.stat-number[data-target]').forEach(stat => {
                const target = parseInt(stat.dataset.target);
                animateCounter(stat, target);
            });
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.getElementById('inicio');
if (heroSection) heroObserver.observe(heroSection);

// Competency tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(tabId)?.classList.add('active');
    });
});

// Tips carousel
const tipsTrack = document.getElementById('tipsTrack');
const tipPrev = document.getElementById('tipPrev');
const tipNext = document.getElementById('tipNext');
let tipIndex = 0;
const tipCards = document.querySelectorAll('.tip-card');
const totalTips = tipCards.length;

const updateCarousel = () => {
    const cardWidth = tipCards[0]?.offsetWidth + 24 || 0;
    const maxIndex = Math.max(0, totalTips - 3);
    tipIndex = Math.min(Math.max(tipIndex, 0), maxIndex);
    if (tipsTrack) {
        tipsTrack.style.transform = `translateX(-${tipIndex * cardWidth}px)`;
    }
};

tipPrev?.addEventListener('click', () => { tipIndex--; updateCarousel(); });
tipNext?.addEventListener('click', () => { tipIndex++; updateCarousel(); });

// Auto-rotate tips
setInterval(() => {
    tipIndex++;
    if (tipIndex >= totalTips - 2) tipIndex = 0;
    updateCarousel();
}, 5000);

// Case study results animation
const caseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.result-card').forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 150);
            });
            caseObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const caseSection = document.getElementById('caso');
if (caseSection) {
    document.querySelectorAll('.result-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
    });
    caseObserver.observe(caseSection);
}

// Smooth hover effects for cards
document.querySelectorAll('.resource-card, .feature-card, .process-step').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        this.style.transform = 'translateY(-8px)';
    });
    card.addEventListener('mouseleave', function(e) {
        this.style.transform = 'translateY(0)';
    });
});

// Parallax effect on hero orbs
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.hero-orb');
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    
    orbs.forEach((orb, i) => {
        const speed = (i + 1) * 15;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

// Typing effect for hero title (optional enhancement)
const glitchText = document.querySelector('.glitch');
if (glitchText) {
    setInterval(() => {
        glitchText.classList.add('glitch-active');
        setTimeout(() => glitchText.classList.remove('glitch-active'), 200);
    }, 4000);
}

// Add sparkle cursor effect
const createSparkle = (x, y) => {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.cssText = `
        position: fixed;
        pointer-events: none;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle, #e879a9, transparent);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        animation: sparkleAnim 0.6s ease-out forwards;
        z-index: 9999;
    `;
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 600);
};

// Add sparkle animation style
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleAnim {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(0); opacity: 0; }
    }
`;
document.head.appendChild(sparkleStyle);

// Trigger sparkles on click
document.addEventListener('click', (e) => {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createSparkle(
                e.clientX + (Math.random() - 0.5) * 40,
                e.clientY + (Math.random() - 0.5) * 40
            );
        }, i * 50);
    }
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

console.log('✨ ALFIN Website by Vélez Sánchez Lady Liliana loaded!');
