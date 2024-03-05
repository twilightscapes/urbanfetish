import * as React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import { useLocation } from "@reach/router";
import defaultColors from "../../static/data/default-colors.json";
import darkColors from "../../static/data/dark-theme-colors.json";
import { useColorMode } from "theme-ui";

export default function Seo({
  title = "",
  description = "",
  pathname = "",
  image = "",
  children = null,
}) {
  const location = useLocation();
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          titleDefault
          siteUrl
          description
          image
          twitterUsername
          companyname
          icon512
        }
      }
    }
  `);

  const {
    titleDefault,
    siteDescription,
    siteImage,
    twitterUsername,
  } = siteMetadata;

  const seo = {
    title: title || titleDefault,
    description: description || siteDescription,
    url: pathname ? `${pathname}` : location.href,
    image: `${image || siteImage}`,
  };

  const [colorMode] = useColorMode();
  const colors = colorMode === "dark" ? darkColors : defaultColors;
  const themeColor = colors.siteBackground;

  return (
    <Helmet
      title={title}
      defaultTitle={titleDefault}
      titleTemplate={`%s | ${titleDefault}`}
    >
      <html lang="en" />
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="description" content={seo.description} />
      <meta content={themeColor} name="theme-color" />
      {/* <meta http-equiv="Content-Security-Policy" content={`font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.youtube.com ${seo.url}`} /> */}

      <meta http-equiv="Content-Security-Policy" content={`default-src *; script-src 'self' 'unsafe-inline' 'unsafe-eval' *; style-src 'self' 'unsafe-inline' *; img-src 'self' * data:; media-src 'self' *; font-src 'self' *; connect-src 'self' *; object-src 'self' *; frame-src 'self' *;`}/>



      {/* Other meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="image" content={seo.image} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:image" content={seo.image} />

      <meta name="apple-mobile-web-app-capable" content="yes" />

      {children}
    </Helmet>
  );
}
