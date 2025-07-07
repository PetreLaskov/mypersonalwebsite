// Gallery-specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeGalleryFilters();
    initializeGalleryLazyLoading();
    initializeGalleryKeyboard();
    initializeInfiniteScroll();
});

// Gallery filtering
function initializeGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    item.classList.add('filtered-in');
                    item.classList.remove('filtered-out');
                } else {
                    item.style.display = 'none';
                    item.classList.add('filtered-out');
                    item.classList.remove('filtered-in');
                }
            });
            
            // Update URL
            const url = new URL(window.location);
            if (filter === 'all') {
                url.searchParams.delete('filter');
            } else {
                url.searchParams.set('filter', filter);
            }
            window.history.replaceState({}, '', url);
        });
    });
    
    // Apply filter from URL on load
    const urlParams = new URLSearchParams(window.location.search);
    const urlFilter = urlParams.get('filter');
    if (urlFilter) {
        const filterButton = document.querySelector(`[data-filter="${urlFilter}"]`);
        if (filterButton) {
            filterButton.click();
        }
    }
}

// Enhanced lazy loading for gallery
function initializeGalleryLazyLoading() {
    const images = document.querySelectorAll('img[data-src], img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Handle data-src lazy loading
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    // Add loading animation
                    img.classList.add('loading');
                    
                    img.addEventListener('load', function() {
                        this.classList.remove('loading');
                        this.classList.add('loaded');
                    });
                    
                    img.addEventListener('error', function() {
                        this.classList.remove('loading');
                        this.classList.add('error');
                        showImagePlaceholder(this);
                    });
                    
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px',
            threshold: 0.1
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            img.classList.add('loaded');
        });
    }
}

// Show placeholder for broken images
function showImagePlaceholder(img) {
    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder';
    placeholder.innerHTML = `
        <div class="placeholder-content">
            <span class="placeholder-icon">🖼️</span>
            <span class="placeholder-text">Image unavailable</span>
        </div>
    `;
    
    placeholder.style.cssText = `
        width: 100%;
        height: 250px;
        background-color: var(--code-bg);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #666;
        border-radius: 0.5rem;
        border: 2px dashed var(--border-color);
        flex-direction: column;
        gap: 0.5rem;
    `;
    
    img.parentNode.replaceChild(placeholder, img);
}

// Keyboard navigation for gallery
function initializeGalleryKeyboard() {
    let currentFocus = 0;
    const galleryItems = document.querySelectorAll('.gallery-item a');
    
    if (galleryItems.length === 0) return;
    
    document.addEventListener('keydown', function(e) {
        // Don't interfere with form inputs
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        switch(e.key) {
            case 'ArrowRight':
            case 'l':
                e.preventDefault();
                navigateGallery(1);
                break;
                
            case 'ArrowLeft':
            case 'h':
                e.preventDefault();
                navigateGallery(-1);
                break;
                
            case 'ArrowDown':
            case 'j':
                e.preventDefault();
                navigateGallery(getItemsPerRow());
                break;
                
            case 'ArrowUp':
            case 'k':
                e.preventDefault();
                navigateGallery(-getItemsPerRow());
                break;
                
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (galleryItems[currentFocus]) {
                    galleryItems[currentFocus].click();
                }
                break;
                
            case 'Home':
                e.preventDefault();
                navigateToItem(0);
                break;
                
            case 'End':
                e.preventDefault();
                navigateToItem(galleryItems.length - 1);
                break;
        }
    });
    
    function navigateGallery(direction) {
        const visibleItems = Array.from(galleryItems).filter(item => 
            item.closest('.gallery-item').style.display !== 'none'
        );
        
        if (visibleItems.length === 0) return;
        
        const currentItem = galleryItems[currentFocus];
        const currentVisibleIndex = visibleItems.indexOf(currentItem);
        let newVisibleIndex = currentVisibleIndex + direction;
        
        // Wrap around
        if (newVisibleIndex < 0) {
            newVisibleIndex = visibleItems.length - 1;
        } else if (newVisibleIndex >= visibleItems.length) {
            newVisibleIndex = 0;
        }
        
        const newItem = visibleItems[newVisibleIndex];
        currentFocus = Array.from(galleryItems).indexOf(newItem);
        
        focusGalleryItem(currentFocus);
    }
    
    function navigateToItem(index) {
        currentFocus = Math.max(0, Math.min(index, galleryItems.length - 1));
        focusGalleryItem(currentFocus);
    }
    
    function focusGalleryItem(index) {
        // Remove previous focus
        galleryItems.forEach(item => {
            item.closest('.gallery-item').classList.remove('keyboard-focus');
        });
        
        // Add focus to current item
        if (galleryItems[index]) {
            const item = galleryItems[index];
            item.closest('.gallery-item').classList.add('keyboard-focus');
            item.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    }
    
    function getItemsPerRow() {
        const container = document.querySelector('.gallery-grid');
        if (!container) return 3; // Default fallback
        
        const containerWidth = container.offsetWidth;
        const itemWidth = 300 + 32; // item width + gap
        return Math.floor(containerWidth / itemWidth) || 1;
    }
}

// Infinite scroll (optional)
function initializeInfiniteScroll() {
    const loadMoreButton = document.querySelector('.load-more-btn');
    if (!loadMoreButton) return;
    
    let loading = false;
    let page = 1;
    
    // Intersection observer for infinite scroll
    const loadMoreObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !loading) {
                loadMoreItems();
            }
        });
    });
    
    loadMoreObserver.observe(loadMoreButton);
    
    async function loadMoreItems() {
        if (loading) return;
        
        loading = true;
        loadMoreButton.textContent = 'Loading...';
        loadMoreButton.disabled = true;
        
        try {
            // This would be replaced with actual API call
            const response = await fetch(`/api/gallery?page=${page + 1}`);
            const data = await response.json();
            
            if (data.artworks && data.artworks.length > 0) {
                appendGalleryItems(data.artworks);
                page++;
            } else {
                // No more items
                loadMoreButton.style.display = 'none';
                showNotification('No more artworks to load');
            }
        } catch (error) {
            console.error('Failed to load more items:', error);
            showNotification('Failed to load more items', 'error');
        } finally {
            loading = false;
            loadMoreButton.textContent = 'Load More';
            loadMoreButton.disabled = false;
        }
    }
    
    function appendGalleryItems(artworks) {
        const gallery = document.getElementById('gallery-grid');
        if (!gallery) return;
        
        artworks.forEach(artwork => {
            const item = createGalleryItem(artwork);
            gallery.appendChild(item);
        });
        
        // Re-initialize lazy loading for new items
        initializeGalleryLazyLoading();
    }
    
    function createGalleryItem(artwork) {
        const article = document.createElement('article');
        article.className = 'gallery-item';
        if (artwork.category) {
            article.dataset.category = artwork.category;
        }
        
        article.innerHTML = `
            <a href="${artwork.url}">
                <img src="${artwork.thumbnail}" 
                     alt="${artwork.title}" 
                     loading="lazy">
                <div class="gallery-item-info">
                    <h3>${artwork.title}</h3>
                    <div class="gallery-item-meta">
                        ${artwork.date ? `<time datetime="${artwork.date}">${artwork.date}</time>` : ''}
                        ${artwork.medium ? ` · ${artwork.medium}` : ''}
                    </div>
                    ${artwork.description ? `<p>${artwork.description}</p>` : ''}
                </div>
            </a>
        `;
        
        return article;
    }
}

// Gallery search functionality
function initializeGallerySearch() {
    const searchInput = document.querySelector('.gallery-search input');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(this.value.toLowerCase());
        }, 300);
    });
    
    function performSearch(query) {
        galleryItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p')?.textContent.toLowerCase() || '';
            const meta = item.querySelector('.gallery-item-meta').textContent.toLowerCase();
            
            const matches = title.includes(query) || 
                          description.includes(query) || 
                          meta.includes(query);
            
            if (matches || query === '') {
                item.style.display = 'block';
                item.classList.add('search-match');
            } else {
                item.style.display = 'none';
                item.classList.remove('search-match');
            }
        });
        
        // Update URL
        const url = new URL(window.location);
        if (query) {
            url.searchParams.set('search', query);
        } else {
            url.searchParams.delete('search');
        }
        window.history.replaceState({}, '', url);
    }
    
    // Apply search from URL on load
    const urlParams = new URLSearchParams(window.location.search);
    const urlSearch = urlParams.get('search');
    if (urlSearch) {
        searchInput.value = urlSearch;
        performSearch(urlSearch.toLowerCase());
    }
}

// Notification function (reused from artwork.js)
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

// CSS for keyboard focus
const style = document.createElement('style');
style.textContent = `
    .gallery-item.keyboard-focus {
        outline: 3px solid var(--link-color);
        outline-offset: 2px;
        border-radius: 0.5rem;
    }
    
    .gallery-filters {
        margin-bottom: 2rem;
        text-align: center;
    }
    
    .filter-buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
        margin-top: 1rem;
    }
    
    .filter-btn {
        background: var(--code-bg);
        border: 1px solid var(--border-color);
        color: var(--text-color);
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .filter-btn:hover,
    .filter-btn.active {
        background: var(--link-color);
        color: white;
        border-color: var(--link-color);
    }
    
    .load-more-btn {
        display: block;
        margin: 2rem auto;
        padding: 1rem 2rem;
        background: var(--link-color);
        color: white;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        font-size: 1rem;
        transition: background-color 0.2s ease;
    }
    
    .load-more-btn:hover:not(:disabled) {
        background: #0052a3;
    }
    
    .load-more-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

document.head.appendChild(style);