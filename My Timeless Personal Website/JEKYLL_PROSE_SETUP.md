# Jekyll + Prose.io Setup Guide

Your site has been converted to Jekyll with Prose.io visual editing integration!

## 🎯 What's Changed

- **Jekyll static site generator** instead of Pandoc
- **GitHub Pages compatibility** - deploys automatically
- **Prose.io integration** - visual editor at prose.io
- **Same design & content** - everything preserved

## 📁 New File Structure

```
├── _config.yml           # Jekyll configuration
├── _layouts/             # Page templates
│   ├── default.html      # Base layout
│   ├── essay.html        # Essay template  
│   ├── artwork.html      # Artwork template
│   └── home.html         # Homepage template
├── _essays/              # Essay collection
├── _art/                 # Artwork collection
├── static/               # CSS, JS, images (unchanged)
├── Gemfile               # Ruby dependencies
├── index.md              # Homepage
├── about.md              # About page
├── essays.md             # Essays index
└── art.md                # Art gallery index
```

## 🚀 Deployment to GitHub Pages

### 1. Create GitHub Repository

1. Go to [github.com](https://github.com) and create a new repository
2. Name it `yourusername.github.io` (for personal site) or any name for project site
3. Push your code:

```bash
git init
git add .
git commit -m "Convert to Jekyll with Prose.io integration"
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to repository → Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: "main" / (root)
4. Click Save

Your site will be live at: `https://yourusername.github.io`

## ✍️ Using Prose.io Visual Editor

### 1. Access Prose.io

1. Go to [prose.io](http://prose.io)
2. Sign in with your GitHub account
3. Authorize Prose to access your repositories
4. Select your website repository

### 2. Editing Content

**Write New Essay:**
1. Navigate to `_essays` folder
2. Click "New File"
3. Use the visual editor with live preview
4. Metadata fields are pre-configured
5. Save commits directly to GitHub

**Add New Artwork:**
1. Navigate to `_art` folder  
2. Click "New File"
3. Upload images through the interface
4. Fill in artwork metadata
5. Save and publish

**Edit Pages:**
1. Click on `index.md`, `about.md`, etc.
2. Edit with rich text editor
3. Preview changes live
4. Commit when ready

### 3. Prose.io Features

✅ **Visual markdown editor** - WYSIWYG editing  
✅ **Live preview** - See changes as you type  
✅ **Image upload** - Drag and drop images  
✅ **Metadata forms** - No more manual YAML  
✅ **Git integration** - Auto-commits to GitHub  
✅ **Mobile editing** - Works on tablets/phones  

## 🛠️ Local Development

### 1. Install Ruby and Jekyll

```bash
# Install Ruby (on macOS)
brew install ruby

# Install Jekyll and bundler
gem install jekyll bundler

# Install dependencies
bundle install
```

### 2. Run Locally

```bash
# Serve the site
bundle exec jekyll serve

# With live reload
bundle exec jekyll serve --livereload

# View at: http://localhost:4000
```

### 3. Build for Production

```bash
# Build site
bundle exec jekyll build

# Output in _site/ directory
```

## 📝 Content Management Workflow

### Option 1: Prose.io (Recommended)
1. **Edit online** at prose.io
2. **Auto-deploy** via GitHub Pages
3. **No technical setup** required

### Option 2: Local + Git
1. **Edit locally** with any editor
2. **Commit and push** to GitHub
3. **Auto-deploy** via GitHub Pages

### Option 3: GitHub Web Interface
1. **Edit directly** on GitHub.com
2. **Use built-in editor** for quick changes
3. **Auto-deploy** immediately

## 🎨 Customization

### Editing Design
- **CSS**: Modify files in `static/css/`
- **JavaScript**: Modify files in `static/js/`
- **Layouts**: Edit files in `_layouts/`

### Site Configuration
- **Settings**: Edit `_config.yml`
- **Navigation**: Edit `_layouts/default.html`
- **Homepage**: Edit `index.md`

### Adding Content Types
- **New collection**: Add to `_config.yml`
- **New layout**: Create in `_layouts/`
- **New pages**: Create `.md` files

## 🔧 Advanced Features

### Custom Domain
1. Add `CNAME` file with your domain
2. Configure DNS to point to GitHub Pages
3. Enable HTTPS in repository settings

### Analytics & SEO
- **Jekyll SEO Tag** - Already configured
- **Google Analytics** - Add tracking ID to `_config.yml`
- **Social sharing** - Open Graph tags included

### Comments
- **Disqus** - Add to layout templates
- **GitHub Issues** - Use utterances widget

## 🆚 Benefits vs. Previous Setup

| Feature | Pandoc Setup | Jekyll Setup |
|---------|-------------|-------------|
| **Visual Editor** | ❌ None | ✅ Prose.io |
| **GitHub Pages** | ⚠️ Manual | ✅ Automatic |
| **Content Management** | ❌ Manual YAML | ✅ Forms |
| **Mobile Editing** | ❌ No | ✅ Yes |
| **Live Preview** | ❌ No | ✅ Yes |
| **Plugin Ecosystem** | ⚠️ Limited | ✅ Extensive |
| **Hosting Cost** | 💰 Varies | 🆓 Free |

## 📋 Next Steps

1. **Deploy to GitHub Pages** - Follow deployment guide
2. **Test Prose.io** - Create a test essay/artwork
3. **Customize branding** - Update `_config.yml` with your info
4. **Add custom domain** - If you have one
5. **Set up analytics** - If desired

Your site now has the same beautiful design with much easier content management!