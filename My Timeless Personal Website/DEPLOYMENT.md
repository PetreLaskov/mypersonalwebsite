# Deployment Guide: GitHub Pages Setup

This guide will walk you through deploying your website to GitHub Pages, which will give you a free website at `https://yourusername.github.io/repository-name`. No prior GitHub experience required!

## What You'll Need

- A computer with internet access
- About 30 minutes
- Your website files (which you already have!)

## Step 1: Create a GitHub Account

1. **Go to GitHub**: Visit [github.com](https://github.com)
2. **Sign up**: Click "Sign up" in the top right
3. **Choose a username**: This will be part of your website URL (`yourusername.github.io`)
   - Choose something professional if this is for your personal brand
   - Username can only contain letters, numbers, and hyphens
   - Cannot start with a hyphen or number
4. **Complete signup**: Verify your email when prompted

## Step 2: Create a New Repository

A "repository" (or "repo") is like a folder for your project on GitHub.

1. **Create repository**: Click the green "New" button or the "+" icon → "New repository"
2. **Name your repository**: 
   - For a personal site: Use `your-website-name` (like `my-personal-site`)
   - For a project site: Use a descriptive name
   - **Important**: Use lowercase letters, numbers, and hyphens only
3. **Make it public**: Select "Public" (required for free GitHub Pages)
4. **Initialize repository**: 
   - ✅ Check "Add a README file"
   - ✅ Check "Add .gitignore" → Choose "Jekyll" template
   - Leave "Choose a license" as "None" for now
5. **Click "Create repository"**

Your repository will be created at: `https://github.com/yourusername/repository-name`

## Step 3: Upload Your Website Files

### Method A: Using GitHub's Web Interface (Easiest for beginners)

1. **Open your repository**: Go to your newly created repository page
2. **Upload files**: Click "uploading an existing file" link or the "Add file" → "Upload files" button
3. **Drag and drop**: 
   - Open your website folder on your computer
   - Select ALL files and folders (Ctrl+A or Cmd+A)
   - Drag them into the GitHub upload area
4. **Wait for upload**: This may take a few minutes depending on file sizes
5. **Commit changes**: 
   - Scroll down to "Commit changes"
   - In "Commit message" write: "Initial website upload"
   - Click "Commit changes"

### Method B: Using Git Command Line (More advanced)

If you're comfortable with command line:

```bash
# Clone your repository
git clone https://github.com/yourusername/repository-name.git
cd repository-name

# Copy your website files into this folder
# (copy all files from your website project)

# Add and commit files
git add .
git commit -m "Initial website upload"
git push origin main
```

## Step 4: Enable GitHub Pages

1. **Go to Settings**: In your repository, click the "Settings" tab (far right)
2. **Find Pages**: Scroll down in the left sidebar and click "Pages"
3. **Configure source**: 
   - Under "Source", select "GitHub Actions"
   - This tells GitHub to use your workflow file to build the site
4. **Save**: The page will refresh automatically

## Step 5: Verify Deployment

1. **Check Actions**: Click the "Actions" tab in your repository
2. **Wait for build**: You should see a workflow running called "Build and Deploy to GitHub Pages"
   - 🟡 Yellow dot = Running
   - ✅ Green checkmark = Success
   - ❌ Red X = Failed (see troubleshooting below)
3. **Find your URL**: Once successful, go back to Settings → Pages
   - Your site URL will be shown: `https://yourusername.github.io/repository-name`
4. **Visit your site**: Click the URL to see your live website!

## Step 6: Making Updates

Every time you want to update your website:

### Using GitHub Web Interface:
1. **Navigate to file**: In your repository, click through folders to find the file you want to edit
2. **Edit file**: Click the pencil icon (✏️) to edit
3. **Make changes**: Edit the content using GitHub's text editor
4. **Commit changes**: 
   - Scroll down and write a brief description of what you changed
   - Click "Commit changes"
5. **Automatic rebuild**: GitHub will automatically rebuild and deploy your site!

### Using Git Command Line:
```bash
# Make your changes locally
# Then commit and push
git add .
git commit -m "Description of your changes"
git push origin main
```

## Understanding Your Website Structure

Your website files work like this:

```
your-repository/
├── .github/workflows/          # GitHub Actions (automatic building)
│   └── build-and-deploy.yml   # Build instructions
├── src/                       # Your content files
│   ├── index.md              # Homepage content
│   ├── about.md              # About page
│   ├── essays/               # Essay files
│   └── art/                  # Artwork files
├── templates/                # Page layouts
├── static/                   # CSS, JS, images
├── build.sh                  # Build script
└── metadata.yaml            # Site configuration
```

**To update content**: Edit files in the `src/` folder
**To change design**: Edit files in `static/css/` or `templates/`
**To configure site**: Edit `metadata.yaml`

## Customizing Your Site

### Change Site Title and Author
Edit `metadata.yaml`:
```yaml
site-title: "Your Name"
author: "Your Name"
description: "Your site description"
```

### Update Homepage Content
Edit `src/index.md` - all the homepage content is in the YAML frontmatter at the top.

### Add New Essays
1. Create a new file in `src/essays/` like `my-new-essay.md`
2. Use this template:
```yaml
---
title: "Your Essay Title"
description: "Brief description"
template: essay
date: "2025-01-15"
tags: ["tag1", "tag2"]
---

# Your Essay Title

Your essay content here...
```

### Add New Artwork
1. Upload images to `static/images/artworks/`
2. Create a new file in `src/art/` like `my-artwork.md`
3. Use the artwork template from existing examples

## Troubleshooting

### Build Failed (Red X in Actions)
1. **Check the error**: Click on the failed workflow in the Actions tab
2. **Common issues**:
   - **Invalid YAML**: Check that your frontmatter has proper indentation
   - **Missing files**: Ensure all referenced images and files exist
   - **Template errors**: Make sure you're using the correct template names

### Site Not Updating
1. **Check Actions**: Make sure the workflow completed successfully
2. **Clear cache**: Try visiting your site in an incognito/private browser window
3. **Wait**: Sometimes it takes 5-10 minutes for changes to appear

### Images Not Showing
1. **Check paths**: Make sure image paths in your markdown start with `/static/`
2. **File names**: Ensure image filenames don't have spaces or special characters
3. **Case sensitivity**: Make sure filename cases match exactly

### Page Not Found (404)
1. **Check filename**: Make sure the markdown file exists in the correct folder
2. **Check links**: Verify that links in your content point to the right files
3. **Case sensitivity**: URLs are case-sensitive

## Advanced Tips

### Custom Domain (Optional)
If you own a domain name like `yourname.com`:
1. **Add CNAME file**: Create a file named `CNAME` in your repository root
2. **Add your domain**: Put your domain name in the file (e.g., `yourname.com`)
3. **Configure DNS**: Point your domain's DNS to GitHub Pages
4. **Enable HTTPS**: GitHub will automatically provide SSL certificates

### Local Development
To test changes before publishing:
1. **Install Pandoc**: Follow instructions at [pandoc.org](https://pandoc.org/installing.html)
2. **Run build script**: `./build.sh`
3. **Serve locally**: `cd build && python3 -m http.server 8000`
4. **View at**: `http://localhost:8000`

### Analytics and SEO
Your site is already optimized for:
- **Search engines**: Semantic HTML and meta tags
- **Social sharing**: Open Graph tags for Twitter/Facebook
- **Performance**: Fast loading, minimal dependencies
- **Accessibility**: Screen reader friendly

## Getting Help

### Resources
- **GitHub Docs**: [docs.github.com](https://docs.github.com/en/pages)
- **Markdown Guide**: [markdownguide.org](https://www.markdownguide.org/)
- **Pandoc Manual**: [pandoc.org/MANUAL.html](https://pandoc.org/MANUAL.html)

### Community Support
- **GitHub Community**: [github.community](https://github.community/)
- **Stack Overflow**: Search for "GitHub Pages" + your specific question

---

## Quick Reference Card

**Your site URL**: `https://yourusername.github.io/repository-name`
**Edit content**: Files in `src/` folder
**Upload images**: `static/images/` folder
**Check build status**: Actions tab in your repository
**Update site**: Commit changes to trigger automatic rebuild

**Most common edit locations**:
- Homepage: `src/index.md`
- About page: `src/about.md`
- Site settings: `metadata.yaml`
- New essays: `src/essays/filename.md`
- New artwork: `src/art/filename.md`

Remember: Every change you make and commit will automatically rebuild and update your live website within a few minutes!