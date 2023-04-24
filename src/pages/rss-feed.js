import React, { useState, useEffect } from "react";
// import useSiteMetadata from "../hooks/SiteMetadata"
// import { StaticImage } from "gatsby-plugin-image"
// import {Link} from "gatsby"
import styled from "styled-components"
import Layout from "../components/siteLayout"
import { Helmet } from "react-helmet"

const CustomBox = styled.div`


`

const RSSFeedPage = () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    fetch("/rss.xml")
      .then((response) => response.text())
      .then((str) => new DOMParser().parseFromString(str, "text/xml"))
      .then((data) => {
        const items = data.querySelectorAll("item");
        const feedItems = Array.from(items).map((item) => {
          return {
            title: item.querySelector("title").textContent,
            link: item.querySelector("link").textContent,
            description: item.querySelector("description").textContent,
            pubDate: item.querySelector("pubDate").textContent,
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

      <div>
      <h1>RSS Feed</h1>
      <ul>
        {feed.map((item, index) => (
          <li key={index}>
            <h2>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            </h2>
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
          </li>
        ))}
      </ul>
    </div>
    </Layout>



      </CustomBox>
  );
};

export default RSSFeedPage;








