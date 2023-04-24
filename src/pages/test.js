import React from "react";
// import useSiteMetadata from "../hooks/SiteMetadata"
// import { StaticImage } from "gatsby-plugin-image"
// import {Link} from "gatsby"
import styled from "styled-components"
import Layout from "../components/siteLayout"
import { Helmet } from "react-helmet"
import Map from "../components/contact-map"
const CustomBox = styled.div`


`

function Test() {

  
  


  return (

    <CustomBox>
<Layout>
<Helmet>
        <body id="body" className="test" />
      </Helmet>

<div className="scroll-container" style={{display:'grid', justifyContent:'center', maxWidth:'80vw', height:'60vh', margin:'140px auto 0 auto'}}>

<Map id="contactMap" options={{
                  center: { lat: 39.92483, lng: -86.10551 },
                  zoom: 15,
                }}
/>
</div>





</Layout>



      </CustomBox>
  );
}

export default Test;


