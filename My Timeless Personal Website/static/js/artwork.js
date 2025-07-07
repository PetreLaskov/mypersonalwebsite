// Artwork-specific JavaScript functionality
// Minimal JS following progressive enhancement principles

document.addEventListener('DOMContentLoaded', function() {
    initializeImageZoom();
    initializeFullscreenViewer();
    initializeKeyboardNavigation();
    initializeLazyLoading();
});

// Image zoom functionality
let isZoomed = false;

function toggleZoom() {
    const image = document.getElementById('artwork-image');
    const zoomText = document.getElementById('zoom-text');
    
    if (!image) return;
    
    isZoomed = !isZoomed;
    image.classList.toggle('zoomed', isZoomed);
    
    if (zoomText) {
        zoomText.textContent = isZoomed ? 'Zoom Out' : 'Zoom In';
    }
    
    // Enable panning when zoomed
    if (isZoomed) {
        enablePanning(image);
    } else {
        disablePanning(image);
    }
}

function initializeImageZoom() {
    const image = document.getElementById('artwork-image');
    if (!image) return;
    
    // Click to zoom
    image.addEventListener('click', function(e) {
        // Don't zoom if already in fullscreen
        if (document.fullscreenElement) return;
        
        e.preventDefault();
        toggleZoom();
    });
    
    // Double-click for fullscreen
    image.addEventListener('dblclick', function(e) {
        e.preventDefault();
        toggleFullscreen();
    });
}

// Panning functionality for zoomed images
let isPanning = false;
let startX, startY, scrollLeft, scrollTop;

function enablePanning(image) {
    image.style.cursor = 'move';
    image.addEventListener('mousedown', startPan);
    image.addEventListener('mousemove', doPan);
    image.addEventListener('mouseup', endPan);
    image.addEventListener('mouseleave', endPan);
    
    // Touch events for mobile
    image.addEventListener('touchstart', startPanTouch);
    image.addEventListener('touchmove', doPanTouch);
    image.addEventListener('touchend', endPan);
}

function disablePanning(image) {
    image.style.cursor = 'zoom-in';
    image.removeEventListener('mousedown', startPan);
    image.removeEventListener('mousemove', doPan);
    image.removeEventListener('mouseup', endPan);
    image.removeEventListener('mouseleave', endPan);
    image.removeEventListener('touchstart', startPanTouch);
    image.removeEventListener('touchmove', doPanTouch);
    image.removeEventListener('touchend', endPan);
}

function startPan(e) {
    isPanning = true;
    const container = e.target.parentElement;
    startX = e.pageX - container.offsetLeft;
    startY = e.pageY - container.offsetTop;
    scrollLeft = container.scrollLeft;
    scrollTop = container.scrollTop;
}

function startPanTouch(e) {
    if (e.touches.length === 1) {
        const touch = e.touches[0];
        startPan({
            pageX: touch.pageX,
            pageY: touch.pageY,
            target: e.target
        });
    }
}

function doPan(e) {
    if (!isPanning) return;
    e.preventDefault();
    
    const container = e.target.parentElement;
    const x = e.pageX - container.offsetLeft;
    const y = e.pageY - container.offsetTop;
    const walkX = (x - startX) * 2;
    const walkY = (y - startY) * 2;
    
    container.scrollLeft = scrollLeft - walkX;
    container.scrollTop = scrollTop - walkY;
}

function doPanTouch(e) {
    if (e.touches.length === 1) {
        const touch = e.touches[0];
        doPan({
            pageX: touch.pageX,
            pageY: touch.pageY,
            target: e.target,
            preventDefault: () => e.preventDefault()
        });
    }
}

function endPan() {
    isPanning = false;
}

// Fullscreen viewer
function initializeFullscreenViewer() {
    const overlay = document.getElementById('fullscreen-overlay');
    const fullscreenImage = document.getElementById('fullscreen-image');
    
    if (!overlay || !fullscreenImage) return;
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            exitFullscreen();
        }
    });
}

function toggleFullscreen() {
    const image = document.getElementById('artwork-image');
    const overlay = document.getElementById('fullscreen-overlay');
    const fullscreenImage = document.getElementById('fullscreen-image');
    
    if (!image || !overlay || !fullscreenImage) return;
    
    // If already in fullscreen, exit
    if (overlay.classList.contains('active')) {
        exitFullscreen();
        return;
    }
    
    // Enter fullscreen
    fullscreenImage.src = image.src;
    fullscreenImage.alt = image.alt;
    overlay.classList.add('active');
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    
    // Reset zoom state
    if (isZoomed) {
        toggleZoom();
    }
}

function exitFullscreen() {
    const overlay = document.getElementById('fullscreen-overlay');
    if (!overlay) return;
    
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Image variations
function showVariation(imageUrl, title) {
    const image = document.getElementById('artwork-image');
    if (!image) return;
    
    // Reset zoom state
    if (isZoomed) {
        toggleZoom();
    }
    
    // Update image with fade effect
    image.style.opacity = '0.5';
    
    setTimeout(() => {
        image.src = imageUrl;
        if (title) {
            image.alt = title;
            // Update page title if desired
            const titleElement = document.querySelector('.artwork-title');
            if (titleElement && title !== titleElement.textContent) {
                titleElement.textContent = title;
            }
        }
        image.style.opacity = '1';
    }, 150);
    
    // Update URL hash for direct linking
    if (title) {
        window.history.replaceState(null, null, `#${encodeURIComponent(title)}`);
    }
}

// Keyboard navigation
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Don't interfere with form inputs
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        switch(e.key) {
            case 'z':
            case 'Z':
                e.preventDefault();
                toggleZoom();
                break;
                
            case 'f':
            case 'F':
                e.preventDefault();
                toggleFullscreen();
                break;
                
            case 'ArrowLeft':
                // Navigate to previous artwork
                const prevLink = document.querySelector('.nav-link.prev');
                if (prevLink) {
                    e.preventDefault();
                    window.location.href = prevLink.href;
                }
                break;
                
            case 'ArrowRight':
                // Navigate to next artwork
                const nextLink = document.querySelector('.nav-link.next');
                if (nextLink) {
                    e.preventDefault();
                    window.location.href = nextLink.href;
                }
                break;
                
            case 'g':
            case 'G':
                // Go to gallery
                const galleryLink = document.querySelector('.nav-link.gallery');
                if (galleryLink) {
                    e.preventDefault();
                    window.location.href = galleryLink.href;
                }
                break;
        }
    });
}

// Lazy loading for gallery images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
        });
    }
}

// Copy link functionality
function copyLink() {
    const url = window.location.href;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Link copied to clipboard!');
        }).catch(() => {
            fallbackCopyLink(url);
        });
    } else {
        fallbackCopyLink(url);
    }
}

function fallbackCopyLink(url) {
    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Link copied to clipboard!');
    } catch (err) {
        showNotification('Unable to copy link');
    }
    
    document.body.removeChild(textArea);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--link-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        z-index: 1001;
        font-size: 0.9rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
    `;
    
    if (type === 'error') {
        notification.style.background = '#dc3545';
    } else if (type === 'success') {
        notification.style.background = '#28a745';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    });
    
    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Image loading error handling
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            
            // Create placeholder
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.textContent = 'Image unavailable';
            placeholder.style.cssText = `
                width: 100%;
                height: 200px;
                background-color: var(--code-bg);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #666;
                border-radius: 0.5rem;
                border: 2px dashed var(--border-color);
            `;
            
            this.parentNode.insertBefore(placeholder, this);
        });
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
});

// Initialize touch gestures for mobile
if ('ontouchstart' in window) {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });
    
    function handleSwipe() {
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        const minSwipeDistance = 50;
        
        // Only handle horizontal swipes
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                // Swipe right - go to previous
                const prevLink = document.querySelector('.nav-link.prev');
                if (prevLink) {
                    window.location.href = prevLink.href;
                }
            } else {
                // Swipe left - go to next
                const nextLink = document.querySelector('.nav-link.next');
                if (nextLink) {
                    window.location.href = nextLink.href;
                }
            }
        }
    }
}