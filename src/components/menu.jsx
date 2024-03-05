import React from "react";
import { Link } from "gatsby";
import MenuSocial from "../../static/data/menu-social.json";
import MenuDefault from "../../static/data/menu.json";
import useSiteMetadata from "../hooks/SiteMetadata";

export function MenuInc({ bodyClass }) {
  const { proOptions } = useSiteMetadata();
  const { showModals } = proOptions;

  const menuItems = bodyClass === 'social' ? MenuSocial.menuItems : MenuDefault.menuItems;

  const menuLinks = menuItems.map((menu) => (
    <Link
      key={menu.menutitle}
      aria-label={menu.menutitle}
      to={menu.url}
      title={menu.menutitle}
      className="navbar-item"
      state={showModals ? { modal: true } : {}}
    >
      {menu.menutitle}
    </Link>
  ));

  return (
    <>
      {menuLinks.map((menuItem, index) => (
        <li key={index}>{menuItem}</li>
      ))}
    </>
  );
}

export default MenuInc;
