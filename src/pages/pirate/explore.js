import React from "react";
// import useSiteMetadata from "../hooks/SiteMetadata"
// import { StaticImage } from "gatsby-plugin-image"
// import {Link} from "gatsby"

import Layout from "../../components/siteLayout"
import { Helmet } from "react-helmet"
// import PageMenu from "../components/PageMenu"
// import useNetlifyIdentity from '../components/useNetlifyIdentity';


function Explore() {

  // const [loggedIn] = useState(false);
  

  return (


<Layout>
<Helmet>

  
        <body id="body" className="piratepage scroll social" />
      </Helmet>




{/* {loggedIn ? (
  <div style={{position:'relative', left:'', top:'222px', cursor:'pointer'}}>LOGGED IN</div>
) : (
  <div style={{position:'relative', left:'', top:'222px', cursor:'pointer'}}>LOGGED OUT</div>
  )} */}
<div style={{display:'grid', placeContent:'center', height:'70vh', width:'100vw'}}>Coming Soon</div>




{/* <PageMenu /> */}


</Layout>




  );
}

export default Explore;


