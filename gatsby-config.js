
const netlifyCmsPaths = {
  resolve: `gatsby-plugin-netlify-cms-paths`,
  options: {
    cmsConfig: `/static/admin/config.yml`,
  },
};

const settings = require("./static/data/site.json")



module.exports = {
  flags: {},
  siteMetadata: {
    ...settings.meta,
  },
  plugins: [


    netlifyCmsPaths,

{
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: "gatsby-remark-copy-linked-files",
          options: {
            destinationDir: "assets",
          },
        },
      ],
    },
  },


  {
    resolve: "gatsby-plugin-anchor-links",
    options: {
      offset: -70,
      duration: 1000,
    }
  },

  

  {
    resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
    options: {
      resolvers: {
        // For any node of type MarkdownRemark, list how to resolve the fields' values
        MarkdownRemark: {
          template: node => node.frontmatter.template,
          title: node => node.frontmatter.title,
          slug: node => node.frontmatter.slug,
          body: node => node.frontmatter.rawBody,
          tags: node => node.frontmatter.tags,
          featuredImage: node => node.frontmatter.featuredImage,
          gatsbyImageData: node =>
            node.frontmatter.featuredImage?.childImageSharp?.gatsbyImageData,
        },
      },
      fields: [
        {
          name: 'template',
          indexed: true,
          resolver: 'frontmatter.template',
        },
        {
          name: 'title',
          indexed: true,
          resolver: 'frontmatter.title',
        },
        {
          name: 'slug',
          indexed: true,
          resolver: 'frontmatter.slug',
        },
        {
          name: 'tags',
          indexed: true,
          resolver: 'frontmatter.tags',
        },
        {
          name: 'featuredImage',
          indexed: true,
          resolver: 'frontmatter.featuredImage.publicURL',
        },
        {
          name: 'gatsbyImageData',
          indexed: true,
          resolver: 'frontmatter.featuredImage.childImageSharp.gatsbyImageData',
        },
        {
          name: 'rawBody',
          indexed: true,
          resolver: 'rawMarkdownBody',
        },
      ],
    },
  },
  
  






  
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.svg$/
        }
      }
    },

    {
      resolve: `gatsby-plugin-modal-routing-4`,
      options: {
        appElement: '#___gatsby',
        modalProps: { },
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/assets/`,
        name: `assets`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },


    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/content/`,
        name: `content`,
      },
    },

    `gatsby-transformer-sharp`,

    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`avif`, `webp`, `auto`],
          placeholder: `blurred`,
          quality: 90,
        },
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        gfm: true,
        plugins: [
          netlifyCmsPaths,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1024,
              showCaptions: true,
              linkImagesToOriginal: false,
              // tracedSVG: true,
              loading: "lazy",
            },
          },

          {
            resolve: "gatsby-transformer-remark",
            options: {
              plugins: [
              {
                resolve: "gatsby-remark-better-embed-video",
                options: {
                  width: 800,
                  ratio: 1.77, // Optional: Defaults to 16/9 = 1.77.
                  height: 400, // Optional: Overrides optional.ratio.
                  related: false, // Optional: Will remove related videos from the end of an embedded YouTube video.
                  noIframeBorder: true, // Optional: Disable insertion of <style> border: 0.
                  showInfo: false // Optional: Hides video title and player actions.
                }
              }
              ]
            }
          },


          {
            resolve: 'gatsby-plugin-feed',
            options: {
              query: `
                {
                  site {
                    siteMetadata {
                      title
                      description
                      siteUrl
                      site_url: siteUrl
                    }
                  }
                }
              `,
              feeds: [
                {
                  serialize: ({ query: { site, allMarkdownRemark } }) => {
                    return allMarkdownRemark.nodes.map(node => {
                      const imageUrl = node.frontmatter.featuredImage
                        ? site.siteMetadata.siteUrl + node.frontmatter.featuredImage.childImageSharp.fixed.src
                        : null;
          
                      const mediaContent = imageUrl
                        ? {
                            "media:content": {
                              _attr: {
                                url: imageUrl,
                                medium: "image",
                              },
                            },
                          }
                        : null;
          
                      return Object.assign({}, node.frontmatter, {
                        description: node.excerpt,
                        date: node.frontmatter.date,
                        url: site.siteMetadata.siteUrl + node.fields.slug,
                        guid: site.siteMetadata.siteUrl + node.fields.slug,
                        custom_elements: [
                          { "content:encoded": node.html },
                          mediaContent,
                          {
                            _attr: {
                              "xmlns:media": "http://search.yahoo.com/mrss/",
                            },
                          },
                        ].filter(Boolean),
                      });
                    });
                  },
                  query: `
                  {
                    allMarkdownRemark(
                      sort: {frontmatter: {date: DESC}}
                      filter: {frontmatter: {excludeFromRSS: {ne: true}}}
                    ) {
                      nodes {
                        excerpt
                        html
                        fields {
                          slug
                        }
                        frontmatter {
                          title
                          date
                          featuredImage {
                            childImageSharp {
                              fixed(width: 800) {
                                src
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                  `,
                  output: '/rss.xml',
                  title: 'Feed Title',
                },
              ],
            },
          },
          
          
          
          

          `gatsby-remark-responsive-iframe`,

        ],
      },
    },

    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-theme-ui`,


    {
      resolve: `gatsby-plugin-decap-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
        enableIdentityWidget: false,
        publicPath: `admin`,
        htmlTitle: `PIRATE CMS`,
        htmlFavicon: `static/assets/logo.svg`,
        includeRobots: false,
        logo_url: 'https://pirateweb.org/assets/logo.svg'
      },
    },

    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: settings.meta.siteUrl,
        sitemap: `${settings.meta.siteUrl}/sitemap.xml`,
        resolveEnv: () => process.env.GATSBY_ENV,
        env: {
          development: {
            policy: [{ userAgent: '*', allow: ['/'] }]
          },
          production: {
            policy: [{ userAgent: '*', allow: '/' }]
          }
        }
      }
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
name: settings.meta.companyname,
short_name: settings.meta.companyname,
start_url: `${settings.meta.proOptions.startUrl}`,
description: settings.meta.description,
background_color: `transparent`,
lang: `en`,
theme_color: `transparent`,
display: `standalone`,
icon: `static${settings.meta.icon512}`, // path is relative to the root of the site.
crossOrigin: `use-credentials`,
theme_color_in_head: false,
icon_options: {
  purpose: `any maskable`,
},
      },
    },
    "gatsby-plugin-offline",
  ],
}
