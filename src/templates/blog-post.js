/** @jsx jsx */
// eslint-disable-next-line
import React, { useState, useRef, useEffect, forwardRef } from "react";

// import Zoom from 'react-medium-image-zoom'
// import 'react-medium-image-zoom/dist/styles.css'


import InnerImageZoom from 'react-inner-image-zoom'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css'

import { FaHome } from "react-icons/fa";

// import Controls from "../components/Controls";
// import { document } from "browser-monads"
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
// import CommentBox from "../components/commentbox"

import useSiteMetadata from "../hooks/SiteMetadata"
// import Countdown from 'react-countdown'


import { ImCross } from "react-icons/im"

import { RiMenuUnfoldFill, RiCloseCircleFill } from "react-icons/ri"

// import { IoArrowRedoSharp, IoArrowUndoSharp } from "react-icons/io5"
import { AiOutlineAudioMuted } from "react-icons/ai"



// import { SRLWrapper } from "simple-react-lightbox"
// import { CopyToClipboard } from 'react-copy-to-clipboard'
import ReactPlayer from 'react-player/lazy'
// import { AnchorLink } from "gatsby-plugin-anchor-links"
// import YouTubed from "../components/youtube"
import Seo from "../components/seo"
import Layout from "../components/siteLayout"
import ShareSocial from '../components/share-alt' 
// import GoBack from "../components/goBack"
import { ImPlay } from "react-icons/im"
import TimeAgo from 'react-timeago'











const Post = ({ data, pageContext }) => {

    const { language, proOptions, featureOptions } = useSiteMetadata();
    const { dicClickToView } = language;

    const { showModals, ShowDisclaimer   } = proOptions
    const { showDates, showTitles } = featureOptions

    


  const Pagination = props => (

  
    <div className="pagination -post1" style={{position:'', bottom:'',}}>
      <ul className="" style={{display:'flex', gap:'2vw', justifyContent:'space-around', paddingTop:'5px', alignItems:'center'}}>
        
  
      {props.next && props.next.frontmatter.template === "blog-post" && (
          <li style={{display:'flex', justifyContent:'space-between', width:'50%'}}>
  <Link  state={showModals ? { modal: true } : {}} to={props.next.frontmatter.slug + "/"}  rel="next">
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
  
        <div className="specialfont" style={{fontSize:'clamp(1rem, 1vw, 1rem)', marginTop:'', fontWeight:'bold', border:'0px solid', display:'grid', color:'#999', placeItems:'center', justifyContent:'center', margin:'0 auto'}}>
          <Link title="Go Home" state={showModals ? { modal: true } : {}} to="/" style={{padding:'', textAlign:'center', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'80px',}}>
          <div style={{}}>GO TO</div>
          <FaHome style={{fontSize:'25px'}} /></Link>
        </div>
  
        
  {props.previous && props.previous.frontmatter.template === "blog-post" && (
          // <li style={{border:'1px solid', borderRadius:'12px', filter:'drop-shadow(0 0px 6px rgba(0, 0, 0, 1))'}}>
          <li style={{display:'flex', justifyContent:'space-between', width:'50%'}}>
  <Link style={{}}  to= {props.previous.frontmatter.slug + "/"} state={showModals ? { modal: true } : {}}  rel="prev">
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

  const [isMenuOpen, setIsMenuOpen] = useState(true);
  /* eslint-disable-next-line no-unused-vars */
  const [isMobile, setIsMobile] = useState(false);
  

  const resizeMobile = () => {
    setIsMenuOpen(false);
    setIsMobile(true);
    const elements = document.querySelectorAll(".menusnapp");
    elements.forEach((el) => {
      el.style.display = "none";
      el.style.overflow = "hidden";
      el.style.transition = "transform 1550ms ease-in-out";
    });
  };

  const resizeDesk = () => {
    setIsMenuOpen(true);
    setIsMobile(false);
    const elements = document.querySelectorAll(".menusnapp");
    elements.forEach((el) => {
      el.style.display = "flex";
      el.style.transition = "transform 1550ms ease-in-out";
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedIsMenuOpen = window.localStorage.getItem("isMenuOpen");
      if (storedIsMenuOpen) {
        setIsMenuOpen(storedIsMenuOpen === "true");
      } else {
        setIsMenuOpen(true); // set default value to true if no value found in local storage
      }
    }
  }, []);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("isMenuOpen", isMenuOpen);
    }
  }, [isMenuOpen]);
  

  const MenuIcon = isMenuOpen ? RiCloseCircleFill : RiMenuUnfoldFill;

  // const { showModals } = useSiteMetadata()

  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, excerpt } = markdownRemark

  // const post = data.markdownRemark
  // const tags = post.frontmatter.tags
  // const categories = post.frontmatter.categories

  const FrontImage = frontmatter.featuredImage
    ? frontmatter.featuredImage.childImageSharp.gatsbyImageData
    : ""
  
    const UnderlayImage = frontmatter.underlayImage
    ? frontmatter.underlayImage.childImageSharp.gatsbyImageData
    : ""

    





  //   const scrollable = frontmatter.scrollable

    // const NftDrop = frontmatter.nftdrop





  const Svg = frontmatter.svgImage
  // const svgZindex = frontmatter.svgzindex

// function AddSvg(){
  
//   return (
//     <object className="" id="svg1" data={svgUrl} type="image/svg+xml" style={{position:'', top:'', left:'0', right:'0', bottom:'0', overflow:'', border:'0px solid red', zIndex:'', width:'100vw', height:'', background:'transparent', objectFit:'contain'   }} alt="animated content" title="animated content" ></object>
//   )
// }

const ShowOriginal = frontmatter.youtube ? frontmatter.youtube.youtubeshoworiginal : false;

// const IsNft = frontmatter.isnftforsale
// const ShowOriginal = frontmatter.youtube.youtubeshoworiginal
const ShareThis = frontmatter.shareable
// const Comments = frontmatter.comments

const YouTubeStart = frontmatter.youtube.youtubestart ? frontmatter.youtube.youtubestart : null;
const YouTubeEnd = frontmatter.youtube.youtubeend
const YouTubeMute = frontmatter.youtube.youtubemute
const YouTubeControls = frontmatter.youtube.youtubecontrols
const YouTubeAutostart = frontmatter.youtube.youtubeautostart
const CustomControls = frontmatter.youtube.customcontrols
const Suggestion1 = frontmatter.youtube.youtubersuggestion1
// const Suggestion2 = frontmatter.youtube.youtubersuggestion2
// const Suggestion3 = frontmatter.youtube.youtubersuggestion3

const YoutubeLoop = frontmatter.youtube.youtubeloop

const ClickToPlay = frontmatter.youtube.clicktoplay

const hasYoutubeFrontmatter = frontmatter.youtube.youtuber



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




const ContentinVideo = frontmatter.youtube.contentinvideo
const LiarLiar = frontmatter.youtube.liarliar

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
{/* <CopyToClipboard text={Suggestion1}>
  <button>{Suggestion1} </button>
</CopyToClipboard><br />


  <CopyToClipboard text={Suggestion2}>
  <button>{Suggestion2} </button>
</CopyToClipboard><br />

<CopyToClipboard text={Suggestion3}>
  <button>{Suggestion3} </button>
</CopyToClipboard><br /> */}

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
                  crossOrigin: "anonymous",
                },
              },
              youtube: {
                playerVars: { showinfo: false, autoplay:YouTubeAutostart, controls:YouTubeControls, start:YouTubeStart, end:YouTubeEnd, mute:YouTubeMute, loop:YoutubeLoop }
              },
            }}
          
          />


              

              
</div>

    )

  }



  function Iframer3() {
    if (!frontmatter.youtube.youtuber2) {
      return null; // or you can return a default component or placeholder
    }
    const iframeUrl3 = "https://www.youtube.com/embed/" + frontmatter.youtube.youtuber2
    return (

<ReactPlayer
          allow="web-share"
          className='audioframe'
          url={iframeUrl3}
          width="100%"
          height=""
          style={{position:'relatuve', top:'', left:'', right:'', zIndex:'3', maxWidth:'80vw', display:'flex', justifyContent:'center', border:'0px solid blue', margin:'10px auto 20px auto'}}
          config={{
            
            youtube: {
              playerVars: { showinfo:0, autoplay:1, controls:0, start:AudioStart, end:AudioEnd, mute:0,  }
            },
            
          }}
          loop
          playing
          playsinline
          playIcon={
            <button aria-label="Click To Play" className="clickplays" style={{position:'relative', zIndex:'3', top:'20px', border:'0px  solid red', width:'100vw', height:'0', background:'transparent', color:'', fontSize:'18px', textAlign:'center', display:'flex', flexDirection:'column', verticalAlign:'center', justifyContent:'center', alignItems:'center', paddingTop:'0', borderRadius:'12px'}}>
          
        <div className="audiopopper" style={{position:'absolute', top:'', right:'', zIndex:'5', textAlign:'center', animation:'fadeIn 3s', display:'flex', justifyContent:'center', width:'auto', marginBottom:''}}>
          
      
          {/* <div className="" style={{fontSize:'14px', fontWeight:'', padding:'0 0 0 .3rem',}}>Click For Audio</div> */}

          <div className="popped" style={{display:'flex', width:'', margin:'0 auto', fontWeight:'bold', padding:'.3rem', color:'#ccc', fontSize:'2rem', background:'rgba(51, 51, 51, 0.3)', borderRadius:'8px', border:'0px solid #666', filter:'drop-shadow(2px 2px 2px #000)', cursor:'pointer'}}>
            
 

            
            
            {LiarLiar ? (
  <ImCross style={{margin:'0 1vw', fontSize:'20px', color:'#ff0000', filter:'drop-shadow(2px 2px 2px #000)'}} />
          ) : (
            <AiOutlineAudioMuted style={{margin:'0 1vw', fontSize:'20px', filter:'drop-shadow(2px 2px 2px #000)'}} />
          )}
            
            <div style={{fontSize:'14px', fontWeight:'', padding:'0 0 0 .3rem', filter:'drop-shadow(2px 2px 2px #000)', color:'#ccc', }}>{frontmatter.youtube.audiotitle}</div>
          </div>
          
      </div>
          </button>}
   
            light="/assets/transparent.png"
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
  // const YouTube2 = frontmatter.youtube.youtuber2
  const AudioStart = frontmatter.youtube.audiostart
  const AudioEnd = frontmatter.youtube.audioend
  

  const { previous, next } = pageContext

  let props = {
    previous,
    next,
  }

  const { siteUrl } = useSiteMetadata()
  // const { companyname } = useSiteMetadata()
  // const { iconimage } = useSiteMetadata()


  // const { showNav } = useSiteMetadata()









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

  
  

   


<div className="videohide1 554 pane1" style={{position:'absolute', height:'auto', aspectRatio:'16/9', width:'100vw', zIndex:'3', top:'', right:'0', textAlign:'center', display:'grid', placeContent:'', justifyContent:'', color:'var(--theme-ui-colors-text)', fontFamily:'Verdana, Sans-Serif, System' }}>




<div aria-label="Click To Play" className="clickplays videohide 555" style={{position:'relative', zIndex:'', top:'0', border:'0px  solid red', width:'100vw', height:'', minHeight:'300px', aspectRatio:'16/9', maxHeight:'', fontSize:'', textAlign:'center', display:'grid', flexDirection:'column', verticalAlign:'center', justifyContent:'center', alignItems:'center', padding:'2vh 0 0 0', background:'#111', color:'#ddd', transition:'all 2s ease-in-out', cursor:'pointer'}}>



{frontmatter.mediawarnings.marate ? (
<>
<div className="flex-items" style={{fontSize:'clamp(.6rem, 1.4vw, 2rem)', fontWeight:'bold', margin:'0 auto 0 auto', textTransform:'uppercase',}}>The following is rated: <strong>{frontmatter.mediawarnings.marate}</strong></div>

<div className="flex-container" style={{display:'flex', flexDirection:'row', gap:'1vh', justifyContent:'center', alignItems:'center',  textAlign:'left', margin:'0 auto', color:'#ddd', background:'rgba(0, 0, 0, .8)', width:'auto', maxWidth:'800px', height:'', border:'1px solid #222', borderRadius:'12px', padding:'2vh 5vw' }}>


{frontmatter.mediawarnings.marate ? (
            <div className="flex-items" style={{display:'grid', placeContent:'center', width:'', height:'', aspectRatio:'1/1', padding:'0 20px', border:'6.5px solid #fff', margin:'0 auto 0 auto 0', fontSize:'clamp(4rem, 15vw, 5rem)', fontFamily:'Verdana, Sans-Serif, System', fontWeight:'800'}}>{frontmatter.mediawarnings.marate}</div>
            ) : (
              <div className="flex-items" style={{display:'grid', placeContent:'center', width:'', height:'', aspectRatio:'1/1', padding:'0 20px', border:'6.5px solid #fff', margin:'0 auto 0 auto 0', fontSize:'clamp(4rem, 15vw, 5rem)', fontFamily:'Verdana, Sans-Serif, System', fontWeight:'800'}}>PG</div>
            )}





<ul style={{display:'flex', flexDirection:'column', position:'relative', left:'', top:'', gap:'.8vh', justifyContent:'space-around', alignContent:'', alignItems:'start', border:'0px solid red', fontSize:'clamp(.5rem, 1.2vw, 2rem)'}}>


{frontmatter.mediawarnings.maratingtx1 ? (
            <li className="flex-items" style={{display:'flex', justifyContent:'center', alignItems:'center', alignContent:'end'}}><strong style={{ }}>
            {frontmatter.mediawarnings.marating1}</strong> {frontmatter.mediawarnings.maratingtx1}</li>
            ) : (
              ""
            )}


{frontmatter.mediawarnings.maratingtx2 ? (
            <li className="flex-items" style={{display:'flex', justifyContent:'center', alignItems:'center', alignContent:'end'}}><strong style={{ }}>
{frontmatter.mediawarnings.marating2}</strong> {frontmatter.mediawarnings.maratingtx2} </li>
            ) : (
              ""
            )}


{frontmatter.mediawarnings.maratingtx3 ? (
         <li className="flex-items" style={{display:'flex', justifyContent:'center', alignItems:'center', alignContent:'end'}}><strong style={{ }}>
{frontmatter.mediawarnings.marating3}</strong> {frontmatter.mediawarnings.maratingtx3} </li>   
            ) : (
              ""
            )} 


{frontmatter.mediawarnings.maratingtx4 ? (
       <li className="flex-items" style={{display:'flex', justifyContent:'center', alignItems:'center', alignContent:'end'}}><strong style={{ }}>
{frontmatter.mediawarnings.marating4}</strong> {frontmatter.mediawarnings.maratingtx4} </li>           
            ) : (
              ""
            )} 



</ul>

</div>

<div className="flex-items" style={{position:'relative', right:'', top:'', display:'', fontSize:'clamp(.6rem, 1.4vw, 2rem)', fontWeight:'bold', textTransform:'uppercase', textAlign:'center'}}>{frontmatter.mediawarnings.viewerwarning}</div>
</>
) : (
                
  ""
  
      )}




         <div style={{display:'grid', placeContent:'center', position:'relative', zindex:'1', fontWeight:'bold', padding:'3% 0 0 0', fontSize:'clamp(.6rem, 1.4vw, 2rem)', width:'100%', maxWidth:'25vw', height:'', border:'0px solid', borderRadius:'12px', margin:'0 auto 0 auto', opacity:'.99', textShadow:'2px 2px 2px black', color:'#fff' }}>
<ImPlay style={{margin:'0 auto', width:'50%', fontSize:'clamp(2rem, 4.4vw, 3rem)', filter:'drop-shadow(0px 0px 12px #fff',}} />
{dicClickToView}
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
      
      
      </div>
      </div>




 )}
 {/* end playing check */}
  
 
  
  
        
  
  
  <div ref={ref} className="controlsbox" style={{width:'', height:'', border:'0px solid red', }}>
  
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
         position:'relative',
         aspectRatio:'16/9',
         top:'0',
         left:'0',
         right:'0',
         border:'0px solid yellow',
         zindex:'1', 
         cursor:'pointer'
        //  animation: 'fadeout 4s forwards'
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
  








  
  return (
    
    <Layout className="page">


{frontmatter.scrollable ? (
  <Helmet>
  <body id="body" className="blogpost scroll" />
</Helmet>
) : (
  <Helmet>
  <body id="body" className="blogpost" />
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
















{frontmatter.showPageNav ? (
        <div
          className="pagemenu panel"
          style={{
            position: "fixed",
            bottom: "20px",
            zIndex: "5",
            left: "1vw",
            right: "",
            display: "flex",
            justifyContent: "center",
            width: "auto",
            maxWidth: "95vw",
            margin: "0 auto",
            gap: "5vw",
            background: "rgba(0, 0, 0, .5)",
            padding: "",
            border: "1px solid #666",
            borderRadius: "",
            textShadow: "0 1px 1px rgba(0, 0, 0, .7)",
            fontSize: "clamp(2rem, 3vw, 3rem)",
            verticalAlign: "center",
          }}
        >
          <div
            className="menusnapp"
            style={{
              gap: "10px",
              padding: "0 0 0 1vw",
              alignItems: "center",
              display: isMenuOpen ? "block" : "none",
            }}
          >
            {(previous || next) && <Pagination {...props} />}
          </div>
          <button
            onClick={isMenuOpen ? resizeMobile : resizeDesk}
            aria-label={isMenuOpen ? "Collapse menu" : "Expand menu"}
            style={{ cursor: "pointer", padding: "8px", color: "#999" }}
          >
            <MenuIcon />
          </button>
        </div>
      ) : (
        ""
      )}








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

        

{frontmatter.externalLink ? (

<iframe loading="lazy" id="" style={{width:'100%', minWidth:'', maxHeight:'', margin:'0 auto', }} title="iFrame" className="iframe boom" width="980" height="550" src={frontmatter.externalLink} frameBorder="0" allowFullScreen></iframe>


) : (

  ""

)}


<div className="wrap-element effects" style={hasYoutubeFrontmatter ? {aspectRatio:'16/9'} : {}}>










{YouTube ? (
  // Show YouTube video if available
  <div>
    {/* JSX to display YouTube video */}
  </div>
) : (
  // Show image if YouTube is not available
  <div>
    {/* Check if FrontImage is present */}
    {FrontImage ? (
      // Show zoom or regular Gatsby image based on showZoom flag
      frontmatter.showZoom ? (
        <div className="imageonly" style={{ display: "flex", justifyContent: "center", minHeight: "45vh" }}>
          <InnerImageZoom
          // className="featured-image1"
            src={getSrc(FrontImage)}
            loading="eager"
            alt={frontmatter.title + " - Featured image"}
            // zoomSrc={getSrc(FrontImage)}
            // fullscreenOnMobile={true}
            // moveType="drag"
            zoomScale={0.9}
            zoomPreload={true}
            style={{  maxHeight:'75vh', objectFit:'scale-down', margin:'0 auto'}}
            
            // height={300}
          />
        </div>
      ) : (
        <GatsbyImage
        image={FrontImage}
        alt={frontmatter.title + " - Featured image"}
        // className="featured-image11 layer12 iiz__img"
        placeholder="blurred"
        loading="eager"
        style={{  maxHeight:'100vh', objectFit:'scale-down', margin:'0 auto'}}
      />
          
      )
    ) : (
      // Show nothing if FrontImage is not present
      ""
    )}
  </div>
)}











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



<button aria-label="Click To Play" className="clickplays videohide 1042" style={{position:'relative', zIndex:'', top:'0', border:'1px  solid red', width:'100vw', background:'transparent', color:'', fontSize:'18px', textAlign:'center', display:'', flexDirection:'column', verticalAlign:'center', justifyContent:'center', alignItems:'center', aspectRatio:'16/9'}}>
                {/* // <div style={{position:'absolute', background:'#111', height:'100vh', width:'100vw', zIndex:'3', top:'0', right:'0', textAlign:'center', display:'grid', placeContent:'start', justifyContent:'center', color:'#fff', fontFamily:'Verdana, Sans-Serif, System' }}> */}
   
                {/* <img className="homepage-bg" src={iconimage} width="250px" height="150px" alt="UrbanFetish" style={{ width:'', margin:'120px auto 0 auto', filter:'drop-shadow(2px 2px 2px #000)', background:'transparent !important', position:'relative', top:''}} /> */}

                {frontmatter.mediawarnings?.marate ? (
                // {frontmatter.mediawarnings.marate ? (
<>

<div className="flex-items" style={{fontSize:'clamp(.6rem, 1.4vw, 2rem)', fontWeight:'bold', margin:'0 auto 0 auto', textTransform:'uppercase',}}>The following is rated: <strong>{frontmatter.mediawarnings.marate}</strong></div>

<ul className="flex-container" style={{display:'flex', flexDirection:'row', gap:'1vh', justifyContent:'center', alignItems:'center',  textAlign:'left', margin:'0 auto', color:'#ddd', background:'rgba(0, 0, 0, .8)', width:'auto', maxWidth:'800px', height:'', border:'1px solid #222', borderRadius:'12px', padding:'2vh 5vw' }}>


{frontmatter.mediawarnings.marate ? (
            <li className="flex-items" style={{display:'grid', placeContent:'center', width:'', height:'', aspectRatio:'1/1', padding:'0 20px', border:'6.5px solid #fff', margin:'0 auto 0 auto 0', fontSize:'clamp(4rem, 15vw, 5rem)', fontFamily:'Verdana, Sans-Serif, System', fontWeight:'800'}}>{frontmatter.mediawarnings.marate}</li>
            ) : (
              <li className="flex-items" style={{display:'grid', placeContent:'center', width:'', height:'', aspectRatio:'1/1', padding:'0 20px', border:'6.5px solid #fff', margin:'0 auto 0 auto 0', fontSize:'clamp(4rem, 15vw, 5rem)', fontFamily:'Verdana, Sans-Serif, System', fontWeight:'800'}}>PG</li>
            )}





<li style={{display:'flex', flexDirection:'column', position:'relative', left:'', top:'', gap:'.8vh', justifyContent:'space-around', alignContent:'', alignItems:'start', border:'0px solid red', fontSize:'clamp(.5rem, 1.2vw, 2rem)'}}>


{frontmatter.mediawarnings.maratingtx1 ? (
            <li className="flex-items" style={{display:'flex', justifyContent:'center', alignItems:'center', alignContent:'end'}}><strong style={{ }}>
            {frontmatter.mediawarnings.marating1}</strong> {frontmatter.mediawarnings.maratingtx1}</li>
            ) : (
              ""
            )}


{frontmatter.mediawarnings.maratingtx2 ? (
            <li className="flex-items" style={{display:'flex', justifyContent:'center', alignItems:'center', alignContent:'end'}}><strong style={{ }}>
{frontmatter.mediawarnings.marating2}</strong> {frontmatter.mediawarnings.maratingtx2} </li>
            ) : (
              ""
            )}


{frontmatter.mediawarnings.maratingtx3 ? (
         <li className="flex-items" style={{display:'flex', justifyContent:'center', alignItems:'center', alignContent:'end'}}><strong style={{ }}>
{frontmatter.mediawarnings.marating3}</strong> {frontmatter.mediawarnings.maratingtx3} </li>   
            ) : (
              ""
            )} 


{frontmatter.mediawarnings.maratingtx4 ? (
       <li className="flex-items" style={{display:'flex', justifyContent:'center', alignItems:'center', alignContent:'end'}}><strong style={{ }}>
{frontmatter.mediawarnings.marating4}</strong> {frontmatter.mediawarnings.maratingtx4} </li>           
            ) : (
              ""
            )} 



</li>

</ul>


<div className="flex-items" style={{position:'relative', right:'', top:'', display:'', fontSize:'clamp(.6rem, 1.4vw, 2rem)', fontWeight:'bold', textTransform:'uppercase', textAlign:'center'}}>{frontmatter.mediawarnings.viewerwarning}</div>


<div style={{display:'grid', placeContent:'center', position:'relative', zindex:'1', fontWeight:'bold', padding:'1vh 0', fontSize:'clamp(.6rem, 1.4vw, 2rem)', width:'100%', maxWidth:'25vw', height:'', border:'0px solid', borderRadius:'12px', background:'linear-gradient(180deg, rgba(24, 23, 30, 0.2) 1%, rgba(0, 0, 0, .7) 99%)', margin:'0 auto 0 auto', opacity:'.99', textShadow:'2px 2px 2px black', color:'#fff' }}>
<ImPlay style={{margin:'0 auto', width:'50%', fontSize:'clamp(2rem, 4.4vw, 3rem)', filter:'drop-shadow(0px 0px 12px #fff',}} />
{dicClickToView}
</div>
</>

) : (
                
                ""
                
                    )}



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



     <div className="panel" style={{width:'100%', height:'', maxWidth:'1024px', margin:'0 auto 0 auto', }}>


     {/* {Suggestion1 ? (
            <ShowSuggestion style={{position:'relative', top:'', zIndex:'0',}} />
       
          ) : (
            ""
          )} */}




      

<article className="blog-post" style={{marginTop:'0',}}>

{frontmatter.youtube.youtuber2 && <Iframer3 />}



{/* ((((((((((body content)))))))))) */}




  <div>
  {ShareThis ? (

<div style={{ height:'', display:'grid', placeContent:'center'}}>
<div style={{width:'auto', height:'', padding:'0', display:'grid', placeContent:'center', border:'0px solid'}}>
    <ShareSocial style={{}} />
    </div>
<div className="article-header" style={{textAlign:'center', paddingTop:'', height:'auto', color:'', borderRadius:'', marginTop:'0'}}>

<br />
{showTitles ? (   
    <>
            <h1 className="headline" style={{color:'', borderRadius:''}}>{frontmatter.title}</h1>
    </> 
      ) : (
      ""
)}

{/* <time sx={{color: "muted"}}>{frontmatter.date}</time> */}

{showDates ? (
  <div>
    Posted:{" "}
    <time title={frontmatter.date} sx={{ color: "" }}>
      <TimeAgo date={frontmatter.date} style={{ color: "" }} />
    </time>
  </div>
) : (
  ""
)}

















</div>
</div>
              ) : (
                <div style={{ height:'', display:'grid', placeContent:'center'}}>
                <div className="article-header" style={{textAlign:'center', paddingTop:'', height:'auto', color:''}}>


                {showTitles ? (   
    <>
            <h1 className="headline" style={{color:'', borderRadius:''}}>{frontmatter.title}</h1>
    </> 
      ) : (
      ""
)}

              
                {/* <time sx={{color: "muted"}}>{frontmatter.date}</time> */}
               {/* Posted: <TimeAgo date={frontmatter.date} style={{color:''}} /> */}
              </div>


      </div>
              )}

<div className="panel" style={{padding:'2vh 0', borderTop:'0px solid', margin:'0 0', textAlign:'center', fontSize:'1.5rem', minWidth:'50%', width:'100%', maxWidth:'', border:'0px solid yellow', borderRadius:''}}>
<div
  className="blog-post-content bodycontent" style={{ fontSize:'clamp(1.2rem, 2.8vw, 1.8rem)', textAlign:'center', width:'100%', maxWidth:'', padding:'0 6% 0 6%', margin:'0 auto', color:'inherit !important'}}
  dangerouslySetInnerHTML={{ __html: html }}
/>    
</div>
</div>





        

 </article>



















          

{/* {Comments ? (

<div id="comments" style={{height:'', paddingBottom:'0',   display:'grid', placeContent:'center', maxWidth:'100vw', padding:'0', margin:'10vh auto'}}>
<CommentBox />



</div>
          ) : (


""

          )} */}
         


     
  




         {ShowOriginal && (
  <div id="original" style={{ height: '', margin: '10vh auto', paddingTop: '5vh', display: 'grid', placeContent: 'center', border: '0px solid blue' }}>
    {YouTube && (
      <div className="panel" style={{ position: 'relative', width: '100%', maxWidth: '800px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', fontSize: '100%', borderRadius: '' }}>
        <div style={{ maxWidth: '90vw', width: '100%', height: '', maxHeight: '', padding: '0', position: 'relative', bottom: '0', textAlign: 'center', border: '0px solid blue', margin: '0 auto', borderRadius: '12px' }}>
          {/* <Iframer2 /> */}
          <a href={OriginalUrl} rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ display: 'grid', placeContent: 'center', fontWeight: 'bold', padding: '1rem', fontSize: '2rem', width: '100%', height: '', border: '0px solid', borderRadius: '12px' }}>
              Support Our Video Sponsors
              <ImPlay style={{ margin: '0 auto', width: '50%', fontSize: '60px' }} />
              {dicClickToView}
            </div>
          </a>
        </div>
      </div>
    )}
    <br />
  </div>
)}






<br />

{ShowDisclaimer ? (

<div className="panel fade legal" style={{ textAlign: 'center', padding:'1rem',  justifyContent: 'center', fontSize: '.95rem', textDecoration:'none', maxWidth:'90vw'}}>
            Legal:<br />
            <Link state={showModals ? { modal: true } : {}} to="/disclaimer/">Disclaimer</Link>  |  <Link state={showModals ? { modal: true } : {}} to="/privacy/">Privacy Policy</Link>  |  <Link state={showModals ? { modal: true } : {}} to="/terms/">Terms of Service</Link>
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
    ) : (
            ""
          )}





   






       























</div>









      




  
    </Layout>




  )
}



export default Post





export const pageQuery = graphql`
fragment isDraft on MarkdownRemark {
  frontmatter {
    draft
  }
}

query BlogPostQuery($id: String!) {
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
  markdownRemark(id: {eq: $id}) {
    ...isDraft
    id
    html
    excerpt(pruneLength: 148)
    frontmatter {
      date(formatString: "YYYY-MM-DD-HH-MM-SS")
      slug
      title
      tags
      description
      showZoom
      showPageNav
      externalLink
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
        liarliar
        contentinvideo
        audiostart
        audioend
        audiotitle
      }
      mediawarnings {
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
      }
      comments
      shareable
      bumpertext
      nftdrop
      svgzindex
      scrollable
      featuredImage {
        relativePath
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
      svgImage {
        publicURL
      }
      underlayImage {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }
  }
  allMarkdownRemark(
    sort: {frontmatter: {date: ASC}}
    filter: {frontmatter: {template: {eq: "blog-post"}, draft: {ne: true}}}
  ) {
    edges {
      node {
        id
        frontmatter {
          title
          slug
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
}
`;
