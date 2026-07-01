const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Staggered animations for skill and project cards
document.querySelectorAll('[data-animate="true"]').forEach((grid) => {
  const children = grid.querySelectorAll('span, article');
  children.forEach((child, index) => {
    child.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s forwards`;
    child.style.opacity = '0';
  });
});

// Smooth scroll offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '#home') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  });
});

// Scroll-triggered animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all section headings and content
document.querySelectorAll('.section-heading, .about-grid > div, .project-card, .skills-grid span').forEach((el) => {
  el.style.opacity = '0';
  observer.observe(el);
});

// Parallax effect on hero card
const heroCard = document.querySelector('.hero-card');
if (heroCard) {
  window.addEventListener('mousemove', (e) => {
    const rect = heroCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) * 0.05;
    const rotateY = (centerX - x) * 0.05;
    
    heroCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });

  window.addEventListener('mouseleave', () => {
    heroCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
}

// Button ripple effect
document.querySelectorAll('.btn').forEach((button) => {
  button.addEventListener('mouseenter', function () {
    this.style.zIndex = 'unset';
  });
});

