# Website Maintenance Guide

This guide covers ongoing maintenance, troubleshooting, and content management for your website.

## Daily/Weekly Tasks

### Adding New Content

**New Essay**:
```bash
# Use the helper script
./scripts/new-essay.sh "Your Essay Title"

# Or create manually in src/essays/
# Follow the template in existing essays
```

**New Artwork**:
```bash
# Use the helper script  
./scripts/new-artwork.sh "Your Artwork Title"

# Upload images to static/images/artworks/
# Edit the generated markdown file
```

**Updating Homepage**:
- Edit `src/index.md` 
- Update the `featured-*` sections in YAML frontmatter
- Add new items to `recent-posts` list

### Publishing Changes

1. **Make your edits** to markdown files
2. **Commit to GitHub**:
   - Via web interface: Edit → Commit changes
   - Via command line: `git add . && git commit -m "Description" && git push`
3. **Wait for build**: Check Actions tab for green checkmark
4. **Verify changes**: Visit your live site in 5-10 minutes

## Monthly Tasks

### Review and Update

- **Check links**: Ensure all internal and external links work
- **Update "Now" section**: Refresh current reading/working/thinking
- **Review analytics**: Check which content resonates most
- **Update metadata**: Ensure dates and descriptions are current

### Performance Maintenance

- **Optimize images**: Compress any new large images
- **Check site speed**: Use tools like PageSpeed Insights
- **Verify mobile**: Test on phone/tablet browsers
- **Test accessibility**: Use screen reader or accessibility tools

## Troubleshooting Common Issues

### Build Failures

**Symptoms**: Red X in GitHub Actions, site not updating

**Common Causes**:
1. **YAML syntax errors**:
   ```yaml
   # Wrong (no quotes around colons)
   title: My Essay: A Deep Dive
   
   # Right (quotes when title contains colons)
   title: "My Essay: A Deep Dive"
   ```

2. **Missing images**:
   - Check that all referenced images exist
   - Verify exact spelling and capitalization
   - Ensure paths start with `/static/`

3. **Template errors**:
   ```yaml
   # Wrong
   template: essays
   
   # Right
   template: essay
   ```

**Debug Steps**:
1. **Check Actions tab**: Click on failed build to see error message
2. **Review recent changes**: What did you edit last?
3. **Validate YAML**: Use online YAML validator for frontmatter
4. **Test locally**: Run `./build.sh` on your computer if possible

### Site Not Updating

**Possible Issues**:
- **Cache**: Try incognito/private browsing mode
- **DNS propagation**: Can take up to 24 hours for custom domains
- **Build still running**: Check Actions tab for in-progress builds

### Images Not Loading

**Checklist**:
- [ ] Image file exists in `static/images/` directory
- [ ] Path in markdown starts with `/static/`
- [ ] Filename has no spaces or special characters
- [ ] File extension matches actual file type
- [ ] Image is not too large (>5MB can cause issues)

### Broken Links

**Internal links**:
- Must end in `.html` (e.g., `/essays/my-essay.html`)
- Case-sensitive on GitHub Pages
- Check that target file exists

**External links**:
- Test manually to ensure they still work
- Consider using archive.org links for reference materials

## Content Organization

### File Structure Best Practices

```
src/
├── index.md                 # Homepage (always needed)
├── about.md                 # About page (recommended)
├── essays/                  # Essay directory
│   ├── essay-1.md          # Individual essays
│   ├── essay-2.md
│   └── index.md            # Essays listing (optional)
└── art/                    # Artwork directory
    ├── artwork-1.md        # Individual artworks
    ├── artwork-2.md
    └── index.md            # Gallery page (recommended)
```

### Naming Conventions

**Files**: Use lowercase, hyphens only
- ✅ `digital-minimalism-attention.md`
- ❌ `Digital Minimalism & Attention.md`

**Images**: Descriptive, consistent naming
- ✅ `2025-01-15-digital-contemplation-1.jpg`
- ✅ `urban-solitude-thumb.jpg`
- ❌ `IMG_1234.jpg`

### Content Guidelines

**Essays**:
- Use descriptive titles and subtitles
- Include meaningful abstracts
- Add relevant tags for discoverability
- Link to related content

**Artwork**:
- Provide technical details for transparency
- Document your process when possible
- Organize into series for narrative coherence
- Include artist statements for context

## SEO and Discoverability

### Essential Meta Tags

Each page should have:
```yaml
title: "Descriptive Page Title"
description: "Brief, engaging description under 160 characters"
```

### Image Optimization

- **Alt text**: Descriptive alternative text for all images
- **File sizes**: Keep web images under 1MB when possible
- **Dimensions**: Size images appropriately (don't rely on CSS scaling)

### Internal Linking

- Link between related essays and artworks
- Update older content to link to newer pieces
- Use descriptive link text (not "click here")

## Backup and Security

### Regular Backups

**Automatic**: GitHub stores your complete history
**Manual**: Download repository as ZIP occasionally
**Images**: Keep high-resolution originals elsewhere

### Security Best Practices

- **Never commit**: Passwords, API keys, personal information
- **Use .gitignore**: For local files you don't want public
- **Review commits**: Before pushing, check what you're publishing

## Analytics and Growth

### Understanding Your Audience

GitHub provides basic traffic analytics:
1. Go to repository → Insights → Traffic
2. See page views, unique visitors, referring sites
3. Use this data to understand what resonates

### Content Strategy

**What works well**:
- Consistent publishing schedule
- Deep, thoughtful content
- Good internal linking
- Clear, descriptive titles

**Growth tactics**:
- Share on relevant communities (Reddit, forums)
- Engage with other contemplative writers
- Link to your work from other platforms
- Guest posting or collaboration

## Advanced Maintenance

### Custom Domain Setup

If you own a domain like `yourname.com`:

1. **Add CNAME file**:
   ```bash
   # Create file named CNAME in repository root
   echo "yourname.com" > CNAME
   ```

2. **Configure DNS** (at your domain registrar):
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   
   Type: A  
   Name: @
   Value: 185.199.109.153
   
   Type: A
   Name: @
   Value: 185.199.110.153
   
   Type: A
   Name: @
   Value: 185.199.111.153
   
   Type: CNAME
   Name: www
   Value: yourusername.github.io
   ```

3. **Wait**: DNS changes take 4-24 hours to propagate

### Performance Monitoring

**Tools to use**:
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

**Key metrics**:
- First Contentful Paint < 2s
- Largest Contentful Paint < 4s
- Cumulative Layout Shift < 0.1

### Accessibility Audit

**Regular checks**:
- Test with keyboard navigation only
- Use screen reader (NVDA is free)
- Check color contrast ratios
- Validate HTML markup

## Getting Help

### When Things Break

1. **Check recent changes**: What did you edit last?
2. **Review build logs**: Actions tab shows detailed errors
3. **Test locally**: Build on your computer if possible
4. **Rollback**: Revert to last working commit if needed

### Community Resources

- **GitHub Community**: github.community
- **Pandoc Users**: Groups.google.com/g/pandoc-discuss
- **Static Site Generators**: Reddit r/webdev

### Professional Help

Consider hiring help for:
- Custom design modifications
- Advanced functionality
- Performance optimization
- SEO consultation

---

## Quick Reference

**Update content**: Edit files in `src/`
**Add images**: Upload to `static/images/`
**Check build status**: Repository → Actions tab
**Site URL**: `https://yourusername.github.io/repository-name`
**Build logs**: Actions → Latest workflow → Build details

**Emergency contact**: If you get locked out or something breaks critically, GitHub support can help restore access to your repository.