// Essay-specific JavaScript functionality
// Following Gwern's progressive enhancement principles

document.addEventListener('DOMContentLoaded', function() {
    initializeMarginNotes();
    initializeCollapsibleSections();
    initializeFootnoteTooltips();
    initializeReadingProgress();
    initializeLinkPreviews();
});

// Margin notes functionality
function initializeMarginNotes() {
    const marginContainer = document.querySelector('.margin-notes');
    if (!marginContainer) return;
    
    // Find all margin note anchors in the text
    const marginAnchors = document.querySelectorAll('.margin-note-anchor');
    
    marginAnchors.forEach((anchor, index) => {
        const noteContent = anchor.getAttribute('data-note') || anchor.title;
        if (!noteContent) return;
        
        // Create margin note element
        const marginNote = document.createElement('div');
        marginNote.className = 'margin-note';
        marginNote.innerHTML = noteContent;
        marginNote.id = `margin-note-${index}`;
        
        // Position the note
        positionMarginNote(anchor, marginNote);
        
        // Add hover/click interactions
        anchor.addEventListener('mouseenter', () => {
            marginNote.style.backgroundColor = 'var(--link-color)';
            marginNote.style.color = 'white';
        });
        
        anchor.addEventListener('mouseleave', () => {
            marginNote.style.backgroundColor = 'var(--code-bg)';
            marginNote.style.color = 'var(--text-color)';
        });
        
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            marginNote.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        
        marginContainer.appendChild(marginNote);
    });
    
    // Reposition notes on window resize
    window.addEventListener('resize', repositionMarginNotes);
}

function positionMarginNote(anchor, note) {
    const anchorRect = anchor.getBoundingClientRect();
    const containerRect = document.querySelector('.essay-content').getBoundingClientRect();
    
    // Calculate position relative to the essay content
    const relativeTop = anchorRect.top - containerRect.top + window.scrollY;
    note.style.top = `${relativeTop}px`;
}

function repositionMarginNotes() {
    const marginNotes = document.querySelectorAll('.margin-note');
    const marginAnchors = document.querySelectorAll('.margin-note-anchor');
    
    marginNotes.forEach((note, index) => {
        const anchor = marginAnchors[index];
        if (anchor) {
            positionMarginNote(anchor, note);
        }
    });
}

// Collapsible sections
function initializeCollapsibleSections() {
    // Auto-detect collapsible sections by finding elements with class 'collapsible'
    const collapsibleElements = document.querySelectorAll('.collapsible');
    
    collapsibleElements.forEach(element => {
        const header = element.querySelector('.collapsible-header');
        const content = element.querySelector('.collapsible-content');
        const toggle = element.querySelector('.collapsible-toggle');
        
        if (header && content) {
            header.addEventListener('click', () => {
                element.classList.toggle('collapsed');
                
                // Smooth animation
                if (element.classList.contains('collapsed')) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    requestAnimationFrame(() => {
                        content.style.maxHeight = '0';
                    });
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.addEventListener('transitionend', function onTransitionEnd() {
                        content.style.maxHeight = 'none';
                        content.removeEventListener('transitionend', onTransitionEnd);
                    });
                }
            });
        }
    });
    
    // Create collapsible sections from markdown
    createCollapsibleFromMarkdown();
}

function createCollapsibleFromMarkdown() {
    // Look for patterns like <!-- collapse "Title" --> content <!-- /collapse -->
    const content = document.querySelector('.essay-body');
    if (!content) return;
    
    const html = content.innerHTML;
    const collapsePattern = /<!-- collapse "([^"]+)" -->([\s\S]*?)<!-- \/collapse -->/g;
    
    let newHtml = html.replace(collapsePattern, (match, title, content) => {
        return `
            <div class="collapsible">
                <div class="collapsible-header">
                    <strong>${title}</strong>
                    <span class="collapsible-toggle"></span>
                </div>
                <div class="collapsible-content">
                    ${content.trim()}
                </div>
            </div>
        `;
    });
    
    if (newHtml !== html) {
        content.innerHTML = newHtml;
        // Re-initialize collapsible functionality for new elements
        initializeCollapsibleSections();
    }
}

// Footnote tooltips
function initializeFootnoteTooltips() {
    const footnoteRefs = document.querySelectorAll('.footnote-ref');
    
    footnoteRefs.forEach(ref => {
        const footnoteId = ref.getAttribute('href').substring(1);
        const footnoteElement = document.getElementById(footnoteId);
        
        if (footnoteElement) {
            // Create tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'footnote-tooltip';
            tooltip.innerHTML = footnoteElement.innerHTML;
            tooltip.style.cssText = `
                position: absolute;
                background: var(--bg-color);
                border: 1px solid var(--border-color);
                border-radius: 0.25rem;
                padding: 0.5rem;
                max-width: 300px;
                font-size: 0.85rem;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 1000;
                display: none;
                pointer-events: none;
            `;
            
            document.body.appendChild(tooltip);
            
            ref.addEventListener('mouseenter', (e) => {
                tooltip.style.display = 'block';
                positionTooltip(e, tooltip);
            });
            
            ref.addEventListener('mousemove', (e) => {
                positionTooltip(e, tooltip);
            });
            
            ref.addEventListener('mouseleave', () => {
                tooltip.style.display = 'none';
            });
        }
    });
}

function positionTooltip(event, tooltip) {
    const x = event.clientX;
    const y = event.clientY;
    const tooltipRect = tooltip.getBoundingClientRect();
    
    let left = x + 10;
    let top = y - tooltipRect.height - 10;
    
    // Adjust if tooltip would go off screen
    if (left + tooltipRect.width > window.innerWidth) {
        left = x - tooltipRect.width - 10;
    }
    
    if (top < 0) {
        top = y + 20;
    }
    
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
}

// Reading progress indicator
function initializeReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background-color: var(--link-color);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const article = document.querySelector('.essay-body');
        if (!article) return;
        
        const articleRect = article.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.pageYOffset;
        
        const progress = Math.min(100, Math.max(0, (scrollTop / documentHeight) * 100));
        progressBar.style.width = progress + '%';
    });
}

// Link previews (basic implementation)
function initializeLinkPreviews() {
    const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');
    
    internalLinks.forEach(link => {
        // Add preview functionality for internal links
        link.addEventListener('mouseenter', function() {
            // This could be expanded to show actual content previews
            this.title = `Preview: ${this.textContent}`;
        });
    });
}

// Utility functions
function copyLink() {
    const url = window.location.href;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Link copied to clipboard!');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Link copied to clipboard!');
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--link-color);
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        z-index: 1002;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Fade in
    requestAnimationFrame(() => {
        notification.style.opacity = '1';
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Toggle table of contents with 't'
    if (e.key === 't' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const toc = document.querySelector('.table-of-contents');
        if (toc && document.activeElement.tagName !== 'INPUT') {
            e.preventDefault();
            toc.open = !toc.open;
        }
    }
    
    // Copy link with 'c'
    if (e.key === 'c' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (document.activeElement.tagName !== 'INPUT') {
            e.preventDefault();
            copyLink();
        }
    }
});