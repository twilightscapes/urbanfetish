import * as React from "react"
import { BiLeftArrow } from "react-icons/bi"
import { navigate } from "gatsby"

const GoBack = () => {
  if (typeof window !== "undefined" && window.history.length > 2) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', color: '#ccc', border: '0px solid red' }}>
        <button className="back button" onClick={() => { navigate(-1) }} style={{ display: 'flex', justifyContent: 'center', padding:'.4vh .5vw' }}>
          <span className="icon -left" style={{ paddingRight: '' }}><BiLeftArrow /></span> {" "}Go Back
        </button>
      </div>
    )
  } else {
    return null
  }
}

export default GoBack
