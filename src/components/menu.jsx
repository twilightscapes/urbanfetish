import * as React from "react"
// import useSiteMetadata from "../hooks/SiteMetadata"
// import ScrollAnimation from 'react-animate-on-scroll'

import { Link } from "gatsby"
// import Install from "../components/Install-footer"
import Menu from "../util/menu.json"
// import { FaHandPointDown } from "react-icons/fa"









const newMenu = Menu.menuItems.map((menu, index) => (

 <Link aria-label={menu.menutitle} to={menu.url} title={menu.menutitle} className="navbar-item">{menu.menutitle}</Link>

));







 



function MenuInc() {
  return (
<>
      {newMenu.map((menuItem) => (
        <li key={menuItem.key}>
          {menuItem}
          </li>
      ))}
</>
  );
}

export default MenuInc

