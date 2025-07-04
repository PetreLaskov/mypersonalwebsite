// Homepage-specific JavaScript functionality
// Minimal JS following progressive enhancement principles

document.addEventListener('DOMContentLoaded', function() {
    initializeNewsletterForm();
    initializeScrollEffects();
    initializeImageOptimization();
    initializeAnalytics();
});

// Newsletter form enhancement
function initializeNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = form.querySelector('input[name="email"]').value;
        const button = form.querySelector('button');
        const originalText = button.textContent;
        
        // Basic email validation
        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Disable form during submission
        button.disabled = true;
        button.textContent = 'Subscribing...';
        
        // Simulate form submission (replace with actual endpoint)
        submitNewsletter(email)
            .then(response => {
                if (response.success) {
                    showFormMessage('Thank you for subscribing! Check your email for confirmation.', 'success');
                    form.reset();
                } else {
                    throw new Error(response.message || 'Subscription failed');
                }
            })
            .catch(error => {
                console.error('Newsletter subscription error:', error);
                showFormMessage('Subscription failed. Please try again later.', 'error');
            })
            .finally(() => {
                button.disabled = false;
                button.textContent = originalText;
            });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function submitNewsletter(email) {
    // This would be replaced with actual API call
    // For now, simulate success after delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true });
        }, 1000);
    });
}

function showFormMessage(message, type = 'info') {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;
    
    // Remove existing messages
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message-${type}`;
    messageElement.textContent = message;
    
    messageElement.style.cssText = `
        margin-top: 1rem;
        padding: 0.75rem;
        border-radius: 0.5rem;
        font-size: 0.9rem;
        text-align: center;
        ${type === 'success' ? 'background: rgba(40, 167, 69, 0.1); color: #155724; border: 1px solid rgba(40, 167, 69, 0.2);' : ''}
        ${type === 'error' ? 'background: rgba(220, 53, 69, 0.1); color: #721c24; border: 1px solid rgba(220, 53, 69, 0.2);' : ''}
        ${type === 'info' ? 'background: rgba(0, 102, 204, 0.1); color: #0c5460; border: 1px solid rgba(0, 102, 204, 0.2);' : ''}
    `;
    
    form.appendChild(messageElement);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.style.opacity = '0';
            messageElement.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                messageElement.remove();
            }, 300);
        }
    }, 5000);
}

// Subtle scroll effects
function initializeScrollEffects() {
    if (!('IntersectionObserver' in window)) return;
    
    // Fade in animation for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all major sections
    const sections = document.querySelectorAll('.now-section, .featured-content, .recent-posts, .about-preview, .newsletter-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Progress indicator for scroll position
    createScrollProgress();
}

function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 2px;
        background: linear-gradient(90deg, var(--link-color), #0052a3);
        z-index: 1000;
        transition: width 0.1s ease;
        opacity: 0;
    `;
    
    document.body.appendChild(progressBar);
    
    let isVisible = false;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
        
        // Show/hide progress bar based on scroll position
        if (scrollTop > 200 && !isVisible) {
            progressBar.style.opacity = '1';
            isVisible = true;
        } else if (scrollTop <= 200 && isVisible) {
            progressBar.style.opacity = '0';
            isVisible = false;
        }
    });
}

// Image optimization and lazy loading
function initializeImageOptimization() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
        // Add loading placeholder
        if (!img.complete) {
            img.style.background = 'var(--code-bg)';
            img.style.minHeight = '200px';
        }
        
        // Handle load events
        img.addEventListener('load', function() {
            this.classList.add('loaded');
            this.style.background = 'none';
            this.style.minHeight = 'auto';
        });
        
        img.addEventListener('error', function() {
            this.classList.add('error');
            this.style.background = 'var(--code-bg)';
            this.alt = 'Image unavailable';
        });
    });
    
    // Optimize artwork preview interactions
    const artworkPreviews = document.querySelectorAll('.artwork-preview img');
    artworkPreviews.forEach(img => {
        img.addEventListener('click', function(e) {
            // Add subtle feedback on click
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Privacy-focused analytics (no external dependencies)
function initializeAnalytics() {
    // Simple page view tracking without external services
    const analytics = {
        pageViews: parseInt(localStorage.getItem('pageViews') || '0') + 1,
        visitStart: Date.now(),
        interactions: 0
    };
    
    localStorage.setItem('pageViews', analytics.pageViews.toString());
    
    // Track meaningful interactions
    const trackableElements = document.querySelectorAll('a[href^="/"], button, .featured-item, .post-item');
    trackableElements.forEach(element => {
        element.addEventListener('click', () => {
            analytics.interactions++;
        });
    });
    
    // Track reading time
    let readingTime = 0;
    let isActive = true;
    
    const readingTimer = setInterval(() => {
        if (isActive) {
            readingTime++;
        }
    }, 1000);
    
    // Detect if user is active
    let activityTimeout;
    function resetActivityTimer() {
        isActive = true;
        clearTimeout(activityTimeout);
        activityTimeout = setTimeout(() => {
            isActive = false;
        }, 30000); // 30 seconds of inactivity
    }
    
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
        document.addEventListener(event, resetActivityTimer, true);
    });
    
    // Store analytics on page unload
    window.addEventListener('beforeunload', () => {
        clearInterval(readingTimer);
        const sessionData = {
            readingTime,
            interactions: analytics.interactions,
            timestamp: Date.now()
        };
        localStorage.setItem('lastSession', JSON.stringify(sessionData));
    });
}

// Keyboard shortcuts for navigation
document.addEventListener('keydown', function(e) {
    // Don't interfere with form inputs
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
    }
    
    switch(e.key) {
        case 'h':
            // Go to home (already there, scroll to top)
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            break;
            
        case 'e':
            // Go to essays
            e.preventDefault();
            window.location.href = '/essays';
            break;
            
        case 'a':
            // Go to art
            e.preventDefault();
            window.location.href = '/art';
            break;
            
        case '/':
            // Focus newsletter signup
            e.preventDefault();
            const emailInput = document.querySelector('.newsletter-form input[type="email"]');
            if (emailInput) {
                emailInput.focus();
            }
            break;
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .loaded {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
    
    .error {
        opacity: 0.5;
        filter: grayscale(100%);
    }
    
    /* Smooth hover effects */
    .featured-item,
    .post-item,
    .now-item,
    .principle {
        will-change: transform, box-shadow;
    }
    
    /* Focus styles for accessibility */
    .newsletter-form input:focus {
        outline: 2px solid var(--link-color);
        outline-offset: 2px;
    }
    
    .newsletter-form button:focus {
        outline: 2px solid rgba(255,255,255,0.5);
        outline-offset: 2px;
    }
    
    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
        }
        
        .scroll-progress {
            display: none;
        }
    }
`;

document.head.appendChild(style);