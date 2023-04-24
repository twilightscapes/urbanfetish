import React, { useState, useEffect } from "react";
import useSiteMetadata from "../hooks/SiteMetadata"
// import { StaticImage } from "gatsby-plugin-image"
// import {Link} from "gatsby"
import styled from "styled-components"
import Layout from "../components/siteLayout"
import { Helmet } from "react-helmet"

const CustomBox = styled.div`


`



const RSSFeedPage = () => {

  const { showNav } = useSiteMetadata()
  const { showDates } = useSiteMetadata()

  const [feed, setFeed] = useState([]);

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

<div className="contentpanel grid-container" style={{ marginTop: "" }}>
          <div className="sliderSpacer" style={{ height: "", paddingTop: "", display: "" }}></div>

        {feed.map((item, index) => (
          <div className="post-card1" style={{ justifyContent: "center", alignItems: "center" }} key={index}>
            <a className="postlink" href={item.link} rel="noopener noreferrer">
            <h2>
                {item.title}
            </h2>
            {item.imageUrl && <img src={item.imageUrl} alt={item.title} />}
            <p>{item.description}</p>
            <p>
              <small>
                Published on{" "}
                {new Date(item.pubDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </small>
            </p>
            </a>
          </div>
        ))}
      </div>

    </Layout>



      </CustomBox>
  );
};

export default RSSFeedPage;








