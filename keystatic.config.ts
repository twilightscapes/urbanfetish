import React from 'react';
import { config, fields, collection, singleton } from '@keystatic/core';
import { colorPicker } from './src/components/ColorPicker.tsx';
export default config({
  storage: import.meta.env.PROD ? { kind: 'cloud' } : { kind: 'local' },
  cloud: import.meta.env.PROD
    ? { project: import.meta.env.VITE_KEYSTATIC_PROJECT || 'twilightscapes/twilight-astro' }
    : undefined,
  collections: {
    posts: collection({
      label: 'Posts',
      entryLayout: 'content',
      slugField: 'title',
      path: 'src/content/post/*/',
      format: { contentField: 'content' },
      schema: {
        publishDate: fields.datetime({ label: 'Publish Date', validation: { isRequired: true } }),
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', validation: { length: { min: 50, max: 160 } } }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        order: fields.conditional(
          fields.checkbox({ label: 'Make Sticky On Homepage?' }),
          {
            true: fields.number({ label: 'Sort Order' }),
            false: fields.empty()
          }
        ),
        content: fields.markdoc({ label: 'Content' }),
        

        // updatedDate: fields.datetime({ label: 'Updated Date' }),

        coverImage: fields.object({
          src: fields.image({
            label: 'Image file',
            directory: 'public/images/posts',
            publicPath: '/images/posts',
          }),
          alt: fields.text({ 
            label: 'Alt Text',
          }),
        }),

        externalUrl: fields.text({ label: 'External Url', description: 'A url of an external site will be loaded into an iframe', }),


        youtube: fields.conditional(
          fields.checkbox({ label: 'Include YouTube Video' }),
          {
            true: fields.object({
              url: fields.text({ 
                label: 'YouTube Video URL',
                description: 'Enter the full YouTube video URL'
              }),
              title: fields.text({ 
                label: 'Video Title',
                description: 'Enter a title for the video (optional, leave blank for no title)',
                validation: { isRequired: false }
              }),
              controls: fields.checkbox({ label: 'Use YouTube Player Controls' }),
              useCustomPlayer: fields.checkbox({ 
                label: 'Use Custom Player Controls', 
                defaultValue: true 
              }),
              mute: fields.checkbox({ label: 'Mute Video' }),
              loop: fields.checkbox({ label: 'Loop Video' }),
              start: fields.number({ 
                label: 'Start Time (seconds)', 
                defaultValue: 0,
                validation: { min: 0 }
              }),
              end: fields.number({ 
                label: 'End Time (seconds)', 
                validation: { min: 0, isRequired: false }
              }),
              videoOnly: fields.checkbox({ label: 'Video Only', defaultValue: false }),
            }),
            false: fields.empty(),
          }
        ),
        divider1: fields.empty(),        
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props: any) => props.value,        }),
      },
    }),    
    pages: collection({      label: 'Other Pages',
      path: 'src/content/pages/*',
      slugField: 'title',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Title' }),
        description: fields.text({ label: 'Description' }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),

    CTAs: collection({
      label: 'Call-To-Actions',
      path: 'src/content/ctas/*',
      schema: {
        title: fields.text({ label: 'CTA Title', description: 'The text on the CTA Button' }),
        ctaUrl: fields.text({ label: 'CTA Url', description: 'The location of your CTA', defaultValue: '/', validation: { length: { min: 1 } } }),
        description: fields.text({ label: 'Description', description: 'The description for the CTA', multiline: true }),
        showFancy: fields.checkbox({ label: 'Show Fancy Button', description: 'Use the Fancy style with animated button', defaultValue: true }),
        showTransition: fields.checkbox({ label: 'Hide page transition', description: 'Hide the view transition on page change', defaultValue: false }),
      },
      slugField: 'description'
    }),




    socialLinks: collection({
      label: 'Social Links',
      path: 'src/content/socialLinks/*',
      schema: {
        friendlyName: fields.text({ label: 'Friendly Name' }),
        link: fields.text({ label: 'Link URL' }),
        
        icon: fields.select({
          label: 'Icon',
          options: [
            { label: 'Pirate', value: 'game-icons:pirate-flag' },
            { label: 'X/Twitter', value: 'bi:twitter-x' },
            { label: 'Bluesky', value: 'simple-icons:bluesky' },
            { label: 'Threads', value: 'bi:threads' },
            { label: 'Facebook', value: 'bi:facebook' },
            { label: 'Mastodon', value: 'bi:mastodon' },
            { label: 'Instagram', value: 'bi:instagram' },
            { label: 'GitHub', value: 'bi:github' },
            { label: 'YouTube', value: 'bi:youtube' },
            { label: 'Twitch', value: 'bi:twitch' },
            { label: 'LinkedIn', value: 'bi:linkedin' },
            { label: 'Pinterest', value: 'bi:pinterest' },
            { label: 'Patreon', value: 'mdi:patreon' },
            { label: 'Reddit', value: 'bi:reddit' },
            { label: 'Skype', value: 'bi:skype' },
            { label: 'Slack', value: 'bi:slack' },
            { label: 'Snapchat', value: 'bi:snapchat' },
            { label: 'SoundCloud', value: 'mdi:soundcloud' },
            { label: 'WhatsApp', value: 'bi:whatsapp' },
            { label: 'Wordpress', value: 'bi:wordpress' },
          ],
          defaultValue: 'game-icons:pirate-flag'
        }),


        order: fields.number({ 
          label: 'Order',
          description: 'Optional: Leave blank for alphabetical sorting'
        }),

        isWebmention: fields.checkbox({ label: 'Is Webmention', defaultValue: true }),
      },
      slugField: 'friendlyName'
      
    }),
    
    
    


    
    pitches: collection({
      label: 'Content Blocks',
      path: 'src/content/pitches/*',
      schema: {
        title: fields.text({ label: 'Title' }),
        showTitle: fields.checkbox({ label: 'Show Title', description: 'Hide/Show the section title', defaultValue: true }),
        image: fields.image({
          label: 'Image',
          directory: 'public/images/pitches',
          publicPath: '/images/pitches',
        }),
        imageAlt: fields.text({ label: 'Image Alt Text' }),
        description: fields.text({ label: 'Image description/caption' }),
        

        divider: fields.empty(),
        divider2: fields.empty(),

        tagline: fields.text({ label: 'Tagline' }),
        subheading1: fields.text({ label: 'Subheading1' }),
        text1: fields.text({ label: 'Text 1', multiline: true }),
        subheading2: fields.text({ label: 'Subheading2' }),
        text2: fields.text({ label: 'Text 2', multiline: true }),
        subheading3: fields.text({ label: 'Subheading3' }),
        text3: fields.text({ label: 'Text 3', multiline: true }),
        showTwocol: fields.checkbox({ label: 'Layout', description: 'use 2-col or stacked', defaultValue: false }),

        
      },
      slugField: 'title'
    }),    

    faqs: collection({
      label: 'FAQs',
      path: 'src/content/faqs/*',
      slugField: 'question',
      format: { contentField: 'answer' },
      schema: {
        question: fields.slug({ name: { label: 'Question' } }),
        answer: fields.document({
          label: 'Answer',
          formatting: true,
          dividers: true,
          links: true,
        }),
        order: fields.number({ label: 'Order' }),
      },
    }),


    resume: collection({
      label: 'Resume Blocks',
      path: 'src/content/resume/*',
      slugField: 'section',
      format: { contentField: 'content' },
      schema: {
        section: fields.slug({ name: { label: 'Title' } }),
        showTitle: fields.checkbox({ label: 'Show Title', description: 'Hide/Show the section title', defaultValue: true }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
        }),
      },
    }),


    testimonials: collection({
      label: 'Testimonials',
      path: 'src/content/testimonials/*',
      slugField: 'name',
      schema: {
        name: fields.text({ label: 'Name' }),
        location: fields.text({ label: 'Location' }),
        quote: fields.text({ label: 'Quote', multiline: true }),
        image: fields.image({
          label: 'Image',
          directory: 'public/images/testimonials',
          publicPath: '/images/testimonials',
        }),
        order: fields.number({ label: 'Order' }),
      },
  
    }),
    
    menuItems: collection({
      label: 'Menu Items',
      path: 'src/content/menu/*',
      slugField: 'name', 
      schema: {
        name: fields.text({ label: 'Name' }),
        title: fields.text({ label: 'Title' }),
        path: fields.text({ label: 'Path' }), 
        order: fields.number({ label: 'Order' }),
      },
    }),



    // piratePosts: collection({
    //   label: 'Pirate Posts',
    //   path: 'src/content/piratePosts/*',
    //   format: { contentField: 'content' },
    //   slugField: 'title',
    //   schema: {
    //     title: fields.slug({ name: { label: 'Title' } }),
    //     content: fields.markdoc({ label: 'Content' }),
    //     createdAt: fields.datetime({ label: 'Created At' }),
    //   },
    // }),

    // pirateFeeds: collection({
    //   label: 'Pirate Feeds',
    //   path: 'src/content/pirateFeeds/*',
    //   slugField: 'title',
    //   schema: {
    //     title: fields.text({ label: 'Title' }),
    //     feedUrl: fields.url({ label: 'Feed Url', description: 'The address to the Pirate users feed that you want to follow' }),
    //     order: fields.number({ label: 'Order' }),
    //   },
    // }),


    rssFeeds: collection({
      label: 'RSS Feeds',
      path: 'src/content/rss-feeds/*/',
      slugField: 'name',
      schema: {
        name: fields.text({ label: 'Feed Name' }),
        rssFeedUrl: fields.url({ label: 'RSS Feed URL' }),
      },
    }),

    


    
  },









  singletons: {
    siteSettings: singleton({
      label: 'Site Settings',
      path: 'src/content/siteSettings/main',
      schema: {
        logoImage: fields.image({
          label: 'Logo Image',
          description: 'Image used across the site - can use any format',
          directory: 'public/images/logo',
          publicPath: '/images/logo',
        }),
        divider: fields.empty(),
        defaultView: fields.select({
          label: 'Default View (sets whether to show grid mode or swipe mode by default)',
          options: [
            { label: 'Grid', value: 'grid' },
            { label: 'Swipe', value: 'swipe' },
          ],
          defaultValue: 'grid',
        }),
        themeMode: fields.select({
          label: 'Theme Mode (sets the theme mode of the site)',
          options: [
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
            { label: 'User', value: 'user' },
          ],
          defaultValue: 'user',
          description: 'Determines the theme mode of the site: light, dark, or user preference.',
        }),
        MAX_POSTS: fields.number({ label: 'Number of posts to display on home page', defaultValue: 3 }),
        MAX_POSTS_PER_PAGE: fields.number({ label: 'Number of posts to display on other pages', defaultValue: 3 }),
        divider2: fields.empty(),
        showHeader: fields.checkbox({ label: 'Show Header', description: 'Hide/Show the main site header', defaultValue: true }),
        showLogo: fields.checkbox({ label: 'Show Logo', description: 'Hide/Show the logo in the header', defaultValue: true }),
        showHome: fields.checkbox({ label: 'Show Home Link', description: 'Hide/Show the Home Link', defaultValue: true }),
        showTheme: fields.checkbox({ label: 'Show Theme', description: 'Hide/Show the theme selector', defaultValue: true }),
        showSwitch: fields.checkbox({ label: 'Show Switch', description: 'Hide/Show the layout selector', defaultValue: true }),
        showSearch: fields.checkbox({ label: 'Show Search', description: 'Hide/Show the search in the header', defaultValue: true }),
        showFooter: fields.checkbox({ label: 'Show Footer', description: 'Hide/Show the Footer', defaultValue: true }),
        showCheck: fields.checkbox({ label: 'Hide Pirate promo', description: 'Hide/Show the Pirate info', defaultValue: true }),
        showTitles: fields.checkbox({ label: 'Show Post Titles', description: 'Hide/Show the post titles', defaultValue: false }),
        showDates: fields.checkbox({ label: 'Show Dates', description: 'Hide/Show the post dates', defaultValue: true }),
        enableImageBlur: fields.checkbox({ 
          label: 'Enable Image Blur Effect', 
          defaultValue: true 
        }),
        showSocial: fields.checkbox({ label: 'Show Social Links in Posts' }),
        showTags: fields.checkbox({ label: 'Show Post Tags', description: 'Hide/Show the post tags', defaultValue: false }),
        showShare: fields.checkbox({ label: 'Show Share section on posts', description: 'Hide/Show the share this copy button on posts', defaultValue: false }),
      },
    }),
    pwaSettings: singleton({
      label: 'PWA/SEO Settings',
      path: 'src/content/pwaSettings/',
      schema: {
        showRobots: fields.checkbox({
          label: 'SEO VISIBILITY',
          description: 'Set the robots meta tag to index site and follow links - checking this box will make your site appear in search engines',
          defaultValue: false,
        }),
        siteUrl: fields.text({ label: 'Site Url', description: 'The address to your website' }),
        name: fields.text({ label: 'App Name' }),
        shortName: fields.text({ label: 'Short Name' }),

        location: fields.text({ label: 'Location Map', description: 'Copy the src url from the google maps location share embed section'  }),

        divider: fields.empty(),

        screenshot: fields.image({
          label: 'Screenshot',
          description: 'This image is used on Android in the PWA install dialogue window (Image should be in JPG or PNG format and sized at 320x640)',
          directory: 'public/images/pwa',
          publicPath: '/images/pwa',
        }),
        description: fields.text({ label: 'SEO/App Description', description: 'The description is used as the title of the homepage for SEO, and on Android in the PWA install dialogue window', }),

        divider2: fields.empty(),

        themeColor: colorPicker({ 
          label: 'Theme Color', 
          showOpacity: false
        }),
        backgroundColor: colorPicker({ 
          label: 'Background Color', 
          showOpacity: false
        }),
        startUrl: fields.text({
          label: 'PWA Start URL',
          description: 'This sets the start page when your app is installed',
          defaultValue: '/',
          validation: { length: { min: 1 } },
        }),
        display: fields.select({
          label: 'Display Mode',
          options: [
            { label: 'Standalone', value: 'standalone' },
            { label: 'Fullscreen', value: 'fullscreen' },
            { label: 'Minimal UI', value: 'minimal-ui' },
            { label: 'Browser', value: 'browser' }
          ],
          description: 'This sets the browser chrome to be used. - Standalone is default and removes all browser controls and chrome',
          defaultValue: 'standalone'
        }),
        icon192: fields.image({
          label: '192x192 Icon',
          directory: 'public/images/pwa',
          publicPath: '/images/pwa'
        }),
        icon512: fields.image({
          label: '512x512 Icon',
          directory: 'public/images/pwa',
          publicPath: '/images/pwa'
        })
      }
    }),
    home: singleton({
      label: 'Home Page',
      path: 'src/content/homepage/',
      schema: {
        showFeature: fields.checkbox({ label: 'Show Feature', description: 'Hide/Show the Feature section on home page', defaultValue: false }),
        featureImage: fields.object({
          src: fields.image({
            label: 'Feature Image',
            directory: 'public/images/homepage',
            publicPath: '/images/homepage',
          }),
          alt: fields.text({ 
            label: 'Featured Image Alt Text',
          }),
        }),
        youtube: fields.conditional(
          fields.checkbox({ label: 'Include YouTube Video' }),
          {
            true: fields.object({
              url: fields.text({ 
                label: 'YouTube Video URL',
                description: 'Enter the full YouTube video URL'
              }),
              title: fields.text({ 
                label: 'Video Title',
                description: 'Enter a title for the video (optional, leave blank for no title)',
                validation: { isRequired: false }
              }),
              controls: fields.checkbox({ label: 'Use YouTube Player Controls' }),
              useCustomPlayer: fields.checkbox({ 
                label: 'Use Custom Player Controls', 
                defaultValue: true 
              }),
              mute: fields.checkbox({ label: 'Mute Video' }),
              loop: fields.checkbox({ label: 'Loop Video' }),
              start: fields.number({ 
                label: 'Start Time (seconds)', 
                defaultValue: 0,
                validation: { min: 0 }
              }),
              end: fields.number({ 
                label: 'End Time (seconds)', 
                validation: { min: 0, isRequired: false }
              }),
              videoOnly: fields.checkbox({ label: 'Video Only', defaultValue: false }),
            }),
            false: fields.empty(),
          }
        ),


        cta: fields.relationship({
          label: 'HOME BOTTOM CTA',
          description: 'CTA at the bottom of the homepage',
          collection: 'CTAs',
        }),
        divider9: fields.empty(),
        // homeCTA: fields.relationship({
        //   label: 'BOTTOM CTA',
        //   description: 'CTA at the bottom of the homepage',
        //   collection: 'CTAs',
        // }),
        divider7: fields.empty(),
        showBioOnHome: fields.checkbox({
          label: 'Show Profile Module',
          description: 'Hide/Show the Profile section on the home page',
          defaultValue: false,
        }),

        showApp: fields.checkbox({
          label: 'Show Map Module',
          description: 'Hide/Show custom map section on the home page - requires the src url from an embeded google map',
          defaultValue: false,
        }),

        showHomeGallery: fields.checkbox({ label: 'Show Home Photo Gallery', description: 'Hide/Show the Photo section on home page', defaultValue: false }),

        showResume: fields.checkbox({
          label: 'Show Resume',
          description: 'Hide/Show Resume section on the home page',
          defaultValue: false,
        }),



        showPosts: fields.checkbox({ label: 'Show Posts', description: 'Hide/Show the Posts section on the home page', defaultValue: false }),

        showMore: fields.checkbox({ label: 'Show More Button', description: 'Hide/Show the Show More Button (for the posts section above)', defaultValue: false }),

        showFaqOnHome: fields.checkbox({
          label: 'Show FAQ Module',
          description: 'Hide/Show the FAQ accordian section on the home page',
          defaultValue: false,
        }),

        showTestOnHome: fields.checkbox({
          label: 'Show Testimonials Module',
          description: 'Hide/Show the Testomonials section on the home page',
          defaultValue: false,
        }),

        divider: fields.empty(),

        pitch: fields.relationship({
          label: 'Content Block 1',
          collection: 'pitches',
        }),

        pitch2: fields.relationship({
          label: 'Content Module 2',
          collection: 'pitches',
        }),

        pitch3: fields.relationship({
          label: 'Content Module 3',
          collection: 'pitches',
        }),

        

        divider1: fields.empty(),
        divider6: fields.empty(),
        
        sectionOrdering: fields.array(
          fields.select({
            label: 'Section',
            options: [
              { label: 'Feature Section', value: 'feature' },
              { label: 'Bio Section', value: 'bio' },
              { label: 'App Section', value: 'app' },
              { label: 'Gallery Section', value: 'gallery' },
              { label: 'Posts Section', value: 'posts' },
              { label: 'Resume Section', value: 'resume' },
              { label: 'FAQ Section', value: 'faq' },
              { label: 'Testimonials Section', value: 'testimonials' },
              { label: 'Content Block 1', value: 'infoblock1' },
              { label: 'Content Block 2', value: 'infoblock2' },
              { label: 'Content Block 3', value: 'infoblock3' }
            ],
            defaultValue: 'feature'
          }),
          {
            label: 'Section Ordering',
            description: 'Drag to reorder sections - position in list determines display order',
            itemLabel: (props) => props.value,
          }
        ),

        
        divider5: fields.empty(),
        
        
        photosectiontitle: fields.text({ label: 'Photo Section Title Header'  }),
        locationtitle: fields.text({ label: 'Location Map Title Header'  }),
        faqsectiontitle: fields.text({ label: 'FAQ Title Header'  }),
        testimonialtitle: fields.text({ label: 'Testimonials Title Header' }),
        postsectiontitle: fields.text({ label: 'Posts Title Header'  }),

        divider2: fields.empty(),

        
      },
    }),    
    photoSettings: singleton({
      label: 'Photo Gallery Settings',
      path: 'src/content/photoSettings/',
      schema: {
        galleryMode: fields.select({
          label: 'Gallery Mode',
          description: '',
          options: [
            { label: 'Directory-based', value: 'directory' },
            { label: 'CMS-managed', value: 'keystatic' }
          ],
          defaultValue: 'directory'
        }),
        showCaptions: fields.checkbox({
          label: 'Show Photo Titles',
          defaultValue: true,
        }),

        divider: fields.empty(),

        showBioOnPhotos: fields.checkbox({
          label: 'Show Profile Module',
          defaultValue: false,
        }),

        showFaqsOnPhotos: fields.checkbox({
          label: 'Show FAQ Module',
          defaultValue: false,
        }),

        showTestimonialsOnPhotos: fields.checkbox({
          label: 'Show Testimonials Module',
          defaultValue: false,
        }),

        pitch: fields.relationship({
          label: 'Content Block 1',
          collection: 'pitches',
        }),
        

        divider5: fields.empty(),

        defaultDirectory: fields.text({
          label: '(Directory-based Mode)',
          description: "Directory-based mode allows you to upload multiple folders of photos and it will automatically use the file names as the image captions allowing you to quickly create entire photo galleries - (Note: IT IS case-sensitive and space-sensitive) - Enter the EXACT name of the Default Directory to be displayed, below:",
          defaultValue: 'all',
          validation: { isRequired: false }
        }),
        
        showGallerySelector: fields.checkbox({
          label: 'Show Gallery Drop Down Menu',
          description: '(Directory-based mode only) Hiding this or leaving the default directory empty, will automatically show all the images in all directories',
          defaultValue: false,
        }),

        showSwitch: fields.checkbox({
          label: 'Show Swipe/Scroll Icon',
          description: 'This will show the Swipe/Scroll icon making it possible to change the view from the set default',
          defaultValue: true,
        }),

        divider2: fields.empty(),
        divider3: fields.empty(),

        galleryImages: fields.array(
          fields.object({
            image: fields.image({
              label: 'Gallery Image',
              directory: 'public/images',
              publicPath: '/images',
              validation: { isRequired: false }
            }),

            caption: fields.text({
              label: 'Image Caption',
              description: 'Enter a caption for this image',
              validation: { isRequired: false }
            })
          }),
          {
            label: 'CMS-managed Gallery Images',
            itemLabel: (props: { fields: { caption: { value: string } } }) => props.fields.caption.value || 'Image',          }
        ),        divider4: fields.empty(),

      },
    }),        
    
    styleAppearance: singleton({
      label: 'Appearance',
      path: 'src/content/styleapps/',
      schema: {
        backgroundImage: fields.image({
          label: 'Site Background Image',
          directory: 'public/images/styleapps',
          publicPath: '/images/styleapps'
        }),
        backgroundVideo: fields.text({ label: 'Background Video', defaultValue: '', description: 'Copy the url of an embed from youtube and paste here - just the url' }),

        siteFont: fields.text({ label: 'Site Font', defaultValue: 'Bowlby One', description: 'Enter the name of any Google Font' }),
        borderRadius: fields.text({ label: 'Border Radius', description: 'Border Radius of elements on page (0) for square', validation: { isRequired: false }, defaultValue: "0px" }),
        divider5: fields.empty(),
        lightBg: colorPicker({ 
          label: 'Light Background Color', 
          description: '(light) Page Background - can use any color value',
        }),
        // lightAccent: colorPicker({ 
        //   label: 'Light Accent Color', 
        //   description: '(light) Accent - can use any color value',
        // }),
        lightAccent2: colorPicker({ 
          label: 'Light Button Color', 
          description: '(light) Accent2 - can use any color value',
        }),
        divider6: fields.empty(),
        darkBg: colorPicker({ 
          label: 'Dark Background Color', 
          description: '(dark) Page Background - can use any color value',
        }),
        // darkAccent: colorPicker({ 
        //   label: 'Dark Accent Color', 
        //   description: '(dark) Accent Color - can use any color value',
        // }),
        darkAccent2: colorPicker({ 
          label: 'Dark Button Color', 
          description: '(dark) Accent Color2 - can use any color value',
        }),
        divider7: fields.empty(),
        lightHeader: colorPicker({ 
          label: 'Light Header Color', 
          description: '(light) Header Color - can use any color value',
        }),
        darkHeader: colorPicker({ 
          label: 'Dark Header Color', 
          description: '(dark) Quote Color2 - can use any color value',
        }),
        divider8: fields.empty(),
        lightText: colorPicker({ 
          label: 'Light Text Color', 
          description: '(light) Text Color - can use any color value',
        }),
        darkText: colorPicker({ 
          label: 'Dark Text Color', 
          description: '(dark) Text Color - can use any color value',
        }),
        divider9: fields.empty(),  
        // divider9: fields.empty(),
        // lightLink: colorPicker({ 
        //   label: 'Light Link Color', 
        //   description: '(light) Link Color - can use any color value',
        // }),
        // darkLink: colorPicker({ 
        //   label: 'Dark Link Color', 
        //   description: '(dark) Link Color - can use any color value',
        // }),

        customCSS: fields.text({ label: 'Custom CSS', description:'Additional CSS can be written here, overwriting the sites default styles.', multiline: true }),

        
      },
    }),


    socialCard: singleton({
      label: ' OG Site Image',
      path: 'src/content/photoUpload/',
      schema: {
        socialCard: fields.image({
          label: 'Upload Photo',
          description: "This is the site's default OG image - it is used for link previews on social media, if a custom image isn't uploaded.",
          directory: 'public/',
          publicPath: '/',
        }),
      },
    }),  

    language: singleton({
      label: 'Language',
      path: 'src/content/language/',
      schema: {
        homelink: fields.text({ label: 'Home' }),
        copyright: fields.text({ label: 'Copyright' }),
        goback: fields.text({ label: 'Back' }),
        top: fields.text({ label: 'Top' }),
        viewmore: fields.text({ label: 'View More' }),
        allimages: fields.text({ label: 'All Images' }),
        close: fields.text({ label: 'Close' }),
        search: fields.text({ label: 'Search' }),
        mute: fields.text({ label: 'Mute' }),
        volume: fields.text({ label: 'Volume' }),
        progress: fields.text({ label: 'Progress' }),
        tags: fields.text({ label: 'Tags' }),
        viewall: fields.text({ label: 'View All' }),
        shareText: fields.text({ label: 'Share This' }),
        copyButton: fields.text({ label: 'Copy' }),
        siteDisclaimer: fields.text({ label: 'Site Disclaimer', multiline: true }),
        
        // temp: fields.text({ label: 'temp', multiline: true }),
      },
    }),
  

    bio: singleton({
      label: 'Profile',
      path: 'src/content/bio/',
      schema: {
        title: fields.text({ label: 'Title' }),
        tagline: fields.text({ label: 'Tagline' }),
        description: fields.text({ label: 'Description', multiline: true }),
        image: fields.image({
          label: 'Image',
          directory: 'public/images/bio',
          publicPath: '/images/bio',
        }),
        phone: fields.text({ label: 'Phone' }),
        subheading: fields.text({ label: 'Sub Heading' }),
        subcontent: fields.text({ label: 'Sub Content', multiline: true }),
        cta: fields.relationship({
          label: 'CTA',
          collection: 'CTAs',
        }),
        showSocial: fields.checkbox({ label: 'Show Social Links' }),
      },
    }),    


    // pirateSocial: singleton({
    //   label: 'Settings',
    //   path: 'src/content/pirate/',
    //   schema: {
    //     profile: fields.text({ label: 'Profile Name' }),
    //     description: fields.text({ label: 'Profile Description' }),

    //     // autoDeletePiratePosts: fields.checkbox({
    //     //   label: 'Auto-delete Pirate Posts',
    //     //   description: 'Enable this to automatically delete Pirate Posts',
    //     //   defaultValue: false,
    //     // }),
    //     // autoDeleteTime: fields.number({
    //     //   label: 'Auto-delete Time (in minutes)',
    //     //   description: 'Set the time after which Pirate Posts will be deleted',
    //     //   defaultValue: 1440, // 24 hours in minutes
    //     // }),
    //   },
    // }),



    resumeSettings: singleton({
      label: 'Resume Settings',
      path: 'src/content/resumeSettings/',
      schema: {
        title: fields.text({ label: 'Resume Title' }),
        showTitle: fields.checkbox({ label: 'Show Title', defaultValue: true }),
        name: fields.text({ label: 'Your Name' }),
        contact: fields.text({ label: 'Your Contact Details', description:'Enter your email address or phone number - (injected into print style sheet to prevent bots)' }),
        
        leftColumnItems: fields.array(
          fields.relationship({
            label: 'Left Column Item',
            collection: 'resume',
          }),
          {
            label: 'Left Column Items',
            itemLabel: (props) => props.value || 'Resume Item',
          }
        ),
        rightColumnItems: fields.array(
          fields.relationship({
            label: 'Right Column Item',
            collection: 'resume',
          }),
          {
            label: 'Right Column Items',
            itemLabel: (props) => props.value || 'Resume Item',
          }
        ),
      },
    }),


    

    contactPage: singleton({
      label: 'Contact Page',
      path: 'src/content/contactPage/',
      schema: {
        content: fields.text({ label: 'Content', multiline: true }),
        divider1: fields.empty(),
        showName: fields.checkbox({ label: 'Show Name Field', defaultValue: true }),
        showPhone: fields.checkbox({ label: 'Show Phone Field', defaultValue: true }),
        showMessage: fields.checkbox({ label: 'Show Message Field', defaultValue: true }),
        showUpload: fields.checkbox({ label: 'Show Upload Field', defaultValue: true }),
        showExtraField: fields.checkbox({ label: 'Show Extra Field', defaultValue: false }),
        extraFieldLabel: fields.text({ label: 'Extra Field Label', description: 'Label for the extra text field' }),
        showExtraField2: fields.checkbox({ label: 'Show Extra Field 2', defaultValue: false }),
        extraFieldLabel2: fields.text({ label: 'Extra Field Label 2', description: 'Label for the second extra text field' }),
        showMap: fields.checkbox({ label: 'Show Map', defaultValue: true }),
        
        
      },
    }),

  },







ui: {
  brand: {
    name: ' ',
    mark: ({ colorScheme }: { colorScheme: string }) => {
      let path = colorScheme === 'dark'
        ? 'https://pirateweb.org/images/logo/logoImage.svg'
        : 'https://pirateweb.org/images/logo/logoImage.svg';
      return React.createElement('img', { src: path, height: 40, alt: "Pirate Logo" });
    },
  },
  navigation: {
    'Site Pages and Posts': [
      'home',
      'contactPage',
      'pages',
      'posts',
    ],
    'Content Modules': [
      'bio',
      'faqs',
      'testimonials',
      'pitches',
      'CTAs',
      'resume',
    ],
    'Settings': [
      'siteSettings',
      'pwaSettings',
      'menuItems',
      'socialCard',
      'photoSettings',
      'styleAppearance',
      'language',
      'resumeSettings',
      'socialLinks',
    ]
  },
},});


