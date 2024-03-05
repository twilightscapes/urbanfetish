import * as React from "react"
import { BiLeftArrow } from "react-icons/bi"
import { navigate } from "gatsby"
import useSiteMetadata from "../hooks/SiteMetadata";
const GoBack = () => {
  const { language } = useSiteMetadata();
  const { dicGoBack } = language;
  if (typeof window !== "undefined" && window.history.length > 1) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', color: '#ccc', border: '0px solid red' }}>
        <button className="back button" onClick={() => { navigate(-1) }} style={{ display: 'flex', justifyContent: 'center', padding:'0 .5vw' }}>
          <span className="icon -left" style={{ paddingRight: '' }}><BiLeftArrow /></span> {" "}{dicGoBack}
        </button>
      </div>
    )
  } else {
    return null
  }
}

export default GoBack
