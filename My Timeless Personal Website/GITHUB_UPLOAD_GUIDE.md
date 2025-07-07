# 📤 What to Upload to GitHub

Your website folder has been cleaned and is ready for GitHub! Here's exactly what to upload:

## ✅ Files to Upload

**Upload ALL of these files and folders:**

```
📁 Your Website Folder/
├── 📁 _art/                          # Artwork collection
│   ├── digital-contemplation-1.md
│   └── urban-solitude.md
├── 📁 _essays/                       # Essays collection  
│   └── digital-minimalism-attention.md
├── 📁 _layouts/                      # Jekyll templates
│   ├── artwork.html
│   ├── default.html
│   ├── essay.html
│   └── home.html
├── 📁 static/                        # CSS, JS, images
│   ├── 📁 css/
│   ├── 📁 js/
│   └── 📁 images/
├── 📄 _config.yml                    # Jekyll configuration
├── 📄 Gemfile                        # Ruby dependencies
├── 📄 about.md                       # About page
├── 📄 art.md                         # Art gallery index
├── 📄 essays.md                      # Essays index
├── 📄 index.md                       # Homepage
├── 📄 CNAME.example                  # For custom domain (optional)
└── 📄 README.md                      # Project documentation
```

## ❌ Files Already Removed

These old files have been cleaned up and should NOT be uploaded:
- ❌ `build/` directory (old Pandoc output)
- ❌ `src/` directory (old Pandoc source)
- ❌ `templates/` directory (old Pandoc templates)
- ❌ `build.sh` (old build script)
- ❌ `metadata.yaml` (old Pandoc config)
- ❌ Old documentation files

## 🚀 Upload Steps

### Method 1: Command Line (Recommended)

```bash
# Navigate to your website folder
cd "/home/pece/My Timeless Personal Website"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial Jekyll site with Prose.io integration"

# Connect to GitHub (replace with your repository)
git remote add origin https://github.com/yourusername/yourusername.github.io.git

# Push to GitHub
git push -u origin main
```

### Method 2: GitHub Desktop
1. Open GitHub Desktop
2. Add existing repository
3. Select your website folder
4. Commit all files
5. Publish to GitHub

### Method 3: Web Upload
1. Create new repository on GitHub.com
2. Drag and drop ALL the files listed above
3. Commit changes

## 📋 Repository Setup

### Personal Site (Recommended)
- **Repository name**: `yourusername.github.io`
- **Visibility**: Public (required for free GitHub Pages)
- **URL**: `https://yourusername.github.io`

### Project Site
- **Repository name**: Any name (e.g., `my-website`)
- **Visibility**: Public
- **URL**: `https://yourusername.github.io/my-website`

## ⚙️ Enable GitHub Pages

After uploading:

1. **Go to repository Settings**
2. **Scroll to Pages section**
3. **Source**: "Deploy from a branch"
4. **Branch**: "main"
5. **Folder**: "/ (root)"
6. **Click Save**

Your site will be live in 5-10 minutes!

## 📝 What Happens Next

1. **GitHub builds your site** using Jekyll automatically
2. **Site goes live** at your GitHub Pages URL
3. **Edit with Prose.io** at [prose.io](http://prose.io)
4. **Changes auto-deploy** when you save in Prose.io

## 🎯 File Count Summary

You should have approximately:
- **12 files** (markdown, config, etc.)
- **4 folders** (_art, _essays, _layouts, static)
- **Static folder** contains your CSS, JS, and images

## ✨ Ready to Upload!

Your website is now clean, optimized, and ready for GitHub Pages with Prose.io editing capabilities!