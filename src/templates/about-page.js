import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import useSiteMetadata from "../hooks/SiteMetadata"
import Seo from "../components/seo"
import Layout from "../components/siteLayout"
import GoBack from "../components/goBack"
import Footer from "../components/footer"
import { Helmet } from "react-helmet"

const AboutPage = () => {
  const { showNav } = useSiteMetadata()
  const data = useStaticQuery(graphql`
    query AboutQuery {
      markdownRemark(frontmatter: { template: { eq: "about-page" } }) {
        html
        excerpt(pruneLength: 140)
        frontmatter {
          title
        }
      }
    }
  `)
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, excerpt } = markdownRemark

  return (
    <Layout className="page">
      <Helmet>
        <body id="body" className="utilitypage" />
      </Helmet>
      <Seo title={frontmatter.title} description={excerpt} />

      {showNav ? (
        <div className="spacer" style={{ height: "60px", border: "0px solid yellow" }}></div>
      ) : (
        ""
      )}
      <div className="container panel" style={{ maxWidth: "1024px", margin: "0 auto", paddingTop: "20px" }}>
        <div className="mobile">
          <GoBack />
        </div>

        <h1 className="headline">{frontmatter.title}</h1>

        <article dangerouslySetInnerHTML={{ __html: html }} />

        <GoBack />
        
      </div>

      <br />
      <br />
      <Footer />
    </Layout>
  )
}

export default AboutPage
