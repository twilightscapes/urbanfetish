import React, { useState, useEffect } from 'react';

const GridIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 16 16"
    height="24px"
    width="24px"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6" 
  >
    <path d="M1 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zM1 9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
  </svg>
);

const SwipeIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 256 256"
    height="24px"
    width="24px"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6" 
  >
    <path d="M216,128v50.93c0,25.59-8.48,39.93-8.84,40.65A8,8,0,0,1,200,224H64a8,8,0,0,1-6.9-3.95L26.15,160a16,16,0,0,1,6.53-22.23c7.66-4,17.1-.84,21.4,6.62l21,36.44a6.09,6.09,0,0,0,6,3.09l.12,0A8.19,8.19,0,0,0,88,175.74V56a16,16,0,0,1,16.77-16c8.61.4,15.23,7.82,15.23,16.43V128a8,8,0,0,0,8.53,8,8.17,8.17,0,0,0,7.47-8.25V112a16,16,0,0,1,16.77-16c8.61.4,15.23,7.82,15.23,16.43V136a8,8,0,0,0,8.53,8,8.18,8.18,0,0,0,7.47-8.25v-7.28c0-8.61,6.62-16,15.23-16.43A16,16,0,0,1,216,128Zm37.66-77.66-32-32a8,8,0,0,0-11.32,11.32L228.69,48H176a8,8,0,0,0,0,16h52.69L210.34,82.34a8,8,0,0,0,11.32,11.32l32-32A8,8,0,0,0,253.66,50.34Z" />
  </svg>
);

function ViewModeSwitch({ sectionId, defaultView = 'grid', onViewChange = null }) {
  const [viewMode, setViewMode] = useState(defaultView);
  
  useEffect(() => {
    // Initialize view mode from localStorage if available
    if (typeof window !== 'undefined') {
      const storageKey = `viewMode-${sectionId}`;
      const storedValue = localStorage.getItem(storageKey);
      if (storedValue) {
        setViewMode(storedValue);
        // Immediately apply the stored view mode to the DOM
        setTimeout(() => {
          const sectionElement = document.querySelector(`[data-section-id="${sectionId}"]`);
          if (sectionElement) {
            let contentContainer = sectionElement.querySelector('.section-content');
            if (!contentContainer) {
              contentContainer = sectionElement.querySelector('.youtube-grid');
            }
            if (contentContainer) {
              if (storedValue === 'swipe') {
                contentContainer.classList.remove('grid-container');
                contentContainer.classList.add('slider');
                setTimeout(() => addScrollFunctionality(contentContainer), 10);
              } else {
                contentContainer.classList.remove('slider');
                contentContainer.classList.add('grid-container');
                removeScrollFunctionality(contentContainer);
              }
            }
          }
        }, 50);
      }
    }
  }, [sectionId]);

  // Listen for content load events to re-apply view mode
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleContentLoaded = (event) => {
        if (event.detail && event.detail.sectionId === sectionId) {
          // Re-apply the current view mode when content is loaded
          setTimeout(() => {
            const sectionElement = document.querySelector(`[data-section-id="${sectionId}"]`);
            if (sectionElement) {
              let contentContainer = sectionElement.querySelector('.section-content');
              if (!contentContainer) {
                contentContainer = sectionElement.querySelector('.youtube-grid');
              }
              if (contentContainer) {
                // Apply the current view mode
                if (viewMode === 'swipe') {
                  contentContainer.classList.remove('grid-container');
                  contentContainer.classList.add('slider');
                  setTimeout(() => addScrollFunctionality(contentContainer), 10);
                } else {
                  contentContainer.classList.remove('slider');
                  contentContainer.classList.add('grid-container');
                  removeScrollFunctionality(contentContainer);
                }
              }
            }
          }, 50);
        }
      };

      const handleApplyStored = (event) => {
        if (event.detail && event.detail.sectionId === sectionId) {
          // Force re-apply the stored view mode
          const storageKey = `viewMode-${sectionId}`;
          const storedValue = localStorage.getItem(storageKey);
          if (storedValue && storedValue !== viewMode) {
            setViewMode(storedValue);
          }
        }
      };

      window.addEventListener('content-loaded', handleContentLoaded);
      window.addEventListener('viewModeApplyStored', handleApplyStored);

      return () => {
        window.removeEventListener('content-loaded', handleContentLoaded);
        window.removeEventListener('viewModeApplyStored', handleApplyStored);
      };
    }
  }, [sectionId, viewMode]);

  useEffect(() => {
    // Call the callback when view mode changes
    if (onViewChange) {
      onViewChange(viewMode);
    }
    
    // Update the section's classes and add scroll functionality to all sections
    if (typeof window !== 'undefined') {
      // console.log('🔄 ViewModeSwitch: Updating classes for', { sectionId, viewMode });
      const sectionElement = document.querySelector(`[data-section-id="${sectionId}"]`);
      if (sectionElement) {
        // console.log('🔄 ViewModeSwitch: Found section element', sectionElement);
        // Prioritize .section-content over .youtube-grid (for consistency)
        let contentContainer = sectionElement.querySelector('.section-content');
        if (!contentContainer) {
          contentContainer = sectionElement.querySelector('.youtube-grid');
        }
        if (contentContainer) {
          // console.log('🔄 ViewModeSwitch: Found content container', contentContainer, 'classes:', contentContainer.className);
          if (viewMode === 'swipe') {
            contentContainer.classList.remove('grid-container');
            contentContainer.classList.add('slider');
            // console.log('🔄 ViewModeSwitch: Switched to swipe mode');
            
            // Add scroll functionality to all sliders with a small delay to ensure DOM updates
            setTimeout(() => addScrollFunctionality(contentContainer), 10);
          } else {
            contentContainer.classList.remove('slider');
            contentContainer.classList.add('grid-container');
            
            // Remove scroll functionality when switching to grid mode
            removeScrollFunctionality(contentContainer);
          }
        } else {
          // console.warn('🔄 ViewModeSwitch: No content container found (.section-content or .youtube-grid)');
        }
      } else {
        // console.warn('🔄 ViewModeSwitch: No section element found for', sectionId);
      }
    }
  }, [viewMode, sectionId, onViewChange]);

  // Enhanced scroll functionality for slider mode
  function addScrollFunctionality(slider) {
    // Only add scroll functionality if the element is actually in slider mode
    const computedStyle = window.getComputedStyle(slider);
    const isHorizontalSlider = slider.classList.contains('slider') && 
                              computedStyle.display === 'flex' && 
                              computedStyle.flexDirection === 'row' &&
                              computedStyle.overflowX === 'scroll';
    
    if (!isHorizontalSlider) {
      // If not in slider mode, remove any existing handlers
      removeScrollFunctionality(slider);
      return;
    }
    
    // Remove existing listeners first to prevent duplicates
    removeScrollFunctionality(slider);
    
    // Enhanced wheel scroll support
    const wheelHandler = (e) => {
      // Double-check we're still in slider mode
      if (!slider.classList.contains('slider')) {
        removeScrollFunctionality(slider);
        return;
      }
      
      const hasHorizontalSpace = slider.scrollWidth > slider.clientWidth;
      
      if (hasHorizontalSpace) {
        // Don't interfere with shift+scroll (natural horizontal scroll)
        if (e.shiftKey) return;
        
        // Convert vertical scroll to horizontal for normal scroll
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          e.stopPropagation();
          slider.scrollLeft += e.deltaY * 1.4; // Moderate scrolling speed
        }
      }
    };
    
    slider._viewModeSwitchWheelHandler = wheelHandler;
    slider.addEventListener('wheel', wheelHandler, { passive: false, capture: true });

    // Simple drag support
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      slider.style.cursor = 'grabbing';
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });

    // Set cursor for scrollable content
    if (slider.scrollWidth > slider.clientWidth) {
      slider.style.cursor = 'grab';
    }
  }

  function removeScrollFunctionality(slider) {
    // Remove wheel event listener if it exists
    if (slider._viewModeSwitchWheelHandler) {
      slider.removeEventListener('wheel', slider._viewModeSwitchWheelHandler);
      slider._viewModeSwitchWheelHandler = null;
    }
    
    // Also remove any other potential wheel handlers that might be attached
    if (slider._globalWheelHandler) {
      slider.removeEventListener('wheel', slider._globalWheelHandler);
      slider._globalWheelHandler = null;
    }
    if (slider._channelWheelHandler) {
      slider.removeEventListener('wheel', slider._channelWheelHandler);
      slider._channelWheelHandler = null;
    }
    
    // Reset cursor
    slider.style.cursor = '';
    
    // Force a complete style reset to grid mode
    if (slider.classList.contains('grid-container')) {
      slider.style.display = 'grid';
      slider.style.overflowX = 'visible';
      slider.style.overflowY = 'visible';
      slider.style.flexDirection = 'initial';
      slider.style.gap = '2vw';
      slider.style.touchAction = 'auto';
      
      // Force reflow to ensure styles are applied
      slider.offsetHeight;
    }
    
    // Dispatch a custom event to clean up any other handlers
    window.dispatchEvent(new CustomEvent('forceScrollCleanup', {
      detail: { element: slider }
    }));
  }

  const toggleView = () => {
    // console.log('🔄 ViewModeSwitch: toggleView called', { sectionId, currentViewMode: viewMode });
    const newMode = viewMode === 'grid' ? 'swipe' : 'grid';
    setViewMode(newMode);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      const storageKey = `viewMode-${sectionId}`;
      localStorage.setItem(storageKey, newMode);
      // console.log('🔄 ViewModeSwitch: Saved to localStorage', { storageKey, newMode });
      
      // Dispatch custom event for MemberFavorites to listen to
      window.dispatchEvent(new CustomEvent('viewModeChanged', {
        detail: {
          sectionId: sectionId,
          viewMode: newMode
        }
      }));
      
      // console.log('🔄 ViewModeSwitch: Dispatched viewModeChanged event', { sectionId, viewMode: newMode });
    }
  };

  return (
    <div className="view-mode-switch" style={{ 
      display: 'flex',
      alignItems: 'center',
      marginRight: '1rem',
      flexShrink: '0'
    }}>
      <button
        aria-label={`Currently in ${viewMode} view - click to switch to ${viewMode === 'grid' ? 'swipe' : 'grid'} view`}
        onClick={toggleView}
        className="flex items-center justify-center h-10 w-10 p-2 rounded-md bg-opacity-30 bg-gray-500 hover:bg-opacity-50 transition-all duration-200 border border-transparent hover:border-gray-400"
        title={`Currently in ${viewMode} view - click to switch to ${viewMode === 'grid' ? 'swipe' : 'grid'} view`}
        style={{
          position: 'relative',
          minWidth: '40px',
          minHeight: '40px',
          color: '#ffffff',
          background:'#333',
        }}
      >
        {viewMode === 'grid' ? <GridIcon /> : <SwipeIcon />}
      </button>
    </div>
  );
}

// Expose scroll functions globally for use by other components
if (typeof window !== 'undefined') {
  window.ViewModeSwitchScrollFunctions = {
    addScrollFunctionality: function(slider) {
      // Only add scroll functionality if the element is actually in slider mode
      const computedStyle = window.getComputedStyle(slider);
      const isHorizontalSlider = slider.classList.contains('slider') && 
                                computedStyle.display === 'flex' && 
                                computedStyle.flexDirection === 'row' &&
                                computedStyle.overflowX === 'scroll';
      
      if (!isHorizontalSlider) {
        return;
      }
      
      // Enhanced wheel scroll support
      const wheelHandler = (e) => {
        if (!slider.classList.contains('slider')) {
          return;
        }
        
        const hasHorizontalSpace = slider.scrollWidth > slider.clientWidth;
        
        if (hasHorizontalSpace) {
          if (e.shiftKey) return;
          
          if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            e.stopPropagation();
            slider.scrollLeft += e.deltaY * 1.4;
          }
        }
      };
      
      slider._viewModeSwitchWheelHandler = wheelHandler;
      slider.addEventListener('wheel', wheelHandler, { passive: false, capture: true });

      // Simple drag support
      let isDown = false;
      let startX;
      let scrollLeft;

      const mouseDownHandler = (e) => {
        if (e.button !== 0) return;
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        slider.style.cursor = 'grabbing';
      };

      const mouseLeaveHandler = () => {
        isDown = false;
        slider.style.cursor = 'grab';
      };

      const mouseUpHandler = () => {
        isDown = false;
        slider.style.cursor = 'grab';
      };

      const mouseMoveHandler = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
      };

      slider.addEventListener('mousedown', mouseDownHandler);
      slider.addEventListener('mouseleave', mouseLeaveHandler);
      slider.addEventListener('mouseup', mouseUpHandler);
      slider.addEventListener('mousemove', mouseMoveHandler);

      // Store handlers for cleanup
      slider._dragHandlers = {
        mouseDownHandler,
        mouseLeaveHandler,
        mouseUpHandler,
        mouseMoveHandler
      };

      // Set cursor for scrollable content
      if (slider.scrollWidth > slider.clientWidth) {
        slider.style.cursor = 'grab';
      }
    },
    
    removeScrollFunctionality: function(slider) {
      // Remove wheel event listener if it exists
      if (slider._viewModeSwitchWheelHandler) {
        slider.removeEventListener('wheel', slider._viewModeSwitchWheelHandler);
        slider._viewModeSwitchWheelHandler = null;
      }
      
      // Remove drag handlers
      if (slider._dragHandlers) {
        slider.removeEventListener('mousedown', slider._dragHandlers.mouseDownHandler);
        slider.removeEventListener('mouseleave', slider._dragHandlers.mouseLeaveHandler);
        slider.removeEventListener('mouseup', slider._dragHandlers.mouseUpHandler);
        slider.removeEventListener('mousemove', slider._dragHandlers.mouseMoveHandler);
        slider._dragHandlers = null;
      }
      
      // Reset cursor
      slider.style.cursor = '';
    }
  };
}

export default ViewModeSwitch;
