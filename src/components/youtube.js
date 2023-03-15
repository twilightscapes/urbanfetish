import React from "react"
// import { Link } from "gatsby"
// import { Layout } from "../components/layout"
// import { ProductListing } from "../components/product-listing"
// import GoBack from "../components/goBack"
// import styled from "styled-components"
// import ShareSocial from '../components/share' 
// import { StaticImage } from "gatsby-plugin-image"
// import { Helmet } from "react-helmet"
// import { Seo } from "../components/seo"
// import { FaRegPlusSquare } from 'react-icons/fa';
// import { IoShareOutline } from 'react-icons/io5';
// import { AiOutlineCloseCircle } from 'react-icons/ai';
// import { StaticImage } from "gatsby-plugin-image"
// import { ImPlay } from "react-icons/im"
// import { RiSendPlane2Line } from "react-icons/ri"
// import Install from "../components/install-discount"
// import SVG from "../../static/assets/crude-addiction.svg"
// import ScrollAnimation from 'react-animate-on-scroll'
// import GiftShop from "../components/giftshop"
// import PhotoMenu from "../components/animated-photos-menu"
// import CommentBox from "../components/commentbox"
import ReactPlayer from 'react-player/lazy'
// import {CopyToClipboard} from 'react-copy-to-clipboard'
// import ReactPlayer from '../components/react-player'
// const CustomBox = styled.div`
// @media (max-width: 48em) {
// }
// @media (min-width: 58em) {
// }
// `



// export const query = graphql`
//   query {
//     shopifyCollection(handle: { eq: "feature" }) {
//       products {
//         ...ProductCard
//       }
//     }
//   }
// `

       // export default function nftPage({ data: { products } }) {
  


        
        export default class IndexPage extends React.Component {
          
          
          state = {
            youtubelink: "",
            isActive: false,
            value: '',
            copied: false,
          }

          
          handleInputChange = event => {
            const target = event.target
            const value = target.value
            const name = target.name
            this.setState({
              [name]: value,
            })
   
          
 
          }

        handleShow = ()=>{
            this.setState({
                isActive: true
            })
        }
      
        handleHide = () =>{
            this.setState({
                isActive: false
            })
        }

          handleSubmit = event => {
            event.preventDefault()
            // alert(`Your Url ${this.state.youtubelink}!`)
            
          }



          
          render() {

            

            const Url = this.state.youtubelink

            const urlNoProtocol = Url.replace(/^.*((youtu.be\/))/i, "")
            const FinalUrl = "https://www.youtube.com/embed/" + urlNoProtocol + "?controls=1&amp;showinfo=1&amp;color=white&amp;rel=0&amp;autoplay=1&amp;loop=1&amp;mute=0&amp;playlist=" + urlNoProtocol + ""



            
            function Iframer() {
  
              return (
        
                <ReactPlayer
  allow="web-share"
  className='react-player'
  style={{position: '', top: '0',}}
      url={FinalUrl}
      width='100vw'
      height='100vh'
      config={{
        youtube: {
          playerVars: { showinfo:1, controls:1, mute:1, }
        },
      }}
      playing
      color="white"

      // playIcon={<button aria-label="Click To Play" className="clickplay" style={{position:'absolute', zIndex:'5', top:'0', border:'0px solid red', width:'100vw', height:'100vh', background:'#111', color:'#fff', fontSize:'18px', textAlign:'center', display:'flex', flexDirection:'columh', verticalAlign:'center', justifyContent:'center', paddingTop:'5%'}}>
        



      //   <div className="" style={{ textAlign:'center', animation:'fadeIn 3s'}}>
      //   <div style={{ textAlign:'center', fontSize:'30px'}}>
      //      Ads Removed!</div>
      // <ImPlay style={{margin:'0 auto', width:'50%', fontSize:'60px'}} />
      // <span style={{fontWeight:'bold', padding:'0 0 0 1rem', fontSize:'60px'}}>Click To Play</span>
      
      // </div>
      // </button>}
      // light="../static/assets/transparent.png"
    />


              )
            }

            
            return (


<>





<div className='player-wrapper' style={{position:'relative', width:'99.9vw',  top:'0', zIndex:'0', height:'', overflow:'', border:'0px solid yellow',  aspectRatio:'16/9', }}>

{urlNoProtocol ? (
     <Iframer />
        ) : (
        ""
        )}

      </div>


{!this.state.isActive ? 

<>






   



<div className="" style={{display:'flex', placeContent:'center', width:'100%', margin:'0 auto', maxWidth:'1000px', border:'0px solid red',   height:'', background:'', position:'absolute', bottom:'0', left:'', right:'',}}>

  
    <form className="youtubeform frontdrop" onSubmit={this.handleSubmit} style={{ padding:'2rem', border:'0px solid #333', borderRadius:'12px', height:'50px', width:'100%', maxWidth:'90vw', margin:'0 auto', zIndex:'1', position:'relative', bottom:'0',transition:' all 1.85s', animation:'fade 1.5s forwards', display:'flex', justifyContent:'center', alignItems:'center',  }}>

    <p className="headline" style={{fontSize:'90%', color:'#fff', fontWeight:'bold', textAlign:'right', width:'250px', marginRight:'15px'}}>Paste YouTube Link1:
</p>
<input
          id=""
          type="text"
          name="youtubelink"
          value={this.state.youtubelink}
          // onBlur={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          onInput={this.handleInputChange}
          onChange={this.handleShow}
           
          placeholder="example: https://youtu.be/cVsQLlk-T0s"
          
          className="youtubelinker"
        />




</form>
    
    </div>
    




    </>
  : 

  
<div className="" style={{display:'flex', placeContent:'center', width:'100%', margin:'0 auto', maxWidth:'1000px', border:'0px solid red',   height:'', background:'', position:'absolute', top:'75vh', zIndex:'', left:'', right:'',}}>


<form className="youtubeform frontdrop" onSubmit={this.handleSubmit} style={{ padding:'2rem', border:'0px solid #333', borderRadius:'12px', height:'50px', width:'100%', maxWidth:'90vw', margin:'0 auto', zIndex:'1', position:'relative', bottom:'0',transition:' all 1.85s', animation:'fade 1.5s forwards', display:'flex', justifyContent:'center', alignItems:'center',  }}>

    <p className="headline" style={{fontSize:'90%', color:'#fff', fontWeight:'bold', textAlign:'right', width:'250px', marginRight:'15px'}}>Paste YouTube Link:
</p>
<input
      id=""
      type="text"
      name="youtubelink"
      value={this.state.youtubelink}
      // onBlur={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      onInput={this.handleInputChange}
      onChange={this.handleShow}
       
      placeholder="example: https://youtu.be/cVsQLlk-T0s"
      
      className="youtubelinker"
    />

</form>

</div>
  }
  

{/*  */}



     </>

    )
    }
}