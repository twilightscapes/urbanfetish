import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/siteLayout"
import useSiteMetadata from "../hooks/SiteMetadata"
import { Helmet } from "react-helmet"

export default function Team({ data }) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark

  const { showNav } = useSiteMetadata()

  return (
    <Layout>
    <Helmet>
<body id="body" className="team" />
</Helmet>

{showNav ? (
  <div className="spacer" style={{height:'70px', border:'0px solid yellow'}}></div>
      ) : (
        ""
      )}

      
    <div>
      <h1>{frontmatter.name} {frontmatter.credentials}</h1>
      <p>Job Title: {frontmatter.jobTitle}</p>
      <img src={frontmatter.profilePicture.publicURL} alt={frontmatter.name} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        name
        list
        credentials
        jobTitle
        order
        profilePicture {
          publicURL
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
          }
        }
      }
    }
  }
`

