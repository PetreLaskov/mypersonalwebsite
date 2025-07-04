#!/bin/bash

# Script to create a new artwork with proper template
# Usage: ./scripts/new-artwork.sh "Artwork Title"

if [ -z "$1" ]; then
    echo "Usage: $0 \"Artwork Title\""
    echo "Example: $0 \"Digital Meditation #2\""
    exit 1
fi

TITLE="$1"
# Create filename from title (lowercase, replace spaces with hyphens)
FILENAME=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-\|-$//g')
DATE=$(date +"%Y-%m-%d")
FILEPATH="src/art/${FILENAME}.md"

# Check if file already exists
if [ -f "$FILEPATH" ]; then
    echo "Error: File $FILEPATH already exists!"
    exit 1
fi

# Create the artwork file with template
cat > "$FILEPATH" << EOF
---
title: "$TITLE"
subtitle: "Brief subtitle describing the work"
description: "A brief description of this artwork and its concepts"
template: artwork
date: "$DATE"
medium: "Digital Art / Photography / Mixed Media"
dimensions: "Size or resolution"
location: "Where it was created"
image: "/static/images/artworks/${FILENAME}.jpg"
thumbnail: "/static/images/artworks/${FILENAME}-thumb.jpg"
tags: ["digital-art", "contemplation", "other-tags"]

# Technical details (optional)
technical:
  - label: "Software"
    value: "Software used"
  - label: "Camera"
    value: "Camera model (for photography)"
  - label: "Resolution"
    value: "Image resolution"
  - label: "Color Space"
    value: "sRGB / Adobe RGB"

# Process documentation (optional)
process:
  - step: 1
    image: "/static/images/artworks/process/${FILENAME}-step1.jpg"
    description: "Description of first step in creation process"
  - step: 2
    image: "/static/images/artworks/process/${FILENAME}-step2.jpg"
    description: "Description of second step"

# Series information (optional)
series:
  title: "Series Name"
  description: "Description of the series this work belongs to"
  artworks:
    - title: "Other Work 1"
      url: "/art/other-work-1.html"
      thumbnail: "/static/images/artworks/other-work-1-thumb.jpg"

# Related works (optional)
related:
  - title: "Related Artwork"
    url: "/art/related-artwork.html"
    thumbnail: "/static/images/artworks/related-artwork-thumb.jpg"

# Navigation (optional)
prev:
  title: "Previous Artwork"
  url: "/art/previous-artwork.html"
next:
  title: "Next Artwork" 
  url: "/art/next-artwork.html"

# Purchase options (optional)
purchase: "mailto:your@email.com?subject=Purchase%20Inquiry:%20$TITLE"
download: "/static/images/artworks/${FILENAME}-hires.jpg"

statement: |
  Write your artist statement here. This section allows you to explain:
  
  - The concept behind the work
  - Your creative process
  - Technical approaches used
  - What you want viewers to experience
  
  Use multiple paragraphs to fully explore the work's meaning and creation.
---

# $TITLE

*Brief tagline or subtitle*

Begin with an engaging description of the artwork and its significance in your practice.

## Concept

Explain the conceptual foundation of the work. What ideas were you exploring? What questions were you asking?

## Process and Technique

Describe your creative process:

**Conceptual Phase**: How did the idea develop?

**Creation Process**: What tools, techniques, or approaches did you use?

**Technical Considerations**: Any specific technical challenges or innovations?

## Artistic Context

How does this work relate to:
- Your broader artistic practice
- Art historical precedents
- Contemporary conversations in your medium
- Personal or philosophical explorations

## Reflection

What did you learn from creating this work? How does it contribute to your ongoing artistic investigation?

---

*This work is available as [specify availability - prints, originals, digital files]. For inquiries, please [contact information].*
EOF

echo "Created new artwork: $FILEPATH"
echo ""
echo "Next steps:"
echo "1. Upload your artwork image to: static/images/artworks/${FILENAME}.jpg"
echo "2. Create a thumbnail version: static/images/artworks/${FILENAME}-thumb.jpg"
echo "3. Edit $FILEPATH to add your content"
echo "4. Update technical details, process, and related works as needed"
echo "5. Run ./build.sh to generate the site"
echo ""
echo "Image guidelines:"
echo "- Main image: High quality, web-optimized (usually 1200-2000px wide)"
echo "- Thumbnail: 300x300px or similar square format"
echo "- Process images: 600-800px wide is usually sufficient"
echo "- Use descriptive filenames with no spaces or special characters"