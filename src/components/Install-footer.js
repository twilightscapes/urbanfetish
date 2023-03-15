import * as React from "react"
// import { navigate } from 'gatsby-link'
// import { FiShare } from 'react-icons/fi';
import { FaRegPlusSquare } from 'react-icons/fa';
import { IoShareOutline } from 'react-icons/io5';
import { AiOutlineCloseCircle } from 'react-icons/ai';

// import ScrollAnimation from 'react-animate-on-scroll'
// import CookieConsent from "react-cookie-consent"
// import styled from "styled-components";
// import { StaticImage } from "gatsby-plugin-image"

export default class Installer extends React.Component {

  state = {
     isActive:false
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

   render(){
       return(
           <div className="no-app">
           <div style={{textAlign:'center', marginTop:'1rem',}}>
           <button onClick={this.handleShow} style={{borderBottom:'1px solid'}}>Install Our Web App</button> &nbsp; | &nbsp; Get Exclusive Deals! 
             
             
             </div>

{this.state.isActive ? 
<>
  <div className="installwindow" style={{fontSize:'90%',  display:'flex', flexDirection:'column', verticalAlign:'middle', lineHeight:'200%', width:'90%', margin:'0 auto', padding:' .5rem', border:'0px solid #333', borderRadius:'12px', maxWidth:'600px', textAlign:'center' }}>
  
  One-Click Install - NO APP STORE NEEDED
<div style={{fontSize:'90%', textAlign:'center', display:'flex', flexDirection:'column', verticalAlign:'middle', lineHeight:'200%', width:'90%', margin:'0 auto', padding:' .5rem 1rem', border:'1px solid #333', borderRadius:'12px', backdropFilter:'blur(14px)', background:'rgba(0,0,0,0.60)', position:'relative', color:'#fff'}}>
      
<button aria-label="Close this popup" onClick={this.handleHide} style={{position:'absolute', right:'-5px', top:'-5px', fontSize:'24px'}}><AiOutlineCloseCircle /></button>

<p style={{maxWidth:'', textAlign:'center'}}>Simply click the "install" icon in your browser address bar
</p>

{/* <div style={{border:'0px solid red', display:'block', width:'100px', height:'100px', position:'absolute', bottom:'0', right:'0', zIndex:'-1', overflow:'hidden', }}><StaticImage src="../../static/assets/installed-bg.png" alt=""  />
</div> */}
  <span style={{fontSize:'100%'}}>OR</span>
  <div style={{fontSize:'90%', textAlign:'center', display:'flex', flexDirection:'column', verticalAlign:'middle', lineHeight:'200%', width:'90%', margin:'0 auto', padding:' .5rem 1rem', border:'0px solid #333', borderRadius:'12px', }}>
    
    <div style={{textAlign:'center', display:'flex', alignContent:'center', marginBottom:'1rem',}}>
   <IoShareOutline style={{fontSize:'200%', marginLeft:'0', marginRight:'2%', float:'',}} />
    1 Press the 'Share' button 
  </div>
  
   <div style={{textAlign:'center', display:'flex', alignContent:'center',}}>
   <FaRegPlusSquare style={{fontSize:'200%', marginLeft:'0', marginRight:'2%', float:'',}} /> 
   
  2 Press 'Add to Home Screen'
   </div>
   
   </div>

</div>
</div>
</>
  : null }
             
           </div>
)
}
}