/** @jsx jsx */
import { jsx } from "theme-ui"
import { useColorMode } from "theme-ui"
import { FiMoon, FiSun } from "react-icons/fi"

const Theme = () => {
  const [colorMode, setColorMode] = useColorMode()
  return (
    <div className="carto">
      <button style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:'0px', textAlign:'center'}}
        onClick={e => {
          setColorMode(colorMode === "default" ? "dark" : "default")
            // window.location.reload()
        }}
        aria-label="Theme Color"
      >
        <div 
        // sx={themeStyles.modeIcons} 
        className="themer" >
          <div>{colorMode === "default" ? <FiMoon style={{width:'30px', height:'30px'}} /> : <FiSun style={{width:'30px', height:'30px'}} />}</div>
          <div className="themetext">
            {colorMode === "default" ? "dark" : "light"}
          </div>
        </div>
      </button>
    </div>
  )
}

export default Theme


