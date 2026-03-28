// ZENITH TERRA TECH LIMITED - Main JavaScript
// Performance optimized version

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initSmoothScroll();
    initAnimations();
});

// Debounce helper for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Navigation functionality - Merged scroll listeners with debounce
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Merged scroll handler with debounce (60ms)
    const handleScroll = debounce(function() {
        // Sticky navbar
        navbar.classList.toggle('scrolled', window.scrollY > 50);

        // Highlight active nav link
        let current = '';
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }, 60);

    window.addEventListener('scroll', handleScroll, { passive: true });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll-based animations
function initScrollEffects() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate counters if present
                const counters = entry.target.querySelectorAll('.stat-number, .mstat-number');
                counters.forEach(counter => animateCounter(counter));
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.about-card, .product-card, .partner-card, .value-item, .contact-card, .opp-item, .coverage-item, .cert-card'
    );
    
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Counter animation with protection for non-numeric values
function animateCounter(element) {
    if (element.classList.contains('animated')) return;
    
    const text = element.textContent.trim();
    const number = parseFloat(text.replace(/[^0-9.]/g, ''));
    
    // Skip non-numeric values or values that don't make sense to animate (years, large numbers)
    if (isNaN(number) || number > 9999 || number === 0) return;
    
    element.classList.add('animated');
    
    const suffix = text.replace(/[0-9.]/g, '');
    let current = 0;
    const increment = Math.ceil(number / 30);
    const duration = 1500;
    const stepTime = duration / (number / increment);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        element.textContent = current + suffix;
    }, stepTime);
}

// Initialize animations using CSS classes instead of inline styles
function initAnimations() {
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
    
    // Add hero-animate class to hero elements for CSS-based stagger animation
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-cta, .hero-stats');
    heroElements.forEach((el, index) => {
        el.classList.add('hero-animate');
        el.style.transitionDelay = (200 + (index * 150)) + 'ms';
    });
}

// Form validation helper (for future use)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Performance: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// Mobile detection for touch optimizations
function isTouchDevice() {
    return window.matchMedia('(pointer: coarse)').matches;
}

// Add touch optimizations
if (isTouchDevice()) {
    document.body.classList.add('touch-device');
}

// Console branding - matching website copy
console.log('%c ZENITH TERRA TECH LIMITED ', 'background: linear-gradient(135deg, #165DFF, #F7BA1E); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
console.log('%c One-Stop Solution for Global Pharmaceutical & Healthcare ', 'color: #165DFF; font-size: 12px;');