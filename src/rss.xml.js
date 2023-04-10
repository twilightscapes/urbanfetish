import React from "react";
import { graphql } from "gatsby";
import { Feed } from "gatsby-plugin-feed";

const RssXml = ({ data }) => {
  const { site, allMarkdownRemark } = data;

  if (!site) {
    console.error("Site metadata is missing from RSS feed data:", data);
    return null;
  }

  if (!allMarkdownRemark) {
    console.error("Markdown content is missing from RSS feed data:", data);
    return null;
  }

  const feed = new Feed({
    title: site.siteMetadata.title,
    description: site.siteMetadata.description,
    site_url: site.siteMetadata.siteUrl,
    feed_url: `${site.siteMetadata.siteUrl}/rss.xml`,
    language: "en",
    generator: "GatsbyJS",
    ttl: "60",
  });

  allMarkdownRemark.nodes.forEach(node => {
    feed.addItem({
      title: node.frontmatter.title,
      id: node.fields.slug,
      link: `${site.siteMetadata.siteUrl}${node.fields.slug}`,
      description: node.excerpt,
      content: node.html,
      date: node.frontmatter.date,
    });
  });

  return (
    <>
      <Feed feed={feed} />
    </>
  );
};

export const query = graphql`
  query RssQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
`;


export default RssXml;
