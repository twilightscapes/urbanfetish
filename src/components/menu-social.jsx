import React from "react";
import { Link } from "gatsby";
import Menu from "../../static/data/menu-social.json";
// import BlueCheck from "./bluecheck";
const newMenu = Menu.menuItems.map((menu) => (
  <Link
    key={menu.menutitle}
    aria-label={menu.menutitle}
    to={menu.url}
    title={menu.menutitle}
    className="navbar-item"
  >
    {menu.menutitle}
  </Link>
));

export function MenuInc() {
  return (
    <>
      {newMenu.map((menuItem, index) => (
        <li key={index}>{menuItem}</li>
      ))}
      {/* <li><BlueCheck /></li> */}
    </>
  );
}

export default MenuInc;
