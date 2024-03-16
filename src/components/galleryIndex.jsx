import React, { useState, useEffect, useRef } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";

const GalleryIndex = ({ isSliderVisible }) => {
  const [selectedDirectory, setSelectedDirectory] = useState("favorites"); // Set the default
  const [sliderVisible, setSliderVisible] = useState(false);
  const scrollRef = useRef(null);
  const data = useStaticQuery(graphql`
    query {
      allDirectory(filter: { sourceInstanceName: { eq: "assets" } }) {
        nodes {
          name
        }
      }
      allFile(filter: { extension: { ne: "svg" } }) {
        edges {
          node {
            name
            id
            relativePath
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
            }
            publicURL # Add this to handle non-image files
          }
        }
      }
    }
  `);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSliderVisibility = localStorage.getItem("isSliderVisible");
      const initialSliderVisible = storedSliderVisibility
        ? JSON.parse(storedSliderVisibility)
        : true;
      setSliderVisible(isSliderVisible ?? initialSliderVisible);
    }
    return () => {
      // Cleanup logic here...
    };
  }, [isSliderVisible]);

  useEffect(() => {
    const handleScroll = (e) => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += e.deltaY;
      }
    };

    const currentScrollRef = scrollRef.current;
    if (currentScrollRef) {
      currentScrollRef.addEventListener("wheel", handleScroll);
    }
    return () => {
      if (currentScrollRef) {
        currentScrollRef.removeEventListener("wheel", handleScroll);
      }
    };
  }, [scrollRef]);

  const resetScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0; // Reset scroll to left
    }
  };

  const handleDirectoryChange = (e) => {
    setSelectedDirectory(e.target.value);
    resetScroll(); // Reset scroll when directory changes
  };

  const renderContent = () => {
    return (
      <div
        id="posttop"
        className={sliderVisible ? "slider" : "grid-container contentpanel"}
        ref={scrollRef}
      >
        <SimpleReactLightbox>
          {data.allFile.edges
            .filter(({ node }) =>
              selectedDirectory
                ? node.relativePath.includes(selectedDirectory)
                : true
            )
            .map(({ node }, index) => {
              if (node.childImageSharp) {
                const imageData = node.childImageSharp.gatsbyImageData;
                return (
                  <div key={index} className="post-card1">
                    <SRLWrapper options={options}>
                      <GatsbyImage
                        image={imageData}
                        alt={`Car ${index}`}
                        className="featured-image1 galleryimage"
                      />
                    </SRLWrapper>
                  </div>
                );
              } else if (node.publicURL) {
                return (
                  <div key={index} className="post-card1">
                    <SRLWrapper options={options}>
                      <img
                        src={node.publicURL}
                        alt={`Car ${index}`}
                        className="featured-image1 galleryimage"
                      />
                    </SRLWrapper>
                  </div>
                );
              } else {
                return null;
              }
            })}
        </SimpleReactLightbox>
      </div>
    );
  };

  return (
    <>
      <div className="magicshell">
        <div className="magicisland">
          <div className="cattags font panel" style={{ width: "300px" }}>
            Choose Gallery:
            <select
              value={selectedDirectory}
              onChange={handleDirectoryChange}
              style={{ padding: '.5vh .2vw', minWidth:'75px', width: '100%', maxWidth: '500px', textAlign:'center', fontSize: 'clamp(.6rem,1vw,1rem)', transition: 'all .4s ease-in-out', background:'rgba(0,0,0,.2)', outline:'1px solid #999', border:'0px solid var(--theme-ui-colors-siteColor)', borderRadius: 'var(--theme-ui-colors-borderRadius)' 
    // color:'var(--theme-ui-colors-siteColor)' 
  }}
            >
              {data.allDirectory.nodes
                .filter(({ name }) => name !== "assets") // Exclude the "assets" directory
                .map(({ name }) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
      {renderContent()}
    </>
  );
};

const options = {
  settings: {
    autoplaySpeed: 4000,
    boxShadow: "0px 0px 20px #000",
    disableKeyboardControls: false,
    disablePanzoom: false,
    disableWheelControls: true,
    hideControlsAfter: false,
    lightboxTransitionSpeed: 0.3,
    lightboxTransitionTimingFunction: "linear",
    overlayColor: "rgba(0, 0, 0, 0.8)",
    slideAnimationType: "slide",
    slideSpringValues: [300, 50],
    slideTransitionSpeed: 0.6,
    slideTransitionTimingFunction: "linear",
    usingPreact: false,
  },
  buttons: {
    backgroundColor: "#FA02B7",
    iconColor: "rgba(255, 255, 255, 0.8)",
    iconPadding: "10px",
    showAutoplayButton: false,
    showCloseButton: true,
    showDownloadButton: false,
    showFullscreenButton: false,
    showNextButton: false,
    showPrevButton: false,
    showThumbnailsButton: false,
    size: "40px",
  },
  caption: {
    captionAlignment: "start",
    captionColor: "#FFFFFF",
    captionContainerPadding: "20px 12% 30px 12%",
    captionFontFamily: "inherit",
    captionFontSize: "inherit",
    captionFontStyle: "inherit",
    captionFontWeight: "inherit",
    captionTextTransform: "inherit",
    showCaption: false,
  },
  thumbnails: {
    showThumbnails: false,
    thumbnailsAlignment: "center",
    thumbnailsContainerBackgroundColor: "#111",
    thumbnailsContainerPadding: "0",
    thumbnailsGap: "0 2px",
    thumbnailsIconColor: "#ffffff",
    thumbnailsOpacity: 0.4,
    thumbnailsPosition: "bottom",
    thumbnailsSize: ["100px", "80px"],
  },
  progressBar: {
    backgroundColor: "#000",
    fillColor: "#333",
    height: "3px",
    showProgressBar: true,
  },
};

export default GalleryIndex;
