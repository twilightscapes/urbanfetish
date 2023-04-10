import React from "react";
import { graphql } from "gatsby";
import { Feed } from "gatsby-plugin-feed";

const RssXml = ({ data }) => {
  const { site, allMarkdownRemark } = data;

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
  allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
    nodes {
      excerpt
      html
      fields {
        slug
      }
      frontmatter {
        title
        date
      }
    }
  }
}
`;

export default RssXml;
