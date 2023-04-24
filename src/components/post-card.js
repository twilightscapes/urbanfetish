// import { jsx } from "theme-ui"
import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { ImPlay } from "react-icons/im"
import { FaImage } from "react-icons/fa"
import { AiOutlinePicLeft } from "react-icons/ai"
import { StaticImage } from "gatsby-plugin-image"

import TimeAgo from 'react-timeago'
import useSiteMetadata from "../hooks/SiteMetadata"


const PostCard = ({ data, index }) => {
  // index is the index of the current PostCard in the array of posts
  const { showDates } = useSiteMetadata()
  // ...

  return (
    <div className="post-card1" key={data.frontmatter.slug}>
      <Link className="postlink" to={data.frontmatter.slug}>
        {data.frontmatter.featuredImage ? (
          <GatsbyImage
            image={data.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
            alt={data.frontmatter.title + " - Featured image"}
            className="featured-image1"
            placeholder="blurred"
            loading={index < 3 ? "eager" : "lazy"}
            // loading={index === 0 ? "eager" : "lazy"} 
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
        </div>



      
      


</div>

      </Link>
      {showDates ? (
            <p style={{position:'', textAlign:'center', border:'0px solid red', fontSize:'70%', minWidth:'100px'}}>
            <TimeAgo date={data.frontmatter.date}/>
          </p>
          ) : (
            ""
          )}
    </div>

  )
}

export default PostCard