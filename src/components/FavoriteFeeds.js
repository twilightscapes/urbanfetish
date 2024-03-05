import React, { useState, useRef, useEffect } from "react";
import useSiteMetadata from "../hooks/SiteMetadata";
import { Helmet } from "react-helmet";
import TimeAgo from "react-timeago";
import userRssData from "../../static/data/userRss.json";
// import useNetlifyIdentity from '../components/useNetlifyIdentity';


const createExcerpt = (text, maxLength) => {
  if (!text) {
    return "";
  }

  if (text.length <= maxLength) {
    return text;
  }

  const trimmedText = text.substr(0, maxLength);

  return trimmedText.substr(0, Math.min(trimmedText.length, trimmedText.lastIndexOf(" "))) + "...";
};

const FavoriteFeeds = ({ isSliderVisible }) => {

// eslint-disable-next-line
const [sliderVisible, setSliderVisible] = useState(true); 

useEffect(() => {
  // Check if window is defined to ensure it's running in a client-side environment
  if (typeof window !== 'undefined') {
    // Set the default visibility to true if localStorage value is not available
    const storedSliderVisibility = localStorage.getItem("isSliderVisible");
    const initialSliderVisible = storedSliderVisibility ? JSON.parse(storedSliderVisibility) : true;
    // Set the initial visibility based on the prop or localStorage
    setSliderVisible(isSliderVisible ?? initialSliderVisible);
  }
  return () => {
    // Cleanup function if needed
  };
}, [isSliderVisible, setSliderVisible]); // Add setSliderVisible to the dependency array


const scrollRef = useRef(null);
const containerClass = isSliderVisible ? "slider" : "grid-container contentpanel";
const handleScroll = (e) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Your scroll handling logic
    };
  
    const currentScrollRef = scrollRef.current;
  
    if (currentScrollRef) {
      currentScrollRef.addEventListener("scroll", handleScroll);
    }
  
    return () => {
      if (currentScrollRef) {
        currentScrollRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollRef]);


  const [isMenuOpen, setIsMenuOpen] = useState(true);
  /* eslint-disable-next-line no-unused-vars */
  const [isMobile, setIsMobile] = useState(false);
  

  // const resizeMobile = () => {
  //   setIsMenuOpen(false);
  //   setIsMobile(true);
  //   const elements = document.querySelectorAll(".menusnapp");
  //   elements.forEach((el) => {
  //     el.style.display = "none";
  //     el.style.overflow = "hidden";
  //     el.style.transition = "transform 1550ms ease-in-out";
  //   });
  // };

  // const resizeDesk = () => {
  //   setIsMenuOpen(true);
  //   setIsMobile(false);
  //   const elements = document.querySelectorAll(".menusnapp");
  //   elements.forEach((el) => {
  //     el.style.display = "flex";
  //     el.style.transition = "transform 1550ms ease-in-out";
  //   });
  // };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedIsMenuOpen = window.localStorage.getItem("isMenuOpen");
      if (storedIsMenuOpen) {
        setIsMenuOpen(storedIsMenuOpen === "true");
      } else {
        setIsMenuOpen(true); // set default value to true if no value found in local storage
      }
    }
  }, []);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("isMenuOpen", isMenuOpen);
    }
  }, [isMenuOpen]);
  

  // const MenuIcon = isMenuOpen ? RiCloseCircleFill : RiMenuUnfoldFill;



  // const { showNav } = useSiteMetadata();
  // const { showDates } = useSiteMetadata();
  const { postcount } = useSiteMetadata();
  const [favorites, setFavorites] = useState([]);
  const [feed, setFeed] = useState([]);
  const [visibleItems, setVisibleItems] = useState(postcount || 10); // default value of 10

  // const [loggedIn, setLoggedIn] = useState(false);
  // useNetlifyIdentity(setLoggedIn);

  // const combinedFeed = [
  //   ...favorites,
  //   ...feed.filter((item) => !favorites.some((fav) => fav.link === item.link)),
  // ];

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const toggleFavorite = (item) => {
    const newFavorites = [...favorites];

    if (favorites.some((favorite) => favorite.link === item.link)) {
      // If the item is already in favorites, remove it
      const index = newFavorites.findIndex((favorite) => favorite.link === item.link);
      newFavorites.splice(index, 1);
    } else {
      // Otherwise, add the item to favorites
      newFavorites.push(item);
    }

    setFavorites(newFavorites);

    // Save the new favorites to localStorage
    localStorage.setItem("favorites", JSON.stringify(newFavorites));

    // Update the favorite status of the item in the feed
    const newFeed = feed.map((feedItem) => {
      if (feedItem.link === item.link) {
        return { ...feedItem, favorite: !feedItem.favorite };
      }
      return feedItem;
    });

    setFeed(newFeed);
  };

  useEffect(() => {
    const fetchRssFeed = async (rssFeed) => {
      const response = await fetch(rssFeed.rssFeedUrl);
      const text = await response.text();
      const xml = new DOMParser().parseFromString(text, "text/xml");
      const items = xml.querySelectorAll("item");

      return Array.from(items).map((item) => {
        const mediaContent = item.getElementsByTagName("media:content")[0];
        const imageUrl = mediaContent ? mediaContent.getAttribute("url") : null;

        return {
          name: rssFeed.name,
          title: item.querySelector("title")?.textContent || "",
          link: item.querySelector("link")?.textContent || "",
          description: item.querySelector("description")?.textContent || "",
          pubDate: item.querySelector("pubDate")?.textContent || "",
          imageUrl: imageUrl,
          favorite: false,
        };
      });
    };

    const fetchAllFeeds = async () => {
      if (typeof window !== "undefined") {
        const feedPromises = userRssData.rssFeeds.map((feed) => fetchRssFeed(feed));
        const allFeeds = await Promise.all(feedPromises);
        const mergedFeed = [].concat(...allFeeds);

        // Sort the merged feeds by their pubDate in descending order (most recent first)
        const sortedFeed = mergedFeed.sort((a, b) => {
          return new Date(b.pubDate) - new Date(a.pubDate);
        });

        setFeed(sortedFeed);
      }
    };

    fetchAllFeeds();
  }, []);


  

  const showMoreItems = () => {
    setVisibleItems(visibleItems + postcount);
  };

  return (
    <>
        <Helmet>
          <body id="body" className="social" />
        </Helmet>


{/* <h1 style={{ position: 'relative', zIndex: '1', margin: '0 auto', textAlign:'center' }}>My Timeline:</h1> */}














<div className={containerClass} onWheel={handleScroll}
      ref={scrollRef} style={{ marginTop: '5vh' }}>
          <div className="sliderSpacer" style={{ height: "", paddingTop: "", display: "" }}></div>



          {/* {combinedFeed.slice(0, visibleItems).map((item, index) => ( */}
          {favorites.slice(0, visibleItems).map((item, index) => (

          <div className="post-card1" style={{ justifyContent: "end", alignItems: "center", position:'relative' }} key={index}>




  <a className="postlink" href={item.link} rel="noopener noreferrer">
    {item.imageUrl && (
      <img className="featured-image1" src={item.imageUrl} alt={item.title} style={{ position: 'relative', zIndex: '1', maxHeight: '', margin: '0 auto' }} />
    )}

    <div className="post-content" style={{display:'flex', flexDirection:'column', justifyContent:'end', width:'100%', height:'', position:'relative', background:'', padding:'0', margin:'0 auto 0 auto', textAlign:'center', overFlow:'hidden'}}>
      
      <div className="panel" style={{display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'center', margin:'10px auto', maxWidth:'80vw', gap:'.4vw', height:'', textAlign:'center', padding:'1vh 2vw', fontSize:'clamp(1rem, 1vw, 1rem)',  background:'rgba(0, 0, 0, 0.7)', borderRadius:'', color:'#aaa' }}>
      {/* <h2 onClick={() => toggleFavorite(item)}>
  {item.favorite ? "⭐" : "☆"} {item.name} - {item.title}
</h2> */}










<h2 style={{textAlign:'left', textWrap:'balance'}}>
  {item.name} - {item.title}
</h2>
<p style={{textAlign:'left', textWrap:'balance', fontSize:'85%'}}>
      {createExcerpt(item.description, 200)}
    </p>
      </div>

      {/* {showDates ? ( */}
        <p style={{position:'', textAlign:'center', border:'0px solid red', fontSize:'70%', minWidth:'100px'}}>
          <TimeAgo date={item.pubDate} />
        </p>
      {/* ) : (
        ""
      )} */}
    </div>
  </a>
  {!item.favorite && (
  <button
    className="star-button"
    onClick={(event) => {
      event.preventDefault();
      toggleFavorite(item);
    }}
    style={{ cursor: "pointer", background: "none", border: "none", position:'relative', top:'-10px', right:'10px', zIndex:'' }}
  >
    ☆
  </button>
)}
{item.favorite && (
  <button
    className="star-button"
    onClick={(event) => {
      event.preventDefault();
      toggleFavorite(item);
    }}
    style={{ cursor: "pointer", background: "none", border: "none", position:'relative', top:'-10px', right:'10px', zIndex:'' }}
  >
    ⭐
  </button>
)}
</div>

          

          
        ))}



{visibleItems < feed.length && (
            
              <button className="post-card1" style={{ justifyContent: "center", alignItems: "center" }} onClick={showMoreItems} >
                Select More Favorites by hitting the ⭐
              </button>
            
          )}
{visibleItems === feed.length && (
  <div style={{ textAlign: 'center', margin: '1rem 0' }}>End of Results Reached</div>
)}
        
      </div>
  
      </>

  );
};


export default FavoriteFeeds;



