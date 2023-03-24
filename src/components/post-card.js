// import { jsx } from "theme-ui"
import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { ImPlay } from "react-icons/im"
import { FaImage } from "react-icons/fa"
import { AiOutlinePicLeft } from "react-icons/ai"
import { StaticImage } from "gatsby-plugin-image"


const PostCard = ({ data }) => {

  
  return (

    <div className="post-card1">
      {data.frontmatter.featuredImage ? (
        <Link to={data.frontmatter.slug}>
          <GatsbyImage
            image={data.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
            alt={data.frontmatter.title + " - Featured image"}
            className="featured-image1"
            placeholder="blurred"
            style={{position:'relative', zIndex:'1', maxHeight:'', margin:'0 auto'}}
          />
        </Link>
      ) : (
        <Link to={data.frontmatter.slug}>
          <StaticImage
            className="featured-image1"
            src="../../static/assets/default-og-image.webp"
            alt="Default Image"
            style={{position:'relative', zIndex:''}}
          />
        </Link>
      )}

      <div className="post-content" style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'100%', height:'', position:'relative', background:'', padding:'0', margin:'0 auto 0 auto', textAlign:'center', overFlow:'hidden'}}>
        {data.frontmatter.youtube.youtuber ? (
          <Link to={data.frontmatter.slug} style={{}}>
            <div className="spotlight" style={{marginLeft:'10%', marginTop:'-24%', margin:'-24% 10% 0 10%'}}>
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

        <div className="panel" style={{display:'flex', justifyContent:'space-between', alignItems:'center', margin:'10px auto', maxWidth:'80vw', gap:'.4vw', height:'', textAlign:'center', padding:'1vh 2vw', fontSize:'clamp(1rem, 1vw, 1rem)',  background:'rgba(0, 0, 0, 0.7)', borderRadius:'', color:'#aaa' }}>
          <Link to={data.frontmatter.slug}>
            <h2 className="title1" style={{ }}>
              {data.frontmatter.title}
            </h2>
          </Link>
          {/* <p style={{position:'', textAlign:'center', border:'0px solid red', fontSize:'70%', minWidth:'100px'}}>
            <TimeAgo date={data.frontmatter.date}/>
          </p> */}
        </div>
      </div>
    </div>

  )
}

export default PostCard