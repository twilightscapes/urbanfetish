import React from "react"
import { graphql } from "gatsby"

const Category = ({ data, pageContext }) => {
  const { category } = pageContext
  const posts = data.allMarkdownRemark.edges

  return (
    <div>
      <h1>Posts in category "{category}"</h1>
      <ul>
        {posts.map(({ node }) => (
          <li key={node.id}>
            <a href={node.frontmatter.slug}>{node.frontmatter.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const query = graphql`
  query($category: String!) {
    allMarkdownRemark(filter: { frontmatter: { category: { in: [$category] } } }) {
      edges {
        node {
          id
          frontmatter {
            slug
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`

export default Category
