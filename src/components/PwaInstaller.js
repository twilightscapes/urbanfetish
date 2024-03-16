import React, { useState, useEffect } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import { MdOutlineIosShare } from "react-icons/md";
// import PirateLogo from "../img/logo.svg";
// import Flag from "../img/logo.svg";
import useSiteMetadata from "../hooks/SiteMetadata"
// import { Link } from "gatsby";

const PWAInstaller = () => {
  const [isInstalled, setisInstalled] = useState(true);


  const { companyname } = useSiteMetadata()
  const { iconimage } = useSiteMetadata()

  useEffect(() => {
    const storedisInstalled = localStorage.getItem("isInstalled");
    setisInstalled(storedisInstalled === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("isInstalled", isInstalled);
  }, [isInstalled]);

  // const MenuIcon = isInstalled ? RiCloseCircleFill : Flag;

  const handleButtonClick = () => {
    setisInstalled(!isInstalled);
  };

  return (
    
    <div id="pwabanner" style={{position:'fixed', bottom:'0', display: isInstalled ? "none" : "flex",  alignItems:'center', fontSize: 'clamp(.9rem,2vw,1rem)', background:'var(--theme-ui-colors-siteColor)', color:'var(--theme-ui-colors-siteColorText)', marginBottom:'0px', padding:'0px 40px 15px 0', width:'100vw', zIndex:'10' }}>

      <button
        className="flag1 bug1"
        onClick={handleButtonClick}
        aria-label={isInstalled ? "Collapse menu" : "Expand menu"}
        style={{
          cursor: "pointer",
          padding: "0",
          fontSize: "clamp(3rem, 3vw, 3rem)",
          position: "absolute",
          top: "24px",
          right: "10px",
          width: "",
          height: isInstalled ? "60px" : "60px",
          zIndex: "4",
          display: "flex",
          flexDirection: "column",
          justifySelf: "flex-start",
          textAlign: "center",
          overflow: "hidden", // Hides content when height is set to 0
          transition: "height 0.3s ease", // Smooth transition for height change
        }}
      >
        {isInstalled ? (
          <RiCloseCircleFill style={{ height: "100%", maxHeight: "20px", top: "0", zIndex: "4", color: "#fff" }} />
        ) : (
          <RiCloseCircleFill style={{ height: "100%", maxHeight: "20px", top: "0", zIndex: "4", color: "#fff" }} />
        )}
      </button>




      {iconimage ? (
                <img className="cornerlogo1" style={{ position: 'relative', top: '', left: '', border: '0px solid white', padding: '0', maxHeight: '60px' }} src={iconimage} alt={companyname} width="111" height="60" />
              ) : (
                <div style={{ fontWeight: '', display: 'grid', justifyContent: 'center', alignItems: 'center', height: '', fontSize: 'clamp(.9rem,2vw,1rem)', color: 'var(--theme-ui-colors-headerColorText)', maxWidth: '50vw' }}>
                  {companyname}
                </div>
              )}




      {/* <div style={{fontSize:'60px', display:'grid', placeContent:'center', height:'60px', margin:'0 2vw', lineHeight:'100%'}}>&#x2620;</div>  */}

                <div className="font" style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'1vw', textAlign:'center', justifyContent:'center',padding:'4px 0 0 40px', margin:'0 auto', border:'0px solid blue', width:'', maxWidth:'', fontSize: 'clamp(.8rem,1.2vw,1rem)', position:'relative'}}>

                <span style={{position:'absolute', display:'block', left:'1%',}}><MdOutlineIosShare style={{fontSize:'30px'}} /></span>

                  <span style={{display:'block'}}>Install the {companyname} Web app</span>

                  <span style={{display:'block'}}>"Add To Home Screen"</span>

                

                </div>
                
                
  
                

    

      {/* <span style={{fontSize:'50px'}}>&#x2620;</span>

      
      Please Install Our Web App
        "Save to your Home Screen" to install free Web App */}


    </div>
  );
};

export default PWAInstaller;
