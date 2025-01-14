<div align="center">
  <a href="https://pirateweb.org">
    <img src="public/images/logo/logoImage.svg" alt="Logo" width="30%" height="auto">
  </a>
  </div>

<div align="center">

# You're the Captain now!

</div>



<p align="left">PIRATE enables you to have YOUR OWN space on the web, where you can be confident that the content you produce is FULLY in your control. Twitter and other social media sites may change or come and go. With PIRATE, that doesn't matter - your content, is ALWAYS under your control.</p>

<p align="left">PIRATE is built to operate using FREE Cloud Based Services. This means that your PIRATE account is basically free to operate month to month with no cost. You only pay a metered cost for what you use over the hosting providers generous limits.</p>

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

## 🏴‍☠️ Web Features

- Next-Gen Social Media and Video Blogging Platform.
- Custom YouTube Video Player built througout
- User-installable and configurable PWA (Progressive Web Apps)
- Add / Modify / Delete pages and posts - no limitations.
- Edit website settings, seo settings, logos, etc all from within the CMS.
- Completely change the appearance with integrated css controls and custom css options
- SEO Optimized (Scores 100 on PageSpeed)
- Accessible, semantic HTML markup
- Resolution Independence - Works on all devices from phone to TV
- Dark / Light mode, using Tailwind and CSS variables
- Social media icons
- OpenGraph structured data
- Twitter Cards meta
- XML Sitemaps
- Built with Astro v4 🚀
- TailwindCSS Utility classes
- [Astro Assets Integration](https://docs.astro.build/en/guides/assets/) for optimised images with optional custom "blur up" loading effect
- Pagination and archives, including Tags. Offered with custom swipe/scroll orienation feature
- [Automatic RSS feed](https://docs.astro.build/en/guides/rss)
- Auto-generated [sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- [Pagefind](https://pagefind.app/) static search library integration
- [Astro Icon](https://github.com/natemoo-re/astro-icon) svg icon component
- [Keystatic CMS](https://keystatic.com) is integrated into and controls all aspects of your site



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









## Setup

- With PIRATE, there is no need to muck around in code files just to configure and setup your site.
- All set up and control is done through the built-in CMS. 
- In order to to do so online, you will need to create a free account @ [KeyStatic Cloud](https://keystatic.cloud)
- Connect your Keystatic account to your Github repo
<!-- - Copy/paste the Keystatic project settings into your Netlify Env Variables -->
- Copy and Paste the Keystatic Cloud project settings you are given into this file:     [https://github.com/YourGitAccount/YourRepo/edit/main/keystatic.config.ts](https://github.com/piratewebsite/pirate/edit/main/keystatic.config.ts)
Edit this file on line 7 - replace "yourproject/projectid" with your project settings from Keystatic Cloud.
- Redeploy your site on Netlify and then go to yoursite.netlify.app/admin to login to the CMS and configure the rest of your site.

## Using Local Development

 You can edit and make updates through the cloud with the [KeyStatic](https://keystatic.com) CMS outlined above, or you can install it locally with the options listed below. You can use both and PIRATE will detect which one you are using: cloud or local.


## Commands
pnpm is recommended but you can also use npm, yarn, etc.

| Command          | Action                                                         |
| :--------------- | :------------------------------------------------------------- |
| `pnpm install`   | Installs dependencies                                          |
| `pnpm dev`       | Starts local dev server at `localhost:4321`                    |
| `ntl dev`        | Starts netlify dev server (req Netlify CLI) at `localhost:8888`                    |
| `pnpm build`     | Build your production site to `./dist/`                        |
| `pnpm postbuild` | Pagefind script to build the static search of your blog posts  |
| `pnpm preview`   | Preview your build locally, before deploying                   |
| `pnpm sync`      | Generate types based on your config in `src/content/config.ts` |
| `pnpm clean`      | Cleans and removes caches and all temp files |


## Acknowledgment

This theme was heavily inspired by [Astro Cactus](https://github.com/chrismwilliams/astro-theme-cactus/)

## 🏴‍☠️ Thank you

We really appreciate you choosing to become a PIRATE!

[PIRATE]: https://PIRATEweb.org
[Astro]: https://astro.build
[Keystatic]: https://keystatic.com


## License

MIT
