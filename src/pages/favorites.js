import React from "react";
// import useSiteMetadata from "../hooks/SiteMetadata"
// import { StaticImage } from "gatsby-plugin-image"
// import {Link} from "gatsby"

import Layout from "../components/siteLayout"
import { Helmet } from "react-helmet"
import FavoriteFeeds from "../components/FavoriteFeeds";




function Favorites() {

  
  


  return (


<Layout>
<Helmet>
        <body id="body" className="social" />
      </Helmet>



<FavoriteFeeds />







</Layout>




  );
}

export default Favorites;


