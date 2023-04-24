import React from 'react';
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/siteLayout"
import useSiteMetadata from "../hooks/SiteMetadata"
import { ImPlay } from "react-icons/im"
import { FaImage } from "react-icons/fa"
import { AiOutlinePicLeft } from "react-icons/ai"
import TimeAgo from 'react-timeago'

import { Helmet } from "react-helmet"


export const Tag = ({ data, pageContext }) => {
  const { tag } = pageContext
  const posts = data.allMarkdownRemark.edges

  const { showNav } = useSiteMetadata()
  const { showDates } = useSiteMetadata()




  



  
  if (posts.length === 0) {
    return <p>No posts found.</p>
  }

  return (
    <Layout>
      <Helmet>
  <body id="body" className="tag" style={{}} />
</Helmet>


      {showNav ? (
  <div className="spacer" style={{height:'70px', border:'0px solid yellow'}}></div>
      ) : (
        ""
      )}
      
    
      <h1 style={{textAlign:'center'}}>Posts tagged "{tag}"</h1>
      

      <section id="showPosts" style={{marginTop:''}}>

<div className="contentpanel horizontal-scroll panels" style={{padding:''}}>

<div className="sliderSpacer" style={{height:'', paddingTop:'', display:''}}></div>

      
        {posts.map(({ node }) => (
          <div key={node.id}>
            <Link className="postlink" to={node.frontmatter.slug}>


{data.frontmatter.featuredImage ? (
    <GatsbyImage
      image={data.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
      alt={data.frontmatter.title + " - Featured image"}
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

  {data.frontmatter.youtube.youtuber ? (

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
        {data.frontmatter.title}
      </h2>
    {/* <p style={{position:'', textAlign:'center', border:'0px solid red', fontSize:'70%', minWidth:'100px'}}>
      <TimeAgo date={data.frontmatter.date}/>
    </p> */}
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
        ))}
      


    </div>
    </section>
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
            youtube{
              youtuber
            }
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
