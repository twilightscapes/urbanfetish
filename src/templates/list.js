import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

const List = ({ posts }) => {
  if (!posts || !posts.length) {
    return <div>No posts found.</div>
  }

  return (
    <div className="list">
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        const tags = node.frontmatter.tags || []
        const featuredImg = node.frontmatter.featuredImg

        return (
          <Link key={node.id} to={node.fields.slug}>
            {featuredImg && (
              <GatsbyImage
                image={featuredImg.childImageSharp.gatsbyImageData}
                alt={title + ' - Featured image'}
              />
            )}

            <h2>{title}</h2>

            <div className="tags">
              {tags.map(tag => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default List
