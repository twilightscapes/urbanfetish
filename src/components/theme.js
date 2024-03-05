/** @jsx jsx */
import { jsx } from "theme-ui"
import { useColorMode } from "theme-ui"
import { FiMoon, FiSun } from "react-icons/fi"
import useSiteMetadata from "../hooks/SiteMetadata";
const Theme = () => {
  const { language } = useSiteMetadata();
  const { dicLight, dicDark } = language;
  const [colorMode, setColorMode] = useColorMode()
  return (
    <div className="carto">
      <button style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:'0px', textAlign:'center'}}
        onClick={e => {
          setColorMode(colorMode === "default" ? "dark" : "default")
            // window.location.reload()
        }}
        aria-label="dark light mode"
      >
        <div 
        // sx={themeStyles.modeIcons} 
        className="themer" >
          <div>{colorMode === "default" ? <FiMoon style={{width:'33px', height:'30px'}} /> : <FiSun style={{width:'33px', height:'30px'}} />}</div>
          <div className="themetext">
            {colorMode === "default" ? dicDark : dicLight}
          </div>
        </div>
      </button>
    </div>
  )
}

export default Theme


