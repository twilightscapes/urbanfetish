
import * as React from "react"


import { BiLeftArrow } from "react-icons/bi"
import { navigate } from "gatsby";



   
const GoBack = () => (






<div style={{display:'flex', justifyContent:'center', color:'#ccc', border:'0px solid red'}}><button className="back button" onClick={() => { navigate(-1) }} style={{display:'flex', justifyContent:'center'}}><span className="icon -left" style={{paddingRight:''}}><BiLeftArrow /></span> {" "}Go Back</button></div>





  
)

export default GoBack