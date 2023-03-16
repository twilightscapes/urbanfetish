import { useEffect } from 'react'
import * as React from "react"
import { BiLeftArrow } from "react-icons/bi"
import { navigate } from 'gatsby'

const GoBack = () => {
    // Save the current scroll position to session storage
    useEffect(() => {
      // Check if there is enough history to go back
      const canGoBack = window && window.history && window.history.length > 2
      
      // If there is not enough history to go back, return null to not render anything
      if (!canGoBack) {
        return null
      }
      
      const handleScroll = () => sessionStorage.setItem('scrollPos', window.pageYOffset)
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }, [])
  
    // Restore the previous scroll position when the component unmounts (i.e. when the user clicks the back button)
    useEffect(() => {
        if (window.history.scrollRestoration) {
          const scrollPos = sessionStorage.getItem('scrollPos')
          console.log('Retrieved scrollPos:', scrollPos)
          window.history.scrollRestoration = 'manual'
          window.scrollTo(0, scrollPos)
          window.history.scrollRestoration = 'auto'
        }
      }, [])
      
  
    return (
      <div style={{display:'flex', justifyContent:'center', color:'', border:'0px solid red'}}>
        <button className="back button" onClick={() => { navigate(-1) }} style={{display:'flex', justifyContent:'center', alignItems:'center', padding:'.1vh .6vw'}}>
          <span className="icon -left" style={{paddingRight:''}}>
            <BiLeftArrow style={{height:'20px'}} />
          </span> {" "}Go Back
        </button>
      </div>
    )
}

export default GoBack
