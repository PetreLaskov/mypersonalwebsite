#!/bin/bash

# Script to create a new essay with proper template
# Usage: ./scripts/new-essay.sh "Essay Title"

if [ -z "$1" ]; then
    echo "Usage: $0 \"Essay Title\""
    echo "Example: $0 \"On the Nature of Time\""
    exit 1
fi

TITLE="$1"
# Create filename from title (lowercase, replace spaces with hyphens)
FILENAME=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-\|-$//g')
DATE=$(date +"%Y-%m-%d")
FILEPATH="src/essays/${FILENAME}.md"

# Check if file already exists
if [ -f "$FILEPATH" ]; then
    echo "Error: File $FILEPATH already exists!"
    exit 1
fi

# Create the essay file with template
cat > "$FILEPATH" << EOF
---
title: "$TITLE"
subtitle: ""
description: "Brief description of this essay"
template: essay
author: "Your Name"
date: "$DATE"
tags: ["philosophy", "contemplation"]
abstract: "Write a brief abstract here that will appear at the top of the essay and in previews."
toc: true
math: false
related:
  - url: "/essays/other-essay.html"
    title: "Related Essay"
    description: "Brief description"
---

# $TITLE

Begin your contemplative exploration here...

## Introduction

Start with a compelling opening that draws the reader into your exploration.

## Main Content

Develop your ideas with depth and nuance.

<!-- collapse "Optional Expandable Section" -->

This content will be collapsible, allowing readers to dive deeper if they choose.

You can include:
- Additional examples
- Technical details
- Extended arguments
- Supplementary information

<!-- /collapse -->

## Conclusion

Bring your exploration to a thoughtful conclusion.

---

*This essay is part of an ongoing exploration of [topic]. For related thoughts, see [other essays] or subscribe to the [RSS feed](/feed.xml) for updates.*
EOF

echo "Created new essay: $FILEPATH"
echo "Edit the file to add your content, then run ./build.sh to generate the site."
echo ""
echo "Don't forget to:"
echo "1. Update the description and abstract"
echo "2. Add appropriate tags"
echo "3. Fill in related essays if any"
echo "4. Add the essay to your homepage featured content if desired"