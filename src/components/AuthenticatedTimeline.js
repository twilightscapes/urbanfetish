import React, { useState, useRef, useEffect } from "react";
import useSiteMetadata from "../hooks/SiteMetadata";
import { Link } from "gatsby"
import Layout from "../components/siteLayout"

import TimeAgo from "react-timeago";
import userRssData from "../../static/data/userRss.json";
// import Menu from "../components/menu";
// import useNetlifyIdentity from '../components/useNetlifyIdentity';
import { RiMenuUnfoldFill, RiCloseCircleFill } from "react-icons/ri"

import { Helmet } from "react-helmet"

const AuthenticatedTimeline = ({ isSliderVisible }) => {



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





  const [storedFeedUrls, setStoredFeedUrls] = useState([]);

  const [isMenuOpen, setIsMenuOpen] = useState(true);
  /* eslint-disable-next-line no-unused-vars */
  const [isMobile, setIsMobile] = useState(false);
  

  const resizeMobile = () => {
    setIsMenuOpen(false);
    setIsMobile(true);
    const elements = document.querySelectorAll(".menusnapp");
    elements.forEach((el) => {
      el.style.display = "none";
      el.style.overflow = "hidden";
      el.style.transition = "transform 1550ms ease-in-out";
    });
  };

  const resizeDesk = () => {
    setIsMenuOpen(true);
    setIsMobile(false);
    const elements = document.querySelectorAll(".menusnapp");
    elements.forEach((el) => {
      el.style.display = "flex";
      el.style.transition = "transform 1550ms ease-in-out";
    });
  };

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
  

  const MenuIcon = isMenuOpen ? RiCloseCircleFill : RiMenuUnfoldFill;




  // const { showNav } = useSiteMetadata();
  const { showDates } = useSiteMetadata();
  const { postcount } = useSiteMetadata();
  const [feed, setFeed] = useState([]);
  const [visibleItems, setVisibleItems] = useState(postcount);
  const [favorites, setFavorites] = useState([]);
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  const [newFeedUrl, setNewFeedUrl] = useState("");
  const [newFeedName, setNewFeedName] = useState("");


  const showMoreItems = () => {
    setVisibleItems(visibleItems + postcount);
    };
    

  // const [ setLoggedIn] = useState(false);
  // useNetlifyIdentity(setLoggedIn);

  const combinedFeed = [
    ...favorites,
    ...feed.filter((item) => !favorites.some((fav) => fav.link === item.link)),
  ];

  // filter out favorited items from combinedFeed
  const filteredFeed = combinedFeed.filter((item) => !item.favorite);

  useEffect(() => {
    const fetchRssFeed = async (rssFeed) => {
      try {
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
            favorite: false, // Add the favorite field and set it to false by default
          };
        });
      } catch (error) {
        console.error(`Failed to fetch RSS feed from ${rssFeed.rssFeedUrl}:`, error);
        return [];
      }
    };

    const fetchAllFeeds = async () => {
      if (typeof window !== "undefined") {
        const feedPromises = [...userRssData.rssFeeds, ...userSubscriptions].map((feed) => fetchRssFeed(feed));
        const allFeeds = await Promise.all(feedPromises);
        const mergedFeed = [].concat(...allFeeds);
    
        // Add the feedUrl property to each item
        mergedFeed.forEach((item) => {
          const feed = userRssData.rssFeeds.find((f) => f.name === item.name) || userSubscriptions.find((f) => f.name === item.name);
          item.feedUrl = feed ? feed.rssFeedUrl : "";
        });
    
        // Sort the merged feeds by their pubDate in descending order (most recent first)
        const sortedFeed = mergedFeed.sort((a, b) => {
          return new Date(b.pubDate) - new Date(a.pubDate);
        });
    
        setFeed(sortedFeed);
      }
    };
    
  
    fetchAllFeeds();
  }, [userSubscriptions]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  
    const storedSubscriptions = localStorage.getItem("userSubscriptions");
    if (storedSubscriptions) {
      const parsedSubscriptions = JSON.parse(storedSubscriptions);
      setUserSubscriptions(parsedSubscriptions);
    
      // Update the stored feed URLs
      const urls = parsedSubscriptions.map((subscription) => subscription.rssFeedUrl);
      setStoredFeedUrls(urls);
    }
  }, []);
  
    

  const toggleFavorite = (item) => {
    const newFavorites = [...favorites];

    if (favorites.some((favorite) => favorite.link === item.link)) {
      // If the item is already in favorites, remove it
      const index = newFavorites.findIndex((favorite) => favorite.link === item.link);
      newFavorites.splice(index, 1);
      item.favorite = false;
    } else {
      // Otherwise, add the item to favorites
      newFavorites.push(item);
      item.favorite = true;
    }
    
    setFavorites(newFavorites);
    
    // Save the new favorites to localStorage
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    
    // Update the favorite status of the item in the feed
    const newFeed = feed.map((feedItem) => {
      if (feedItem.link === item.link) {
        return { ...feedItem, favorite: item.favorite };
      }
      return feedItem;
    });
    
    setFeed(newFeed);

  };

  const createExcerpt = (html, maxLength) => {
    const strippedText = new DOMParser().parseFromString(html, 'text/html').body.textContent;
    return strippedText.length > maxLength ? `${strippedText.slice(0, maxLength)}...` : strippedText;
  };
  
  
  // const addSubscription = () => {
  //   if (newFeedUrl && newFeedName) {
  //     const newSubscription = {
  //       rssFeedUrl: newFeedUrl,
  //       name: newFeedName,
  //     };
  //     const updatedSubscriptions = [...userSubscriptions, newSubscription];
  //     setUserSubscriptions(updatedSubscriptions);
  //     localStorage.setItem("userSubscriptions", JSON.stringify(updatedSubscriptions));
  
  //     setNewFeedUrl("");
  //     setNewFeedName("");
  //   }
  // };


    /* eslint-disable-next-line no-unused-vars */
  const uniqueSubscriptions = [...new Set(userSubscriptions.map(subscription => subscription.name))];

  const addSubscription = () => {
    const newSubscription = {
      name: newFeedName,
      url: newFeedUrl,
    };
  
    // Check if subscription already exists
    const subscriptionExists = userSubscriptions.some(
      (subscription) => subscription.name === newFeedName
    );
  
    if (!subscriptionExists) {
      setUserSubscriptions([...userSubscriptions, newSubscription]);
      setNewFeedName("");
      setNewFeedUrl("");
    }
  
    // Check if the RSS feed URL is already stored in local storage
    if (storedFeedUrls.includes(newSubscription.rssFeedUrl)) {
      return;
    }
  
    const updatedSubscriptions = [...userSubscriptions, newSubscription];
    setUserSubscriptions(updatedSubscriptions);
    localStorage.setItem("userSubscriptions", JSON.stringify(updatedSubscriptions));
  
    // Update the stored feed URLs
    const urls = [...storedFeedUrls, newSubscription.rssFeedUrl];
    setStoredFeedUrls(urls);
  };
  
  

  


return (
<Layout>
<Helmet>
        <body id="body" className="social" />
      </Helmet>
{/* {showNav ? (
    <div className="spacer" style={{ height: "70px", border: "0px solid yellow" }}></div>
  ) : (
    ""
  )} */}




        <div
          className="pagemenu panel"
          style={{
            position: "fixed",
            bottom: "20px",
            zIndex: "4",
            left: "1vw",
            right: "",
            display: "none",
            justifyContent: "center",
            alignItems: "center",
            width: "auto",
            maxWidth: "80vw",
            margin: "0 auto",
            gap: "5vw",
            background: "rgba(0, 0, 0, .5)",
            padding: "",
            border: "1px solid #666",
            borderRadius: "",
            textShadow: "0 1px 1px rgba(0, 0, 0, .7)",
            // fontSize: "clamp(2rem, 3vw, 3rem)",
            verticalAlign: "center",
          }}
        >
          <div
            className="menusnapp"
            style={{
              gap: "0",
              padding: "2vh 4vw",
              alignItems: "center",
              display: isMenuOpen ? "block" : "none",
            }}
          >

<div className="flexbutt" style={{width:'100%', gap:'2vw'}}>

{/* <div className="contact-form flexcheek" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', minWidth:'30vw' }}>
<h4>Add A Feed:</h4>
        <input
          type="text"
          placeholder="Feed name"
          value={newFeedName}
          onChange={(e) => setNewFeedName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Feed URL"
          value={newFeedUrl}
          onChange={(e) => setNewFeedUrl(e.target.value)}
/>
<button className="button" onClick={addSubscription}>Add Subscription</button>
</div> */}
<div className="flexcheek" style={{ minWidth: '200px', maxHeight: '40vh', overflow: 'scroll', border:'1px solid #333', padding:'100px 3% 0 3%', borderRadius:'8px', textAlign:'center', position:'relative' }}>
{/* <h3>Latest Feeds:</h3>

<ul style={{display:'flex', flexDirection:'column'}}>
  {uniqueSubscriptions.map((subscription, index) => (
    <li key={index}>{subscription}</li>
  ))}
</ul> */}


        <Link state={{modal: true}} to="/favorites" className="button" style={{position:'absolute',  top:'10px', left:'0', right:'0', width:'70%', margin:'0 auto'}} >Manage Feeds</Link>

</div>


</div>   

          </div>
          <button
            onClick={isMenuOpen ? resizeMobile : resizeDesk}
            aria-label={isMenuOpen ? "Collapse menu" : "Expand menu"}
            style={{ cursor: "pointer", padding: "8px", color: "#999", fontSize: 'clamp(2rem, 3vw, 3rem)' }}
          >
            <MenuIcon />
          </button>
        </div>


      




  {/* <div className="contentpanel grid-container" style={{ marginTop: "1rem" }}>
          <div className="sliderSpacer" style={{ height: "", paddingTop: "", display: "" }}></div>

      {favorites.map((item, index) => (
        <div className="post-card" key={index}>
          <div className="post-header">
            <h3 className="post-title">
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            </h3>
            <button onClick={() => toggleFavorite(item)}>
              {item.favorite ? "Unfavorite" : "Favorite"}
            </button>
          </div>
          <div className="post-meta">
            <span className="post-source">{item.name}</span>
            {showDates && <TimeAgo date={item.pubDate} />}
          </div>
          <div className="post-content">
            {item.imageUrl && (
              <img src={item.imageUrl} alt={item.title} className="post-image" />
            )}
            <p className="post-excerpt">{createExcerpt(item.description, 150)}</p>
          </div>
        </div>
      ))}
    </div> */}



<div className={containerClass} onWheel={handleScroll}
      ref={scrollRef} style={{ marginTop: '5vh' }}>
        {/* <div className='sliderSpacer' style={{ height: '', paddingTop: '0', display: 'none' }}></div> */}



          {filteredFeed.slice(0, visibleItems).map((item, index) => (
  <div className='post-card1' style={{ justifyContent: 'center', alignItems: 'center' }} key={index}>

    <div className="post-content1 panel" style={{display:'flex', flexDirection:'column', justifyContent:'start', width:'100%', height:'', position:'relative', background:'', padding:'0', margin:'0 auto 0 auto', textAlign:'center', overFlow:'hidden'}}>
      
    <a className="postlink" href={item.link} rel="noopener noreferrer">
      {item.imageUrl && (
        <img src={item.imageUrl} alt={item.title} className="featured-image1" style={{ position: 'relative', zIndex: '1', width: 'auto', margin: '0 auto' }} />
      )}
      
        <h2 className="post-title">{item.title}</h2>
        <p className="post-excerpt">{createExcerpt(item.description, 150)}</p> 
      
    </a>
  
    <a
  href={item.feedUrl} // Set the href to the feed URL
  className="postlink"
  onClick={(e) => {
    e.preventDefault();
    addSubscription(item);
    toggleFavorite(item);
  }}
  style={{ border: 'none', background: 'none' }}
>
  {item.name}
</a>
      {showDates && <TimeAgo date={item.pubDate} />}
    </div>

    
    <button onClick={() => toggleFavorite(item)} style={{position:''}}>
      {item.favorite ? "Unfavorite" : "☆"}
    </button>
  </div>
))}

 

{visibleItems < filteredFeed.length && (
  <div className="load-more-wrapper" style={{display:'flex', flexDirection:'column', justifyContent:'center', gap:'', width:'', height:''}}>
  <button className="button load-more" onClick={showMoreItems}>
    Load more
  </button>
  </div>
      )}

    </div>

</Layout>

);
};

export default AuthenticatedTimeline;