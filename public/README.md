# Public Assets Folder

This folder contains static assets that are served directly by Next.js.

## Files included:

- `favicon.ico` - Website favicon (browser tab icon)
- `robots.txt` - Instructions for search engine crawlers
- `manifest.json` - Web app manifest for PWA capabilities
- `sitemap.xml` - Sitemap for SEO

## Usage:

Files in this folder are served from the root URL. For example:
- `/favicon.ico` → `public/favicon.ico`
- `/robots.txt` → `public/robots.txt`
- `/manifest.json` → `public/manifest.json`

## Adding Images:

You can add images here and reference them in your components:
```jsx
<img src="/logo.png" alt="Logo" />
```

## Notes:

- All files here are publicly accessible
- Don't put sensitive information in this folder
- Optimize images before adding them here 