import React from "react"
import { graphql } from "gatsby"

export default function Team({ data }) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <div>
      <h1>{frontmatter.name} {frontmatter.credentials}</h1>
      <p>Job Title: {frontmatter.jobTitle}</p>
      <img src={frontmatter.profilePicture.publicURL} alt={frontmatter.name} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
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

