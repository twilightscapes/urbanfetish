import React from "react"
import { Link } from "gatsby"
import { RiArrowLeftSLine, RiBugLine } from "react-icons/ri"
import { StaticImage } from "gatsby-plugin-image"
// import { AiFillRobot } from "react-icons/ai"
import Seo from "../components/seo"
import Layout from "../components/siteLayout"

const NotFound = () => (
  <Layout className="not-found-page">
    <Seo title="Page not found" />

      <header>

        {/* <AiFillRobot
          style={{
            fontSize: "160px",
            color: "var(--primary-color)",
            margin:'0 auto',
        textAlign:'center'
          }}
        /> */}
 <div style={{display:'flex', justifyContent:'center', gap:'30px', width:'100vw', position:'absolute', zIndex:'1', top:'70vh', border:'0px solid'}}>

<StaticImage src="../img/moose.webp" alt="Todd builds Web Apps" style={{height:'auto', position:'fixed', top:'100px', left:'0', zIndex:'-1', width:'100vw', maxHeight:'60vh',  objectFit:'cover', overflow:'', border:'0px solid red !important'}}  />


        {/* <h1 className="headline1" style={{fontSize:'200%'}}>Well, Darn.</h1>
        <p className="headline1" style={{fontSize:'150%', margin:'2rem'}}>
          That wasn't supposed to happen.
        </p> */}


     
        <Link to="/" className="button">
        <RiArrowLeftSLine className="icon -left" />
        Back to Homepage
      </Link>
      <Link to="/contact" className="button">
        Report this <RiBugLine className="icon -right" />
      </Link></div>

</header>
  </Layout>
)

export default NotFound
