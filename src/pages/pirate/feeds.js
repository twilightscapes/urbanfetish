import React from "react";
import { useState, useEffect } from "react";
import AuthenticatedTimeline from "../../components/AuthenticatedTimeline";
import { useStaticQuery, graphql } from "gatsby";
import useSiteMetadata from "../../hooks/SiteMetadata";

const TimeLine = () => {

  const { featureOptions } = useSiteMetadata();
  const { showDefault } = featureOptions;

  // Check if localStorage is available
  const isLocalStorageAvailable = typeof window !== "undefined" && window.localStorage;

  // Set the initial state directly from localStorage if available, otherwise set to true
  const storedValue = isLocalStorageAvailable ? localStorage.getItem("isSliderVisible") : null;
  const initialSliderVisible = storedValue ? JSON.parse(storedValue) : showDefault;

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

  useStaticQuery(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/static/content/pages/index.md$/" }) {
        frontmatter {
          pagePW
        }
      }
    }
  `);

  return <AuthenticatedTimeline isSliderVisible={isSliderVisible} />;
};

export default TimeLine;
