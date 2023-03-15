/** @jsx jsx */
// import * as React from "react"
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
// import TimeAgo from 'react-timeago'
import { ImPlay } from "react-icons/im"
import { FaImage } from "react-icons/fa"
import { AiOutlinePicLeft } from "react-icons/ai"
import { StaticImage } from "gatsby-plugin-image"
// import SiteLogo from "../../static/assets/logo.svg"
import Countdown from 'react-countdown'

// const Completionist = () => ""

const Completionist = () => <span></span>
// const renderer = ({ hours, minutes, seconds, completed }) => {
//   if (completed) {

//     return <a href="https://memegenes.com/"><Completionist /></a>;
//   } else {

//     return (
//        <span>
//         Meme Genes
//       </span> 
//     )
//   }
// }

// const ViewIt = () => <span>Meme Genes - VIEW NOW!</span>
// const renderer1 = ({ hours, minutes, seconds, completed }) => {
//   if (completed) {
//     // Render a complete state
//     return <ViewIt />;
//   } else {
//     // Render a countdown
//     return (
//        <span>
//         Meme in {seconds} Seconds
//       </span> 
//     )
//   }
// }


const PostCard = ({ data }) => (

  



  <div
    className="post-card1"
    style={{}}
  >

    {data.frontmatter.featuredImage ? (
      <Link to={data.frontmatter.slug}>
        <GatsbyImage
          image={data.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
          alt={data.frontmatter.title + " - Featured image"}
          className="featured-image1"
          placeholder="blurred"
              // loading="eager"
    
              style={{position:'relative', zIndex:'1', maxHeight:'65vh', margin:'0 auto'}}
        />
      </Link>
      
    ) : (
      <Link  to={data.frontmatter.slug}><StaticImage className="featured-image1" src="../../static/assets/default-og-image.jpg" alt="Default Image" style={{position:'relative', zIndex:''}} /></Link>
    )}







{data.frontmatter.youtuber ? (
<Link to={data.frontmatter.slug} style={{}}>
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



<div className="post-content" style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'100%', height:'', position:'relative', background:'', padding:'0', margin:'0 auto 0 auto'}}>



{ data.frontmatter.nftdrop ? (
            
<div className="" style={{display:'flex', alignSelf:'center',  position:'absolute', bottom:'80px', width:'auto', margin:'0 auto', border:'0px solid blue', zIndex:'1', background:'rgba(0,0,0,0.6)', borderRadius:'12px' }}>

<div className="countdown" style={{display:'flex', justifyContent:'center', maxWidth:'600px',  margin:'0 auto', color:'#fff', textAlign:'center', padding:'0 2vw', fontSize:'200%', borderRadius:'12px', border:'0px solid #111', textShadow:'1px 2px 0px #000'}}>
  
<Countdown date={data.frontmatter.nftdrop}>
{/* <Countdown
date={Date.now() + 6000} className="countdown"> */}

<Completionist />
</Countdown>

{/* <Countdown date={Date.now() + 60000} renderer={renderer} /> */}
</div>

</div>

       
          ) : (

            ""
       
          )}


<div className="panel" style={{display:'flex', justifyContent:'space-between', alignItems:'center', margin:'10px auto', maxWidth:'80vw', gap:'.4vw', height:'', textAlign:'left', padding:'1vh 2vw', fontSize:'clamp(1rem, 1vw, 1rem)',  background:'rgba(0, 0, 0, 0.7)', borderRadius:'8px', color:'#fff' }}>
<Link 
    to={data.frontmatter.slug}
  >
<h2 className="title1" style={{ }}>
  
    {data.frontmatter.title}
     {/* - <Countdown date={Date.now() + 60000} renderer={renderer} precision={0} intervalDelay={0} zeroPadTime={0} />  */}
    {/* <Countdown
date={Date.now() + 60000} className="countdown">
  date={Date.now() + 10000}
    intervalDelay={0}
    precision={3}
    zeroPadTime={0}
    renderer={props => ({ hours, minutes, seconds })}
<Completionist />
</Countdown> */}
</h2>
  </Link>



{/* <p style={{position:'', textAlign:'center', border:'0px solid red', fontSize:'70%', minWidth:'100px'}}>
  <TimeAgo date={data.frontmatter.date}/>
</p> */}


</div>


</div>

  </div>

)

export default PostCard