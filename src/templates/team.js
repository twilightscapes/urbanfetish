import React from "react"
import { graphql } from "gatsby"

export default function Team({ data }) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <div>
      <h1>{frontmatter.teamname}</h1>
      <p>Job Title: {frontmatter.jobTitle}</p>
      <p>Credentials: {frontmatter.credentials}</p>
      <img src={frontmatter.profilePicture.publicURL} alt={frontmatter.teamname} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        teamname
        list
        credentials
        jobTitle
        order
        profilePicture {
          publicURL
        }
      }
    }
  }
`

