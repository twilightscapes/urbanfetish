import React from 'react';
import { config, fields, collection, singleton } from '@keystatic/core';
import { colorPicker } from './src/components/ColorPicker.tsx';
export default config({
  storage: (typeof import.meta !== 'undefined' && import.meta.env?.PROD)
    ? { kind: 'cloud' }
    : { kind: 'local' },
  cloud: (typeof import.meta !== 'undefined' && import.meta.env?.PROD)
    ? { 
        project: (() => {
          // Try different methods to get the environment variable
          if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_KEYSTATIC_PROJECT) {
            return import.meta.env.VITE_KEYSTATIC_PROJECT;
          }
          // Fallback for build-time access
          if (typeof process !== 'undefined' && process.env?.VITE_KEYSTATIC_PROJECT) {
            return process.env.VITE_KEYSTATIC_PROJECT;
          }
          return 'placeholder/placeholder';
        })()
      }
    : undefined,
  collections: {
    posts: collection({
      label: 'Site Posts',
      entryLayout: 'content',
      slugField: 'title',
      path: 'src/content/post/*/',
      format: { contentField: 'content' },
      schema: {
        publishDate: fields.date({ 
          label: 'Publish Date', 
          defaultValue: { kind: 'today' },
          validation: { isRequired: true } 
        }),
        updatedDate: fields.date({ 
          label: 'Updated Date', 
          description: 'Leave empty unless you want to show this post was updated',
          validation: { isRequired: false } 
        }),
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
              clickToLoad: fields.checkbox({ 
                label: 'Click to Load Video', 
                description: 'Show thumbnail with play button instead of loading video immediately.',
                defaultValue: true 
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
    pages: collection({      label: 'Site Pages',
      path: 'src/content/pages/*',
      slugField: 'slug',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Title' }),
        slug: fields.slug({ 
          name: { 
            label: 'Page URL/Slug',
            description: 'The URL path for this page (e.g., "about-us" becomes "/about-us"). Only letters, numbers, and hyphens allowed.',
            validation: { isRequired: true }
          }
        }),
        description: fields.text({ label: 'Description' }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
        useTemplateSystem: fields.checkbox({ 
          label: 'Use Template System',
          description: 'Enable this to use the homepage component system for this page',
          defaultValue: false
        }),
        sections: fields.array(
          fields.object({
            type: fields.select({
              label: 'Section Type',
              options: [
                { label: 'Content Block', value: 'contentblock' },
                { label: 'Form Section', value: 'form' },
                { label: 'YouTube Feeds', value: 'youtubefeeds' },
                { label: 'Posts Section', value: 'posts' },
                { label: 'Testimonials Section', value: 'testimonials' },
                { label: 'FAQ Section', value: 'faqs' },
                { label: 'Resume Section', value: 'resume' },
                { label: 'CTAs', value: 'ctas' },
                { label: 'Map/Video Section', value: 'app' },
                { label: 'Photos Section', value: 'photos' }
              ],
              defaultValue: 'contentblock'
            }),
            customTitle: fields.text({
              label: 'Section Title Override (Optional)',
              description: 'Override the component\'s default title. Most sections have their own title settings - only use this if you need a different title.',
              validation: { isRequired: false }
            }),
            customDescription: fields.text({
              label: 'Section Description (Optional)',
              description: 'Add descriptive text that appears below the section title.',
              validation: { isRequired: false }
            }),
            showTitle: fields.checkbox({
              label: 'Show Title',
              description: 'Display the section title and description',
              defaultValue: true
            }),
            sectionWidth: fields.select({
              label: 'Section Width',
              description: 'Control the width of this section',
              options: [
                { label: 'Narrow (Blog-style)', value: 'narrow' },
                { label: 'Normal', value: 'normal' },
                { label: 'Wide', value: 'wide' },
                { label: 'Full Width', value: 'full' }
              ],
              defaultValue: 'normal'
            }),
            contentBlockSlug: fields.relationship({
              label: 'Select Content Block',
              description: 'Choose which content block to display (appears only when "Content Block" is selected above)',
              collection: 'pitches',
              validation: { isRequired: false }
            }),
            feedConfig: fields.relationship({
              label: 'Select YouTube Feed',
              description: 'Choose which YouTube feed to display (appears only when "YouTube Feeds" is selected above)',
              collection: 'youtubeFeeds',
              validation: { isRequired: false }
            }),
            cta: fields.relationship({
              label: 'Select CTA',
              description: 'Choose which CTA to display (appears only when "CTAs" is selected above)',
              collection: 'CTAs',
              validation: { isRequired: false }
            }),
            hideCollapseButton: fields.checkbox({
              label: 'Hide Collapse Button',
              description: 'Hide the collapse/expand button for this section. When unchecked, users can collapse this section and the state persists.',
              defaultValue: false
            })
          }),
          {
            label: 'Page Sections',
            description: 'Configure the sections for this page (only used when Template System is enabled)',
            itemLabel: (props) => {
              const sectionType = props.fields.type.value;
              const customTitle = props.fields.customTitle.value;
              const contentBlockSlug = props.fields.contentBlockSlug.value;
              const feedConfig = props.fields.feedConfig.value;
              const cta = props.fields.cta.value;
              
              if (customTitle) return `${sectionType} - ${customTitle}`;
              if (sectionType === 'contentblock' && contentBlockSlug) return `Content Block - ${contentBlockSlug}`;
              if (sectionType === 'youtubefeeds' && feedConfig) return `YouTube Feed - ${feedConfig}`;
              if (sectionType === 'ctas' && cta) return `CTA - ${cta}`;
              return sectionType || 'Untitled Section';
            }
          }
        ),
      },
    }),

    CTAs: collection({
      label: 'Call-To-Actions',
      path: 'src/content/CTAs/*',
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


      },
      slugField: 'friendlyName'
      
    }),
    
    // youtubeFeedCollections: collection({
    //   label: 'YouTube Channel Collections',
    //   path: 'src/content/youtubeFeedCollections/*',
    //   schema: {
    //     name: fields.text({
    //       label: 'Collection Name',
    //       description: 'Name for this channel collection (e.g., "Tech Podcasts", "Liberal News")',
    //       validation: { isRequired: true }
    //     }),
    //     description: fields.text({
    //       label: 'Description',
    //       description: 'Brief description of what this collection contains',
    //       multiline: true,
    //       validation: { isRequired: false }
    //     }),
    //     channels: fields.array(
    //       fields.object({
    //         channelId: fields.text({
    //           label: 'YouTube Channel ID',
    //           description: 'Enter YouTube channel ID (e.g., UCBJycsmduvYEL83R_U4JriQ)',
    //           validation: { isRequired: true }
    //         }),
    //         channelName: fields.text({
    //           label: 'Channel Name (optional)',
    //           description: 'Friendly name for reference (e.g., "Marques Brownlee")',
    //           validation: { isRequired: false }
    //         })
    //       }),
    //       {
    //         label: 'YouTube Channels',
    //         description: 'Add YouTube channels to this collection',
    //         itemLabel: (props) => props.fields.channelName.value || props.fields.channelId.value || 'New Channel'
    //       }
    //     ),
    //     category: fields.select({
    //       label: 'Category',
    //       description: 'Category for organization',
    //       options: [
    //         { label: 'Technology', value: 'tech' },
    //         { label: 'Education', value: 'education' },
    //         { label: 'Science', value: 'science' },
    //         { label: 'Entertainment', value: 'entertainment' },
    //         { label: 'News', value: 'news' },
    //         { label: 'Politics', value: 'politics' },
    //         { label: 'Podcasts', value: 'podcasts' },
    //         { label: 'Gaming', value: 'gaming' },
    //         { label: 'Lifestyle', value: 'lifestyle' }
    //       ],
    //       defaultValue: 'tech'
    //     })
    //   },
    //   slugField: 'name'
    // }),

    youtubeFeeds: collection({
      label: 'YouTube Feeds',
      path: 'src/content/youtubeFeeds/*',
      schema: {
        slug: fields.slug({ 
          name: { label: 'URL Slug', description: 'Used for the filename' }
        }),
        title: fields.text({ 
          label: 'Section Title',
          description: 'The title displayed above the video grid',
          validation: { isRequired: true }
        }),
        description: fields.text({ 
          label: 'Section Description',
          description: 'Optional description text below the title',
          multiline: true,
          validation: { isRequired: false }
        }),
        channelIds: fields.array(
          fields.text({ 
            label: 'YouTube Channel ID',
            description: 'Enter YouTube channel ID (e.g., UCBJycsmduvYEL83R_U4JriQ)'
          }),
          {
            label: 'YouTube Channels',
            description: 'Add YouTube channel IDs to include in this feed',
            itemLabel: (props) => props.value || 'New Channel'
          }
        ),
        maxVideos: fields.number({ 
          label: 'Maximum Videos',
          description: 'Number of videos to display (default: 6)',
          defaultValue: 6,
          validation: { min: 1, max: 50 }
        }),
        showTitles: fields.checkbox({ 
          label: 'Show Video Titles',
          description: 'Display video titles and channel info below thumbnails',
          defaultValue: true
        }),
        showSectionTitle: fields.checkbox({ 
          label: 'Show Section Title',
          description: 'Display the main section title above the video grid',
          defaultValue: true
        }),
        defaultView: fields.select({
          label: 'Display Style',
          description: 'How to display the videos',
          options: [
            { label: 'Grid Layout', value: 'grid' },
            { label: 'Horizontal Scroll', value: 'swipe' }
          ],
          defaultValue: 'grid'
        }),
        includeSitePosts: fields.checkbox({
          label: 'Include Site Posts',
          description: 'Mix your site\'s blog posts randomly with YouTube videos',
          defaultValue: false
        }),
        maxSitePosts: fields.number({
          label: 'Maximum Site Posts',
          description: 'Maximum number of site posts to include (default: 3)',
          defaultValue: 3,
          validation: { min: 0, max: 20 }
        })
      },
      slugField: 'slug'
    }),


    
    


    
    pitches: collection({
      label: 'Content Blocks',
      path: 'src/content/pitches/*',
      slugField: 'slug',
      format: { contentField: 'content' },
      schema: {
        // Identification
        slug: fields.slug({ 
          name: { 
            label: 'Slug',
            description: 'URL-friendly identifier (e.g., "my-content-block")'
          }
        }),
        
        // Content
        title: fields.text({ 
          label: 'Title',
          description: 'Display title that appears above the content'
        }),
        content: fields.markdoc({
          label: 'Main Content',
          description: 'Rich text content with full formatting support',
          options: {
            image: {
              directory: 'public/images/content-blocks',
              publicPath: '/images/content-blocks'
            }
          }
        }),
        secondaryContent: fields.markdoc({
          label: 'Secondary Content',
          description: 'Content for the second column (only used in two-column layouts)',
          options: {
            image: {
              directory: 'public/images/content-blocks', 
              publicPath: '/images/content-blocks'
            }
          }
        }),
        
        // Layout & Display
        layout: fields.select({
          label: 'Layout',
          description: 'Choose how the content should be displayed',
          options: [
            { label: 'Single Column', value: 'single' },
            { label: 'Two Column (60/40)', value: 'two-column' },
            { label: 'Two Column (50/50)', value: 'two-column-equal' }
          ],
          defaultValue: 'single'
        }),
        contentAlignment: fields.select({
          label: 'Content Alignment',
          description: 'Text alignment for the content',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' }
          ],
          defaultValue: 'left'
        }),
        
        // Styling
        customClass: fields.text({ 
          label: 'Custom CSS Class',
          description: 'Add custom class for styling in appearance section (optional)',
          validation: { isRequired: false }
        }),
        spacing: fields.select({
          label: 'Spacing',
          description: 'Amount of padding around the content block',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Compact', value: 'compact' },
            { label: 'Normal', value: 'normal' },
            { label: 'Spacious', value: 'spacious' },
            { label: 'Extra Spacious', value: 'extra-spacious' }
          ],
          defaultValue: 'normal'
        }),
        bottomSpacing: fields.select({
          label: 'Bottom Spacing',
          description: 'Extra spacing at the bottom of the content block',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
            { label: 'Extra Large', value: 'extra-large' }
          ],
          defaultValue: 'none'
        }),
        
        // Media
        featuredImage: fields.image({
          label: 'Featured Image',
          description: 'Optional image to display with the content block',
          directory: 'public/images/content-blocks',
          publicPath: '/images/content-blocks',
          validation: { isRequired: false }
        }),
        imageAlt: fields.text({
          label: 'Image Alt Text',
          description: 'Alternative text for the featured image (for accessibility)',
          validation: { isRequired: false }
        }),
        imagePosition: fields.select({
          label: 'Image Position',
          description: 'Where to position the featured image relative to content',
          options: [
            { label: 'Above Content', value: 'top' },
            { label: 'Below Content', value: 'bottom' },
            { label: 'Left of Content', value: 'left' },
            { label: 'Right of Content', value: 'right' }
          ],
          defaultValue: 'top'
        }),
        
        // CTA Integration
        cta: fields.relationship({
          label: 'Call to Action',
          description: 'Optional CTA button to display with the content block',
          collection: 'CTAs',
          validation: { isRequired: false }
        }),
        ctaPosition: fields.select({
          label: 'CTA Position',
          description: 'Where to place the CTA button',
          options: [
            { label: 'After Content', value: 'after-content' },
            { label: 'After Title', value: 'after-title' },
            { label: 'Bottom of Block', value: 'bottom' }
          ],
          defaultValue: 'after-content'
        }),
        ctaAlignment: fields.select({
          label: 'CTA Alignment',
          description: 'How to align the CTA button',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' }
          ],
          defaultValue: 'left'
        }),
        
        // Display Options
        showTitle: fields.checkbox({ 
          label: 'Show Title',
          description: 'Display the title above the content',
          defaultValue: true 
        }),
        
        // Video Embedding
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
              clickToLoad: fields.checkbox({ 
                label: 'Click to Load Video', 
                description: 'Show thumbnail with play button instead of loading video immediately.',
                defaultValue: true 
              }),
              videoOnly: fields.checkbox({ label: 'Video Only', defaultValue: false }),
            }),
            false: fields.empty(),
          }
        ),
        videoPosition: fields.select({
          label: 'Video Position',
          description: 'Where to position the video relative to content',
          options: [
            { label: 'Above Content', value: 'top' },
            { label: 'Below Content', value: 'bottom' },
            { label: 'Left of Content', value: 'left' },
            { label: 'Right of Content', value: 'right' }
          ],
          defaultValue: 'top'
        }),
        
        divider: fields.empty(),
      },
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
      path: 'src/content/menuItems/*',
      slugField: 'name', 
      schema: {
        name: fields.text({ label: 'Name' }),
        title: fields.text({ label: 'Title' }),
        path: fields.text({ label: 'Path' }), 
        order: fields.number({ label: 'Order' }),
      },
    }),



    rssFeeds: collection({
      label: 'RSS Feeds',
      path: 'src/content/rss-feeds/*/',
      slugField: 'name',
      schema: {
        name: fields.text({ label: 'Feed Name' }),
        rssFeedUrl: fields.url({ label: 'RSS Feed URL' }),
      },
    }),

    // membershipTokens: collection({
    //   label: 'Membership Tokens',
    //   path: 'src/content/membershipTokens/*',
    //   slugField: 'code',
    //   schema: {
    //     code: fields.slug({
    //       name: {
    //         label: 'Token Code',
    //         description: 'Enter the membership code (e.g., BETTYBOOP). This will be used as both the filename and the actual code.',
    //         validation: { isRequired: true }
    //       }
    //     }),
    //     description: fields.text({
    //       label: 'Description',
    //       multiline: true,
    //       description: 'Description of what this token provides access to',
    //       validation: { isRequired: true }
    //     }),
    //     expiresAt: fields.date({
    //       label: 'Expiration Date',
    //       description: 'When this token expires (date only, no time needed)',
    //       validation: { isRequired: true }
    //     }),
    //     maxUses: fields.number({
    //       label: 'Maximum Uses',
    //       description: 'Maximum number of times this token can be used (0 for unlimited)',
    //       defaultValue: 0
    //     }),
    //     usedCount: fields.number({
    //       label: 'Used Count',
    //       description: 'Number of times this token has been used',
    //       defaultValue: 0
    //     }),
    //     isActive: fields.checkbox({
    //       label: 'Active',
    //       description: 'Whether this token is currently active',
    //       defaultValue: true
    //     }),
    //     createdBy: fields.text({
    //       label: 'Created By',
    //       description: 'Who created this token'
    //     }),
    //     accessLevel: fields.select({
    //       label: 'Access Level',
    //       description: 'Level of access this token provides',
    //       options: [
    //         { label: 'Basic', value: 'basic' },
    //         { label: 'Premium', value: 'premium' },
    //         { label: 'Unlimited', value: 'unlimited' }
    //       ],
    //       defaultValue: 'basic'
    //     }),
    //     features: fields.array(
    //       fields.text({ label: 'Feature' }),
    //       {
    //         label: 'Enabled Features',
    //         description: 'List of features this token enables access to'
    //       }
    //     )
    //   }
    // }),
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
        showTitles: fields.checkbox({ label: 'Show Post Titles', description: 'Hide/Show the post titles', defaultValue: false }),
        showDates: fields.checkbox({ label: 'Show Dates', description: 'Hide/Show the post dates', defaultValue: true }),
        enableImageBlur: fields.checkbox({ 
          label: 'Enable Image Blur Effect', 
          defaultValue: true 
        }),
        showSocial: fields.checkbox({ label: 'Show Social Links in Posts' }),
        showTags: fields.checkbox({ label: 'Show Post Tags', description: 'Hide/Show the post tags', defaultValue: false }),
        showShare: fields.checkbox({ label: 'Show Share section on posts', description: 'Hide/Show the share this copy button on posts', defaultValue: false }),
        divider3: fields.empty(),
        videoTimeLimitMinutes: fields.number({ 
          label: 'Video Time Limit (Minutes)', 
          description: 'Set to -1 to disable timer, 0 for immediate paywall, or 1-30 minutes for timed limit',
          defaultValue: -1,
          validation: { min: -1, max: 30 }
        }),
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
        title: fields.text({ label: 'Home Page Title', defaultValue: 'Home Page Title', }),
        description: fields.text({ label: 'SEO/App Description', description: 'The description is used as the description of the homepage for SEO, and on Android in the PWA install dialogue window', }),
        
        name: fields.text({ label: 'App Name' }),
        shortName: fields.text({ label: 'Short Name' }),

        location: fields.text({ label: 'Location Map', description: 'Copy the src url from the google maps location share embed section'  }),
        showMap: fields.checkbox({
          label: 'Show Map in Contact Forms',
          description: 'Display the location map alongside contact forms',
          defaultValue: true
        }),

        divider_contact: fields.empty(),
        
        // Contact Form Field Configuration
        showName: fields.checkbox({
          label: 'Show Name Field',
          description: 'Display name field in contact forms',
          defaultValue: true
        }),
        showPhone: fields.checkbox({
          label: 'Show Phone Field',
          description: 'Display phone field in contact forms',
          defaultValue: true
        }),
        showMessage: fields.checkbox({
          label: 'Show Message Field',
          description: 'Display message textarea in contact forms',
          defaultValue: true
        }),
        showUpload: fields.checkbox({
          label: 'Show Upload Field',
          description: 'Display file upload field in contact forms',
          defaultValue: true
        }),
        showExtraField: fields.checkbox({
          label: 'Show Extra Field',
          description: 'Display an additional custom text field',
          defaultValue: false
        }),
        extraFieldLabel: fields.text({
          label: 'Extra Field Label',
          description: 'Label for the extra text field',
          defaultValue: 'Extra Field'
        }),
        showExtraField2: fields.checkbox({
          label: 'Show Extra Field 2',
          description: 'Display a second additional custom text field',
          defaultValue: false
        }),
        extraFieldLabel2: fields.text({
          label: 'Extra Field Label 2',
          description: 'Label for the second extra text field',
          defaultValue: 'Extra Field 2'
        }),
        formContent: fields.text({
          label: 'Form Introduction Text',
          description: 'Text to display above the contact form',
          multiline: true,
          defaultValue: 'For all inquiries, please complete the form below:'
        }),

        divider: fields.empty(),

        screenshot: fields.image({
          label: 'Screenshot',
          description: 'This image is used on Android in the PWA install dialogue window (Image should be in JPG or PNG format and sized at 320x640)',
          directory: 'public/images/pwa',
          publicPath: '/images/pwa',
        }),

  

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
          label: '192x192 PWA Icon (MUST BE PNG)',
          description: '⚠️ IMPORTANT: Must be PNG format! Upload a 192x192 pixel PNG file for PWA compatibility. WebP and other formats will cause PWA installation issues.',
          directory: 'public/images/pwa',
          publicPath: '/images/pwa',
          validation: {
            isRequired: true
          }
        }),
        icon512: fields.image({
          label: '512x512 PWA Icon (MUST BE PNG)', 
          description: '⚠️ IMPORTANT: Must be PNG format! Upload a 512x512 pixel PNG file for PWA compatibility. WebP and other formats will cause PWA installation issues.',
          directory: 'public/images/pwa',
          publicPath: '/images/pwa',
          validation: {
            isRequired: true
          }
        })
      }
    }),
    photoSettings: singleton({
      label: 'Photo Gallery',
      path: 'src/content/photoSettings/',
      schema: {
        galleryMode: fields.select({
          label: 'Gallery Mode',
          description: 'Choose how gallery images are provided',
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

        // showFaqsOnPhotos: fields.checkbox({
        //   label: 'Show FAQ Module',
        //   defaultValue: false,
        // }),

        // showTestimonialsOnPhotos: fields.checkbox({
        //   label: 'Show Testimonials Module',
        //   defaultValue: false,
        // }),

        // pitch: fields.relationship({
        //   label: 'Content Block 1',
        //   collection: 'pitches',
        //   validation: { isRequired: false }
        // }),

        divider5: fields.empty(),

        defaultDirectory: fields.text({
          label: '(Directory-based Mode) Default Directory',
          description: "Enter the EXACT name of the Default Directory to be displayed (case-sensitive). Leave blank to show all directories.",
          defaultValue: 'all',
          validation: { isRequired: false }
        }),

        showGallerySelector: fields.checkbox({
          label: 'Show Gallery Drop Down Menu',
          description: '(Directory-based mode only) Hiding this will show all images across directories',
          defaultValue: true,
        }),

        // showSwitch: fields.checkbox({
        //   label: 'Show Swipe/Scroll Icon',
        //   description: 'Show the icon that allows switching between grid and swipe views',
        //   defaultValue: true,
        // }),

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
            itemLabel: (props: { fields: { caption: { value: string } } }) => props.fields.caption.value || 'Image',
          }
        ),
        divider4: fields.empty(),
      },
    }),
    
    styleapps: singleton({
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
  

    // bio: singleton({
    //   label: 'Profile',
    //   path: 'src/content/bio/',
    //   schema: {
    //     title: fields.text({ label: 'Title' }),
    //     tagline: fields.text({ label: 'Tagline' }),
    //     description: fields.text({ label: 'Description', multiline: true }),
    //     image: fields.image({
    //       label: 'Image',
    //       directory: 'public/images/bio',
    //       publicPath: '/images/bio',
    //     }),
    //     phone: fields.text({ label: 'Phone' }),
    //     subheading: fields.text({ label: 'Sub Heading' }),
    //     subcontent: fields.text({ label: 'Sub Content', multiline: true }),
    //     cta: fields.relationship({
    //       label: 'CTA',
    //       collection: 'CTAs',
    //     }),
    //     showSocial: fields.checkbox({ label: 'Show Social Links' }),
    //   },
    // }),    


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
      'pages',
      'posts',
    ],
    'Content Modules': [
      'pitches',
      'CTAs',
      'youtubeFeeds',
      'faqs',
      'testimonials',
      'resume',
    ],
    'Settings': [
      'siteSettings',
      'pwaSettings',
      'menuItems',
      'socialCard',
      'styleapps',
      'language',
      'photoSettings',
      'resumeSettings',
      'socialLinks',
    ],
    // 'Membership': [
    //   'membershipTokens',
    // ]
  },
},});


