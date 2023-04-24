import React, { useState, useEffect } from "react";
import useSiteMetadata from "../hooks/SiteMetadata"
// import { StaticImage } from "gatsby-plugin-image"
// import {Link} from "gatsby"
import styled from "styled-components"
import Layout from "../components/siteLayout"
import { Helmet } from "react-helmet"
import TimeAgo from 'react-timeago'
const CustomBox = styled.div`


`



const TimeLine = () => {

  const { showNav } = useSiteMetadata()
  const { showDates } = useSiteMetadata()
  const { postcount } = useSiteMetadata()
  const [feed, setFeed] = useState([]);
  const [visibleItems, setVisibleItems] = useState(postcount); // Add a state variable to track visible items

  useEffect(() => {
    fetch("https://urbanfetish.com/rss.xml")
    .then((response) => response.text())
      .then((str) => new DOMParser().parseFromString(str, "text/xml"))
      .then((data) => {
        const items = data.querySelectorAll("item");
        const feedItems = Array.from(items).map((item) => {
          const mediaContent = item.getElementsByTagName("media:content")[0];
          const imageUrl = mediaContent ? mediaContent.getAttribute("url") : null;
          return {
            title: item.querySelector("title")?.textContent || "",
            link: item.querySelector("link")?.textContent || "",
            description: item.querySelector("description")?.textContent || "",
            pubDate: item.querySelector("pubDate")?.textContent || "",
            imageUrl: imageUrl,
          };
        });
        setFeed(feedItems);
      });
    }, []);

    const showMoreItems = () => {
      setVisibleItems(visibleItems + postcount);
    };

  return (
  
  




    <CustomBox>
<Layout>
<Helmet>
        <body id="body" className="test" />
      </Helmet>

      {showNav ? (
        <div className="spacer" style={{ height: "70px", border: "0px solid yellow" }}></div>
      ) : (
        ""
      )}
<h1 style={{ position: 'relative', zIndex: '1', margin: '0 auto', textAlign:'center' }}>My Timeline:</h1>
<div className="contentpanel grid-container" style={{ marginTop: "1rem" }}>
          <div className="sliderSpacer" style={{ height: "", paddingTop: "", display: "" }}></div>

          {feed.slice(0, visibleItems).map((item, index) => ( // Modify the rendering to show only visibleItems number of items
          
          <div className="post-card1" style={{ justifyContent: "center", alignItems: "center" }} key={index}>
            <a className="postlink" href={item.link} rel="noopener noreferrer">
            


            {item.imageUrl && <img className="featured-image1" src={item.imageUrl} alt={item.title} style={{ position: 'relative', zIndex: '1', maxHeight: '', margin: '0 auto' }} />}

            <div className="post-content" style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'100%', height:'', position:'relative', background:'', padding:'0', margin:'0 auto 0 auto', textAlign:'center', overFlow:'hidden'}}>
        

<div className="panel" style={{display:'flex', justifyContent:'space-between', alignItems:'center', margin:'10px auto', maxWidth:'80vw', gap:'.4vw', height:'', textAlign:'center', padding:'1vh 2vw', fontSize:'clamp(1rem, 1vw, 1rem)',  background:'rgba(0, 0, 0, 0.7)', borderRadius:'', color:'#aaa' }}>

<h2>
{item.title}
</h2>
<p>{item.description}</p>
</div>


            {showDates ? (
            <p style={{position:'', textAlign:'center', border:'0px solid red', fontSize:'70%', minWidth:'100px'}}>
            <TimeAgo date={item.pubDate} />
          </p>
          ) : (
            ""
          )}

</div>
            
            
            </a>
            
          </div>
          

          
        ))}

{visibleItems < feed.length && (
            <div className="show-more-grid-item" style={{ display: "flex", justifyContent: "center", width: "100%" }}>
              <button className="post-card1" style={{ justifyContent: "center", alignItems: "center" }} onClick={showMoreItems} >
                Show more
              </button>
            </div>
          )}

        
      </div>



    </Layout>



      </CustomBox>
  );
};

export default TimeLine;








