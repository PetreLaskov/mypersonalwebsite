# Getting Started: Your First Steps

Welcome! This guide will help you get your website online in the next 30 minutes, even if you've never used GitHub before.

## 🚀 Quick Path to Success

### Step 1: Choose Your Path

**Complete Beginner?** → Follow [DEPLOYMENT.md](DEPLOYMENT.md) for full GitHub setup
**Some Experience?** → Skip to the Quick Deploy section below

### Step 2: Customize Your Site

Before or after deploying, you'll want to personalize your website:

#### Essential Customizations

1. **Site Information** (Edit `metadata.yaml`):
   ```yaml
   site-title: "Your Name"
   author: "Your Name" 
   description: "Your personal description"
   ```

2. **Homepage Content** (Edit `src/index.md`):
   - Update the hero title and description
   - Add your current reading/working/thinking in the "now" section
   - Replace featured content with your own

3. **About Page** (Edit `src/about.md`):
   - Write your personal bio
   - Explain your philosophy or approach
   - Add contact information

#### Optional Customizations

- **Colors**: Edit CSS custom properties in `static/css/main.css`
- **Typography**: Change font selections in the CSS files
- **Navigation**: Modify the menu in template files

### Step 3: Add Your Content

#### Your First Essay
```bash
# Use the helper script
./scripts/new-essay.sh "My First Essay"

# Or create manually
# Copy an existing essay and modify it
```

#### Your First Artwork
```bash
# Use the helper script
./scripts/new-artwork.sh "My First Artwork"

# Upload your image to static/images/artworks/
# Edit the generated markdown file
```

## 🏃‍♂️ Quick Deploy (For GitHub Users)

If you already have a GitHub account:

1. **Create repository**: New repo on GitHub
2. **Upload files**: Drag and drop all website files
3. **Enable Pages**: Settings → Pages → Source: "GitHub Actions"
4. **Wait for build**: Check Actions tab for completion
5. **Visit your site**: URL shown in Pages settings

## 📝 Content Creation Workflow

### Daily Writing Routine

1. **Draft in your favorite editor**: Write in any markdown editor
2. **Add to your site**: Copy content to `src/essays/` or `src/art/`
3. **Include metadata**: Follow the YAML frontmatter examples
4. **Commit changes**: Upload to GitHub (auto-builds your site)
5. **Share**: Your content is live in minutes!

### Content Ideas

**Essays**:
- Personal reflections on your interests
- Deep dives into subjects you're learning
- Responses to books, films, or ideas
- Process documentation for projects

**Artwork**:
- Digital art, photography, drawings
- Process documentation and behind-the-scenes
- Artist statements and conceptual explanations
- Series that explore themes over time

## 🛠 Essential Tools

### For Writing
- **Any text editor**: Even Notepad works!
- **Markdown editors**: Typora, Mark Text, or online editors
- **GitHub web interface**: Edit directly in your browser

### For Images
- **Optimization**: TinyPNG, ImageOptim, or similar
- **Basic editing**: GIMP, Photoshop, or online tools
- **Formats**: JPG for photos, PNG for graphics

### For Organization
- **File naming**: Use descriptive, hyphenated names
- **Folder structure**: Keep similar content together
- **Version control**: GitHub tracks all your changes

## 🔍 Understanding Your Website

### How It Works
1. **You write** in markdown files with metadata
2. **GitHub builds** your site using Pandoc automatically
3. **Visitors see** clean HTML pages with your content

### File Structure
```
Your Important Files:
├── src/index.md          ← Your homepage content
├── src/about.md          ← Your about page
├── src/essays/           ← Your writing
├── src/art/              ← Your artwork
├── metadata.yaml         ← Site settings
└── static/images/        ← Your images

GitHub Magic:
├── .github/workflows/    ← Auto-building (don't touch)
├── templates/            ← Page layouts (advanced)
└── static/css/           ← Styling (advanced)
```

### What You'll Edit Most
- **Content**: Files in `src/` folder
- **Images**: Upload to `static/images/`
- **Settings**: `metadata.yaml` for site-wide changes

## 📈 Growing Your Website

### Week 1: Foundation
- [ ] Deploy your site
- [ ] Customize basic information
- [ ] Write your first essay or add your first artwork
- [ ] Share with friends for feedback

### Month 1: Content
- [ ] Publish 3-5 pieces of content
- [ ] Establish your voice and style
- [ ] Connect your site to social media
- [ ] Start building an email list (optional)

### Month 3: Community
- [ ] Engage with other writers/artists online
- [ ] Guest post or collaborate
- [ ] Refine your content based on what resonates
- [ ] Consider a custom domain

## 🆘 When You Need Help

### Quick Fixes
1. **Site not updating**: Check Actions tab for build errors
2. **Images not showing**: Verify file paths and names
3. **Styling broken**: Check for YAML syntax errors

### Getting Support
- **Documentation**: All guides are in this repository
- **Community**: GitHub Community forum
- **Emergency**: Email GitHub support for account issues

### Learning Resources
- **Markdown**: CommonMark.org for syntax reference
- **GitHub**: GitHub's own documentation
- **Web development**: MDN Web Docs for HTML/CSS

## 🎯 Success Metrics

### Technical Success
- [ ] Site builds without errors
- [ ] All pages load quickly
- [ ] Content displays correctly on mobile
- [ ] Dark mode works properly

### Content Success  
- [ ] You enjoy the writing/creation process
- [ ] Content reflects your authentic voice
- [ ] Visitors spend time reading/viewing
- [ ] You're proud to share your URL

## 🔄 Next Steps

Once you're comfortable with the basics:

1. **Read the full documentation**: Understand all features
2. **Customize the design**: Make it uniquely yours  
3. **Optimize for search**: Add better descriptions and titles
4. **Build an audience**: Share consistently and authentically
5. **Consider advanced features**: Custom domains, analytics, etc.

---

**Remember**: The best website is one you actually use and update. Start simple, focus on content, and build complexity gradually.

**Your website URL will be**: `https://yourusername.github.io/repository-name`

**Ready to begin?** Start with [DEPLOYMENT.md](DEPLOYMENT.md) to get online!