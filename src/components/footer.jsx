import * as React from "react"
import useSiteMetadata from "../hooks/SiteMetadata"
// import GoBack from "../components/goBack"
// import Theme from "../components/theme"
import Consent from "./Consent"
// import Install from "./install-footer"
import Icons from "../../static/data/socialmedia.json"
import {
  RiFacebookBoxFill,
  RiLinkedinBoxFill,
  RiYoutubeFill,
  RiInstagramFill,
  RiRssFill,
  RiGithubFill,
  RiTelegramFill,
  RiPinterestFill,
  RiSnapchatFill,
  RiSkypeFill,
  RiDribbbleFill,
  RiMediumFill,
  RiBehanceFill,
} from "react-icons/ri"
import { FaWordpress, FaVk } from "react-icons/fa"
import Xlogo from "../img/xcorp-logo.svg"
import Menu from "../components/menu"
import { Link } from "gatsby"
// import {
//   footerStyle,
//   // links,
//   blurb,
//   // logos,
// } from "./footer.module.css"
import BlueCheck from './bluecheck';
import SearchIcon from "../../src/img/search"
import Theme from "./theme"
import Switch from "../components/Switch"

const sIcons = Icons.socialIcons.map((icons, index) => {




  return (


    <div key={"social icons" + index}>
      {icons.icon === "facebook" ? (
        <a aria-label="Link to Facebook" title="Facebook" className="social" href={icons.url} rel="noreferrer" target="_blank">
          <RiFacebookBoxFill />
        </a>
      ) : (
        ""
      )}
      {icons.icon === "x-twitter" ? (
        <a aria-label="Link to Twitter X" title="The App Formerly known as Twitter" className="social" href={icons.url} rel="noreferrer" target="_blank">
        <Xlogo style={{maxWidth:'30px'}} />
      </a>
      ) : (
        ""
      )}
      {icons.icon === "linkedin" ? (
        <a aria-label="Link to LinkIn" title="LinkedIn" className="social" href={icons.url} rel="noreferrer" target="_blank">
          <RiLinkedinBoxFill />
        </a>
      ) : (
        ""
      )}
      {icons.icon === "youtube" ? (
        <a aria-label="Link to YouTube" title="YouTube" className="social" href={icons.url} rel="noreferrer" target="_blank">
          <RiYoutubeFill />
        </a>
      ) : (
        ""
      )}
      {icons.icon === "instagram" ? (
        <a aria-label="Link to Instagram" title="Instgram" className="social" href={icons.url} rel="noreferrer" target="_blank">
          <RiInstagramFill />
        </a>
      ) : (
        ""
      )}
      {icons.icon === "rss" ? (
        <a aria-label="Link to RSS" className="social" href={icons.url} rel="noreferrer" target="_blank">
          <RiRssFill style={{maxWidth:'35px'}} />
        </a>
      ) : (
        ""
      )}
      {icons.icon === "github" ? (
        <a aria-label="Link to GitHub" title="GitHub" className="social" href={icons.url} rel="noreferrer" target="_blank">
          <RiGithubFill />
        </a>
      ) : (
        ""
      )}
      {icons.icon === "telegram" ? (
        <a aria-label="Link to Telegram" title="Telegram" className="social" href={icons.url} rel="noreferrer" target="_blank">
          <RiTelegramFill />
        </a>
      ) : (
        ""
      )}
      {icons.icon === "pinterest" ? (
        <a aria-label="Link to Pinterest" title="Pinterest" className="social" href={icons.url} rel="noreferrer" target="_blank">
          <RiPinterestFill />
        </a>
      ) : (
        ""
      )}
      {icons.icon === "snapchat" ? (
        <a aria-label="Link to SnapChat" title="SnapChat" className="social" href={icons.url} rel="noreferrer" target="_blank">
          <RiSnapchatFill />
        </a>
      ) : (
        ""
      )}
      {icons.icon === "skype" ? (
        <a aria-label="Link to Skype" title="Skype" className="social" href={icons.url} rel="noreferrer" target="_blank">
          <RiSkypeFill />
        </a>
      ) : (
        ""
      )}
      {icons.icon === "wordpress" ? (
        <a aria-label="Link to WordPress" title="WordPress" className="social" href={icons.url} rel="noreferrer" target="_blank">
          <FaWordpress />
        </a>
      ) : (
        ""
      )}
      {icons.icon === "dribbble" ? (
        <a aria-label="Link to Dribble" title="Dribble" className="social" href={icons.url} rel="noreferrer" target="_blank">
          <RiDribbbleFill />
        </a>
      ) : (
        ""
      )}
      {icons.icon === "medium" ? (
        <a aria-label="Link to Medium" title="Medium" href={icons.url} rel="noreferrer" target="_blank">
          <RiMediumFill />
        </a>
      ) : (
        ""
      )}
      {icons.icon === "behance" ? (
        <a aria-label="Link to Behance" title="Behance" href={icons.url} rel="noreferrer" target="_blank">
          <RiBehanceFill />
        </a>
      ) : (
        ""
      )}
      {icons.icon === "vk" ? (
        <a aria-label="Link to VK" title="VK" className="social" href={icons.url} rel="noreferrer" target="_blank">
          <FaVk />
        </a>
      ) : (
        ""
      )}
    </div>

  )
})









export default function Footer() {
  const { siteUrl } = useSiteMetadata();

  const speedIt = "https://googlechrome.github.io/lighthouse/viewer/?psiurl=" + siteUrl + "%2F&amp;strategy=mobile&amp;category=performance&amp;category=accessibility&amp;category=best-practices&amp;category=seo&amp;category=pwa&amp;utm_source=lh-chrome-ext"



  const { language, navOptions, featureOptions, proOptions } = useSiteMetadata();

  const { showFooterMenu } = navOptions

  const { showfooter, showSwipe, showSearch, showSocial  } = featureOptions

  const { showModals, showBranding, showLegal, showContact, showConsent   } = proOptions

  const { dicSocial, dicDisclaimer, dicPrivacy, dicTerms, dicCopyright, dicContact, dicPirate, dicSiteReport, dicSearch } = language;


  const { iconimage } = useSiteMetadata()


  const { companyname } = useSiteMetadata()

  function isRunningStandalone() {
    if (typeof window !== 'undefined') {
        return window.matchMedia('(display-mode: standalone)').matches;
    }
    return false;
}


  return (


<>

{isRunningStandalone() ? (
  ""
) : (

  <>

    {showfooter ? (
      <footer className="panel" style={{display:'flex', flexDirection:'column', zIndex:'', justifyContent:'end', padding:'0 0 60px 0', marginTop:'0', width:'100vw',textAlign:'center', background:'var(--theme-ui-colors-headerColor)', paddingTop: showFooterMenu ? '100px' : '0'}}>

{showConsent ? (
    <Consent />
  ) : (
""
    )}


    
{showFooterMenu ? (
  <div className="menu print panel1" style={{}}>
    <div id="footermenu" className="menu print panel1 header" style={{position:'absolute', width:'100%', top:'0', zIndex:'10', maxHeight:'', overFlow:'', boxShadow:'0 0 0 rgba(0,0,0,.7)', padding:'0 2%', marginBottom:'', alignItems:'start', borderRadius:'0', display:'flex', justifyContent:'space-around', gap:'10px', color:'var(--theme-ui-colors-headerColorText)',  borderBottom:'0px solid #222',}}>

      <div style={{position:'absolute', left:'10px', top:'22px', cursor:'pointer'}}><BlueCheck /></div>

      <Link state={showModals ? { modal: true } : {}} to="/" className="cornerlogo" name="homereturn" style={{position:'', display:'flex', marginLeft:'25px', alignItems:'center', justifyContent:'center', maxWidth:'', height:'60px', border:'0px solid transparent'}}  aria-label="Link to Top" title="Back to Top">
        {iconimage ? (
          <img className="cornerlogo" style={{position:'relative', top:'', left:'4%', border:'0px solid white', padding:'0', maxHeight:'60px'}} src={iconimage} alt={companyname} width="111" height="60" />
        ) : (
          <div style={{fontWeight:'', display:'grid', justifyContent:'center', alignItems:'center', height:'', fontSize:'clamp(.9rem,2vw,1rem)', color:'var(--theme-ui-colors-headerColorText)', maxWidth:'50vw' }}>
            {/* {truncateText(companyname, 28)} */}
            {companyname}
          </div>
        )}
      </Link>

      <ul className="topmenu" style={{ fontSize:'clamp(.6rem, 1.6vw, 1.8rem)',  textAlign:'center',maxHeight:'', display:'flex', justifyContent:'space-between', gap:'4vw',  alignItems:'center', margin:'0 auto 0 auto', padding:'1.5vh 2% 0 2%', border:'0px solid white',}}>
        <Menu />
      </ul>

      <div id="missioncontrol" className="missioncontrol sitecontrols" style={{display:'flex', justifyContent:'space-around', fontSize:'clamp(.8rem, 2.3vw, 2.5rem)', gap:'3vw', textAlign:'center', maxHeight:'', alignItems:'center', paddingTop:'5px'}}>
        {showSearch ? (
          <div className="searchIcon">
            <Link state={showModals ? { modal: true } : {}} aria-label="Search" to="/search/" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:'0px', textAlign:'center'}}>
              <SearchIcon style={{height:'30px'}} />
              <span className="themetext">{dicSearch}</span>
            </Link>
          </div>
        ) : (
          ""
        )}
        <div>
          <Theme  style={{}} />
        </div>
        {showSwipe ? (
          <Switch />
        ) : (
          ""
        )}
      </div>
    </div>
  </div>
) : (
  ""
)}

{/* <Install /> */}

{ showContact ? (
  <Link id="footercontact" state={{modal: true}} to="/contact/" className="button  font" style={{margin:'2rem', textDecoration:'none', padding:'1vh 2rem', }}>{dicContact}</Link>
) : (
  ""
)}




{ showSocial ? (
  <div className="social-icons" style={{textAlign:'center', justifyContent:'center', display:'flex', alignItems:'center', margin:'2rem 0'}}>
       <div className="socialtext" style={{fontSize:'14px',}}>{dicSocial}</div> {sIcons}
        </div>
      ) : (
""
  )}


    

  
        


        



      <nav className="footerlinks" aria-label="footer">


      
        <div style={{width:'100vw', textAlign: 'center', justifyContent: 'center', fontSize: '.95rem', textDecoration:'none', display:'grid', margin:'1rem auto'}}>
{ showLegal ? (
<div style={{display:'flex', justifyContent:'center', gap:'4%', width:'100%', minWidth:'380px' }}><Link state={{modal: true}} to="/disclaimer/">{dicDisclaimer}</Link> | <Link state={{modal: true}} to="/privacy/">{dicPrivacy}</Link> | <Link state={{modal: true}} to="/terms/">{dicTerms}</Link></div>
) : (
""
  )}
  <br />
  <br />
{dicCopyright} &copy;
{(new Date().getFullYear())} 
&nbsp;
 {companyname}
</div>
      





{ showBranding ? (
  <div style={{textAlign: 'center', margin: '0 0 2rem 0', justifyContent: 'center', fontSize: '.75rem', position:'relative', right:'', top:'10px'}}>
<a href="https://pirateweb.org" rel="noreferrer">{dicPirate}</a> &nbsp; | &nbsp; <a href={speedIt} rel="noreferrer">{dicSiteReport}</a>
</div>
      ) : (
""
  )}









      </nav>
   
    </footer>

    ) : (
      <footer className="" style={{display:'flex', flexDirection:'column', zIndex:'1', justifyContent:'end', padding:'0', marginTop:'0', width:'100vw',textAlign:'center'}}>
          { showBranding ? (
      <div style={{textAlign: 'center', margin: '0 0 2rem 0', justifyContent: 'center', fontSize: '.75rem', position:'relative', right:'', top:'10px'}}>
    <a href="https://pirateweb.org" rel="noreferrer">{dicPirate}</a> &nbsp; | &nbsp; <a href={speedIt} rel="noreferrer">{dicSiteReport}</a>
    </div>
          ) : (
    ""
      )}
      </footer>
    )}



</>
)}

    </>


    
  )
}

