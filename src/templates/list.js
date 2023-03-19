import React from "react"
import { graphql } from "gatsby"
import List from "../components/list"

const ListPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  return (
 
      <List posts={posts} />
  
  )
}

export default ListPage

export const query = graphql`
  query ListQuery {
    allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
            tags
            featuredImg {
              relativePath
              publicURL
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
        }
      }
    }
  }
`
