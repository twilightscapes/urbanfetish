import React from 'react';
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/siteLayout"
import useSiteMetadata from "../hooks/SiteMetadata"
import { ImPlay } from "react-icons/im"
import { FaImage } from "react-icons/fa"
import { AiOutlinePicLeft } from "react-icons/ai"
// import TimeAgo from 'react-timeago'

import { Helmet } from "react-helmet"


const Tag = ({ data, pageContext }) => {
  const { tag } = pageContext
  const posts = data.allMarkdownRemark.edges

  const { showNav } = useSiteMetadata()





  



  
  if (posts.length === 0) {
    return <p>No posts found.</p>
  }

  return (
    <Layout>
      <Helmet>
  <body id="body" className="tag scroll" style={{}} />
</Helmet>


      {showNav ? (
  <div className="spacer" style={{height:'70px', border:'0px solid yellow'}}></div>
      ) : (
        ""
      )}
      
    
      <h1 style={{textAlign:'center'}}>Posts tagged "{tag}"</h1>
      



<div className="contentpanel horizontal-scroll panels" style={{padding:''}}>

<div className="sliderSpacer" style={{height:'', paddingTop:'', display:'none'}}></div>

      
        {posts.map(({ node }) => (
          <div key={node.id}>
            <Link key={node.id} to={node.frontmatter.slug}>
                      <GatsbyImage
              image={node.frontmatter.featuredImage?.childImageSharp?.gatsbyImageData}
              alt={node.frontmatter.title}
            />

{node.frontmatter.youtuber ? (
<Link to={node.frontmatter.slug} style={{}}>
  <div className="spotlight" style={{maxHeight:''}}>
<div className="posticons" style={{}}>
<div style={{display:'flex', justifyContent:'space-around', gap:'2vw', color:'fff',}}>
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

<div className="panel" style={{display:'flex', justifyContent:'space-between', alignItems:'center', margin:'10px auto', maxWidth:'80vw', gap:'.4vw', height:'', textAlign:'left', padding:'2vh 3vw', fontSize:'clamp(1rem, 1vw, 1rem)',  background:'rgba(0, 0, 0, 0.7)', borderRadius:'8px', color:'#fff' }}>

<h2 className="title" style={{fontSize:'clamp(1rem, 2vw, 3rem)', }}>
{node.frontmatter.title}
</h2>

{/* <p style={{minWidth:'', position:'', textAlign:'center', border:'0px solid red', fontSize:'70%'}}>
              <TimeAgo date={node.frontmatter.date}/>
            </p> */}
            {/* <p>{node.excerpt}</p> */}
            </div>
            
            </Link>
          </div>
        ))}
      
    </div>
    </Layout>
  )
}

export const query = graphql`
  query($tag: String!) {
    allMarkdownRemark(
      filter: {frontmatter: {tags: {in: [$tag]}}}
      sort: {frontmatter: {date: DESC}}
    ) {
      edges {
        node {
          id
          frontmatter {
            slug
            title
            date(formatString: "MMMM DD, YYYY")
            category
            youtuber
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

export default Tag
