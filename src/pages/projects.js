import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/siteLayout"


const ProjectsPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <div className="spacer" style={{ height: '70px', border: '0px solid yellow' }}></div>
      <div>

        <div className="contentpanel horizontal-scroll panels" style={{}}>
        <div className="sliderSpacer" style={{height:'', paddingTop:'', display:'none'}}></div>
          {posts.map(({ node }) => (
            <li key={node.id}>
              <a href={node.frontmatter.slug}>
                {node.frontmatter.featuredImage && (
                  <GatsbyImage
                    image={node.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
                    alt={node.frontmatter.title}
                  />
                )}
                <h2>{node.frontmatter.title}</h2>
              </a>
            </li>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { category: { eq: "team" } } }) {
      edges {
        node {
          id
          frontmatter {
            slug
            title
            category
            featuredImage {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`

export default ProjectsPage
