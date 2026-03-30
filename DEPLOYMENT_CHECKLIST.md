# Zenith Terra Tech Limited Website - Deployment Checklist

## Project Overview
- **Domain**: https://ztthk.com
- **Company**: Zenith Terra Tech Limited (Hong Kong)
- **Contact**: contact@zenith-terra.com
- **WhatsApp**: +852 6934 0494

## File Structure
```
zttlweb/
├── index.html                    # Homepage
├── about.html                    # About Us page
├── products.html                 # Products overview
├── cosmetic-peptides.html        # Cosmetic Peptides category
├── nad-precursors.html           # NAD+ Precursors category
├── chromatography-media.html     # Chromatography Media category
├── qualifications.html           # Qualifications & Compliance
├── contact.html                  # Contact Us page
├── inquiry.html                  # Online Inquiry form
├── privacy-policy.html           # Privacy Policy (GDPR)
├── cookie-policy.html            # Cookie Policy (GDPR)
├── 404.html                      # 404 Error page
├── styles.css                    # Main stylesheet
├── script.js                     # Main JavaScript
├── sitemap.xml                   # SEO Sitemap
├── robots.txt                    # SEO Robots
├── .htaccess                     # Apache config
├── DEPLOYMENT_CHECKLIST.md       # This file
├── downloads/                    # COA/TDS PDF directory
│   └── README.md                 # Instructions for PDF files
└── images/                       # Image assets
    └── logo.jpg                  # Company logo
```

## Pre-Deployment Tasks

### 1. Form Configuration (CRITICAL)
- [ ] Sign up for Formspree account: https://formspree.io
- [ ] Create a new form
- [ ] Replace `YOUR_FORM_ID` in:
  - `index.html` (quick inquiry form)
  - `contact.html` (contact form)
  - `inquiry.html` (full inquiry form)
- [ ] Test form submission
- [ ] Verify email notifications received at contact@zenith-terra.com

### 2. hCaptcha Configuration (CRITICAL)
- [ ] Sign up for hCaptcha account: https://www.hcaptcha.com
- [ ] Get site key
- [ ] Replace `YOUR_HCAPTCHA_SITE_KEY` in:
  - `index.html`
  - `contact.html`
  - `inquiry.html`

### 3. PDF Documents (CRITICAL)
- [ ] Obtain COA and TDS PDFs for all products
- [ ] Rename files according to convention: `ProductName_CAS_COA/TDS.pdf`
- [ ] Place files in `downloads/` directory
- [ ] Verify all download links work

**Required PDFs:**

#### Cosmetic Peptides:
- [ ] Acetyl_Hexapeptide-8_616204-22-9_COA.pdf
- [ ] Acetyl_Hexapeptide-8_616204-22-9_TDS.pdf
- [ ] Palmitoyl_Pentapeptide-4_214047-00-4_COA.pdf
- [ ] Palmitoyl_Pentapeptide-4_214047-00-4_TDS.pdf
- [ ] Copper_Peptide_49557-75-7_COA.pdf
- [ ] Copper_Peptide_49557-75-7_TDS.pdf
- [ ] Palmitoyl_Tripeptide-5_623172-06-1_COA.pdf
- [ ] Palmitoyl_Tripeptide-5_623172-06-1_TDS.pdf
- [ ] Palmitoyl_Tetrapeptide-7_221227-05-0_COA.pdf
- [ ] Palmitoyl_Tetrapeptide-7_221227-05-0_TDS.pdf
- [ ] Oligopeptide-1_62253-63-8_COA.pdf
- [ ] Oligopeptide-1_62253-63-8_TDS.pdf

#### NAD+ Precursors:
- [ ] NMN_1094-61-7_COA.pdf
- [ ] NMN_1094-61-7_TDS.pdf
- [ ] NR_1341-23-7_COA.pdf
- [ ] NR_1341-23-7_TDS.pdf
- [ ] NAD+_53-84-9_COA.pdf
- [ ] NAD+_53-84-9_TDS.pdf

#### Chromatography Media:
- [ ] Ion_Exchange_Chromatography_COA.pdf
- [ ] Ion_Exchange_Chromatography_TDS.pdf
- [ ] Affinity_Chromatography_COA.pdf
- [ ] Affinity_Chromatography_TDS.pdf
- [ ] Size_Exclusion_Chromatography_COA.pdf
- [ ] Size_Exclusion_Chromatography_TDS.pdf
- [ ] High_Performance_Resins_COA.pdf
- [ ] High_Performance_Resins_TDS.pdf

### 4. Images
- [ ] Ensure `images/logo.jpg` exists (company logo)
- [ ] Verify logo displays correctly on all pages
- [ ] Optimize images for web (recommended: max 100KB for logo)

### 5. Domain Configuration
- [ ] Configure DNS for ztthk.com
- [ ] Set up SSL certificate (HTTPS)
- [ ] Configure www to non-www redirect (or vice versa)

## Deployment Steps

### Option A: GitHub Pages + Cloudflare (Recommended)
1. Create GitHub repository
2. Upload all files
3. Enable GitHub Pages
4. Configure Cloudflare:
   - Add domain to Cloudflare
   - Set DNS records to point to GitHub Pages
   - Enable SSL (Full/Strict)
   - Enable caching

### Option B: Traditional Hosting
1. Upload all files via FTP/SFTP
2. Ensure `.htaccess` is uploaded
3. Set correct file permissions (644 for files, 755 for directories)
4. Test all pages and functionality

## Post-Deployment Testing

### Functionality Tests
- [ ] All pages load correctly
- [ ] Navigation works on desktop
- [ ] Navigation works on mobile
- [ ] All product links work
- [ ] COA/TDS download links work
- [ ] WhatsApp link opens with preset message
- [ ] Email links work

### Form Tests
- [ ] Quick inquiry form submits successfully
- [ ] Contact form submits successfully
- [ ] Full inquiry form submits successfully
- [ ] hCaptcha verification works
- [ ] Form validation works (required fields)
- [ ] Form emails received at contact@zenith-terra.com

### GDPR Compliance Tests
- [ ] Cookie consent banner appears on first visit
- [ ] "Accept All" button works
- [ ] "Only Necessary" button works
- [ ] Privacy Policy page loads
- [ ] Cookie Policy page loads
- [ ] Privacy consent checkbox on forms

### SEO Tests
- [ ] sitemap.xml is accessible
- [ ] robots.txt is accessible
- [ ] All pages have unique meta titles
- [ ] All pages have meta descriptions
- [ ] 404 page works

### Performance Tests
- [ ] Page loads in under 3 seconds
- [ ] Images are optimized
- [ ] CSS/JS files are minified (optional)

### Cross-Browser Tests
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Tests
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Responsive design works
- [ ] Touch targets are appropriate size

## Security Checklist
- [ ] HTTPS enabled
- [ ] Security headers configured (.htaccess)
- [ ] No sensitive info in code
- [ ] Form spam protection (hCaptcha) enabled
- [ ] Directory listing disabled

## Analytics (Optional)
- [ ] Google Analytics account created
- [ ] Tracking code added to all pages
- [ ] Events configured for form submissions
- [ ] Events configured for WhatsApp clicks

## Maintenance
- [ ] Set up regular backup schedule
- [ ] Document update procedures
- [ ] Create content update calendar

## Contact for Support
- Email: contact@zenith-terra.com
- WhatsApp: +852 6934 0494
- Website: https://ztthk.com
