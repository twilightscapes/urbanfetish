import React, { useEffect, useState } from 'react';
import Seo from "./seo"
import { Link } from 'gatsby-plugin-modal-routing-4'
import "../styles/reset.css"
import "../styles/global.css"
import { AnchorLink } from "gatsby-plugin-anchor-links"
// import { navigate } from "gatsby"
// import { RiCloseCircleFill } from "react-icons/ri";
import { Helmet } from "react-helmet"
import Theme from "./theme"
import SearchIcon from "../../src/img/search"
import useSiteMetadata from "../hooks/SiteMetadata"
import { RiArrowUpFill } from "react-icons/ri"
import GoBack from "../components/goBack"
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing-4'
import Menu from "../components/menu"
import SocialMenu from "../components/menu-social"
import { BiLeftArrow } from "react-icons/bi"
// import Consent from "../components/Consent"
import defaultColors from "../../static/data/default-colors.json";
import userStyles from "../../static/data/userStyles.json"
import Switch from "../components/Switch"
import BlueCheck from './bluecheck';
import Footer from "../components/footer"
import PwaInstaller from "../components/PwaInstaller"


const Layout = ({ children }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);


  function isRunningStandalone() {
    if (typeof window !== 'undefined') {
        return window.matchMedia('(display-mode: standalone)').matches;
    }
    return false;
}


  const handleScroll = () => {
    const currentScrollPos = document.documentElement.scrollTop || document.body.scrollTop;

    if (currentScrollPos === 0) {
      setShowBackToTop(false);
    } else {
      setShowBackToTop(true);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
    });
  };

  const { language, navOptions, featureOptions, proOptions } = useSiteMetadata();
  const { dicSearch, dicPirate, dicGoBack } = language;
  const { showNav, showNav2 } = navOptions
  const { showfooter, showSwipe, showSearch } = featureOptions
  const { showModals, showBranding,
    //  showConsent, 
     showPWA } = proOptions

  const { companyname } = useSiteMetadata()
  const { iconimage } = useSiteMetadata()
  const { image } = useSiteMetadata()

  const fontUrl = `https://fonts.googleapis.com/css?family=${defaultColors?.siteFont}&display=swap`;



  // Determine the current page location
  const currentPage = typeof window !== 'undefined' ? window.location.pathname : '/';
  // console.log('Current Page:', currentPage);
  // Define an array of page locations where you want to show the social menu
  const socialMenuPages = ['/pirate', '/pirate/feeds', '/pirate/explore', '/pirate/favorites'];

  
  return (
    <>
      <Helmet>
      <meta
    http-equiv="Content-Security-Policy"
    content="font-src 'self' https://fonts.gstatic.com"
  />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link id="yyy" rel="stylesheet" href={fontUrl} crossOrigin="anonymous" referrerPolicy="no-referrer-when-downgrade" />
        <style>{`
          ${userStyles.userStyles}
        `}</style>

<script type="text/javascript" src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Helmet>

      <Seo />



      <ModalRoutingContext.Consumer>
      {({ modal, closeTo }) => (
<>
  {modal ? (
<div style={{display:'flex', justifyContent: 'center', color: '#ccc',  position:'fixed', top:'60px', right:'1vw', padding:'0px', fontSize:'', opacity:'1 !important', zIndex:'12',}}>
<Link state={{noScroll: true }} to={closeTo} style={{fontSize:'',  textDecoration:'none', lineHeight:'', display:'flex', flexDirection:'column', color:'#fff', cursor:'pointer'}}>
<button className="button" style={{ display: 'flex', justifyContent: 'center', padding:'0 .5vw' }}><span className="icon -left" style={{ paddingRight: '' }}><BiLeftArrow /></span> {" "}{dicGoBack}</button>
</Link>
</div>
  ) : (
''
  )}
</>
)}
</ModalRoutingContext.Consumer>



      <header className="header" style={{ display: 'block', height: showNav === true || socialMenuPages.some(page => currentPage.startsWith(page)) || showNav !== false ? '60px' : '0' }}>

      {(showNav === true || socialMenuPages.some(page => currentPage.startsWith(page)) || showNav !== false) ? (

          <div id="menu" className="menu print panel1 header" style={{ position: 'fixed', width: '100vw', top: '0', zIndex: '30', maxHeight: '', overFlow: '', boxShadow: '0 0 0 rgba(0,0,0,.7)', padding: '0 2%', alignItems: 'start', borderRadius: '0', display: 'flex', justifyContent: 'space-around', gap: '10px', color: 'var(--theme-ui-colors-headerColorText)', borderBottom: '0px solid #222', }}>

            <div style={{ position: 'absolute', left: '10px', top: '22px', cursor: 'pointer' }}><BlueCheck /></div>

            <Link state={showModals ? { modal: true } : {}} to="/" className="cornerlogo" name="homereturn" style={{ position: '', display: 'flex', marginLeft: '25px', alignItems: 'center', justifyContent: 'center', maxWidth: '', height: '60px', border: '0px solid transparent' }} aria-label="Link to Top" title="Back to Top">
              {iconimage ? (
                <img className="cornerlogo" style={{ position: 'relative', top: '', left: '4%', border: '0px solid white', padding: '0', maxHeight: '60px' }} src={iconimage} alt={companyname} width="111" height="60" />
              ) : (
                <div style={{ fontWeight: '', display: 'grid', justifyContent: 'center', alignItems: 'center', height: '', fontSize: 'clamp(.9rem,2vw,1rem)', color: 'var(--theme-ui-colors-headerColorText)', maxWidth: '50vw' }}>
                  {companyname}
                </div>
              )}
            </Link>

            <ul className="topmenu" style={{ fontSize: 'clamp(.6rem, 1.6vw, 1.8rem)', textAlign: 'center', maxHeight: '', display: 'flex', justifyContent: 'space-between', gap: '4vw', alignItems: 'center', margin: '0 auto 0 auto', padding: '1.5vh 2% 0 2%', border: '0px solid white' }}>



            {socialMenuPages.some(page => currentPage.startsWith(page)) ? <SocialMenu /> : <Menu />}


              {/* <li key="demo"><Link to="/pirate">View Demo</Link></li> */}
            </ul>

            <div id="missioncontrol" className="missioncontrol sitecontrols" style={{ display: 'flex', justifyContent: 'space-around', fontSize: 'clamp(.8rem, 2.3vw, 2.5rem)', gap: '3vw', textAlign: 'center', maxHeight: '', alignItems: 'center', paddingTop: '5px' }}>

              {showSearch ? (
                <div className="searchIcon">
                  <Link state={showModals ? { modal: true } : {}} aria-label="Search" to="/search/" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '0px', textAlign: 'center' }}>
                    <SearchIcon style={{ height: '30px' }} />
                    <span className="themetext">{dicSearch}</span>
                  </Link>
                </div>
              ) : (
                ""
              )}

              <div>
                <Theme style={{}} />
              </div>



              {showSwipe === true || socialMenuPages.some(page => currentPage.startsWith(page)) || showSwipe !== false ? (
                <Switch />
              ) : (
                ""
              )}

            </div>

          </div>

        ) : (
          ""
        )}


{(showNav === false || socialMenuPages.some(page => currentPage.startsWith(page)) || showNav !== false) ? (

<div id="missioncontrol2" className="missioncontrol sitecontrols" style={{position:'fixed', top:'0', right:'2%', zIndex:'10', display: 'flex', justifyContent: 'space-around', fontSize: 'clamp(.8rem, 2.3vw, 2.5rem)', gap: '3vw', textAlign: 'center', maxHeight: '', alignItems: 'center', paddingTop: '5px' }}>

<div>
  <Theme style={{}} />
</div>

{showSwipe === true || socialMenuPages.some(page => currentPage.startsWith(page)) || showSwipe !== false ? (
  <Switch />
) : (
  ""
)}

</div>

) : (
  ""
)}
      </header>




      <main id="top" name="top" style={{height:'',}}>

      

      
        {children}

      <div className={`upbar button ${showBackToTop ? 'visible' : ''}`}
        style={{
          position: 'fixed',
          bottom: '80px',
          zIndex: '60',
          left: '',
          right: '1vw',
          display: 'flex',
          justifyContent: 'center',
          width: 'auto',
          maxWidth: '80vw',
          margin: '0 auto',
          gap: '5vw',
          padding: '0',
          border: 'none',
          borderRadius: '',
          textShadow: '0 1px 1px rgba(0, 0, 0, .7)',
          fontSize: '',
          verticalAlign: 'center',
          transform: showBackToTop ? 'translateY(0)' : 'translateY(300%)',
        }}
      >
        <AnchorLink
          to="#top"
          aria-label="Link to Top"
          onClick={scrollToTop}
          style={{ cursor: 'pointer', height: '', fontSize: '', border: 'none', outline: 'none' }}
          state={showModals ? { modal: true } : {}}
        >
          <div className="uparrow" style={{ display: 'flex', flexDirection: 'column', gap: '0', padding: '', alignItems: 'center', textAlign: 'center' }}>
            <RiArrowUpFill
            aria-label="Link to Top"
              className=""
              style={{ cursor: 'pointer', color: 'var(--theme-ui-colors-siteColorText)', fill: 'var(--theme-ui-colors-siteColorText)', fontSize: '3rem' }}
            />
          </div>
        </AnchorLink>
      </div>

      {showPWA ? (
<>
{!isRunningStandalone() && (
<PwaInstaller />
)}
</>
  ) : (
''
)}
      </main>
    
      
      {showfooter ? (
    <Footer />
      ) : (
        <footer className="" style={{display:'flex', flexDirection:'column', zIndex:'1', justifyContent:'end', padding:'0', marginTop:'0', width:'100vw',textAlign:'center'}}>
          {showBranding ? (
            <div style={{ textAlign: 'center', margin: '0 0 2rem 0', justifyContent: 'center', fontSize: '.75rem', position: 'relative', right: '', top: '10px' }}>
              <a className="panel" href="https://pirateweb.org" rel="noreferrer">{dicPirate}</a>
            </div>
          ) : (
            ""
          )}
        </footer>
      )}



      



<div id="gobacker"><GoBack /></div>






      {image ? (
        <img type="image/svg+xml" className="backimage" src={image} alt="Default Background" style={{}} width="10" height="10" />
      ) : (
        ""
      )}



      {/* {showConsent ? (
        <div style={{display:'flex', placeContent:'', position:'absolute', width:'100vw', margin:'0 auto', height:'100%', top:'50%', left:'', right:'', zIndex:'2', border:'0px solid blue'}}>
          <Consent />
          </div>
      ) : (
        ""
      )} */}







      {showNav2 ? (
        <div>

          <input type="checkbox" className="openSidebarMenu" id="openSidebarMenu" />
          <>{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
          <label htmlFor="openSidebarMenu" className="backdrop1"></label>

          <label id="menuicon" htmlFor="openSidebarMenu" className="sidebarIconToggle bug">
            <div style={{ textAlign: 'center', opacity: '1', maxWidth: '500px', color: 'var(--theme-ui-colors-headerColorText)', fontWeight: 'bold' }}>
              {iconimage ? (
                <img className="" src={iconimage} alt={companyname} width="120" height="60" style={{ maxHeight: '60px', maxWidth: '120px', border: 'none' }} />
              ) : (
                <div className="fire" style={{ opacity: '.6', fontWeight: '', color: '', border: '0px solid blue', padding: '1vh 2vw', marginRight: '4px', boxShadow: '0px 0px 0px 0px var(--theme-ui-colors-headerColorText)' }}>{companyname}</div>
              )}
            </div>
          </label>

          <div id="sidebarMenu" style={{ minWidth: '', width: '', }}>

            <ul className="sidebarMenuInner post-card panel" style={{ maxWidth: '260px', position: 'absolute', right: '0', display: '', justifyContent: '' }}>

              <li className="grad logo" style={{ position: 'relative', maxHeight: '100px', width: 'auto', display: 'flex', justifyContent: 'center' }}>
                <AnchorLink className="sidelogo" to="/" state={showModals ? { modal: true } : {}} name="homereturn" style={{ position: '', display: 'block', maxWidth: '150px', height: '60px', border: '0px solid' }} aria-label="Link to Top" title="Back to Top">
                  {iconimage ? (
                    <img src={iconimage} alt={companyname} width="120" height="60" style={{ maxHeight: '60px', border: 'none' }} />
                  ) : (
                    <div style={{ fontWeight: 'bold' }}>{companyname}</div>
                  )}
                </AnchorLink>
              </li>

              {/* <Menu id="sidechick" /> */}
              <Menu id="sidechick" />

              <li>
                <ul className="missioncontrol sitecontrols" style={{ display: 'flex', justifyContent: 'space-around', fontSize: 'clamp(.8rem, 2.3vw, 2.5rem)', gap: '', textAlign: 'center', maxHeight: '', alignItems: 'center', paddingTop: '5px' }}>

                  {showSearch ? (
                    <li className="searchIcon">
                      <Link state={showModals ? { modal: true } : {}} aria-label="Search" to="/search/" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '0px', textAlign: 'center' }}>
                        <SearchIcon style={{ height: '30px' }} />
                        <span className="themetext">{dicSearch}</span>
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}

                  <li>
                    <Theme style={{}} />
                  </li>

                  {showSwipe ? (
                    <li>
                      <Switch />
                    </li>
                  ) : (
                    ""
                  )}

                </ul>
              </li>

            </ul>
          </div>

        </div>
      ) : (
        ""
      )}



    </>
  );
};

export default Layout;
