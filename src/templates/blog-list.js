import React from 'react';
import { graphql, Link, navigate } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/siteLayout"
import useSiteMetadata from "../hooks/SiteMetadata"
import { ImPlay } from "react-icons/im"
import { FaImage } from "react-icons/fa"
import { AiOutlinePicLeft } from "react-icons/ai"


// import TimeAgo from 'react-timeago'

const BlogList = ({ data, pageContext }) => {

  const { showNav } = useSiteMetadata()





  
  

  
  const posts = data.allMarkdownRemark.edges
  const { numPages } = pageContext

  return (
    <Layout>

{showNav ? (
  <div className="spacer" style={{height:'70px', border:'0px solid yellow'}}></div>
      ) : (
        ""
      )}

      <div style={{maxHeight:'80vh'}}>
        <h1 style={{textAlign:'center'}}>Archive</h1>





        <div className="contentpanel horizontal-scroll panels" style={{padding:''}}>

<div className="sliderSpacer" style={{height:'', paddingTop:'0', display:'none'}}></div>


        {posts.map(({ node }) => {
          // const title = node.frontmatter.title || node.fields.slug
          // const tags = node.frontmatter.tags || []
          // const excerpt = node.frontmatter.excerpt || node.excerpt
          const featuredImg = node.frontmatter.featuredImage

          return (
            <div key={node.fields.slug}>
              {/* Render featured image thumbnail if it exists */}
              {featuredImg && (
                <Link to={node.fields.slug}>


<GatsbyImage
          image={node.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
          alt={node.frontmatter.title + " - Featured image"}
          className="featured-image1"
          placeholder="blurred"
              // loading="eager"
    
              style={{position:'relative', zIndex:'1', maxHeight:'', margin:'0 auto'}}
        />

      




       

                  
                  


                  <div className="post-content" style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'100%', height:'', position:'relative', background:'', padding:'0', margin:'0 auto 0 auto', textAlign:'center', overFlow:'hidden'}}>

{node.frontmatter.youtube.youtuber ? (
<Link to={node.frontmatter.slug} style={{}}>

  <div className="spotlight" style={{marginLeft:'10%', marginTop:'-28%', margin:'-24% 10% 0 10%'}}>

<div className="posticons" style={{flexDirection:'column', margin:'0 auto'}}>

<div style={{display:'flex', justifyContent:'space-around', gap:'2vw', color:'fff', }}>
<FaImage className="posticon" style={{margin:'0 auto', width:'100%', height:'5vh', fontSize:''}} />
    <ImPlay className="posticon" style={{margin:'0 auto', width:'100%', height:'5vh', fontSize:''}} />
    <AiOutlinePicLeft className="posticon" style={{margin:'0 auto', width:'100%', height:'5vh', fontSize:''}} />
</div>

Play Multimedia
</div>

</div>

</Link>
) : (
  ""
)}





<div className="panel" style={{display:'flex', justifyContent:'space-between', alignItems:'center', margin:'0 auto', maxWidth:'80vw', gap:'.4vw', height:'', textAlign:'center', padding:'1vh 2vw', fontSize:'clamp(1rem, 1vw, 1rem)',  background:'rgba(0, 0, 0, 0.7)', borderRadius:'', color:'#aaa' }}>

<h2 className="title1" style={{ }}>
    {node.frontmatter.title}
</h2>


            </div>

            </div>


            
          </Link>
              )}


            </div>
          )
        })}

        
      </div>
      </div>

      {/* Render pagination links */}
<div style={{position:'fixed', bottom:'0', width:'100vw',  background:'rgba(0, 0, 0, 0.7)', padding:'2vh 2vw', textAlign:'center', color:'#fff'}}>
  <button onClick={() => navigate(pageContext.currentPage > 2 ? `/archive/${pageContext.currentPage - 1}` : '/archive')} disabled={pageContext.currentPage === 1}>
    Previous
  </button>
  {Array.from({ length: numPages }, (_, i) => {
    const page = i + 1
    const path = page === 1 ? "/archive" : `/archive/${page}`
    return (
      <Link
        key={`pagination-link-${page}`}
        to={path}
        activeClassName="active"
        style={{padding:'20px'}}
      >
        {page}
      </Link>
    )
  })}
  <button onClick={() => navigate(`/archive/${pageContext.currentPage + 1}`)} disabled={pageContext.currentPage === numPages}>
    Next
  </button>
</div>



    </Layout>
  )
}




export const query = graphql`
  query($skip: Int!) {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { template: { eq: "blog-post" } } }
      limit: 10
      skip: $skip
    ) {
      edges {
        node {
          excerpt(pruneLength: 200)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
            youtube{
              youtuber
            }
            slug
            featuredImage {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
              }
            }
          }
        }
      }
    }
  }
`;


export default BlogList
