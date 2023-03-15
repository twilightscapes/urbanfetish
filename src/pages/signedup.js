import * as React from "react"
import Layout from "../components/siteLayout"



import { Link } from "gatsby"
import { RiArrowLeftSLine } from "react-icons/ri"
// import { AiTwotoneCamera } from "react-icons/ai"











export default function SignedUpPage() {
   return (


    
    <Layout className="thanks-page">


 


<div className="panel" style={{width:'90%', height:'', maxWidth:'1024px', margin:'0 auto 0 auto', padding:'2vh 10vw', borderRadius:'0 0 12px 12px', }}><div className="spacer33"></div> 
      {/* <AiTwotoneCamera
        style={{
          fontSize: "150px",
          color: "var(--primary-color)",
          margin:'0 auto',
          textAlign:'center'
        }}
      /> */}
      <h1 className="neonText" style={{fontSize:'200%'}}>Thank you!<br />We'll let you know the instant we release new material.</h1>
   

      <div className="spacer33"></div> 
      <Link to="/" className="button">
        <RiArrowLeftSLine className="icon -left" />
        For now, check out the latest Meme Genes.
      </Link>
    </div>
    <div className="spacer33"></div> 

 
    
    
    </Layout>

  )
}
