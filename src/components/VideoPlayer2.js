import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from 'react-player/lazy';
import { ImYoutube2 } from "react-icons/im";
import { FaTwitch, FaFacebookSquare } from "react-icons/fa";
import useSiteMetadata from "../hooks/SiteMetadata";
import PageMenu from "./PageMenu";

const VideoHomePlayer = ({ location }) => {
  const queryParams = new URLSearchParams(location.search);
  const videoUrlParam = queryParams.get('video');
  const { featureOptions, proOptions } = useSiteMetadata();
  const { showBranding } = proOptions;
  const { showNav } = featureOptions;
  const inputElement = useRef(null);
  const playerRef = useRef(null);
  const [youtubelink, setYoutubelink] = useState(videoUrlParam || "");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fillFormFromClipboard = async () => {
      try {
        // Check if the document has focus
        if (!document.hasFocus()) {
          // throw new Error("Document is not focused. Please interact with the page.");
        }
  
        const clipboardText = await navigator.clipboard.readText();
        if (isValidURL(clipboardText)) {
          // Only update the input value if the clipboard text is a valid URL
          setYoutubelink(clipboardText);
          updateQueryString(clipboardText);
        } else {
          // console.error("Invalid URL copied from clipboard:", clipboardText);
          // You can handle this case accordingly, such as displaying a message to the user
        }
      } catch (error) {
        // console.error("Error reading clipboard:", error.message);
        // You can handle the error here, e.g., display a message to the user
      }
    };
    
    fillFormFromClipboard();
  }, []);
  
  

  const handleInputChange = (event) => {
    const { value } = event.target;
    if (isValidURL(value)) {
      setYoutubelink(value);
      updateQueryString(value);
    } else {
      console.error("Invalid URL:", value);
    }

    // const pirateVideoElement = document.getElementById('VideoPlayer');
    // if (pirateVideoElement) {
    //   pirateVideoElement.scrollIntoView({ behavior: 'smooth' });
    // }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleReset = () => {
    setYoutubelink("");
    updateQueryString("");
  };

  const updateQueryString = (value) => {
    const newUrl = `${window.location.pathname}?video=${encodeURIComponent(value)}`;
    window.history.pushState({}, '', newUrl);
  };

  const copyToClipboard = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000); // Reset 'copied' state after 2 seconds
        })
        .catch((error) => console.error("Error copying to clipboard:", error));
    }
  };


  function isRunningStandalone() {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(display-mode: standalone)').matches;
    }
    return false;
  }

  return (
    <>
      <div id="piratevideo" className='player-wrapper' style={{ display: 'grid', placeContent: '', width: '100vw', transition: 'all 1s ease-in-out' }}>
        {/* Form Container */}
        <div className="form-container controller font" style={{ position: 'relative', zIndex: '3', top: '0', height: 'auto', width: '100vw', margin: '0 auto', marginTop: showNav ? '0' : '0', transition: 'all 1s ease-in-out', background: 'var(--theme-ui-colors-headerColor)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding:'2.5vh 1vw 0 1vw', }}>
            <form className="youtubeform frontdrop" onSubmit={handleSubmit} id="youtubeform" name="youtubeform">



            {/* Video Platform Links */}
            {isRunningStandalone() ? (
                <>
      <a title="Open YouTube" aria-label="Open YouTube" href="https://youtube.com">
                <ImYoutube2 style={{ fontSize: '50px', opacity:'.5' }} />
              </a>
              <a title="Open Facebook" aria-label="Open Facebook" href="https://www.facebook.com/watch/">
                <FaFacebookSquare style={{ fontSize: '30px', opacity:'.5' }} />
              </a>
              <a title="Open Twitch" aria-label="Open Twitch" href="https://www.twitch.tv/directory">
                <FaTwitch style={{ fontSize: '30px', opacity:'.5' }} />
              </a>
                </>
    
                  ) : (
                    ""
          
              )}




              
              <input
                ref={inputElement}
                id="youtubelink-input"
                type="text"
                name="youtubelink"
                value={youtubelink}
                onChange={handleInputChange}
                style={{ padding: '.5vh 1vw', width: '100%', maxWidth: '800px', fontSize: 'clamp(.8rem,1.5vw,2rem)', transition: 'all 1s ease-in-out' }}
                placeholder="Paste Link To Video"
                className="youtubelinker"
                aria-label="Paste Link To Video"
              />
              <button aria-label="Reset" type="reset" onClick={handleReset} disabled={!youtubelink} style={{ color: '', fontSize: 'clamp(.8rem,1.5vw,2rem)', fontWeight: 'bold', textAlign: 'left', width: '40px', margin: '5px 15px 0 0' }}>
                Reset
              </button>
              
            </form>
          </div>
        </div>

        {/* Hidden SVG */}
        <svg className="hidden">
          <defs>
            <symbol id="share-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-share"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></symbol>
          </defs>
        </svg>

        {/* Page Menu */}
        {showBranding ? (
          <PageMenu />
        ) : (
          ""
        )}

        {/* ReactPlayer */}
        <ReactPlayer
          ref={playerRef}
          allow="web-share"
          style={{
            position: 'relative', top: '0', margin: '0 auto 0 auto', zIndex: '1', overflow: 'hidden', width: '100vw', minHeight: '', height: '100%', background: 'transparent',
            transition: 'all 1s ease-in-out',
          }}
          width="100%"
          height="100%"
          url={youtubelink}
          playing={true}
          controls={true}
          playsinline
          config={{
            youtube: {
              playerVars: { showinfo: false, autoplay: false, controls: true, start: "0", end: null, mute: false, loop: false }
            },
          }}
        />
      </div>
    </>
  );
};

export default VideoHomePlayer;

// Function to validate URL (You can use a library like 'valid-url' for more comprehensive validation)
const isValidURL = (url) => {
  // Regular expression for URL validation
  const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlPattern.test(url);
};
