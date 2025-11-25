import React, { useState, useEffect } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import "yet-another-react-lightbox/plugins/thumbnails.css";

export default function GalleryLightbox({ images, showCaptions }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const options = {
    settings: {
      autoplaySpeed: 3000,
      boxShadow: 'none',
      disableKeyboardControls: false,
      disablePanzoom: false,
      disableWheelControls: false,
      hideControlsAfter: false,
      lightboxTransitionSpeed: 0.3,
      lightboxTransitionTimingFunction: 'linear',
      overlayColor: 'rgba(30, 30, 30, 0.9)',
      slideAnimationType: 'fade',
      slideSpringValues: [300, 50],
      slideTransitionSpeed: 0.6,
      slideTransitionTimingFunction: 'linear',
      usingPreact: false
    },
    buttons: {
      backgroundColor: 'rgba(30,30,36,0.8)',
      iconColor: 'rgba(255, 255, 255, 0.8)',
      iconPadding: '10px',
      showAutoplayButton: false,
      showCloseButton: true,
      showDownloadButton: false,
      showFullscreenButton: false,
      showNextButton: true,
      showPrevButton: true,
      showThumbnailsButton: true,
      size: '40px'
    },
    caption: {
      captionAlignment: 'start',
      captionColor: '#FFFFFF',
      captionContainerPadding: '0',
      captionFontFamily: 'inherit',
      captionFontSize: 'inherit',
      captionFontStyle: 'inherit',
      captionFontWeight: 'inherit',
      captionTextTransform: 'inherit',
      showCaption: showCaptions
    },
    thumbnails: {
      showThumbnails: true,
      thumbnailsAlignment: 'center',
      thumbnailsContainerBackgroundColor: 'transparent',
      thumbnailsContainerPadding: '0',
      thumbnailsGap: '0 1px',
      thumbnailsIconColor: '#ffffff',
      thumbnailsOpacity: 0.4,
      thumbnailsPosition: 'bottom',
      thumbnailsSize: ['120px', '90px']
    },
    progressBar: {
      backgroundColor: '#f2f2f2',
      fillColor: '#000000',
      height: '3px',
      showProgressBar: true
    }
  };

  useEffect(() => {
    const setupClickListeners = () => {
      const imageElements = document.querySelectorAll('.post-card1:not(.hidden) img');
      
      imageElements.forEach((img) => {
        img.style.cursor = 'pointer';
        
        // Get the index directly from the data attribute
        const imageIndex = parseInt(img.getAttribute('data-image-index') || '0');
        
        // Remove existing listener
        const newImg = img.cloneNode(true);
        img.parentNode.replaceChild(newImg, img);
        
        // Add new listener
        newImg.addEventListener('click', () => {
          setIndex(imageIndex);
          setOpen(true);
        });
      });
    };
    
    setupClickListeners();
    
    // Re-setup listeners when images are filtered
    const observer = new MutationObserver(() => {
      setTimeout(setupClickListeners, 100);
    });
    
    const galleryContainer = document.querySelector('[data-section-id*="gallery"] .homegallery');
    if (galleryContainer) {
      observer.observe(galleryContainer, { 
        attributes: true, 
        subtree: true, 
        attributeFilter: ['class', 'style'] 
      });
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <Lightbox
      open={open}
      close={() => setOpen(false)}
      slides={images}
      index={index}
      plugins={[Thumbnails]}
      {...options}
      render={{
        slide: ({ slide }) => (
          <div className="relative w-full h-full">
            <img
              src={slide.src}
              alt={slide.alt || ''}
              className="w-full h-full object-contain"
            />
            {showCaptions && slide.title && (
              <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-black bg-opacity-70 text-white text-center">
                {slide.title}
              </div>
            )}
          </div>
        ),
      }}    />
  );
}