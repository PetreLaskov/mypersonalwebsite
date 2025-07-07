# My Timeless Personal Website

A contemplative writing and art portfolio website built following Gwern's principles of timeless, substantial content.

## Features

### 🎨 Content Types
- **Essays** - Long-form contemplative writing with Gwern-style features
- **Artwork** - Visual portfolio with zoom, process documentation, and series
- **Homepage** - Elegant showcase with "now" section and featured content

### 🔧 Technical Features
- **Static Site Generation** - Pandoc-based build system
- **Progressive Enhancement** - Works without JavaScript, enhanced with it
- **Dark Mode** - System preference detection + manual toggle
- **No External Dependencies** - Fast loading, privacy-focused
- **Responsive Design** - Mobile-first, accessible layouts

### 📝 Gwern-Inspired Features
- **Margin Notes** - Interactive side commentary
- **Collapsible Sections** - Expandable detailed content
- **Footnote Tooltips** - Hover previews of references
- **Table of Contents** - Collapsible navigation
- **Reading Progress** - Visual progress indicator

## Quick Start

### Option 1: Deploy to GitHub Pages (Recommended for beginners)
1. **Follow the deployment guide**: See [DEPLOYMENT.md](DEPLOYMENT.md) for complete step-by-step instructions
2. **No local setup required**: GitHub will build your site automatically
3. **Free hosting**: Your site will be live at `https://yourusername.github.io/repository-name`

### Option 2: Local Development
If you want to test changes before publishing:

**Prerequisites**:
- [Pandoc](https://pandoc.org/installing.html) for content processing
- Web server for local testing (Python's built-in server works)

**Build and Serve**:
```bash
# Build the site
./build.sh

# Serve locally
cd build && python3 -m http.server 8000
```

Visit `http://localhost:8000` to view the site.

## Project Structure

```
├── src/                    # Markdown source files
│   ├── index.md           # Homepage content
│   ├── about.md           # About page
│   ├── essays/            # Essay content
│   └── art/               # Artwork content
├── templates/             # Pandoc templates
│   ├── base.html          # Basic layout
│   ├── home.html          # Homepage template
│   ├── essay.html         # Essay template
│   ├── artwork.html       # Artwork template
│   └── gallery.html       # Gallery template
├── static/                # Static assets
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript
│   └── images/            # Images
├── build/                 # Generated site
├── build.sh               # Build script
├── metadata.yaml          # Site configuration
└── CLAUDE.md              # Project guidelines
```

## Content Creation

### Writing Essays
Create `.md` files in `src/essays/` with frontmatter:

```yaml
---
title: "Essay Title"
description: "Brief description"
template: essay
date: "2025-01-15"
tags: ["tag1", "tag2"]
abstract: "Essay abstract for preview"
toc: true
---

# Essay Title

Essay content with margin notes and collapsible sections...
```

### Creating Artwork Pages
Create `.md` files in `src/art/` with rich metadata:

```yaml
---
title: "Artwork Title"
template: artwork
date: "2025-01-15"
medium: "Digital Art"
image: "/static/images/artworks/artwork.jpg"
thumbnail: "/static/images/artworks/artwork-thumb.jpg"
process:
  - step: 1
    image: "/static/images/process/step1.jpg"
    description: "Process description"
---

Artwork description and artist statement...
```

## Customization

### Site Configuration
Edit `metadata.yaml` for site-wide settings:
- Site title and author
- Default metadata
- Build configuration

### Styling
- `static/css/main.css` - Base styles and variables
- `static/css/essay.css` - Essay-specific styles
- `static/css/artwork.css` - Artwork and gallery styles
- `static/css/home.css` - Homepage styles

### Functionality
- `static/js/main.js` - Core functionality (theme, navigation)
- `static/js/essay.js` - Essay features (margin notes, zoom)
- `static/js/artwork.js` - Artwork features (zoom, gallery)
- `static/js/home.js` - Homepage enhancements

## Design Principles

Following Gwern's approach, this site prioritizes:

1. **Timeless Over Timely** - Content designed to remain relevant
2. **Depth Over Breadth** - Thorough exploration of fewer topics
3. **Quality Over Quantity** - Careful craft over rapid publication
4. **Reader Value** - Focus on genuine utility and insight

## Technical Philosophy

- **Semantic HTML** - Meaningful markup for accessibility
- **Progressive Enhancement** - Core functionality without JavaScript
- **Performance First** - Fast loading, minimal dependencies
- **Privacy Focused** - No tracking, minimal data collection
- **Sustainable** - Long-term maintainability and preservation

## Development Workflow

### Day 1: Project Setup ✅
- Directory structure and git initialization
- Basic static site generator with Pandoc
- Clean semantic HTML5 foundation

### Day 2: Essay Template ✅
- Gwern-style essay template with abstracts, margin notes, footnotes
- Responsive design with dark mode support
- Collapsible sections and interactive features

### Day 3: Art Portfolio ✅
- Artwork template with image zoom and metadata
- Gallery layout with filtering and responsive grid
- Process documentation and series navigation

### Day 4: Homepage ✅
- Elegant content showcase with featured items
- "Now" section for current interests
- Fast loading with no external dependencies

## Browser Support

- **Modern browsers** - Full functionality
- **Older browsers** - Graceful degradation
- **JavaScript disabled** - Core functionality maintained
- **Screen readers** - Accessible markup and navigation

## Performance

- **Minimal CSS/JS** - No frameworks, hand-crafted code
- **Optimized images** - Lazy loading, responsive images
- **Fast rendering** - Semantic markup, efficient layouts
- **Offline capable** - Static files, service worker ready

## License

Content: [Specify your license]
Code: [Specify code license]

---

*Built with intention, designed to last.*