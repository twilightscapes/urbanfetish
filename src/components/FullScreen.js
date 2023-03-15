
import * as React from "react"


import { BsArrowsFullscreen } from "react-icons/bs"
// import { navigate } from "gatsby";




function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {  
      document.documentElement.requestFullScreen();  
    } else if (document.documentElement.mozRequestFullScreen) {  
      document.documentElement.mozRequestFullScreen();  
    } else if (document.documentElement.webkitRequestFullScreen) {  
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
    }  
  } else {  
    if (document.cancelFullScreen) {  
      document.cancelFullScreen();  
    } else if (document.mozCancelFullScreen) {  
      document.mozCancelFullScreen();  
    } else if (document.webkitCancelFullScreen) {  
      document.webkitCancelFullScreen();  
    }  
  }  
}

   
const FullScreen = () => (






<button  aria-label="Full Screen Mode" title="Go Full-Screen" className="fullscreenButt txtshadow" onClick={toggleFullScreen} style={{}}><BsArrowsFullscreen /></button>





  
)

export default FullScreen