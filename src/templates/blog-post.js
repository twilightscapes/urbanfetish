/** @jsx jsx */
// import * as React from "react"

import { useState, useRef,forwardRef } from "react";

// import Zoom from 'react-medium-image-zoom'
// import 'react-medium-image-zoom/dist/styles.css'


import InnerImageZoom from 'react-inner-image-zoom'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css'



// import Controls from "../components/Controls";
import { document } from "browser-monads"
import PropTypes from "prop-types";
import { MdPlayArrow } from "react-icons/md"
import { MdPause } from "react-icons/md"
import { MdVolumeOff } from "react-icons/md"
// import { MdVolumeDown } from "react-icons/md"
import { MdVolumeUp } from "react-icons/md"
// import { StaticImage } from "gatsby-plugin-image"



import { IoArrowRedoSharp, IoArrowUndoSharp } from "react-icons/io5"
import { jsx } from "theme-ui"
import { Link, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import { GatsbyImage } from "gatsby-plugin-image"
import { getSrc } from "gatsby-plugin-image"
// import { RiArrowRightDownFill } from "react-icons/ri"
import CommentBox from "../components/commentbox"

import useSiteMetadata from "../hooks/SiteMetadata"
// import Countdown from 'react-countdown'


import { ImCross } from "react-icons/im"

import { RiCloseCircleFill, RiMenuUnfoldFill, RiArrowUpFill } from "react-icons/ri"

// import { IoArrowRedoSharp, IoArrowUndoSharp } from "react-icons/io5"
import { AiOutlineAudioMuted } from "react-icons/ai"


import Footer from "../components/footer"
// import { SRLWrapper } from "simple-react-lightbox"
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ReactPlayer from 'react-player/lazy'
import { AnchorLink } from "gatsby-plugin-anchor-links"
// import YouTubed from "../components/youtube"
import Seo from "../components/seo"
import Layout from "../components/siteLayout"
import ShareSocial from '../components/share' 
import GoBack from "../components/goBack"
import { ImPlay } from "react-icons/im"
// import TimeAgo from 'react-timeago'
import styled from "styled-components"
const CustomBox = styled.div`







`



const Pagination = props => (
  <div className="pagination -post1" style={{position:'', bottom:'',}}>
    <ul className="" style={{display:'flex', gap:'2vw', justifyContent:'space-around', paddingTop:'5px', alignItems:'center'}}>
      

    {props.next && props.next.frontmatter.template === "blog-post" && (
        <li style={{display:'flex', justifyContent:'space-between', width:'50%'}}>
<Link to={props.next.frontmatter.slug + "/"} rel="next">
<button className="" style={{display:'flex', justifyContent:'', }}>
<span className="page-title">
  {props.next.frontmatter.title}
{/* Newer */}
</span>
{/* &nbsp;&nbsp;<AiFillCaretLeft /> */}
</button>
</Link>
        </li>
      )}

      <div className="specialfont" style={{fontSize:'clamp(1.5rem, 2vw, 2.8rem)', marginTop:'-5px', width:'10vw', fontWeight:'bold', border:'0px solid', display:'grid', color:'#999', placeContent:'center'}}>GO TO</div>

      
{props.previous && props.previous.frontmatter.template === "blog-post" && (
        // <li style={{border:'1px solid', borderRadius:'12px', filter:'drop-shadow(0 0px 6px rgba(0, 0, 0, 1))'}}>
        <li style={{display:'flex', justifyContent:'space-between', width:'50%'}}>
<Link style={{}}  to= {props.previous.frontmatter.slug + "/"} rel="prev">
 <button className="" style={{display:'flex', justifyContent:'',}}>
 {/* <AiFillCaretRight />&nbsp;&nbsp; */}
  <span className="page-title">
{props.previous.frontmatter.title}
{/* Previous */}
</span>
</button>
          </Link>
        </li>
      )}



    </ul>

    
  </div>



  

  
    
  
  
  
  
  
    



)






const Post = ({ data, pageContext }) => {



  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, excerpt } = markdownRemark

  const post = data.markdownRemark
  const tags = post.frontmatter.tags
  const categories = post.frontmatter.categories

  const FrontImage = frontmatter.featuredImage
    ? frontmatter.featuredImage.childImageSharp.gatsbyImageData
    : ""
  
    const UnderlayImage = frontmatter.underlayImage
    ? frontmatter.underlayImage.childImageSharp.gatsbyImageData
    : ""

    





  //   const scrollable = frontmatter.scrollable

    // const NftDrop = frontmatter.nftdrop



  const [isMobile, setIsMobile] = useState(false);

const resizeMobile = () => {
  setIsMobile(true);
  const elements = document.querySelectorAll('.menusnapp');
  elements.forEach(el => el.style.display = 'none', el => el.style.overflow = 'hidden', el => el.style.transition = 'transform 1550ms ease-in-out');
}

const resizeDesk = () => {
  setIsMobile(false);
  const elements = document.querySelectorAll('.menusnapp');
  elements.forEach(el => el.style.display = 'flex', el => el.style.transition = 'transform 1550ms ease-in-out');
}

  const Svg = frontmatter.svgImage
  // const svgZindex = frontmatter.svgzindex

// function AddSvg(){
  
//   return (
//     <object className="" id="svg1" data={svgUrl} type="image/svg+xml" style={{position:'', top:'', left:'0', right:'0', bottom:'0', overflow:'', border:'0px solid red', zIndex:'', width:'100vw', height:'', background:'transparent', objectFit:'contain'   }} alt="animated content" title="animated content" ></object>
//   )
// }


// const IsNft = frontmatter.isnftforsale
const ShowOriginal = frontmatter.youtube.youtubeshoworiginal
const ShareThis = frontmatter.shareable
const Comments = frontmatter.comments

const YouTubeStart = frontmatter.youtube.youtubestart
const YouTubeEnd = frontmatter.youtube.youtubeend
const YouTubeMute = frontmatter.youtube.youtubemute
const YouTubeControls = frontmatter.youtube.youtubecontrols
const YouTubeAutostart = frontmatter.youtube.youtubeautostart
const CustomControls = frontmatter.youtube.customcontrols
const Suggestion1 = frontmatter.youtube.youtubersuggestion1
const Suggestion2 = frontmatter.youtube.youtubersuggestion2
const Suggestion3 = frontmatter.youtube.youtubersuggestion3

const YoutubeLoop = frontmatter.youtube.youtubeloop

const ClickToPlay = frontmatter.youtube.clicktoplay





// const CustomControlBinary = frontmatter.customcontrols
// const iframeUrl = frontmatter.youtube.youtuber




let iframeFiltered;
if (Suggestion1) {
  iframeFiltered = [
    frontmatter.youtube.youtuber,
    frontmatter.youtube.youtubersuggestion1,
    frontmatter.youtube.youtubersuggestion2,
    frontmatter.youtube.youtubersuggestion3,
  ];
} else {
  iframeFiltered = frontmatter.youtube.youtuber;
}




const ContentinVideo = frontmatter.contentinvideo
const LiarLiar = frontmatter.liarliar

if (Suggestion1) {
  <ShowSuggestion />
}
else{

  
}

function ShowSuggestion() {

  return (
<div style={{}}>
  

  
<div style={{width:'100%', maxWidth:'400px', margin:'0 auto 0 auto', fontSize:'90%', padding:'5px 0 ', border:'4px dotted', borderRadius:'12px', textAlign:'center', position:'relative', zIndex:'1', display:'grid', justifyContent:'center'}}>
<IoArrowRedoSharp style={{position:'absolute', top:'0', left:'0', fontSize:'60px', transform: 'rotate(-45deg)', }} />
<IoArrowUndoSharp style={{position:'absolute', top:'0', right:'0', fontSize:'60px', transform: 'rotate(45deg)', }} />
  
  
  <span style={{fontSize:'120%', fontWeight:'bold', textTransform:'uppercase'}}>This is interactive!</span> 
<br />

We recommend these alternatives:
<br /><br />
Click to Copy:<br />
<CopyToClipboard text={Suggestion1}>
  <button>{Suggestion1} </button>
</CopyToClipboard><br />


  <CopyToClipboard text={Suggestion2}>
  <button>{Suggestion2} </button>
</CopyToClipboard><br />

<CopyToClipboard text={Suggestion3}>
  <button>{Suggestion3} </button>
</CopyToClipboard><br />

<br />
Add your own in the comments below!

</div>

<span style={{fontSize:'150%'}}></span>
<div className="mobilespace" style={{ border:'0px solid red'}}></div>
</div>
  )
}

const YoutuberSuggestion1 = frontmatter.youtube.youtubersuggestion1
// const YoutuberSuggestion2 = frontmatter.youtube.youtubersuggestion2
// const YoutuberSuggestion3 = frontmatter.youtube.youtubersuggestion3

  // const YouTube = frontmatter.youtube.youtuber

const OriginalUrl = frontmatter.youtube.youtuber 

  if (!YoutuberSuggestion1) {
    <IframeSuggestions />
  }
  else{
  
    
  }




 



  function IframeSuggestions() {
    
    return (
      <div>

<ReactPlayer
            
            allow="web-share"
            ref={playerRef}
            style={{position:'absolute', top:'0', zIndex:''}}
            width="100%"
            height="1000px"
            className='react repo'
            playing={playing}
            controls={controls}
            light={light}
            loop={loop}
            muted={muted}
            playsinline
            config={{
              file: {
                attributes: {
                  crossorigin: "anonymous",
                },
              },
              youtube: {
                playerVars: { showinfo:0, autoplay:YouTubeAutostart, controls:YouTubeControls, start:YouTubeStart, end:YouTubeEnd, mute:YouTubeMute, loop:YoutubeLoop }
              },
            }}
          
          />


              

              
</div>

    )

  }



  function Iframer3() {
    const iframeUrl3 = "https://www.youtube.com/embed/" + frontmatter.youtube.youtuber2
    return (


<ReactPlayer
          allow="web-share"
          className='audioframe'
          url={iframeUrl3}
          width="100%"
          height="250px"
          style={{margin:'0 auto', position:'relative', left:'', right:'', zIndex:'3', maxWidth:'80vw', display:'flex', justifyContent:'center', border:'0px solid blue'}}
          config={{
            
            youtube: {
              playerVars: { showinfo:0, autoplay:1, controls:0, start:AudioStart, end:AudioEnd, mute:0,  }
            },
            
          }}
          loop
          playing
          playsinline
          playIcon={
            <button aria-label="Click To Play" className="clickplays" style={{position:'relative', zIndex:'', top:'', border:'0px  solid red', width:'100vw', height:'0', background:'transparent', color:'', fontSize:'18px', textAlign:'center', display:'flex', flexDirection:'column', verticalAlign:'center', justifyContent:'center', alignItems:'center', paddingTop:'0', borderRadius:'12px'}}>
          
        <div className="" style={{position:'absolute', top:'-300px', right:'', zIndex:'3', textAlign:'center', animation:'fadeIn 3s', display:'flex', justifyContent:'center', width:'auto', marginBottom:''}}>
          
      
          {/* <div className="" style={{fontSize:'14px', fontWeight:'', padding:'0 0 0 .3rem',}}>Click For Audio</div> */}

          <div className="popped" style={{display:'flex', width:'', margin:'0 auto', fontWeight:'bold', padding:'.3rem', color:'#ccc', fontSize:'2rem', background:'rgba(51, 51, 51, 0.3)', borderRadius:'8px', border:'0px solid #666', filter:'drop-shadow(2px 2px 2px #000)', cursor:'pointer'}}>
            
 

            <AiOutlineAudioMuted style={{margin:'0 1vw', fontSize:'20px', filter:'drop-shadow(2px 2px 2px #000)'}} />
            
            {LiarLiar ? (
  <ImCross style={{margin:'0 1vw', fontSize:'20px', color:'#ff0000', filter:'drop-shadow(2px 2px 2px #000)'}} />
          ) : (
            ""
          )}
            
            <div style={{fontSize:'14px', fontWeight:'', padding:'0 0 0 .3rem', filter:'drop-shadow(2px 2px 2px #000)', color:'#ccc', }}>{frontmatter.audiotitle}</div>
          </div>
          
      </div>
          </button>}
   
            light="../assets/transparent.png"
          />
     




    )
  }



  function AddSvg(){
    const svgUrl = frontmatter.svgImage.publicURL
    return (
      <object className="animator" id="" data={svgUrl} type="image/svg+xml" style={{position:'absolute', top:'0', left:'0', right:'0', bottom:'0', overflow:'', border:'0px solid red', zIndex:'', aspectRatio:'', width:'100vw', background:'transparent', objectFit:'cover'   }} alt="animated content" title="animated content" ></object>
    )
  }


      //  const svgUrl = frontmatter.svgImage.publicURL
// const svgUrl = "../assets/" + frontmatter.svgImage.publicURL + ""
// const svgUrl = "../assets/" + frontmatter.svgImage.relativePath + ""

const YouTube = frontmatter.youtube.youtuber
  const YouTube2 = frontmatter.youtube.youtuber2
  const AudioStart = frontmatter.audiostart
  const AudioEnd = frontmatter.audioend
  

  const { previous, next } = pageContext

  let props = {
    previous,
    next,
  }

  


  const { siteUrl } = useSiteMetadata()
  // const { companyname } = useSiteMetadata()
  // const { iconimage } = useSiteMetadata()


  const { showNav } = useSiteMetadata()



  // const [showControls, setShowControls] = useState(false);
  // const [count, setCount] = useState(0);
  // const [anchorEl, setAnchorEl] = React.useState(null);

    // const Playing  = useState(true);

  const [state, setState] = useState({
    playing: YouTubeAutostart,
    controls: YouTubeControls,
    light: ClickToPlay,
    muted: YouTubeMute,
    loop: YoutubeLoop,
  });

  const playerRef = useRef(null);
  const controlsRef = useRef(null);

  const {
    playing,
    controls,
    light,
    muted,
    loop,
    played,
  } = state;

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };

  const handleMute = () => {
    setState({ ...state, muted: !state.muted });
  };






  const Controls = forwardRef(
    (
      {
        // onSeek,
        // onSeekMouseDown,
        // onSeekMouseUp,
        // onDuration,
        // onRewind,
        onPlayPause,
        // onFastForward,
        playing,
        // played,
        // elapsedTime,
        // totalDuration,
        onMute,
        muted,
        // onVolumeSeekDown,
        // onChangeDispayFormat,
        // playbackRate,
        // onPlaybackRateChange,
        // onToggleFullScreen,
        volume,
        // onVolumeChange,
        // onBookmark,
      },
      ref
    ) => {
      // const classes = useStyles();
      // const [anchorEl, setAnchorEl] = React.useState(null);
      // const handleClick = (event) => {
      //   setAnchorEl(event.currentTarget);
      // };
  
      // const handleClose = () => {
      //   setAnchorEl(null);
      // };
  
      // const open = Boolean(anchorEl);
      // const id = open ? "simple-popover" : undefined;
  
      // const { iconimage } = useSiteMetadata()
  
  
      return (
  
  <div>
  
  
  
        {playing ? (
""
        ) : (

  
  

   


<div className="videohide1 554 pane1" style={{position:'absolute', height:'', aspectRatio:'16/9', width:'100vw', zIndex:'3', top:'0', right:'0', textAlign:'center', display:'grid', placeContent:'', justifyContent:'', color:'var(--theme-ui-colors-text)', fontFamily:'Verdana, Sans-Serif, System' }}>




<button aria-label="Click To Play" className="clickplays videohide 555" style={{position:'relative', zIndex:'', top:'70px', border:'0px  solid red', width:'100vw', height:'100%', minHeight:'300px', aspectRatio:'16/9', maxHeight:'', background:'rgba(0, 0, 0, .99)', color:'', fontSize:'', textAlign:'center', display:'', flexDirection:'column', verticalAlign:'center', justifyContent:'center', alignItems:'center',   padding:'2vh 0 0 0'}}>






          {/* // <div style={{position:'absolute', background:'#111', height:'100vh', width:'100vw', zIndex:'3', top:'0', right:'0', textAlign:'center', display:'grid', placeContent:'start', justifyContent:'center', color:'#fff', fontFamily:'Verdana, Sans-Serif, System' }}> */}

          {/* <img className="homepage-bg" src={iconimage} width="250px" height="150px" alt="UrbanFetish" style={{ width:'', margin:'120px auto 0 auto', filter:'drop-shadow(2px 2px 2px #000)', background:'transparent !important', position:'relative', top:''}} /> */}


          <div className="flex-items" style={{fontSize:'clamp(.6rem, 1.4vw, 2rem)', fontWeight:'bold', margin:'0 auto 0 auto', textTransform:'uppercase',}}>The following is rated: <strong>{frontmatter.marate}</strong></div>

<ul className="flex-container" style={{display:'flex', flexDirection:'row', gap:'1vh', justifyContent:'center', alignItems:'center',  textAlign:'left', margin:'0 auto', color:'#ddd', background:'rgba(0, 0, 0, .8)', width:'auto', maxWidth:'800px', height:'', border:'1px solid #222', borderRadius:'12px', padding:'2vh 5vw' }}>


{frontmatter.marate ? (
            <li className="flex-items" style={{display:'grid', placeContent:'center', width:'', height:'', aspectRatio:'1/1', padding:'0 20px', border:'6.5px solid #fff', margin:'0 auto 0 auto 0', fontSize:'clamp(4rem, 15vw, 5rem)', fontFamily:'Verdana, Sans-Serif, System', fontWeight:'800'}}>{frontmatter.marate}</li>
            ) : (
              <li className="flex-items" style={{display:'grid', placeContent:'center', width:'', height:'', aspectRatio:'1/1', padding:'0 20px', border:'6.5px solid #fff', margin:'0 auto 0 auto 0', fontSize:'clamp(4rem, 15vw, 5rem)', fontFamily:'Verdana, Sans-Serif, System', fontWeight:'800'}}>PG</li>
            )}





<li style={{display:'flex', flexDirection:'column', position:'relative', left:'', top:'', gap:'.8vh', justifyContent:'space-around', alignContent:'', alignItems:'start', border:'0px solid red', fontSize:'clamp(.5rem, 1.2vw, 2rem)'}}>


{frontmatter.maratingtx1 ? (
            <li className="flex-items" style={{display:'flex', justifyContent:'center', alignItems:'center', alignContent:'end'}}><strong style={{ }}>
            {frontmatter.marating1}</strong> {frontmatter.maratingtx1}</li>
            ) : (
              ""
            )}


{frontmatter.maratingtx2 ? (
            <li className="flex-items" style={{display:'flex', justifyContent:'center', alignItems:'center', alignContent:'end'}}><strong style={{ }}>
{frontmatter.marating2}</strong> {frontmatter.maratingtx2} </li>
            ) : (
              ""
            )}


{frontmatter.maratingtx3 ? (
         <li className="flex-items" style={{display:'flex', justifyContent:'center', alignItems:'center', alignContent:'end'}}><strong style={{ }}>
{frontmatter.marating3}</strong> {frontmatter.maratingtx3} </li>   
            ) : (
              ""
            )} 


{frontmatter.maratingtx4 ? (
       <li className="flex-items" style={{display:'flex', justifyContent:'center', alignItems:'center', alignContent:'end'}}><strong style={{ }}>
{frontmatter.marating4}</strong> {frontmatter.maratingtx4} </li>           
            ) : (
              ""
            )} 



</li>

</ul>
<div className="flex-items" style={{position:'relative', right:'', top:'', display:'', fontSize:'clamp(.6rem, 1.4vw, 2rem)', fontWeight:'bold', textTransform:'uppercase', textAlign:'center'}}>{frontmatter.viewerwarning}</div>


         <div style={{display:'grid', placeContent:'center', position:'relative', zindex:'1', fontWeight:'bold', padding:'1vh 0', fontSize:'clamp(.6rem, 1.4vw, 2rem)', width:'100%', maxWidth:'25vw', height:'', border:'0px solid', borderRadius:'12px', background:'linear-gradient(180deg, rgba(24, 23, 30, 0.2) 1%, rgba(0, 0, 0, .7) 99%)', margin:'0 auto 0 auto', opacity:'.99', textShadow:'2px 2px 2px black', color:'#fff' }}>
<ImPlay style={{margin:'0 auto', width:'50%', fontSize:'clamp(2rem, 4.4vw, 3rem)', filter:'drop-shadow(0px 0px 12px #fff',}} />
Click to play
</div>




      

<div className="bumper" style={{fontSize:'clamp(1rem, 2vw, 2.5rem)', margin:'5vh 0 0 0', padding:'0 10px', maxWidth:'1000px'}}>
{frontmatter.bumpertext ? (
<h3>{frontmatter.bumpertext}</h3>
    ) : (
<h3>{frontmatter.title}</h3>
)}
</div>

<button aria-label="Video Play/Pause Button"
        onClick={onPlayPause}
        className="videohide 644 pane2" 
        style={{
         color:'#ddd',
         width:'100vw', 
         height:'',
         display:'grid',
         placeContent:'center',
         position:'absolute',
         aspectRatio:'16/9',
         top:'',left:'0',right:'0',bottom:'0',
         border:'0px solid blue',
         zindex:'1'
        }}
      ></button>
      
      
      </button>
      </div>




 )}
 {/* end playing check */}
  
 
  
  
        
  
  
  <div ref={ref} className="controlsbox" style={{width:'', height:'', border:'1px solid red', }}>
  
<button
        aria-label="Video Play/Pause Button"
        onClick={onPlayPause}
        className="videohide 679 pane3" 
        style={{
         color:'#ddd',
         width:'100vw', 
         height:'auto',
         display:'block',
         placeContent:'',
         position:'absolute',
         aspectRatio:'16/9',
         top:'70px',
         left:'0',
         right:'0',
         border:'0px solid yellow',
         zindex:'1'
        }}
      ></button>


  <div className="vidcontrols">
                  <button
                    onClick={onPlayPause}
                    className="controls panel" 
                    style={{
                      backgroundColor:'rgba(0,0,0, 0.6)',
                      color:'#999',
                      borderRadius:'', overFlow:'hidden'
                  }}
                  >
                    {/* <MdPlayArrow style={{fontSize:'50px', position:'absolute'}}  /> */}
                    {playing ? (
                      
                      <MdPause className="hudicon" style={{}} />
                      
                    ) : (
                
                <MdPlayArrow className="hudicon" style={{}}  />
                
                    )}
                  </button>
  
                  <button
                    // onClick={() => setState({ ...state, muted: !state.muted })}
                    onClick={onMute}
                    className="controls panel"
                    style={{
                      backgroundColor:'rgba(0,0,0, 0.6)',
                      color:'#999',
                      borderRadius:'', overFlow:'hidden'
                  }}
                  >
                    {muted ? (
                      <MdVolumeOff className="hudicon" fontSize="" style={{}}  />
                    ) : volume > 0.5 ? (
                      <MdVolumeUp className="hudicon" fontSize="" style={{}}  />
                    ) : (
                      <MdVolumeUp className="hudicon" fontSize="" style={{}}  />
                    )}
                  </button>
                  </div>

        </div>
        </div>
      );
    }
  );
  
  Controls.propTypes = {
    onSeek: PropTypes.func,
    onSeekMouseDown: PropTypes.func,
    onSeekMouseUp: PropTypes.func,
    onDuration: PropTypes.func,
    onRewind: PropTypes.func,
    onPlayPause: PropTypes.func,
    onFastForward: PropTypes.func,
    onVolumeSeekDown: PropTypes.func,
    onChangeDispayFormat: PropTypes.func,
    onPlaybackRateChange: PropTypes.func,
    onToggleFullScreen: PropTypes.func,
    onMute: PropTypes.func,
    playing: PropTypes.bool,
    light: PropTypes.bool,
    played: PropTypes.number,
    elapsedTime: PropTypes.string,
    totalDuration: PropTypes.string,
    muted: PropTypes.bool,
    playbackRate: PropTypes.number,
  };
  




  // const Completionist = () => <div style={{}}>
  //  {FrontImage ? (
  //           <GatsbyImage
  //             image={FrontImage}
  //             alt={frontmatter.title + " - Featured image"}
  //             className="featured-image1 layer1"
  //             placeholder="blurred"
  //             loading="eager"
  //             // layout="constrained"
  //             style={{}}
  //           />

  //         ) : (
  //           <StaticImage className="featured-image1 layer1" src="../../static/assets/default-og-image.webp" alt="Default Image" style={{position:'relative', zIndex:'',}} />
  //         )}

  // </div>



  
  return (
    
    <Layout className="page">
<CustomBox style={{}}>

{frontmatter.scrollable ? (
  <Helmet>
  <body id="body" className="blogpost scroll" style={{}} />
</Helmet>
) : (
  <Helmet>
  <body id="body" className="blogpost" style={{}} />
</Helmet>
  )}



      <Seo
        title={frontmatter.title}
        description={
          frontmatter.description ? frontmatter.description : excerpt
        }
        
        image={ siteUrl + getSrc(frontmatter.featuredImage) }

        article={true}
      />







<div id="top"></div>

{showNav ? (
  <div className="spacer" style={{height:'70px', border:'0px solid yellow'}}></div>
      ) : (
        ""
      )}


<div id="gobacker" style={{position:'absolute', top:'12vh', right:'1vw', zIndex:'5'}}><GoBack /></div>


{/* <div className="pagemenu panel" style={{position:'fixed', bottom:'20px', zIndex:'4', left:'1vw', right:'', display:'flex', justifyContent:'center', width:'auto', maxWidth:'80vw', margin:'0 auto', gap:'5vw',	background:'rgba(0, 0, 0, .5)', padding:'', border:'1px solid #666', borderRadius:'', textShadow:'0 1px 1px rgba(0, 0, 0, .7)', fontSize:'clamp(2rem, 3vw, 3rem)', verticalAlign:'center' }}>

<div className="menusnapp" style={{display:'flex', gap:'10px', padding:'1vh 1vw', alignItems:'center'}}>
{frontmatter.scrollable ? (
  <AnchorLink to="#top" style={{cursor:'pointer', height:'2vh'}}><RiArrowUpFill style={{cursor:'pointer', color:'#999'}} /></AnchorLink>
) : (
""
  )}
{(previous || next) && <Pagination {...props} />}
</div>

{isMobile ? 

      <div style={{display:'flex', gap:'10px', padding:'1vh 1vw'}}>

{frontmatter.scrollable ? (
  <AnchorLink to="#top" aria-label="Return To TOP" style={{cursor:'pointer', marginTop:'2vh'}}><RiArrowUpFill style={{cursor:'pointer', color:'#999',}} /></AnchorLink>
) : (
""
  )}
        <button onClick={resizeDesk} aria-label="Expand/Collapse menu" style={{cursor:'pointer', padding:'0 0 0 0', color:'#999'}}><RiMenuUnfoldFill />
        </button>
        </div>

       :

      <div style={{display:'flex', gap:'2vw', padding:'1vh 1vw'}}>
        <button onClick={resizeMobile} aria-label="Expand/Collapse menu" style={{cursor:'pointer', padding:'0', color:'#999'}}><RiCloseCircleFill /> 
        </button>
        </div>
    }
</div> */}





{CustomControls ? (
         <Controls
         ref={controlsRef}
         onPlayPause={handlePlayPause}
         playing={playing}
         played={played}
         onMute={handleMute}
         muted={muted}
       />
       
          ) : (
   ""
          )}

        

{/* {frontmatter.scrollable ? (
<div style={{width:'100vw', height:'10vh', position:'fixed', zIndex:'2', top:'82vh', border:'0px solid yellow', textAlign:'center', animation:'poof 1.4s forwards', animationDelay:'4s'}}>
  <div style={{marginTop:'', background:'rgba(9, 9, 10, 0.866)', width:'20vw', padding:'1vh 2vw', margin:'0 auto', borderRadius:'10px', color:'#fff',}}>SCROLL DOWN</div>
</div>
) : (
""
  )} */}




<div className="wrap-element effects" style={{aspectRatio:'16/9', minHeight:'', maxHeight:'', overFlow:'', marginTop:''}}>


{/* <GatsbyImage
        image={FrontImage}
        alt={frontmatter.title + " - Featured image"}
        className="featured-image1 layer1"
        placeholder="blurred"
        loading="eager"
        // layout="constrained"
        style={{position:'absolute', top:'0', zIndex:'0', width:'100vw', minHeight:'300px'}}
      /> */}



{YouTube ? (

<div>
{FrontImage ? (


<GatsbyImage
image={FrontImage}
alt={frontmatter.title + " - Featured image"}
className="featured-image1 layer1"
placeholder="blurred"
loading="eager"
// layout="constrained"
style={{display:'none', position:'absolute', top:'0', zIndex:'0', width:'100vw', maxHeight:'300px'}}
/>

    ) : (
      ""
    )}

</div>
    ) : (

<div className="imageonly" style={{ display:'flex', justifyContent:'center', maxHeight:'',}}>
{/* <InnerImageZoom src={getSrc(FrontImage)}  className="featured-imager"
        placeholder="blurred"
        loading="eager" layout="constrained" /> */}

<InnerImageZoom
            src={getSrc(FrontImage)}
            // zoomSrc={getSrc(FrontImage)}
            // fullscreenOnMobile={true}
            // moveType="drag"
            // zoomScale={0.9}
            // zoomPreload={true}

            // height={300}
          />
    
{/* <Zoom>
{FrontImage ? (


      <GatsbyImage
        image={FrontImage}
        alt={frontmatter.title + " - Featured image"}
        className="featured-image1 layer1"
        placeholder="blurred"
        loading="eager"
        // layout="constrained"
        style={{position:'relative', top:'0', zIndex:'0', minHeight:'300px'}}

      />

    ) : (
      ""
    )}
    </Zoom> */}
</div>

    )}






{/* { NftDrop ? (
  
<div style={{ width:'100vw', height:'',  top:'0', zIndex:'-2', border:'0px solid red', paddingBottom:'', margin:'0 auto', display:'flex', flexDirection:'column', justifyContent:'center'}}>

<div className="countdown" style={{display:'flex', alignSelf:'center', fontSize:'540%', textAlign:'center', filter: 'drop-shadow(10px 0px 10px #000)', textShadow:'1px 1px 0px #000', border:'0px solid', width:'100%', height:'', padding:'0 0', borderRadius:'12px', flexDirection:'column' }}>
<Countdown date={NftDrop} >
<Completionist />
</Countdown>
</div> */}




{YouTube ? (
  <div>


{/* PURPLE */}
            <ReactPlayer
              allow="web-share"
              ref={playerRef}
              style={{position:'asbolute', zIndex:''}}
              width="100%"
              height="100%"
                // url={[iframeUrl, Suggestion1, Suggestion2, Suggestion3]}
              url={iframeFiltered}
              playing={playing}
              controls={controls}
              light={light}
              loop={loop}
              muted={muted}
              playsinline
              config={{
                file: {
                  attributes: {
                    sameSite: "none",
                    crossorigin: "anonymous",
                  },
                },
                  youtube: {
                    playerVars: { showinfo:0, autoplay:YouTubeAutostart, controls:YouTubeControls, start:YouTubeStart, end:YouTubeEnd, mute:YouTubeMute, loop:YoutubeLoop }
                  }
              }}
              playIcon={
                <div style={{position:'absolute',
                // backgroundColor:'var(--theme-ui-colors-bodyBg)',
                backgroundColor:'rgba(0,0,0,0.6)',
                 width:'100vw', height:'100%', minHeight:'40vh', maxHeight:'85vh', zIndex:'0', top:'0', right:'0', textAlign:'center', display:'grid', placeContent:'center', justifyContent:'center', 
                color:'#ddd',
                fontFamily:'Verdana, Sans-Serif, System' }}>



<button aria-label="Click To Play" className="clickplays videohide 1042" style={{position:'relative', zIndex:'', top:'50px', border:'1px  solid red', width:'100vw', background:'transparent', color:'', fontSize:'18px', textAlign:'center', display:'', flexDirection:'column', verticalAlign:'center', justifyContent:'center', alignItems:'center', aspectRatio:'16/9'}}>
                {/* // <div style={{position:'absolute', background:'#111', height:'100vh', width:'100vw', zIndex:'3', top:'0', right:'0', textAlign:'center', display:'grid', placeContent:'start', justifyContent:'center', color:'#fff', fontFamily:'Verdana, Sans-Serif, System' }}> */}
   
                {/* <img className="homepage-bg" src={iconimage} width="250px" height="150px" alt="UrbanFetish" style={{ width:'', margin:'120px auto 0 auto', filter:'drop-shadow(2px 2px 2px #000)', background:'transparent !important', position:'relative', top:''}} /> */}


                <div className="flex-items" style={{fontSize:'clamp(.6rem, 1.4vw, 2rem)', fontWeight:'bold', margin:'0 auto 0 auto', textTransform:'uppercase',}}>The following is rated: <strong>{frontmatter.marate}</strong></div>

<ul className="flex-container" style={{display:'flex', flexDirection:'row', gap:'1vh', justifyContent:'center', alignItems:'center',  textAlign:'left', margin:'0 auto', color:'#ddd', background:'rgba(0, 0, 0, .8)', width:'auto', maxWidth:'800px', height:'', border:'1px solid #222', borderRadius:'12px', padding:'2vh 5vw' }}>


{frontmatter.marate ? (
            <li className="flex-items" style={{display:'grid', placeContent:'center', width:'', height:'', aspectRatio:'1/1', padding:'0 20px', border:'6.5px solid #fff', margin:'0 auto 0 auto 0', fontSize:'clamp(4rem, 15vw, 5rem)', fontFamily:'Verdana, Sans-Serif, System', fontWeight:'800'}}>{frontmatter.marate}</li>
            ) : (
              <li className="flex-items" style={{display:'grid', placeContent:'center', width:'', height:'', aspectRatio:'1/1', padding:'0 20px', border:'6.5px solid #fff', margin:'0 auto 0 auto 0', fontSize:'clamp(4rem, 15vw, 5rem)', fontFamily:'Verdana, Sans-Serif, System', fontWeight:'800'}}>PG</li>
            )}





<li style={{display:'flex', flexDirection:'column', position:'relative', left:'', top:'', gap:'.8vh', justifyContent:'space-around', alignContent:'', alignItems:'start', border:'0px solid red', fontSize:'clamp(.5rem, 1.2vw, 2rem)'}}>


{frontmatter.maratingtx1 ? (
            <li className="flex-items" style={{display:'flex', justifyContent:'center', alignItems:'center', alignContent:'end'}}><strong style={{ }}>
            {frontmatter.marating1}</strong> {frontmatter.maratingtx1}</li>
            ) : (
              ""
            )}


{frontmatter.maratingtx2 ? (
            <li className="flex-items" style={{display:'flex', justifyContent:'center', alignItems:'center', alignContent:'end'}}><strong style={{ }}>
{frontmatter.marating2}</strong> {frontmatter.maratingtx2} </li>
            ) : (
              ""
            )}


{frontmatter.maratingtx3 ? (
         <li className="flex-items" style={{display:'flex', justifyContent:'center', alignItems:'center', alignContent:'end'}}><strong style={{ }}>
{frontmatter.marating3}</strong> {frontmatter.maratingtx3} </li>   
            ) : (
              ""
            )} 


{frontmatter.maratingtx4 ? (
       <li className="flex-items" style={{display:'flex', justifyContent:'center', alignItems:'center', alignContent:'end'}}><strong style={{ }}>
{frontmatter.marating4}</strong> {frontmatter.maratingtx4} </li>           
            ) : (
              ""
            )} 



</li>

</ul>
<div className="flex-items" style={{position:'relative', right:'', top:'', display:'', fontSize:'clamp(.6rem, 1.4vw, 2rem)', fontWeight:'bold', textTransform:'uppercase', textAlign:'center'}}>{frontmatter.viewerwarning}</div>


<div style={{display:'grid', placeContent:'center', position:'relative', zindex:'1', fontWeight:'bold', padding:'1vh 0', fontSize:'clamp(.6rem, 1.4vw, 2rem)', width:'100%', maxWidth:'25vw', height:'', border:'0px solid', borderRadius:'12px', background:'linear-gradient(180deg, rgba(24, 23, 30, 0.2) 1%, rgba(0, 0, 0, .7) 99%)', margin:'0 auto 0 auto', opacity:'.99', textShadow:'2px 2px 2px black', color:'#fff' }}>
<ImPlay style={{margin:'0 auto', width:'50%', fontSize:'clamp(2rem, 4.4vw, 3rem)', filter:'drop-shadow(0px 0px 12px #fff',}} />
Click to play
</div>






<div style={{fontSize:'clamp(1rem, 2vw, 2.5rem)', margin:'5vh 0 0 0', padding:'0 10px', maxWidth:'1000px'}}>
{frontmatter.bumpertext ? (
<h3>{frontmatter.bumpertext}</h3>
) : (
<h3>{frontmatter.title}</h3>
)}
</div>
</button>

<button
 aria-label="Video Play/Pause Button"
className="" 
style={{
color:'#ddd',
width:'100vw', 
height:'',
display:'grid',
placeContent:'center',
position:'fixed',
top:'0',left:'0',right:'0',bottom:'0',
zindex:'1'
}}
></button>

            </div>
            }
            
            />
      {/* <div className="youtubeblockertop" style={{position:'absolute', display:'block', height:'58px', width:'100%', zIndex:'0', top:'0', right:'0', textAlign:'center', padding:'12px',
            background:'#000',
            animation:'fadeout 4s forwards', animationDelay:'6s', border:'0px solid yellow'
          }}>UrbanFetish.com</div> */}
  </div>
  ) : (
    ""
  
)}
  
  
  
  {UnderlayImage ? (
              <GatsbyImage
                image={UnderlayImage}
                alt={frontmatter.title + " - image"}
                className="mcboaty1"
                style={{height:'', width:'100vw', maxWidth:'100vw', maxHeight:'100vh', overFlow:'', position:'absolute', left:'', right:'', bottom:'', top:'', zIndex:'0',
               objectFit:'cover', border:'0px solid red !important', background:'transparent', backgroundSize:'cover',}}
              />
              
            ) : (
              ""
            )}
  
            
  
  
  
{/*   
   {Suggestion1 ? (
              <div style={{position:'absolute', top:'0', left:'', bottom:'', zIndex:'', maxWidth:'100vw', height:''}}>
              <YouTubed />
              </div>
         
            ) : (
              ""
            )} */}
  
  
  
  
  
  
  {/*  SPECIAL CONTENT */}
  
  {ContentinVideo ? (
    <div id="contentvideo"
          className="blog-post-content effects" style={{ fontSize:'1.1rem', textAlign:'left', padding:'', margin:'0 auto', color:'inherit !important', border:'0px solid green', position:'absolute', bottom:'0', left:'0', top:'0', right:'0', zindex:'-1', maxHeight:'100vh', borderBottom:'0px solid', overFlow:'hidden' }}
          dangerouslySetInnerHTML={{ __html: html }}
          
        >
          
        </div>
   ) : (
    ""
  )}
  
  
          
  {Svg ? (
    <AddSvg />
       ) : (
         ""
         )}
  
  
  
  
  
          </div>


          

    


    



 {/* ****************Page Content BELOW**************** */}



     <div className="" style={{width:'100%', height:'', maxWidth:'1024px', margin:'0 auto 0 auto', }}>


     {/* {Suggestion1 ? (
            <ShowSuggestion style={{position:'relative', top:'', zIndex:'0',}} />
       
          ) : (
            ""
          )} */}




      

<article className="blog-post" style={{marginTop:'0',}}>
        {YouTube2 ? (
            <Iframer3 />
       
          ) : (
            ""
          )}
{/* ((((((((((body content)))))))))) */}


{frontmatter.scrollable ? (

<div>

{ShareThis ? (
<header style={{ height:'', display:'grid', placeContent:'center'}}>

  <div id="sharethis" style={{width:'auto', height:'', padding:'0', display:'grid', placeContent:'center', border:'0px solid'}}>
  <ShareSocial style={{}} />
  </div>

  <div className="article-header" style={{textAlign:'center', paddingTop:'1rem', height:'auto', color:'', borderRadius:'12px'}}>
    
            <h1 className="headline panel" style={{color:'#ddd', borderRadius:''}}>{frontmatter.title}</h1>
            {/* <time sx={{color: "muted"}}>{frontmatter.date}</time> */}
           {/* Posted: <TimeAgo date={frontmatter.date} style={{color:''}} /> */}
           
           {/* <Link to={`/category/${frontmatter.category}`}>Category:{frontmatter.category}</Link>

           <p>Tags: {frontmatter.tags.join(", ")}</p> */}
      {categories && categories.length > 0 && (
        <div>
          <h4>Categories:</h4>
          {categories.map((category) => (
            <Link to={`/categories/${category}`} key={category}>
              {category}
            </Link>
          ))}
        </div>
      )}
      {tags && tags.length > 0 && (
        <div style={{position:'relative', zindex:'2', margin:'1vh auto', width:'100%'}}>
          <h4>Tags:</h4>
          {tags.map((tag) => (
            <Link to={`/tag/${tag}`} key={tag}>
              {tag} &nbsp;
            </Link>
          ))}
        </div>
      )}
  </div>




</header>
            ) : (
              <header style={{ height:'', display:'grid', placeContent:'center'}}>
                <div className="article-header panel" style={{textAlign:'center', paddingTop:'1rem', height:'auto', color:'', borderRadius:'', marginTop:'10vh'}}>
            <h1 className="headline" style={{color:'#ddd', borderRadius:'12px'}}>{frontmatter.title}</h1>
            {/* <time sx={{color: "muted"}}>{frontmatter.date}</time> */}
           {/* Posted: <TimeAgo date={frontmatter.date} style={{color:''}} /> */}
          {frontmatter.category} {frontmatter.tags}</div>
                </header>
            )}


<br /><br /><br />

  <div className="panel" style={{padding:'0 0', borderTop:'0px solid', margin:'0 0', textAlign:'center', fontSize:'1.5rem', minWidth:'50%', width:'100%', maxWidth:'', border:'0px solid yellow', borderRadius:''}}>
      <div
        className="blog-post-content bodycontent" style={{ fontSize:'clamp(1.2rem, 2.8vw, 1.8rem)', textAlign:'center', width:'100%', maxWidth:'', padding:'2vh 6% 10vh 6%', margin:'0 auto', color:'inherit !important'}}
        dangerouslySetInnerHTML={{ __html: html }}
      />    
</div>
</div>


) : (

  <div>
  {ShareThis ? (
    <header style={{ height:'', display:'grid', placeContent:'center'}}>
    <div id="sharethis1" style={{width:'auto', height:'', padding:'0', display:'grid', placeContent:'center', border:'0px solid'}}>
    <ShareSocial style={{}} />
    </div>
    <div className="article-header panel" style={{textAlign:'center', paddingTop:'1rem', height:'auto', color:''}}>
            <h1 className="headline" style={{fontSize:''}}>{frontmatter.title}</h1>
            {/* <time sx={{color: "muted"}}>{frontmatter.date}</time> */}
           {/* Posted: <TimeAgo date={frontmatter.date} style={{color:''}} /> */}
          </div>
  </header>
              ) : (
                <header style={{ height:'', display:'grid', placeContent:'center'}}>
                <div className="article-header" style={{textAlign:'center', paddingTop:'1rem', height:'auto', color:''}}>
                <h1 className="headline" style={{fontSize:''}}>{frontmatter.title}</h1>
                {/* <time sx={{color: "muted"}}>{frontmatter.date}</time> */}
               {/* Posted: <TimeAgo date={frontmatter.date} style={{color:''}} /> */}
              </div>
              
      </header>
              )}
</div>
          )}

 </article>












{/* <AnchorLink className="" to="#sharethis" style={{position:'absolute', top:'0', zIndex:'60'}}>
                About Us 
              </AnchorLink> */}
{/* <div style={{position:'fixed', bottom:'20px', zIndex:'1',  left:'', right:'', display:'flex', justifyContent:'center', width:'', margin:'0 auto', gap:'20px',
textShadow:'2px 2px 0 #222', filter:'drop-shadow(0px 0px 5px rgba(155,155,155,1))', color:'#fff', padding:'5px 10px', borderRadius:'12px',

 }}>
  
      {(previous || next) && <Pagination {...props} />}
      </div> */}







          

{Comments ? (

<div id="comments" style={{height:'', paddingBottom:'0',   display:'grid', placeContent:'center', maxWidth:'100vw', padding:'0', margin:'10vh auto'}}>
<CommentBox />



</div>
          ) : (


""

          )}
         


     
  




 {ShowOriginal ? (
      <div id="original" style={{height:'', margin:'10vh auto', paddingTop:'5vh',   display:'grid', placeContent:'center', border:'0px solid blue'}}>

{YouTube ? (
          <div  className="panel" style={{position:'relative', width:'100%', maxWidth:'800px', margin:'0 auto', textAlign:'center', display:'flex', flexDirection:'column', fontSize:'100%', borderRadius:'' }}>
<div style={{maxWidth:'90vw', width:'100%', height:'', maxHeight:'', padding:'0', position:'relative', bottom:'0', textAlign:'center', border:'0px solid blue', margin:'0 auto', borderRadius:'12px'}}>

                    {/* <Iframer2 /> */}
<a href={OriginalUrl} rel="noopener noreferrer" style={{textDecoration:'none', color:'inherit'}}>
 <div style={{display:'grid', placeContent:'center', fontWeight:'bold', padding:'1rem', fontSize:'2rem', width:'100%', height:'', border:'0px solid', borderRadius:'12px'}}>Support Our Video Sponsors

<ImPlay style={{margin:'0 auto', width:'50%', fontSize:'60px'}} />
Click to play original video
</div>
</a>                   
       </div>
 
       </div>
           ) : (
            ""
          )}
<br />
</div>
    ) : (
            ""
          )}


<div className="panel legal" style={{textAlign: 'center', padding:'1rem',  justifyContent: 'center', fontSize: '.95rem', textDecoration:'none', maxWidth:'90vw'}}>
            Legal:<br />
            <Link to="/disclaimer/">Disclaimer</Link>  |  <Link to="/privacy/">Privacy Policy</Link>  |  <Link to="/terms/">Terms of Service</Link>
      <br /> <br />
    <div style={{display:'grid', placeContent:'center'}}>
      <p style={{textAlign:'left'}}>
        <strong>*This is a parody website meant for education and entertainment purposes.</strong> <br /><br />
        All characters, and events portrayed in this production are fictitious or are being portrayed in a satirical manner.<br /><br />There is no identification with actual persons (living or deceased), <br />places, buildings, and/or products. There is no harm/insult intended and/or none should be inferred. 
        <br /><br /> No Celebrities or Politicians were harmed.

        <br /><br />
        Video footage public youtube.com | Some imagery provided from <a rel="noopener noreferrer" href="https://www.flickr.com/photos/donkeyhotey/" >DonkeyHotey</a>, Wikipedia and other public sourced materials.
        </p>
    </div>
</div>









   






       























</div>









      

{/* {iframeFiltered} */}

<br/><br/><br/><br/><br/><br/>

   </CustomBox>

  
   <Footer />
  
    </Layout>




  )
}



export default Post





export const pageQuery = graphql`
  query BlogPostQueryBlogPostQuery($id: String!) {
    site {
      siteMetadata {
        title
        titleDefault
        siteUrl
        description
        image
        twitterUsername
        companyname
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 148)
      frontmatter {
        date(formatString: "YYYY-MM-DD-HH-MM-SS")
        slug
        title
        tags
        category
        description
        youtube {
          youtuber
          youtuber2
          youtubeshoworiginal
          youtubersuggestion1
          youtubersuggestion2
          youtubersuggestion3
          youtubestart
          youtubeend
          youtubemute
          youtubeloop
          youtubecontrols
          customcontrols
          clicktoplay
          youtubeautostart
        }
        audiostart
        audioend
        audiotitle
        liarliar
        contentinvideo
        comments
        shareable
        isnftforsale
        bumpertext
        viewerwarning
        marate
        marating1
        marating2
        marating3
        marating4
        maratingtx1
        maratingtx2
        maratingtx3
        maratingtx4
        nftdrop
        svgzindex
        scrollable
        featuredImage {
          relativePath
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        svgImage{
          publicURL
        }
        underlayImage {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`