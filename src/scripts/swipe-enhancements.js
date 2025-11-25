// // Enhanced swipe functionality for all sections
// document.addEventListener('DOMContentLoaded', function() {
  
//   // Throttle function for better performance
//   function throttle(func, limit) {
//     let inThrottle;
//     return function() {
//       const args = arguments;
//       const context = this;
//       if (!inThrottle) {
//         func.apply(context, args);
//         inThrottle = true;
//         setTimeout(() => inThrottle = false, limit);
//       }
//     }
//   }
  
//   // Add wheel scroll support for horizontal sliders
//   function addWheelScrollSupport() {
//     // TEMPORARILY DISABLED - components handle their own scroll functionality
//     return; // Disabled to prevent conflicts with component handlers
//   }

//   // Global handler for viewModeChanged events from custom buttons
//   function handleViewModeChange(event) {
//     const { sectionId, viewMode } = event.detail;
//     const sectionElement = document.querySelector(`[data-section-id="${sectionId}"]`);
    
//     if (sectionElement) {
//       let contentContainer = sectionElement.querySelector('.section-content');
//       if (!contentContainer) {
//         contentContainer = sectionElement.querySelector('.youtube-grid');
//       }
      
//       if (contentContainer) {
//         // Apply the same scroll functionality as ViewModeSwitch
//         if (viewMode === 'swipe') {
//           // Add scroll functionality
//           addScrollFunctionality(contentContainer);
//         } else {
//           // Remove scroll functionality
//           removeScrollFunctionality(contentContainer);
//         }
//       }
//     }
//   }

//   // Same scroll functions as ViewModeSwitch but for global use
//   function addScrollFunctionality(slider) {
//     const computedStyle = window.getComputedStyle(slider);
//     const isHorizontalSlider = computedStyle.display === 'flex' && 
//                               computedStyle.flexDirection === 'row' &&
//                               computedStyle.overflowX === 'scroll';
    
//     if (!isHorizontalSlider) {
//       if (slider._globalWheelHandler) {
//         slider.removeEventListener('wheel', slider._globalWheelHandler);
//         slider._globalWheelHandler = null;
//       }
//       return;
//     }
    
//     if (slider._globalWheelHandler) {
//       slider.removeEventListener('wheel', slider._globalWheelHandler);
//     }
    
//     const wheelHandler = (e) => {
//       const hasHorizontalSpace = slider.scrollWidth > slider.clientWidth;
      
//       if (hasHorizontalSpace) {
//         if (e.shiftKey) return;
        
//         if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
//           e.preventDefault();
//           e.stopPropagation();
//           slider.scrollLeft += e.deltaY * 6; // Same multiplier as ViewModeSwitch
//         }
//       }
//     };
    
//     slider._globalWheelHandler = wheelHandler;
//     slider.addEventListener('wheel', wheelHandler, { passive: false, capture: true });
//   }

//   function removeScrollFunctionality(slider) {
//     if (slider._globalWheelHandler) {
//       slider.removeEventListener('wheel', slider._globalWheelHandler);
//       slider._globalWheelHandler = null;
//     }
//     slider.style.cursor = '';
//   }

//   // Listen for viewModeChanged events from custom buttons
//   window.addEventListener('viewModeChanged', handleViewModeChange);
  
//   // Listen for forced cleanup events
//   window.addEventListener('forceScrollCleanup', function(event) {
//     const element = event.detail.element;
//     if (element) {
//       // Remove any remaining wheel handlers
//       if (element._globalWheelHandler) {
//         element.removeEventListener('wheel', element._globalWheelHandler);
//         element._globalWheelHandler = null;
//       }
//       if (element._viewModeSwitchWheelHandler) {
//         element.removeEventListener('wheel', element._viewModeSwitchWheelHandler);
//         element._viewModeSwitchWheelHandler = null;
//       }
//       if (element._channelWheelHandler) {
//         element.removeEventListener('wheel', element._channelWheelHandler);
//         element._channelWheelHandler = null;
//       }
//     }
//   });

//   // Add touch/swipe support for mobile
//   function addTouchSupport() {
//     const sliders = document.querySelectorAll('.slider');
    
//     sliders.forEach(slider => {
//       // Skip if this slider already has touch handlers
//       if (slider._hasTouchHandlers) {
//         return;
//       }
      
//       let isDown = false;
//       let startX;
//       let startY;
//       let scrollLeft;
//       let hasMoved = false;
//       let startTime;

//       const mouseDownHandler = (e) => {
//         isDown = true;
//         slider.classList.add('active');
//         startX = e.pageX - slider.offsetLeft;
//         scrollLeft = slider.scrollLeft;
//         hasMoved = false;
//         startTime = Date.now();
//       };

//       const mouseLeaveHandler = () => {
//         isDown = false;
//         slider.classList.remove('active');
//         hasMoved = false;
//       };

//       const mouseUpHandler = () => {
//         isDown = false;
//         slider.classList.remove('active');
//         hasMoved = false;
//       };

//       const mouseMoveHandler = throttle((e) => {
//         if (!isDown) return;
//         e.preventDefault();
//         const x = e.pageX - slider.offsetLeft;
//         const walk = (x - startX) * 1.2; // Reduced multiplier for smoother movement
//         slider.scrollLeft = scrollLeft - walk;
//         hasMoved = true;
//       }, 16); // ~60fps throttling

//       const touchStartHandler = (e) => {
//         // Only handle single finger touches
//         if (e.touches.length !== 1) return;
        
//         startX = e.touches[0].pageX - slider.offsetLeft;
//         startY = e.touches[0].pageY;
//         scrollLeft = slider.scrollLeft;
//         hasMoved = false;
//         startTime = Date.now();
//       };

//       const touchMoveHandler = throttle((e) => {
//         if (!startX || e.touches.length !== 1) return;
        
//         const x = e.touches[0].pageX - slider.offsetLeft;
//         const y = e.touches[0].pageY;
        
//         // Calculate movement distances
//         const deltaX = Math.abs(x - (startX + slider.offsetLeft));
//         const deltaY = Math.abs(y - startY);
        
//         // Only handle horizontal swipes (more horizontal than vertical movement)
//         if (deltaX > deltaY && deltaX > 10) { // 10px minimum threshold
//           e.preventDefault(); // Prevent vertical scrolling only when we're sure it's horizontal
//           const walk = (x - startX) * 0.8; // Gentler multiplier for touch
//           slider.scrollLeft = scrollLeft - walk;
//           hasMoved = true;
//         }
//       }, 16); // ~60fps throttling

//       const touchEndHandler = (e) => {
//         if (!startX) return;
        
//         // Reset values
//         startX = null;
//         startY = null;
//         hasMoved = false;
        
//         // Add a small momentum effect for quick swipes
//         const timeDiff = Date.now() - startTime;
//         if (timeDiff < 300 && hasMoved) { // Quick swipe
//           // Let the natural scroll momentum take over
//           slider.classList.add('momentum-scroll');
//           setTimeout(() => {
//             slider.classList.remove('momentum-scroll');
//           }, 300);
//         }
//       };

//       // Add passive: false only where we need preventDefault
//       slider.addEventListener('mousedown', mouseDownHandler);
//       slider.addEventListener('mouseleave', mouseLeaveHandler);
//       slider.addEventListener('mouseup', mouseUpHandler);
//       slider.addEventListener('mousemove', mouseMoveHandler);
//       slider.addEventListener('touchstart', touchStartHandler, { passive: true });
//       slider.addEventListener('touchmove', touchMoveHandler, { passive: false });
//       slider.addEventListener('touchend', touchEndHandler, { passive: true });
      
//       // Mark as having touch handlers to avoid duplicates
//       slider._hasTouchHandlers = true;
//     });
//   }

//   // Initialize both features
//   addWheelScrollSupport();
//   // addTouchSupport(); // DISABLED - conflicts with native touch scrolling

//   // Re-initialize when view mode changes
//   document.addEventListener('astro:after-swap', () => {
//     addWheelScrollSupport();
//     // addTouchSupport(); // DISABLED - conflicts with native touch scrolling
//   });

//   // Re-initialize when dynamic content loads (like YouTube feeds)
//   const observer = new MutationObserver((mutations) => {
//     let shouldReinit = false;
    
//     mutations.forEach((mutation) => {
//       // Check if new slider elements were added
//       if (mutation.type === 'childList') {
//         mutation.addedNodes.forEach((node) => {
//           if (node.nodeType === Node.ELEMENT_NODE) {
//             // Check if the added node contains sliders or is a slider itself
//             if (node.classList?.contains('slider') || node.querySelector?.('.slider')) {
//               shouldReinit = true;
//             }
//           }
//         });
//       }
      
//       // Check if class changes created new sliders
//       if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
//         if (mutation.target.classList?.contains('slider')) {
//           shouldReinit = true;
//         }
//       }
//     });
    
//     if (shouldReinit) {
//       // Small delay to ensure DOM is fully updated
//       setTimeout(() => {
//         addWheelScrollSupport();
//         // addTouchSupport(); // DISABLED - conflicts with native touch scrolling
//       }, 100);
//     }
//   });

//   // Observe the entire document for changes
//   observer.observe(document.body, {
//     childList: true,
//     subtree: true,
//     attributes: true,
//     attributeFilter: ['class']
//   });

//   // Also listen for custom events that components might dispatch
//   document.addEventListener('content-loaded', () => {
//     setTimeout(() => {
//       addWheelScrollSupport();
//       // addTouchSupport(); // DISABLED - conflicts with native touch scrolling
//     }, 100);
//   });

//   // Listen for view mode changes (when user switches between grid/swipe)
//   window.addEventListener('viewModeChanged', (event) => {
//     setTimeout(() => {
//       addWheelScrollSupport();
//       // addTouchSupport(); // DISABLED - conflicts with native touch scrolling
//     }, 100);
//   });

//   // Function to reinitialize when needed
//   function reinitializeEnhancements() {
//     addWheelScrollSupport();
//     // addTouchSupport(); // DISABLED - conflicts with native touch scrolling
//   }

//   // Observe slider elements for changes in display mode
//   const modeObserver = new MutationObserver(() => {
//     setTimeout(reinitializeEnhancements, 100);
//   });

//   // Set up observers for all current slider elements
//   document.querySelectorAll('.slider').forEach(slider => {
//     modeObserver.observe(slider, { 
//       attributes: true, 
//       attributeFilter: ['style', 'class'],
//       childList: true,
//       subtree: true
//     });
//   });

//   // Periodic recheck every 2 seconds to catch any missed changes
//   setInterval(reinitializeEnhancements, 2000);
// });
