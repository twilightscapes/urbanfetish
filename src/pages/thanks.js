import React from "react";
import Seo from "../components/seo";
import Layout from "../components/siteLayout";
import { Link } from "gatsby"
import { RiArrowLeftSLine, RiCheckboxCircleLine } from "react-icons/ri"


const Thanks = () => {
      return (

 <Layout className="thanks-page">
 <Seo title={`Thanks for being a Pirate!`} />

<section className="outer section section--gradient" >
      <div className="container" style={{padding: '30px 0', minHeight:'100dvh'}}>
        
      {/* <div className="mobile"><GoBack /></div> */}


    

<div style={{width:'90%', height:'100px', margin:'0 auto', textAlign:'center',}}>

{/* <p>
<strong>Hytron Manufacturing, Inc.</strong><br />
15582 Chemical Lane<br />
Huntington Beach, CA 92649<br />
</p> */}


<RiCheckboxCircleLine className="" 
        style={{
          fontSize: "150px",
      //     color: "var(--primary-color)",
          margin:'0 auto',
          textAlign:'center'
        }}
      />
      <h1 className="" style={{fontSize:'50px',}}>Success!</h1>
      <div className="spacer33"></div> 
      <Link to="/" className="button">
        <RiArrowLeftSLine className="icon -left" />
        Back to Homepage
      </Link>


</div>






</div>



   


    </section>
    
    
    </Layout>
  );
};

export default Thanks;