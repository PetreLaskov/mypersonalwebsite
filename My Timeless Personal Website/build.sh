#!/bin/bash

# Simple static site generator using Pandoc
# Usage: ./build.sh [clean]

set -e  # Exit on error

# Configuration
SRC_DIR="src"
BUILD_DIR="build"
TEMPLATE_DIR="templates"
STATIC_DIR="static"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Clean build directory
clean_build() {
    if [ -d "$BUILD_DIR" ]; then
        log_info "Cleaning build directory..."
        rm -rf "$BUILD_DIR"/*
    fi
}

# Copy static files
copy_static() {
    log_info "Copying static files..."
    if [ -d "$STATIC_DIR" ]; then
        cp -r "$STATIC_DIR" "$BUILD_DIR/"
    else
        log_warn "Static directory not found"
    fi
}

# Build HTML from Markdown
build_pages() {
    log_info "Building pages..."
    
    # Create build directory if it doesn't exist
    mkdir -p "$BUILD_DIR"
    
    # Find all markdown files
    find "$SRC_DIR" -name "*.md" -type f | while read -r file; do
        # Get relative path and change extension
        rel_path=${file#$SRC_DIR/}
        html_file="$BUILD_DIR/${rel_path%.md}.html"
        
        # Create directory structure in build
        mkdir -p "$(dirname "$html_file")"
        
        log_info "Processing: $rel_path"
        
        # Determine template based on frontmatter or file location
        template="base.html"
        if grep -q "template: essay" "$file"; then
            template="essay.html"
        elif grep -q "template: artwork" "$file"; then
            template="artwork.html"
        elif grep -q "template: gallery" "$file"; then
            template="gallery.html"
        elif grep -q "template: home" "$file"; then
            template="home.html"
        fi
        
        # Pandoc command with dynamic template selection
        pandoc "$file" \
            --template="$TEMPLATE_DIR/$template" \
            --standalone \
            --table-of-contents \
            --toc-depth=3 \
            --highlight-style=github \
            --html-q-tags \
            --email-obfuscation=references \
            --wrap=preserve \
            --metadata-file="metadata.yaml" 2>/dev/null \
            --output="$html_file" || \
        pandoc "$file" \
            --template="$TEMPLATE_DIR/$template" \
            --standalone \
            --table-of-contents \
            --toc-depth=3 \
            --highlight-style=github \
            --html-q-tags \
            --email-obfuscation=references \
            --wrap=preserve \
            --output="$html_file"
    done
}

# Generate index if it doesn't exist
generate_index() {
    if [ ! -f "$SRC_DIR/index.md" ]; then
        log_info "Generating basic index.md..."
        cat > "$SRC_DIR/index.md" << EOF
---
title: "Welcome"
description: "Personal website featuring contemplative writing, art, and meditation"
---

# Welcome

This is your personal intellectual website.

## Recent Content

- [About](/about.html)

## Navigation

- [Essays](/essays/)
- [Art](/art/)
- [About](/about.html)
EOF
    fi
}

# Generate RSS feed
generate_rss() {
    log_info "Generating RSS feed..."
    # This would be expanded to create an actual RSS feed
    # For now, create a placeholder
    cat > "$BUILD_DIR/feed.xml" << EOF
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
    <title>Your Name</title>
    <link>https://yoursite.com</link>
    <description>Contemplative writing, art, and meditation</description>
    <lastBuildDate>$(date -R)</lastBuildDate>
</channel>
</rss>
EOF
}

# Main build process
main() {
    log_info "Starting build process..."
    
    # Check if Pandoc is installed
    if ! command -v pandoc &> /dev/null; then
        log_error "Pandoc is not installed. Please install Pandoc to continue."
        exit 1
    fi
    
    # Handle clean option
    if [ "$1" = "clean" ]; then
        clean_build
        log_info "Clean complete."
        exit 0
    fi
    
    # Create necessary directories
    mkdir -p "$BUILD_DIR"
    mkdir -p "$SRC_DIR"
    
    # Generate basic content if needed
    generate_index
    
    # Build process
    clean_build
    copy_static
    build_pages
    generate_rss
    
    log_info "Build complete! Site generated in '$BUILD_DIR'"
    log_info "To serve locally: cd $BUILD_DIR && python3 -m http.server 8000"
}

# Run main function
main "$@"

