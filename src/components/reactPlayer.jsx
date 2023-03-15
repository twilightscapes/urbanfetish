
/** @jsx jsx */
// import * as React from "react"
import { jsx } from "theme-ui"
import styled from "styled-components"


import ReactPlayer from 'react-player/lazy'
import { ImPlay } from "react-icons/im"
const CustomBox = styled.div`

.themed{margin-top:20px;}


`

   
const Player = () => (
<CustomBox style={{}}>





<ReactPlayer
      style={{height:'', position:'absolute', top:'0', zIndex:'', background:'#000'}}
  className='react-player'
      url=""
      width="100%"
      height="100%"
      showinfo
      controls
      autoplay={true}
      background={true}
      loop
      playing
      playsinline
      muted={true}
      showPortrait
      playIcon={
      <button aria-label="Click To Play" className="clickplay" style={{position:'absolute', zIndex:'5', top:'0', border:'0px solid red', width:'100vw', height:'100vh', background:'#111', color:'#fff', fontSize:'18px', textAlign:'center', display:'flex', flexDirection:'columh', verticalAlign:'center', justifyContent:'center', paddingTop:'10%'}}>
        



  <div className="" style={{ textAlign:'center', animation:'fadeIn 3s'}}>
    <ImPlay style={{margin:'0 auto', width:'50%', fontSize:'60px'}} />

    <span style={{fontWeight:'bold', padding:'0 0 0 1rem', fontSize:'60px'}}>Click To Play</span>
    
    </div>
    </button>}



      light="../assets/transparent.png"
    />




</CustomBox>
  
)

export default Player