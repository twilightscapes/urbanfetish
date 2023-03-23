import React, { useEffect, useState } from 'react';
import Seo from "./seo"
import { Link } from 'gatsby'
// import { ModalRoutingContext } from '@decantyme/gatsby-plugin-modal-routing'
// import { AiOutlineClose } from "react-icons/ai"
import { window } from "browser-monads"
import "../assets/scss/reset.scss"
import "../assets/scss/global.scss"
// import "../assets/scss/styles.css"
import { AnchorLink } from "gatsby-plugin-anchor-links"
// import { StoreContext } from "../context/store-context"
// import { Toast } from "./toast"
// import Bug from "../../static/assets/logo.svg"
// import SiteLogo from "../../static/assets/logo.svg"
import { Helmet } from "react-helmet"
import Theme from "./theme"
// import { CartButton } from "./cart-button"
import SearchIcon from "../../static/assets/search"
// import SearchForm from "./searchbox"
import useSiteMetadata from "../hooks/SiteMetadata"

import { RiCloseCircleFill, RiMenuUnfoldFill, RiArrowUpFill } from "react-icons/ri"

// import GoBack from "../components/goBack"

import { BiGridHorizontal } from "react-icons/bi"
import { MdOutlineRectangle } from "react-icons/md"


import Fullscreen from "../components/FullScreen"
// import ss from "../../static/assets/pagebg.webp"
// import { Link } from "gatsby-plugin-anchor-links"
// import { StaticImage } from "gatsby-plugin-image"
// import styled from "styled-components"
import SignUp from "../components/newssign"
// import Install from './install-discount'
// import { navigate } from "gatsby";
const Layout = ({ children }) => {

     // useEffect(() => {
    //   sessionStorage.setItem("scrollPos", window.pageYOffset)
    // }, [])
  
    // useEffect(() => {
    //   if (window.history.scrollRestoration) {
    //     const scrollPos = sessionStorage.getItem("scrollPos")
    //     window.history.scrollRestoration = "manual"
    //     window.scrollTo(0, scrollPos)
    //     window.history.scrollRestoration = "auto"
    //   }
    // }, [])


    useEffect(() => {
      let prevScrollpos = window.pageYOffset;
    
      window.onscroll = function() {
        const currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos && prevScrollpos - currentScrollPos > 5) {
          document.querySelector('.header').style.transform = 'translateY(0)';
          if (showNav2) {
            document.querySelector('#menuicon').style.transform = 'translateX(0)';
          }
          document.querySelector('.pagemenu').style.transform = 'translateY(220%)';
          // document.body.classList.remove('scroll');
          // document.body.classList.add('scroll');
        } else if (prevScrollpos < currentScrollPos && currentScrollPos - prevScrollpos > 5) {
          document.querySelector('.header').style.transform = 'translateY(-100%)';
          if (showNav2) {
            document.querySelector('#menuicon').style.transform = 'translateX(110%)';
          }
          document.querySelector('.pagemenu').style.transform = 'translateY(-200%)';
          document.body.classList.add('scroll');
        }
        prevScrollpos = currentScrollPos;
      };
    }, []);
  
      const [archiveView, setArchiveView] = useState('');
  
      useEffect(() => {
        // Retrieve the selected option from local storage or default to 'grid'
        const storedArchiveView = localStorage.getItem('archiveView');
        setArchiveView(storedArchiveView || 'swipe');
      }, []);
    
      useEffect(() => {
        // Apply the selected option on page load
        applyArchiveView();
      }, [archiveView]);
    
      const applyArchiveView = () => {
        const elements = document.querySelectorAll('.contentpanel');
        elements.forEach((el) => {
          if (archiveView === 'grid') {
            el.classList.remove('horizontal-scroll', 'panels');
            el.classList.add('grid-container');
            document.body.classList.add('scroll');
          } else if (archiveView === 'swipe') {
            el.classList.remove('grid-container');
            el.classList.add('horizontal-scroll', 'panels');
            document.body.classList.remove('scroll');
            if (showNav2) {
              document.querySelector('#menuicon').style.transform = 'translateX(110%)';
            }
          }
        });
        window.scrollTo(0, 0);
        localStorage.setItem('archiveView', archiveView);
      };
    
      const toggleArchiveView = () => {
        const newArchiveView = archiveView === 'grid' ? 'swipe' : 'grid';
        setArchiveView(newArchiveView);
        applyArchiveView();
      };














const { companyname } = useSiteMetadata()
const { iconimage } = useSiteMetadata()

// const { image } = useSiteMetadata()

const { showNav } = useSiteMetadata()
const { showNav2 } = useSiteMetadata()
const { showInfo } = useSiteMetadata()
const { showFeature } = useSiteMetadata()
const { showPosts } = useSiteMetadata()
const { showSearch } = useSiteMetadata()
const { showResume } = useSiteMetadata()
// const { showSocial } = useSiteMetadata()
const { showSkills } = useSiteMetadata()
// const { showCover } = useSiteMetadata()
// const { showfooter } = useSiteMetadata()
const { showPopup } = useSiteMetadata()
const { menu1 } = useSiteMetadata()
const { menu2 } = useSiteMetadata()
const { menu3 } = useSiteMetadata()
const { menu4 } = useSiteMetadata()
const { font1 } = useSiteMetadata()


  const QUERY = '(prefers-reduced-motion: no-preference)';
  const mediaQueryList = window.matchMedia(QUERY);
  const prefersReducedMotion = !mediaQueryList.matches;

  

const navStyle = {
  bg: "",
}

const fontUrl = "https://fonts.googleapis.com/css?family=" + font1 + "&display=swap"


  return (

<>




<Helmet>
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin="anonymous" /> 
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" /> 
{ !font1 ? (
''
  ) : (
    <link id="yyy" rel="stylesheet"
          href={fontUrl} crossorigin="anonymous" />
  )} 

  
</Helmet>

<Seo />


{/* <ModalRoutingContext.Consumer >
{({ modal, closeTo }) => (
<div style={{overflow:''}}>
  {modal ? (

    <div style={{display:'', position:'fixed', top:'10%', right:'3%', padding:'0px', fontSize:'2rem', background:'#111 !important', opacity:'1 !important', zIndex:'55 !important', filter:' drop-shadow(0px 4px 3px #000)', color:'#fff'}}>
    <Link state={{noScroll: true }} to={closeTo} style={{fontSize:'2rem',  textDecoration:'none', lineHeight:'', display:'flex', flexDirection:'column', color:'#fff', cursor:'pointer'}}>
      <AiOutlineClose />
    </Link>
    </div>

  ) : (
''
  )}

</div>
)}
</ModalRoutingContext.Consumer> */}


  


<div className="pagemenu upbar panel" style={{position:'fixed', bottom:'20px', zIndex:'4', left:'', right:'1vw', display:'flex', justifyContent:'center', width:'auto', maxWidth:'80vw', margin:'0 auto', gap:'5vw',	background:'rgba(0, 0, 0, .5)', padding:'', border:'1px solid #666', borderRadius:'', textShadow:'0 1px 1px rgba(0, 0, 0, .7)', fontSize:'', verticalAlign:'center', transform: 'translateY(200%)' }}>

<div className="menusnapp" style={{display:'flex', gap:'10px', padding:'1vh 1vw', alignItems:'center', textAlign:'center'}}>
  <AnchorLink to="#top" aria-label="Link to Top" style={{cursor:'pointer', height:'2vh', fontSize:'.2rem'}}><RiArrowUpFill style={{cursor:'pointer', color:'#999', fontSize:'2rem'}} />top</AnchorLink>
</div>
</div>







{showNav ? (
<div id="menu" className="menu print panel1 header" style={{position:'fixed', width:'100vw', top:'0', zIndex:'10', maxHeight:'', overFlow:'', boxShadow:'0 0 2px rgba(0,0,0,.7)', padding:'0 2%', alignItems:'start', borderRadius:'0', display:'flex', justifyContent:'space-around', gap:'10px', color:'#fff',  borderBottom:'1px solid #222', background:'#222'  }}>


{prefersReducedMotion ? (
    
            <button className="cornerlogo" style={{position:'relative', top:'', left:'4%', border:'0px solid white', borderBottom:'0px solid transparent'}} aria-label="Return to Home">
            {iconimage ? (
      <img className="" src={iconimage} alt={companyname} style={{maxHeight:'', border:'none'}} width="120" height="60" />
                ) : (
                  <div style={{fontWeight:'bold',}}>{companyname}</div>
                )}
            </button>
          
          ) : (
          
                        <AnchorLink to="/" className="cornerlogo" name="homereturn" style={{position:'', display:'block', maxWidth:'', height:'auto', border:'0px solid transparent'}}  aria-label="Link to Top" title="Back to Top">
            {iconimage ? (
      <img className="cornerlogo" style={{position:'relative', top:'.5vh', left:'4%', border:'0px solid white', padding:'0 1%', maxHeight:''}} src={iconimage} alt={companyname} width="107" height="60" />
                ) : (
                  <div style={{fontWeight:'bold',}}>{companyname}</div>
                )}
            </AnchorLink>
                        
          )}


          





<ul className="topmenu" sx={navStyle} style={{ fontSize:'clamp(.6rem, 1.6vw, 1.8rem)',  textAlign:'center',maxHeight:'', display:'flex', justifyContent:'space-between', gap:'4vw',  alignItems:'center', margin:'0 auto 0 auto', padding:'1.5vh 2% 0 2%', border:'0px solid white', textTransform:'uppercase'}}>
      





      
      
{/* <li>
   <ul className="has-app" style={{position:'', right:'1rem', top:'80px', display:'flex', flexDirection:'column', gap:'4px'}}>
            <li className="has-app1" style={{position:'relative', display:''}}>
            <Link to="/login" className="" style={{color:'#fff',fontSize:'clamp(1.2rem, 1.5vw, 3.4rem)',  width:'', justifyContent:'center', fontWeight:'', }}>Admin</Link>
              </li>




      <li className="has-app" order="5" style={{display:'',}}>
 <Link state={{modal: true}} to="/notes" className="" style={{fontSize:'clamp(1.2rem, 1.5vw, 3.4rem)',}}>Notes</Link>
 </li>
</ul>
</li>     */}





      





{/* <li className="has-app" order="5" style={{display:'none',}}>
 <Link state={{modal: true}} to="/posts" className="navbar-item" style={{paddingRight:'',}}>{menu2}</Link>
 </li> */}


      {/* {showPosts ? (
            <li className="" style={{position:'relative',}}>
            <AnchorLink ariaLabel="Menu 2" className="navbar-item" to="/archive/2" style={{paddingRight:'',}}>
            {menu2}
            </AnchorLink>
            </li>
            ) : (
  ""
)} */}





{/* {showPosts ? (
<li style={{position:'relative',}}>
      {prefersReducedMotion ? (
       <Link aria-label="Menu 2" className="navbar-item" to="/#showPosts" style={{paddingRight:'',}}>{menu2}</Link>    
   ) : (
      <AnchorLink aria-label="Menu 2" className="navbar-item" to="/#showPosts" style={{paddingRight:'',}}>
      {menu2}</AnchorLink>         
    )}
</li>
      ) : (
  ""
)} */}




{showFeature ? (
<li style={{position:'relative',}}>
      {prefersReducedMotion ? (
       <Link aria-label="Featured" className="navbar-item" to="/#showPosts" style={{paddingRight:'',}}>{menu2}</Link>    
   ) : (
      <AnchorLink aria-label="Featured" className="navbar-item" to="/#showPosts" style={{paddingRight:'',}}>
      {menu2}</AnchorLink>         
    )}
</li>
      ) : (
  ""
)}









{/* {showInfo ? (
<li style={{position:'relative',}}>
      {prefersReducedMotion ? (
       <Link aria-label="Menu 1" className="navbar-item" to="/#info" style={{paddingRight:'',}}>{menu1}</Link>    
   ) : (
      <AnchorLink aria-label="Menu 1" className="navbar-item" to="/#info" style={{paddingRight:'',}}>
      {menu1}</AnchorLink>         
    )}
<AnchorLink aria-label="Menu 1" className="navbar-item" to="/about" style={{paddingRight:'',}}>
      About</AnchorLink>   

</li>
      ) : (
  ""
)} */}


<li style={{position:'relative',}}>

      <AnchorLink aria-label="Menu 1" className="navbar-item" to="/category/" style={{paddingRight:'',}}>
      Magazine</AnchorLink>         

</li>






<li style={{position:'relative',}}>

      <AnchorLink aria-label="Menu 1" className="navbar-item" to="/contact" style={{paddingRight:'',}}>
      Submissions</AnchorLink>         

</li>




{showResume ? (
<li style={{position:'relative',}}>
      {prefersReducedMotion ? (
       <Link aria-label="Menu 3" className="navbar-item" to="/#resume" style={{paddingRight:'',}}>{menu3}</Link>    
   ) : (
      <AnchorLink aria-label="Menu 3" className="navbar-item" to="/#resume" style={{paddingRight:'',}}>
      {menu3}</AnchorLink>         
    )}
</li>
      ) : (
  ""
)}




{showSkills ? (
<li style={{position:'relative',}}>
      {prefersReducedMotion ? (
       <Link className="navbar-item" to="/#skills" style={{paddingRight:'',}}>{menu4}</Link>    
   ) : (
      <AnchorLink aria-label="Menu 4" className="navbar-item" to="/#skills" style={{paddingRight:'',}}>
      {menu4}</AnchorLink>         
    )}
</li>
      ) : (
  ""
)}

{/* <li>
<Link aria-label="Contact" className="navbar-item" to="/contact" style={{paddingRight:'',}}>Submissions</Link> 
</li> */}


{/* <li className="carto crypto" style={{border:'none', display:'flex', justifyContent:'space-around', verticalAlign:'center', padding:'5px 0 0 0' , background:'rgba(0,0,0,0)' }}>
  
  <Theme  style={{padding:'0'}} />
  <SearchIcon />
  </li> */}
</ul>

<div id="missioncontrol" className="sitecontrols" style={{display:'flex', justifyContent:'space-around', fontSize:'clamp(.8rem, 2.3vw, 2.5rem)', gap:'3vw', textAlign:'center', maxHeight:'', alignItems:'center', padding:'.5% .5% 0 0'}}>

{showSearch ? (
<div>
   <Link aria-label="Search UrbanFetish" to="/search/" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:'0px', textAlign:'center'}}>
    <SearchIcon style={{}} />
    <span className="themetext">search</span>
   </Link>
        </div>
      ) : (
        ""
      )}


  <div>
      <Theme  style={{}} />
        </div>

  
  <div>

  <button
  aria-label="Grid/Swipe View"
  onClick={toggleArchiveView}
  style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "0px",
    textAlign: "center",
  }}
>
  {archiveView === "grid" ? (
    <MdOutlineRectangle style={{ width: "30px", height: "30px" }} />
  ) : (
    <BiGridHorizontal style={{ width: "30px", height: "30px" }} />
  )}
  <span className="themetext">
    {archiveView === "grid" ? "swipe" : "scroll"}
  </span>
</button>



  {/* <button onClick={toggleArchiveView}>Toggle Archive View</button> */}
    {/* <button aria-label="Dark/Light Mode" onClick={toggleArchiveView} style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:'0px', textAlign:'center'}}>
      {archiveView === 'grid' ? <MdOutlineRectangle  style={{width:'3vh', height:'3vw'}} /> : <BiGridHorizontal  style={{width:'4vh', height:'3vw'}} /> }
      <span className="themetext">{archiveView === 'grid' ? 'swipe' : ' scroll '}</span>
    </button> */}
</div>

 

    {/* <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:'10px', textAlign:'center'}}>
   
   <Fullscreen style={{width:'', height:''}} />
   <span className="themetext">fullscreen</span>

        </div> */}
</div>
      

        
           
      

            </div>

) : (
  ""
)}

{/* <div id="gobacker" style={{position:'absolute', top:'50px', right:'3vw', zIndex:'2'}}><GoBack /></div> */}


<header id="top" name="pagetop" style={{}} >



{showNav2 ? (

<>
<input type="checkbox" className="openSidebarMenu" id="openSidebarMenu" />
<>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }</>
  <label htmlFor="openSidebarMenu" className="backdrop1" ></label>

<label id="menuicon" htmlFor="openSidebarMenu" className="sidebarIconToggle bug">
<div style={{textAlign:'center', opacity:'1', textShadow:'2px 2px 10px 2px #000', maxWidth:'500px', color:'#fff', fontWeight:'bold', border:'0px solid blue'}}>

{/* <Bug className="bug" style={{fontSize:'38px', maxWidth:'', opacity:'1', margin:'0 0 0 0', width:'100%', display:'none' }}/>  */}
{iconimage ? (
      <img className="" src={iconimage} alt={companyname} width="120" height="60" style={{maxHeight:'60px', maxWidth:'120px', border:'none'}} />
                ) : (
                  <div style={{fontWeight:'bold', color:'yellow'}}>companyname</div>
                )}

</div>
  </label>

  





   <div id="sidebarMenu" style={{minWidth:'', width:'',}}>
  
{/* <div className="no-app promocode">
30% OFF CODE: <span style={{color:'var(--primary-color)', fontWeight:'bold'}}>LoveTheNight</span>
</div> */}

  

    <ul className="sidebarMenuInner post-card panel" style={{maxWidth:'400px', position:'absolute', right:'0', display:'', justifyContent:''}}>

    <li className="grad logo" style={{position:'relative', maxHeight:'100px', width:'auto', display:'flex', justifyContent:'center'}}>
            <AnchorLink to="/" name="homereturn" style={{position:'', display:'block', maxWidth:'150px', height:'60px', border:'0px solid'}}  aria-label="Link to Top" title="Back to Top">
            {iconimage ? (
      <img className="" src={iconimage} alt={companyname} width="120" height="60" style={{maxHeight:'60px', border:'none'}} />
                ) : (
                  <div style={{fontWeight:'bold'}}>companyname</div>
                )}
            </AnchorLink>
          </li>
      
      


   
            

          {showPosts ? (
<li style={{position:'relative',}}>
      {prefersReducedMotion ? (
       <Link aria-label="Menu 2" className="navbar-item" to="/#showPosts" style={{paddingRight:'',}}>{menu2}</Link>    
   ) : (
      <AnchorLink aria-label="Menu 2" className="navbar-item" to="/#showPosts" style={{paddingRight:'',}}>
      {menu2}</AnchorLink>         
    )}
</li>
      ) : (
  ""
)}




{showInfo ? (
  <li className="no-app" style={{position:'relative',}}>
      {prefersReducedMotion ? (
       <Link aria-label={menu1} className="navbar-item" to="/#info" style={{paddingRight:'',}}>{menu1}</Link>    
   ) : (
      <AnchorLink aria-label={menu1} className="navbar-item" to="/#info" style={{paddingRight:'',}}>
      {menu1}</AnchorLink>         
    )}
</li>
      ) : (
  ""
)}


          





       
{showResume ? (
            <li className="" style={{position:'relative',}}>
              <AnchorLink className="navbar-item" to="/#resume" style={{paddingRight:'',}}>
              {menu3}
              </AnchorLink>
              </li>
            ) : (
              ""
            )}



{showSkills ? (
              <li className="" style={{position:'relative',}}>
              {/* <AnchorLink to="/#contact" className="navbar-item" style={{paddingRight:'',}}>
                Contact <span className="mobilehide">Me</span>
              </AnchorLink> */}
      
              <AnchorLink className="navbar-item" to="/#skills" style={{paddingRight:'',}}>{menu4}</AnchorLink>
              </li>

              ) : (
  ""
)}



<li style={{position:'relative',}}>
       <Link aria-label="Menu 2" className="navbar-item" to="/archive/2" style={{paddingRight:'',}}>Archive</Link>    
</li>




{/* <li className="has-app" order="5" style={{display:'none',}}>
 <Link state={{modal: true}} to="/notes" className="navbar-item" style={{paddingRight:'',}}>Notes</Link>
 </li>

 <li className="has-app" style={{position:'relative', display:'none'}}>
            <Link to="/login" className="navbar-item" style={{color:'#fff', fontSize:'clamp(1.2rem, 1.5vw, 3.4rem)', width:'', justifyContent:'center',fontWeight:'bold', }}>Admin</Link>
              </li> */}




  <li className="carto crypto" style={{border:'none', display:'flex', justifyContent:'space-around', gap:'1vw', verticalAlign:'center', padding:'5px 0 0 0' , background:'rgba(0,0,0,0)', color:'red !important' }}>
      

      

   <Link aria-label="Search UrbanFetish" className="sherlock" to="/search/" style={{display:'flex',justifyContent:'space-around', marginTop:'5px'}}>
    <SearchIcon />
   </Link>
    

<Theme  style={{}} />


   <Link aria-label="Enter Full Screen Mode" className="sherlock" to="/search/" style={{display:'flex',justifyContent:'space-around', marginTop:'5px'}}>
   <Fullscreen />
   </Link>
        </li>





      {/* <li className="carto crypto" style={{border:'none', display:'flex', justifyContent:'space-around', verticalAlign:'center', padding:'5px 0 0 0' , background:'rgba(0,0,0,0)', color:'red !important' }}>
      <Theme  style={{color:'red !important'}} />
   <Link className="sherlock" to="/search/" style={{display:'flex',justifyContent:'space-around', marginTop:'5px'}}>
    <SearchIcon />
   </Link>
   <CartButton quantity={quantity} />
        </li> */}

    </ul>

  </div>
  </>

) : (
  ""
)}




{showPopup ? (
//  <ScrollAnimation className="signup" animateIn="bounceInDown" delay={5000} initiallyVisible={false} animateOnce={true} animatePreScroll={true} style={{position:'absolute', top:'15vh', zIndex:'1', margin:'0 auto', padding:'',  width:'100vw', textAlign:'',}}>
//  <div style={{position:'relative', bottom:'', margin:'70px auto 0 auto', padding:' 0',  maxWidth:'500px', zIndex:'', textAlign:'', borderRadius:'12px',}}>
//  <SignUp />
//    </div>
//  </ScrollAnimation>

<div className="signup popper"
  style={{
  position:'fixed',
  top:'15vh',
  left:'20vw',
  right:'20vw',
  zIndex:'1',
  margin:'70px auto 0 auto',
  padding:' 0',
  maxWidth:'500px',
  borderRadius:'12px',
  // display:'grid',
  // placeSelf:'center',
  }}>
<SignUp />
  </div>

      ) : (
        ""
      )}
     

</header>

<div style={{maxWidth:'100vw', overflowX:'hidden', position:'relative'}}>
{children}
</div>
      
{/* <img className="backimage" src={image} alt="Default Background" style={{height:'100vh', width:'100vw', position:'fixed', zIndex:'-2', top:'0', objectFit:'cover',}} width="10" height="10" /> */}



      
      {/* <Consent /> */}
     {/* <Install /> */}
      {/* <Footer /> */}
      
      </>

    
    );
  };
  
  export default Layout;