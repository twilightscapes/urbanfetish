import React from "react"
import { Link } from "gatsby"
import { RiArrowLeftSLine } from "react-icons/ri"
import { StaticImage } from "gatsby-plugin-image"
// import { AiFillRobot } from "react-icons/ai"
import Seo from "../components/seo"
import Layout from "../components/siteLayout"

const NotFound = () => (
  <Layout className="not-found-page">
    <Seo title="Page not found" />

  



<div style={{display:'grid', placeContent:'center', width:'100vw', height:'90vh', position:'relative', top:'', }}>

<StaticImage className="panel" src="../img/moose.webp" alt="Todd builds Web Apps" style={{ position:'relative', width:'100%', left:'0', right:'0', margin:'0 auto', marginTop: '-20vh', objectFit: 'contain'}}  />

<Link to="/" className="button" style={{maxWidth:'300px', margin:'20px auto'}}>
        <RiArrowLeftSLine className="icon -left" />
        Back to Homepage
      </Link>
</div>
{/* 
        <h1 className="headline1" style={{fontSize:'200%'}}>Well, shit.</h1>
        <p className="headline1" style={{fontSize:'150%', margin:'2rem'}}>
          That wasn't supposed to happen.
        </p> */}


     




  </Layout>
)

export default NotFound