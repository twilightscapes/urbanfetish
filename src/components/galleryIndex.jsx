import React, { useState, useEffect, useRef } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import useSiteMetadata from "../hooks/SiteMetadata";
const GalleryIndex = ({ isSliderVisible }) => {

  const { featureOptions, language  } = useSiteMetadata();
  const { showTitles } = featureOptions
  const { dicGallery } = language;



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

  const extractTitle = (fileName) => {
    // Extract title from the file name (remove extension)
    const title = fileName.split(".")[0];
    return title;
  };

  const renderContent = () => {
    return (
      <SimpleReactLightbox>
        <SRLWrapper options={options}>
      <div
        id="posttop"
        className={sliderVisible ? "slider" : "grid-container contentpanel"}
        ref={scrollRef}
      >
        
          {data.allFile.edges
            .filter(({ node }) =>
              selectedDirectory
                ? node.relativePath.includes(selectedDirectory)
                : true
            )
            .map(({ node }, index) => {
              if (node.childImageSharp) {
                const imageData = node.childImageSharp.gatsbyImageData;
                const title = extractTitle(node.name);
                return (
                  <div key={index} className="post-card1">
                    
                      <GatsbyImage
                        image={imageData}
                        alt={title}
                        className="featured-image1 galleryimage"
                      />
                    
                    <div className="post-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '', position: 'relative', background: '', padding: '', margin: '0 auto 0 auto', textAlign: 'center', overFlow: 'hidden' }}>
                      <div className="panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', alignContent:'center', margin: '10px auto', maxWidth: '', gap: '.4vw', maxHeight: '74px', textAlign: 'left', padding: '10px 5%', fontSize: 'clamp(.7rem,.8vh,12px)', outline:'0px solid #444', overFlow:'hidden', lineHeight:'2.5vh', borderRadius:'var(--theme-ui-colors-borderRadius)', background: showTitles ? 'var(--theme-ui-colors-headerColor)' : 'transparent', color:'var(--theme-ui-colors-headerColorText)' }}>
                        <h2 className="title1">{title}</h2>
                      </div>
                    </div>
                  </div>
                );
              } else if (node.publicURL) {
                const title = extractTitle(node.name);
                return (
                  <div key={index} className="post-card1">
              
                      <img
                        src={node.publicURL}
                        alt={title}
                        className="featured-image1 galleryimage"
                      />
            
                    <div className="post-content">
                      <div className="panel">
                        <h2 className="title1">{title}</h2>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
            
      </div>
      </SRLWrapper>
  </SimpleReactLightbox>
    );
  };

  return (
    <>
      <div className="magicshell">
        <div className="magicisland">
          <div className="cattags font panel" style={{ width: "300px" }}>
          {dicGallery}
            <select
              value={selectedDirectory}
              onChange={handleDirectoryChange}
              style={{
                padding: ".5vh .2vw",
                minWidth: "75px",
                width: "100%",
                maxWidth: "500px",
                textAlign: "center",
                fontSize: "clamp(.6rem,1vw,1rem)",
                transition: "all .4s ease-in-out",
                background: "rgba(0,0,0,.2)",
                outline: "1px solid #999",
                border: "0px solid var(--theme-ui-colors-siteColor)",
                borderRadius: "var(--theme-ui-colors-borderRadius)",
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
    disableWheelControls: false,
    hideControlsAfter: false,
    lightboxTransitionSpeed: 0.3,
    lightboxTransitionTimingFunction: "linear",
    overlayColor: "rgba(0, 0, 0, 0.9)",
    slideAnimationType: "slide",
    slideSpringValues: [300, 50],
    slideTransitionSpeed: 0.6,
    slideTransitionTimingFunction: "linear",
    usingPreact: false,
  },
  buttons: {
    backgroundColor: "var(--theme-ui-colors-siteColor)",
    iconColor: "rgba(255, 255, 255, 0.8)",
    iconPadding: "10px",
    showAutoplayButton: true,
    showCloseButton: true,
    showDownloadButton: false,
    showFullscreenButton: true,
    showNextButton: true,
    showPrevButton: true,
    showThumbnailsButton: true,
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
    showCaption: true,
  },
  thumbnails: {
    showThumbnails: true,
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
    backgroundColor: "var(--theme-ui-colors-siteColor)",
    fillColor: "#fff",
    height: "3px",
    showProgressBar: true,
  },
};

export default GalleryIndex;
