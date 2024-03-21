import React, { useState, useEffect } from "react";
import Seo from "../components/seo";
import Layout from "../components/siteLayout";
import SearchPosts from "../components/galleryIndex";
import { Helmet } from "react-helmet";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
const GalleryPage = () => {
  // Check if localStorage is available
  const isLocalStorageAvailable = typeof window !== "undefined" && window.localStorage;

  // Set the initial state directly from localStorage if available, otherwise set to true
  const storedValue = isLocalStorageAvailable ? localStorage.getItem("isSliderVisible") : null;
  const initialSliderVisible = storedValue ? JSON.parse(storedValue) : true;

  const [isSliderVisible, setIsSliderVisible] = useState(initialSliderVisible);

  useEffect(() => {
    if (isLocalStorageAvailable) {
      // Update isSliderVisible when it changes in localStorage
      const handleStorageChange = () => {
        const storedValue = localStorage.getItem("isSliderVisible");
        try {
          setIsSliderVisible(JSON.parse(storedValue) ?? true);
        } catch (error) {
          setIsSliderVisible(true);
        }
      };

      // Add event listener for storage change
      window.addEventListener("storage", handleStorageChange);

      // Cleanup function to remove event listener
      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, [isLocalStorageAvailable]);

  return (
    <Layout className="gallery">
      <Seo title="Gallery" />
      <Helmet>
        <body className="gallery" />
      </Helmet>
      <SimpleReactLightbox>
        <SRLWrapper options={options}>
      <div className="scroll-area" id="posttop" name="posttop" style={{minHeight:'100dvh', width:'100vw'}}>
        <SearchPosts isSliderVisible={isSliderVisible} />
      </div>
      </SRLWrapper>
  </SimpleReactLightbox>
    </Layout>
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

export default GalleryPage;
