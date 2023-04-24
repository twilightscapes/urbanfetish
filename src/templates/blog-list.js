import React from 'react';
import { graphql, Link, navigate } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/siteLayout"
import useSiteMetadata from "../hooks/SiteMetadata"
import { ImPlay } from "react-icons/im"
import { FaImage } from "react-icons/fa"
import { AiOutlinePicLeft } from "react-icons/ai"
import { StaticImage } from 'gatsby-plugin-image';
import { Helmet } from "react-helmet"
// import { AnchorLink } from 'gatsby-plugin-anchor-links';
import TimeAgo from 'react-timeago'

const BlogList = ({ data, pageContext }) => {

  const { showNav } = useSiteMetadata()
  const { showDates } = useSiteMetadata()





  
  

  
  const posts = data.allMarkdownRemark.edges
  const { numPages } = pageContext

  return (
    <Layout>

<Helmet>
        <body className="archivepage utilitypage" />
      </Helmet>


{showNav ? (
  <div className="spacer" style={{height:'70px', border:'0px solid yellow'}}></div>
      ) : (
        ""
      )}

      <div style={{maxHeight:'100vh'}}>


        {/* <h1 style={{textAlign:'center'}}>Archive</h1> */}


        <div className="contentpanel grid-container" style={{}}>

<div className="sliderSpacer" style={{height:'', paddingTop:'', display:''}}></div>


{posts.map(({ node }, index) => {
          // const title = node.frontmatter.title || node.fields.slug
          // const tags = node.frontmatter.tags || []
          // const excerpt = node.frontmatter.excerpt || node.excerpt
          // const featuredImg = node.frontmatter.featuredImage





          return (
            <div className="post-card1" key={node.fields.slug} style={{marginTop:''}}>

<Link className="postlink" to={node.frontmatter.slug}>

{node.frontmatter.featuredImage ? (
    <GatsbyImage
      image={node.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
      alt={node.frontmatter.title + " - Featured image"}
      className="featured-image1"
      placeholder="blurred"
      loading="eager"
      style={{ position: 'relative', zIndex: '1', maxHeight: '', margin: '0 auto' }}
    />
) : (

    <StaticImage
      className="featured-image1"
      src="../../static/assets/default-og-image.webp"
      alt="Default Image"
      style={{ position: 'relative', zIndex: '' }}
    />

)}


<div className="post-content" style={{display:'flex', flexDirection:'column', justifyContent:'start', width:'100%', height:'', position:'relative', background:'', padding:'0', margin:'0 auto 0 auto', textAlign:'center', overFlow:'hidden'}}>

  {node.frontmatter.youtube.youtuber ? (

<div className="spotlight" style={{border:'0px solid green', }}>
<div className="posticons" style={{flexDirection:'column', justifyContent:'center', margin:'0 auto'}}>
<div style={{display:'flex', justifyContent:'space-around', gap:'2vw', color:'fff', }}>
<FaImage className="posticon" style={{margin:'0 auto', width:'60%', height:'30px', fontSize:''}} />
<ImPlay className="posticon" style={{margin:'0 auto', width:'60%', height:'30px', fontSize:''}} />
<AiOutlinePicLeft className="posticon" style={{margin:'0 auto', width:'60%', height:'30px', fontSize:''}} />
</div>
Play Multimedia
</div>
</div>

) : (
""
)}

<div className="panel" style={{display:'flex', justifyContent:'space-between', alignItems:'center', margin:'10px auto', width:'auto', maxWidth:'80vw', gap:'.4vw', height:'', textAlign:'center', padding:'1vh 2vw', fontSize:'clamp(1rem, 1vw, 1rem)',  background:'rgba(0, 0, 0, 0.7)', borderRadius:'', border:'0px solid red', color:'#aaa' }}>
      <h2 className="title" style={{ }}>
        {node.frontmatter.title}
      </h2>

  </div>

</div>

</Link>
{showDates ? (
            <p style={{position:'', textAlign:'center', border:'0px solid red', fontSize:'70%', minWidth:'100px'}}>
            <TimeAgo date={node.frontmatter.date}/>
          </p>
          ) : (
            ""
          )}
    </div>
          )
        })}

        
      </div>
      </div>





<div className="spacer66"></div>

      {/* Render pagination links */}
<div style={{position:'fixed', bottom:'0', zIndex:'5', width:'100vw',  background:'rgba(0, 0, 0, 0.7)', padding:'.2vh 2vw .2vh 2vw', textAlign:'center', color:'#fff', display:'flex', justifyContent:'center'}}>
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
      limit: 30
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
