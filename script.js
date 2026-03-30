/**
 * ZENITH TERRA TECH LIMITED - MAIN JAVASCRIPT
 * Version: 2.0
 */

// ============================================
// DOM Ready
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initCookieConsent();
    initNavigation();
    initFormHandling();
    initSmoothScroll();
    initProductPreselection();
});

// ============================================
// Cookie Consent
// ============================================
function initCookieConsent() {
    const cookieConsent = document.getElementById('cookie-consent');
    if (!cookieConsent) return;
    
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookie_consent');
    
    if (!cookieChoice) {
        // Show cookie banner after a short delay
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 1000);
    }
}

function acceptCookies(type) {
    const cookieConsent = document.getElementById('cookie-consent');
    
    // Save choice to localStorage
    localStorage.setItem('cookie_consent', type);
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    
    // Hide banner
    if (cookieConsent) {
        cookieConsent.classList.remove('show');
    }
    
    // If user accepted only necessary cookies, disable analytics
    if (type === 'necessary') {
        disableAnalyticsCookies();
    }
    
    console.log('Cookie consent:', type);
}

function disableAnalyticsCookies() {
    // Disable Google Analytics if present
    if (typeof gtag !== 'undefined') {
        window['ga-disable-GA_MEASUREMENT_ID'] = true;
    }
}

// ============================================
// Navigation
// ============================================
function initNavigation() {
    // Mobile nav toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleNav);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !e.target.closest('.nav-toggle')) {
                navMenu.classList.remove('active');
                const icon = navToggle ? navToggle.querySelector('i') : null;
                if (icon) icon.className = 'fas fa-bars';
                document.body.style.overflow = '';
            }
        }
    });
    
    // Handle dropdown on mobile
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        const submenu = dropdown.querySelector('.dropdown-menu');
        
        if (link && submenu) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 767) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close other dropdowns
                    dropdowns.forEach(other => {
                        if (other !== dropdown) {
                            other.classList.remove('active');
                        }
                    });
                    
                    // Toggle current
                    dropdown.classList.toggle('active');
                    
                    // Toggle submenu visibility
                    if (dropdown.classList.contains('active')) {
                        submenu.style.display = 'block';
                        submenu.style.maxHeight = submenu.scrollHeight + 'px';
                    } else {
                        submenu.style.maxHeight = '0';
                        setTimeout(() => {
                            if (!dropdown.classList.contains('active')) {
                                submenu.style.display = 'none';
                            }
                        }, 300);
                    }
                }
            });
        }
    });
    
    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
        }
        
        lastScroll = currentScroll;
    });
}

function toggleNav() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (navMenu) {
        const isActive = navMenu.classList.toggle('active');
        
        // Update toggle button icon
        if (navToggle) {
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.className = isActive ? 'fas fa-times' : 'fas fa-bars';
            }
        }
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? 'hidden' : '';
    }
}

// ============================================
// Form Handling
// ============================================
function initFormHandling() {
    // Handle all forms
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
        
        // Real-time validation
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    });
}

function handleFormSubmit(e) {
    const form = e.target;
    
    // Validate all required fields
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        e.preventDefault();
        showFormMessage(form, 'Please fill in all required fields.', 'error');
        return;
    }
    
    // Check hCaptcha if present
    const hcaptchaResponse = form.querySelector('[name="h-captcha-response"]');
    if (hcaptchaResponse && !hcaptchaResponse.value) {
        e.preventDefault();
        showFormMessage(form, 'Please complete the verification.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    }
    
    // For Formspree forms, let them submit naturally
    // The success/error handling will be done by Formspree
    console.log('Form submitted:', form.action);
}

function validateField(field) {
    const value = field.value.trim();
    const isRequired = field.hasAttribute('required');
    
    // Remove previous error state
    field.classList.remove('error');
    const errorMsg = field.parentNode.querySelector('.field-error');
    if (errorMsg) {
        errorMsg.remove();
    }
    
    // Check required
    if (isRequired && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Check email format
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorEl = document.createElement('span');
    errorEl.className = 'field-error';
    errorEl.style.cssText = 'color: #F44336; font-size: 12px; margin-top: 4px; display: block;';
    errorEl.textContent = message;
    
    field.parentNode.appendChild(errorEl);
}

function showFormMessage(form, message, type) {
    // Remove existing messages
    const existingMsg = form.querySelector('.form-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    const msgEl = document.createElement('div');
    msgEl.className = `form-message form-message-${type}`;
    msgEl.style.cssText = `
        padding: 12px 16px;
        border-radius: 4px;
        margin-bottom: 16px;
        font-size: 14px;
        ${type === 'error' 
            ? 'background: #FFEBEE; color: #C62828; border: 1px solid #EF9A9A;' 
            : 'background: #E8F5E9; color: #2E7D32; border: 1px solid #A5D6A7;'}
    `;
    msgEl.innerHTML = `<i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i> ${message}`;
    
    form.insertBefore(msgEl, form.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        msgEl.remove();
    }, 5000);
}

// ============================================
// Product Preselection from URL
// ============================================
function initProductPreselection() {
    // Check URL parameters for product preselection
    const urlParams = new URLSearchParams(window.location.search);
    const productParam = urlParams.get('product');
    const categoryParam = urlParams.get('category');
    
    if (productParam) {
        const productSelect = document.getElementById('product');
        if (productSelect) {
            // Find matching option
            const options = productSelect.querySelectorAll('option');
            options.forEach(option => {
                if (option.value.toLowerCase() === productParam.toLowerCase() ||
                    option.textContent.toLowerCase().includes(productParam.toLowerCase())) {
                    option.selected = true;
                }
            });
        }
    }
    
    if (categoryParam) {
        const productSelect = document.getElementById('product');
        if (productSelect) {
            // Preselect first item in category
            const optgroups = productSelect.querySelectorAll('optgroup');
            optgroups.forEach(group => {
                if (group.label.toLowerCase().includes(categoryParam.toLowerCase())) {
                    const firstOption = group.querySelector('option');
                    if (firstOption) {
                        firstOption.selected = true;
                    }
                }
            });
        }
    }
}

// ============================================
// Smooth Scroll
// ============================================
function initSmoothScroll() {
    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Utility Functions
// ============================================

// Debounce function
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

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add animation class when element comes into view
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const checkAnimations = throttle(() => {
        animatedElements.forEach(el => {
            if (isInViewport(el)) {
                el.classList.add('animated');
            }
        });
    }, 100);
    
    window.addEventListener('scroll', checkAnimations);
    checkAnimations(); // Check on load
}

// ============================================
// Lazy Loading Images
// ============================================
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ============================================
// Formspree Success/Error Handling
// ============================================
// This will be called by Formspree after form submission
window.handleFormspreeSuccess = function() {
    const forms = document.querySelectorAll('form[action*="formspree"]');
    forms.forEach(form => {
        showFormMessage(form, 'Thank you! Your inquiry has been sent. We will respond within 24 hours.', 'success');
        form.reset();
        
        // Reset submit button
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Inquiry';
        }
    });
};

window.handleFormspreeError = function(error) {
    const forms = document.querySelectorAll('form[action*="formspree"]');
    forms.forEach(form => {
        showFormMessage(form, 'Sorry, there was an error submitting your form. Please try again or email us directly at contact@zenith-terra.com', 'error');
        
        // Reset submit button
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Inquiry';
        }
    });
    console.error('Form submission error:', error);
};

// ============================================
// WhatsApp Link Handler
// ============================================
function initWhatsAppLinks() {
    const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me/"]');
    
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track WhatsApp click (if analytics is enabled)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'engagement',
                    event_label: 'whatsapp'
                });
            }
        });
    });
}

// ============================================
// Initialize on load
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initLazyLoading();
    initWhatsAppLinks();
});

// ============================================
// Performance: Preload critical resources
// ============================================
function preloadResources() {
    const criticalImages = [
        'images/logo.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Call preload
preloadResources();
