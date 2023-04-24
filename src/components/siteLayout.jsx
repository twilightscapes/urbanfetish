import React, { useEffect, useState, useCallback } from 'react';
import Seo from "./seo"
import { Link } from 'gatsby-plugin-modal-routing-4'
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
import SearchIcon from "../../src/img/search"
// import SearchForm from "./searchbox"
import useSiteMetadata from "../hooks/SiteMetadata"
import { RiArrowUpFill } from "react-icons/ri"
import GoBack from "../components/goBack"
import { BiLeftArrow } from "react-icons/bi"
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing-4'
// import { AiOutlineClose } from "react-icons/ai"
import { BiGridHorizontal } from "react-icons/bi"
import { MdOutlineRectangle } from "react-icons/md"
import Menu from "../components/menu"
import userStyles from "../util/userStyles.json"
import SignUp from "../components/newssign"




const Layout = ({ children }) => {




const { companyname } = useSiteMetadata()
const { iconimage } = useSiteMetadata()

const { image } = useSiteMetadata()

// const { showModals } = useSiteMetadata()

const { showNav } = useSiteMetadata()
const { showNav2 } = useSiteMetadata()
// const { showInfo } = useSiteMetadata()
// const { showFeature } = useSiteMetadata()
// const { showPosts } = useSiteMetadata()
const { showSearch } = useSiteMetadata()

// const { showResume } = useSiteMetadata()
// const { showSocial } = useSiteMetadata()
// const { showSkills } = useSiteMetadata()
// const { showCover } = useSiteMetadata()
// const { showfooter } = useSiteMetadata()
const { showPopup } = useSiteMetadata()
// const { menu1 } = useSiteMetadata()
// const { menu2 } = useSiteMetadata()
// const { menu3 } = useSiteMetadata()
// const { menu4 } = useSiteMetadata()
const { font1 } = useSiteMetadata()
// const { userStyles } = useSiteMetadata()



const { showSwipe } = useSiteMetadata()
const [archiveView, setArchiveView] = useState('');

const applyArchiveView = useCallback(() => {
  const elements = document.querySelectorAll(".contentpanel");
  elements.forEach((el) => {
    if (archiveView === "grid") {
      el.classList.remove("horizontal-scroll", "panels");
      el.classList.add("grid-container");
      // document.body.classList.add("scrollable");
      // document.querySelector('#showPosts').style.height = 'auto';
      // window.scrollTo(0, 0);
    } else if (archiveView === "swipe") {
      el.classList.remove("grid-container");
      el.classList.add("horizontal-scroll", "panels");
      // document.body.classList.remove("scrollable");

      document.querySelector('.contentpanel').style.transition = 'all .5s ease-in-out';
      // document.querySelector('#showPosts').style.height = '600px';
      window.scrollTo(0, 0);
    }
  });
  localStorage.setItem("archiveView", archiveView);
}, [archiveView]);

useEffect(() => {
  sessionStorage.setItem("currentScrollPos", window.pageYOffset)
  let prevScrollpos = window.pageYOffset;

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos && prevScrollpos - currentScrollPos > 75) {
      // document.querySelector('.header').style.transform = 'translateY(0)';
      if (showNav2) {
        document.querySelector('#menuicon').style.transform = 'translateX(0)';
      }
      document.querySelector('.upbar').style.transform = 'translateY(140px)';
      // document.body.classList.remove('scroll');
      // document.body.classList.add('scroll');
    } else if (prevScrollpos < currentScrollPos && currentScrollPos - prevScrollpos > 75) {
      // document.querySelector('.header').style.transform = 'translateY(-100px)';
      if (showNav2) {
        document.querySelector('#menuicon').style.transform = 'translateX(200px)';
      }
      document.querySelector('.upbar').style.transform = 'translateY(-100px)';
      // document.body.classList.add('scroll');
    }
    prevScrollpos = currentScrollPos;
  };

  handleScroll();

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  }
}, [showNav2]);

useEffect(() => {
  if (showSwipe) {
    // Retrieve the selected option from local storage or default to 'grid' or 'swipe'
    const storedArchiveView = localStorage.getItem("archiveView");
    setArchiveView(
      storedArchiveView || (showSwipe ? "swipe" : "grid")
    );
  }
}, [showSwipe]);

useEffect(() => {
  // Apply the selected option on page load
  applyArchiveView();
}, [applyArchiveView]);

const toggleArchiveView = () => {
  const newArchiveView = archiveView === "grid" ? "swipe" : "grid";
  setArchiveView(newArchiveView);
  applyArchiveView();
};
















  const QUERY = '(prefers-reduced-motion: no-preference)';
  const mediaQueryList = window.matchMedia(QUERY);
  const prefersReducedMotion = !mediaQueryList.matches;

  

const navStyle = {
  bg: "",
}

const fontUrl = "https://fonts.googleapis.com/css?family=" + font1.replace(/\s+/g, '+') + "&display=swap";




  return (

<>




<Helmet>
  <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  {font1 ? (
    <link id="yyy" rel="stylesheet" href={fontUrl} crossOrigin="anonymous" referrerPolicy="no-referrer-when-downgrade" />
  ) : null}
  <style>{`
    #menu,.font,.full-width-image:after,.h1,.h2,.h3,.h4,.header .menu-icon:before,.horizontal-scroll:before,.intro:after,.intro:before,.scrolldown,h1,h2,h3,h4,input.special{font-family:${font1}, sans-serif}
    ${userStyles.userStyles}
  `}</style>
</Helmet>







<Seo />


<div id="top" name="pagetop"></div>


<ModalRoutingContext.Consumer >
{({ modal, closeTo }) => (
<>
  {modal ? (
    <div style={{display:'', position:'fixed', top:'80px', right:'3%', padding:'0px', fontSize:'', opacity:'1 !important', zIndex:'105', filter:' drop-shadow(0px 4px 3px #000)', color:'#fff', border:'1px solid red !important'}}>
    <Link state={{noScroll: true }} to={closeTo} style={{fontSize:'',  textDecoration:'none', lineHeight:'', display:'flex', flexDirection:'column', color:'#fff', cursor:'pointer'}}>
    <button className="button" style={{display:'flex', justifyContent:'center'}}><span className="icon -left" style={{paddingRight:''}}><BiLeftArrow /></span> {" "}Go Back</button>
    </Link>
   
    </div>
  ) : (
''
  )}
</>
)}
</ModalRoutingContext.Consumer>
  


<div className="upbar button" style={{position:'fixed', bottom:'20px', zIndex:'4', left:'', right:'1vw', display:'flex', justifyContent:'center', width:'auto', maxWidth:'80vw', margin:'0 auto', gap:'5vw', padding:'0', border:'1px solid #666', borderRadius:'', textShadow:'0 1px 1px rgba(0, 0, 0, .7)', fontSize:'', verticalAlign:'center', transform: 'translateY(200%)' }}>

<div className="uparrow" style={{display:'flex', flexDirection:'column', gap:'0', padding:'1vh 1vw', alignItems:'center', textAlign:'center'}}>
  <a href="#top" onClick={(e) => {
  e.preventDefault();
  document.getElementById('top').scrollIntoView({ behavior: 'smooth' });
}} aria-label="Link to Top" style={{cursor:'pointer', height:'', fontSize:''}}>
  <RiArrowUpFill className="" style={{cursor:'pointer', color:'#ddd', fontSize:'3rem'}} />
</a>
</div>
</div>



<div id="gobacker" style={{position:'fixed', top:'60px', right:'3vw', zIndex:'5'}}><GoBack /></div>



{showNav ? (
<div id="menu" className="menu print panel1 header" style={{position:'fixed', width:'100vw', top:'0', zIndex:'10', maxHeight:'', overFlow:'', boxShadow:'0 0 2px rgba(0,0,0,.7)', padding:'0 2%', alignItems:'start', borderRadius:'0', display:'flex', justifyContent:'space-around', gap:'10px', color:'#fff',  borderBottom:'1px solid #222',

  }}>


{prefersReducedMotion ? (
    <Link to="/" className="cornerlogo" name="homereturn" style={{position:'', display:'block', maxWidth:'', height:'auto', border:'0px solid transparent'}}  aria-label="Link to Top" title="Back to Top">
            <button className="cornerlogo" style={{position:'relative', top:'', left:'4%', border:'0px solid white', borderBottom:'0px solid transparent'}} aria-label="Return to Home">
            {iconimage ? (
      <img className="" src={iconimage} alt={companyname} style={{maxHeight:'', border:'none'}} width="117" height="60" />
                ) : (
                  <div style={{fontWeight:'bold',}}>{companyname}</div>
                )}
            </button>
            </Link>
          ) : (
          
                        <Link to="/" className="cornerlogo" name="homereturn" style={{position:'', display:'block', maxWidth:'', height:'auto', border:'0px solid transparent'}}  aria-label="Link to Top" title="Back to Top">
            {iconimage ? (
      <img className="cornerlogo" style={{position:'relative', top:'', left:'4%', border:'0px solid white', padding:'0', maxHeight:''}} src={iconimage} alt={companyname} width="117" height="60" />
                ) : (
                  <div style={{fontWeight:'bold',}}>{companyname}</div>
                )}
            </Link>
                        
          )}


          





<ul className="topmenu" sx={navStyle} style={{ fontSize:'clamp(.6rem, 1.6vw, 1.8rem)',  textAlign:'center',maxHeight:'', display:'flex', justifyContent:'space-between', gap:'4vw',  alignItems:'center', margin:'0 auto 0 auto', padding:'1.5vh 2% 0 2%', border:'0px solid white',}}>
      





      
 

{/* {showInfo ? (
<li style={{position:'relative',}}>
      {prefersReducedMotion ? (
       <Link aria-label="Menu 1" className="navbar-item" to="/#info" style={{paddingRight:'',}}>{menu1}</Link>    
   ) : (
      <AnchorLink aria-label="Menu 1" className="navbar-item" to="/#info" style={{paddingRight:'',}}>
      {menu1}</AnchorLink>         
    )}
</li>
      ) : (
  ""
)}

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
)} */}


<Menu />







</ul>

<div id="missioncontrol" className="missioncontrol sitecontrols" style={{display:'flex', justifyContent:'space-around', fontSize:'clamp(.8rem, 2.3vw, 2.5rem)', gap:'3vw', textAlign:'center', maxHeight:'', alignItems:'center', paddingTop:'5px'}}>

{showSearch ? (
<div>
   <Link aria-label="Search UrbanFetish" to="/search/" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:'0px', textAlign:'center'}}>
    <SearchIcon style={{height:'30px'}} />
    <span className="themetext">search</span>
   </Link>
        </div>
      ) : (
        ""
      )}


  <div>
      <Theme  style={{}} />
        </div>

  
        {showSwipe ? (
  <div>
  <button
  aria-label="Grid/Swipe View"
  onClick={toggleArchiveView}
  className="swipescroll"
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
    <MdOutlineRectangle style={{ width: "40px", height: "30px" }} />
  ) : (
    <BiGridHorizontal style={{ width: "40px", height: "30px" }} />
  )}
  <span className="themetext">
    {archiveView === "grid" ? "swipe" : "scroll"}
  </span>
</button>
</div>
      ) : (
        ""
      )}
 


</div>
      

        
           
      

            </div>

) : (
  ""
)}





<header>
{showNav2 ? (

<>

<input type="checkbox" className="openSidebarMenu" id="openSidebarMenu" />
<>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }</>
  <label htmlFor="openSidebarMenu" className="backdrop1" ></label>

<label id="menuicon" htmlFor="openSidebarMenu" className="sidebarIconToggle bug">
<div style={{textAlign:'center', opacity:'1', textShadow:'2px 2px 10px 2px #000', maxWidth:'500px', color:'#fff', fontWeight:'bold', border:'0px solid blue'}}>
{iconimage ? (
      <img className="" src={iconimage} alt={companyname} width="120" height="60" style={{maxHeight:'60px', maxWidth:'120px', border:'none'}} />
                ) : (
                  <div style={{fontWeight:'bold', color:'yellow'}}>companyname</div>
                )}
</div>
  </label>

  

   <div id="sidebarMenu" style={{minWidth:'', width:'',}}>

<ul className="sidebarMenuInner post-card panel" style={{maxWidth:'260px', position:'absolute', right:'0', display:'', justifyContent:''}}>

    <li className="grad logo" style={{position:'relative', maxHeight:'100px', width:'auto', display:'flex', justifyContent:'center'}}>
            <AnchorLink className="sidelogo" to="/" name="homereturn" style={{position:'', display:'block', maxWidth:'150px', height:'60px', border:'0px solid'}}  aria-label="Link to Top" title="Back to Top">
            {iconimage ? (
      <img src={iconimage} alt={companyname} width="120" height="60" style={{maxHeight:'60px', border:'none'}} />
                ) : (
                  <div style={{fontWeight:'bold'}}>companyname</div>
                )}
            </AnchorLink>
    </li>
      
{/* {showInfo ? (
<li style={{position:'relative',}}>
      {prefersReducedMotion ? (
       <Link aria-label="Menu 1" className="navbar-item" to="/#info" style={{paddingRight:'',}}>{menu1}</Link>    
   ) : (
      <AnchorLink aria-label="Menu 1" className="navbar-item" to="/#info" style={{paddingRight:'',}}>
      {menu1}</AnchorLink>         
    )}
</li>
      ) : (
  ""
)}

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
)} */}

<Menu />

<li>
<ul className="missioncontrol sitecontrols" style={{display:'flex', justifyContent:'space-around', fontSize:'clamp(.8rem, 2.3vw, 2.5rem)', gap:'', textAlign:'center', maxHeight:'', alignItems:'center', paddingTop:'5px'}}>

{showSearch ? (
<li>
   <Link aria-label="Search UrbanFetish" to="/search/" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:'0px', textAlign:'center'}}>
    <SearchIcon style={{height:'30px'}} />
    <span className="themetext">search</span>
   </Link>
        </li>
      ) : (
        ""
      )}


  <li>
      <Theme  style={{}} />
        </li>

  
        {showSwipe ? (
  <li>
  <button
  aria-label="Grid/Swipe View"
  onClick={toggleArchiveView}
  className="swipescroll"
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
    <MdOutlineRectangle style={{ width: "40px", height: "30px" }} />
  ) : (
    <BiGridHorizontal style={{ width: "40px", height: "30px" }} />
  )}
  <span className="themetext">
    {archiveView === "grid" ? "swipe" : "scroll"}
  </span>
</button>
</li>
      ) : (
        ""
      )}


</ul>
</li>

</ul>
</div>
</>


) : (
  ""
)}










</header>



{showPopup ? (
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




<div style={{maxWidth:'', overflowX:'hidden', position:'relative'}}>
{children}
</div>
      


 

{image ? (
<img className="backimage" src={image} alt="Default Background" style={{height:'100vh', width:'100vw', position:'fixed', zIndex:'-2', top:'0', objectFit:'cover',}} width="10" height="10" />
) : (
  ""
)}

      

      
      </>

    
    );
  };
  
  export default Layout;

  