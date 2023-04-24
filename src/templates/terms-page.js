import React from "react"
import { graphql, Link } from "gatsby"
import useSiteMetadata from "../hooks/SiteMetadata"
import Seo from "../components/seo"
import Layout from "../components/siteLayout"
import GoBack from "../components/goBack"
import Footer from "../components/footer"
import { Helmet } from "react-helmet"
export const pageQuery = graphql`
  query TermsQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 140)
      frontmatter {
        title
      }
    }
  }
`
const Terms = ({ data }) => {
  const { showNav } = useSiteMetadata()
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, excerpt } = markdownRemark

  return (
    <Layout className="page">

<Helmet>
  <body id="body" className="utilitypage" style={{}} />
</Helmet>

      <Seo title={frontmatter.title} description={excerpt} />

      {showNav ? (
    <div className="spacer" style={{height:'60px', border:'0px solid yellow'}}></div>
        ) : (
          ""
        )}
      <div className="container panel" style={{ maxWidth:'1024px', margin:'0 auto',
    paddingTop:'5vh'}}>


      <div className="mobile"><GoBack /></div>


            <h1 className="headline">{frontmatter.title}</h1>
           

            
      
        <article className="" dangerouslySetInnerHTML={{ __html: html }} style={{padding:'2rem 8%',}} />

     



      <Link to="../" className="print" style={{position:'', bottom:'', border:'0px solid red', width:'200px', margin:'0 auto', textAlign:'center', textDecoration:'underline', padding:'.5rem 2rem', display:'flex', placeContent:'center', justifyContent:'center',borderRadius:'12px 12px 0 0'}}>Return Home</Link>
      {/* <GoBack /> */} 
      
      </div>
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </Layout>
  )
}

export default Terms
