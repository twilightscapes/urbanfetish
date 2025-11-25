<div align="center">
  <a href="https://pirateweb.org">
    <img src="public/images/logo/logoImage.svg" alt="Pirate CMS Logo" width="200" height="200">
  </a>
  <h1>You're the Captain now!</h1>
  <h3>Own Your Content • Control Your Platform • Sail the Open Web</h3>
  
  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/Astro-5.0-FF5D01?logo=astro" alt="Astro 5">
    <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript" alt="TypeScript 5">
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React 19">
    <img src="https://img.shields.io/badge/PWA-Enabled-5A0FC8?logo=pwa" alt="PWA Enabled">
    <img src="https://img.shields.io/badge/Tailwind-5" alt="Tailwind 5">

  </p>
  
  <!-- CTAs -->
  <!-- <p>
    <a href="https://pirateweb.org">
      <img src="https://img.shields.io/badge/Live_Demo-8A2BE2" alt="Live Demo">
    </a>
    <a href="https://discord.gg/twilightscapes">
      <img src="https://img.shields.io/badge/Join_Community-5865F2?logo=discord" alt="Community">
    </a>
  </p> -->
</div>



<p align="left">PIRATE enables you to have YOUR OWN space on the web, where you can be confident that the content you produce is FULLY in your control. Twitter and other social media sites may change or come and go. With PIRATE, that doesn't matter - your content, is ALWAYS under your control.</p>

<p align="left">PIRATE is built to operate using FREE Cloud-based services. This means that your PIRATE app is basically free to operate month-to-month with NO COSTS.</p>

<p align="center"><strong>PIRATE can be used on Netlify, Vercel, or Github</strong></p>


<div align="center">
<br />
    <a href="https://pirateweb.org">View Demo</a>
    ☠️
    <a href="https://github.com/twilightscapes/pirate/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ☠️
    <a href="https://github.com/twilightscapes/pirate/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<br />
<div align="center">


# Install PIRATE &nbsp; | &nbsp; Quick Start

[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/piratewebsite/pirate) 

<!-- [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftwilightscapes%2Fpirate&project-name=astro-pirate-theme) -->

Setup takes about 4 minutes and <strong><i>requires a valid email address</i></strong>. This email address will be used to create an account on GitHub if you do not already have one. The GitHub account will be used to create an account on the hosting provider's site (Netlify) as well, and lastly it will be used for authentication in your web app itself. 

(Don't worry) All of this is done for you.

</div>

## 🏴‍☠️ Preview

<div align="center">
  <img src="public/images/pwa/screenshot.png" alt="Pirate CMS Dashboard" width="600">
</div>

### 🚀 Modern Foundation
- **Next-Gen Architecture**: Built with Astro v5 + TypeScript 5 + Tailwind 6
- **Performance First**: 100/100 PageSpeed scores out of the box
- **PWA Ready**: Install as native app with offline support

### 🎨 Complete Design Control
- **Theme Engine**: Visual CSS controls + dark/light modes
- **Tailwind CSS**: Utility-first styling framework
- **Responsive Images**: Automatic optimization with Astro Assets

### ⚡ Smart Content Management
- **Keystatic CMS**: Edit content directly in GitHub/GitLab
- **Multi-format Support**: Markdown, MDoc, YAML, and JSON
- **SEO Toolkit**: Automatic sitemaps, OpenGraph, and Twitter cards

### 🔍 Discovery Features
- **Pagefind Search**: Instant static site search
- **RSS/Atom Feeds**: Built-in content syndication
- **Webmentions**: Track engagement across social networks

### 🛠️ Developer Experience
- **Type-Safe Content**: Auto-generated TypeScript definitions
- **Component Library**: Pre-built Astro + React components
- **CI/CD Ready**: Netlify & Vercel deployment templates



<div align="center">

<br />
<h3><em><i>T R A K</i></em> &nbsp; Technology Stack</h3>
PIRATE is built on industry leading technologies, and is designed from the ground up, using the best, most secure and modern development technology stack available today: <h3 style="font-size:30px;"><strong><i></i></strong></h3>
<a href=""><img alt="" role="presentation" aria-hidden="true" src="public/images/partners/typescript-logo.webp" width="24%" height="auto" /></a>
<a href="https://react.dev"><img alt="React Logo" role="presentation" aria-hidden="true" src="public/images/partners/react-logo.webp" width="24%" height="auto" /></a>
<a href="https://astro.build"><img alt="Astro Logo" role="presentation" aria-hidden="true" src="public/images/partners/Astro-logo.webp" width="24%" height="auto" /></a>
<!-- <a href="https://netlify.com"><img alt="Netlify Logo" role="presentation" aria-hidden="true" src="public/images/partners/netlify-logo.webp" width="14%" height="auto" /></a>
<a href="https://github.com"><img alt="GitHub Logo" role="presentation" aria-hidden="true" src="public/images/partners/github-logo.webp" width="15%" height="auto" /></a> -->
<a href="https://keystatic.com"><img alt="Keystatic Logo" role="presentation" aria-hidden="true" src="public/images/partners/keystatic-logo.webp" width="24%" height="auto" /></a>


<br /><br />
</div>


## 🚀 Installation & Deployment

- All set up and control is done through the built-in CMS. 
- In order to to do so online, you will need to create a free account @ [KeyStatic Cloud](https://keystatic.cloud)
- Connect your Keystatic account to your Github repo
- Set up your environment variables:
  - **Local Development**: Copy your Keystatic project ID (format: `username/project-name`) and add it to your `.env` file:
    ```bash
    VITE_KEYSTATIC_PROJECT=your-username/your-project-name
    ```
  - **Netlify Deployment**: Go to your Netlify dashboard → Site settings → Environment variables and add:
    ```
    VITE_KEYSTATIC_PROJECT = your-username/your-project-name
    ```
- Redeploy your site on Netlify and then go to yoursite.netlify.app/admin to login to the CMS and configure the rest of your site.

## Using Local Development

 You can edit and make updates through the cloud with the [KeyStatic](https://keystatic.com) CMS outlined above, or you can install it locally with the options listed below. You can use both and PIRATE will detect which one you are using: cloud or local.


## Commands
pnpm is recommended but you can also use npm, yarn, etc.


```bash
# Clone repository
git clone https://github.com/piratewebsite/pirate.git
cd pirate

# Install dependencies
pnpm install

# Start local dev server
pnpm dev

# Build your production site to ./dist/
pnpm build

# Build the static search of your blog posts
pnpm postbuild

# Preview your build locally, before deploying
pnpm preview

# Generate types based on your config in src/content/config.ts
pnpm sync

# Cleans and removes caches and all temp files
pnpm clean
```

### Hosting Options
<table>
  <tr>
    <td align="center" width="30%">
      <img src="public/images/partners/netlify-logo.webp" width="30%" alt="Netlify"><br>
      <a href="https://app.netlify.com/start/deploy?repository=https://github.com/piratewebsite/pirate">Deploy to Netlify</a>
    </td>
    <td align="center" width="30%">
      <img src="public/images/partners/github-logo.webp" width="30%" alt="GitHub"><br>
      <a href="https://github.com/piratewebsite/pirate/generate">Use Template</a>
    </td>
    <td align="center" width="30%">
      <img src="public/images/partners/vercel-logo.webp" width="30%" alt="Vercel"><br>
      <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpiratewebsite%2Fpirate">Deploy to Vercel</a>
    </td>
  </tr>
</table>





## 🏴‍☠️ Thank you

We really appreciate you choosing to become a PIRATE!

[PIRATE]: https://PIRATEweb.org
[Astro]: https://astro.build
[Keystatic]: https://keystatic.com


## License

MIT
