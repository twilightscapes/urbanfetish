import React, { useState, useEffect } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import PirateLogo from "../img/logo.svg";
import Flag from "../img/logo.svg";



const MenuComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  useEffect(() => {
    const storedIsMenuOpen = localStorage.getItem("isMenuOpen");
    setIsMenuOpen(storedIsMenuOpen === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("isMenuOpen", isMenuOpen);
  }, [isMenuOpen]);

  const MenuIcon = isMenuOpen ? RiCloseCircleFill : Flag;

  const handleButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        className="flag bug"
        onClick={handleButtonClick}
        aria-label={isMenuOpen ? "Collapse menu" : "Expand menu"}
        style={{
          cursor: "pointer",
          padding: "0",
          fontSize: "clamp(3rem, 3vw, 3rem)",
          position: "absolute",
          top: "140px",
          width: "60px",
          height: "60px",
          zIndex: "4",
          display: "flex",
          flexDirection: "column",
          justifySelf: "flex-start",
          textAlign: "center",
        }}
      >
        <MenuIcon
          style={{ height: "100%", maxHeight: "60px", top: "0", zIndex: "4", color: "#fff" }}
        />
      </button>
      <div
        className="menusnapp"
        style={{
          position: "absolute",
          zIndex: "3",
          top: "100px",
          gap: "0",
          padding: "2vh 2vw",
          alignItems: "center",
          display: isMenuOpen ? "block" : "none",
          background: "var(--theme-ui-colors-headerBackground)",
          backgroundColor: "#222",
          width: "100dvw",
        }}
      >
        <div id="" className="flexbutt font" style={{ display: "", gap: "3vh", justifyContent: "center", alignItems: "center", margin: "0 0", padding: "0", position: "relative", minWidth: "80vw" }}>
          <div style={{ minWidth: "25vw", maxHeight: "15vh", textAlign: "center", color: "#fff" }}>
            <PirateLogo style={{ minWidth: "", maxHeight: "15vh", position: "", top: "", left: "" }} />
            the web revolution
          </div>
          <div className="flexcheek mob2 print" style={{ position: "", top: "", minWidth: "25vw", overflow: "", marginBottom: "", paddingTop: "", borderRadius: "var(--theme-ui-colors-borderRadius)" }}>
            <div className="nameblock font" style={{ margin: "0 auto 0 auto", padding: "0 0 0 0", alignContent: "center", display: "grid", textAlign: "center", justifyContent: "center", verticalAlign: "center", color: "#fff", paddingTop: "", fontSize: "clamp(1rem, 1.4vw, 3.2rem)", background: "rgba(0,0,0,0.50)", backdropFilter: "blur(8px)", border: "10px double var(--theme-ui-colors-buttonHoverBg)", borderRadius: "var(--theme-ui-colors-borderRadius)", textShadow: "0 2px 0px #000", maxWidth: "" }}>
              <br />
              <span style={{ margin: "2vh auto", fontSize: "160%" }}>About PIRATE</span>
              <br />
              A web revolution is coming
              <br /><br />
              And it's completely FREE!
              <br />
              <a href="https://pirateweb.org/about" className="button print" style={{ display: "flex", justifyContent: "center", padding: "1vh .5vw", maxWidth: "250px", margin: "30px auto", border:'1px solid #ff0000' }}>About PIRATE</a>
            </div>
          </div>
          <div className="flexcheek mob2 print" style={{ position: "", top: "", minWidth: "25vw", overflow: "", marginBottom: "", paddingTop: "", borderRadius: "var(--theme-ui-colors-borderRadius)" }}>
            <div className="nameblock font" style={{ margin: "0 auto 0 auto", padding: "0 0 0 0", alignContent: "center", display: "grid", textAlign: "center", justifyContent: "center", verticalAlign: "center", color: "#fff", paddingTop: "", fontSize: "clamp(1rem, 1.4vw, 3.2rem)", background: "rgba(0,0,0,0.50)", backdropFilter: "blur(8px)", border: "10px double var(--theme-ui-colors-buttonHoverBg)", borderRadius: "var(--theme-ui-colors-borderRadius)", textShadow: "0 2px 0px #000", maxWidth: "" }}>
              <br />
              <span style={{ margin: "2vh auto", fontSize: "160%" }}>Get PIRATE</span>
              <br />
              Web, Social &amp; Video Media
              <br /><br />
              Combined into your own app
              <br />
              <a href="https://pirateweb.org/install" className="button print" style={{ display: "flex", justifyContent: "center", padding: "1vh .5vw", maxWidth: "250px", margin: "30px auto", border:'1px solid #ff0000' }}>Become a PIRATE!</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuComponent;