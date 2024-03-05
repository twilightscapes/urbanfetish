// BlogPosts.jsx
import React, { useState, useEffect, useRef } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import useSiteMetadata from "../hooks/SiteMetadata";
import ReactPlayer from 'react-player/lazy';
import SignUp from './newssign'
import TimeAgo from 'react-timeago';
import { MdArrowForwardIos } from 'react-icons/md';
import { ImPlay } from "react-icons/im";
import { FaImage } from "react-icons/fa";
import { AiOutlinePicLeft } from "react-icons/ai";
// import { getSrc } from "gatsby-plugin-image";
// const HomePosts = ({ isSliderVisible }) => {

const BlogPosts = ({ isSliderVisible }) => {
// eslint-disable-next-line
  const [sliderVisible, setSliderVisible] = useState(false); // Change the state variable name




  const { postcount, language, magicOptions, featureOptions, proOptions  } = useSiteMetadata();

  

  const data = useStaticQuery(graphql`
  query ($postcount: Int) {
    allMarkdownRemark(
      sort: [{ frontmatter: { spotlight: ASC } }, { frontmatter: { date: DESC } }]
      filter: { frontmatter: { template: { eq: "blog-post" }, draft: { ne: true } } }
      limit: $postcount
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 150)
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD-HH-MM-SS")
            youtube {
              youtuber
              showVidOnly
              youtubeautostart
              youtubecontrols
            }
            featuredImage {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
              }
            }
            category
            tags
            slug
            spotlight
            draft
          }
        }
      }
    }
  }
`);



    


    const { showMagicCat, showMagicTag } = magicOptions;
  
    const { showModals, showPopup } = proOptions
    const { showDates, showArchive, showTitles } = featureOptions
    
    const { dicLoadMore, dicViewArchive, dicCategory, dicKeyword, dicSearch, dicClear, dicResults, dicPlayVideo, dicPlayMultimedia  } = language;



    
  


    useEffect(() => {
      // Check if window is defined to ensure it's running in a client-side environment
      if (typeof window !== 'undefined') {
        // Set the default visibility to true if localStorage value is not available
        const storedSliderVisibility = localStorage.getItem("isSliderVisible");
        const initialSliderVisible = storedSliderVisibility ? JSON.parse(storedSliderVisibility) : true;
        // Set the initial visibility based on the prop or localStorage
        setSliderVisible(isSliderVisible ?? initialSliderVisible);
      }
  
      // Cleanup function if needed
      return () => {
        // Cleanup logic here...
      };
    }, [isSliderVisible]); // Run this effect whenever isSliderVisible changes
    
    

  const scrollRef = useRef(null);

  const handleScroll = (e) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY;
      behavior: 'smooth'
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


  


  // const markdownRemark = data.allMarkdownRemark.edges[0]?.node;
  // const { frontmatter, excerpt } = markdownRemark || {};
  

  const allPosts = data.allMarkdownRemark.edges;

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  // eslint-disable-next-line
  const [visibleItems, setVisibleItems] = useState(postcount);

  const allCategoriesSet = new Set(allPosts.flatMap(({ node }) => node.frontmatter.category));
  const allCategories = Array.from(allCategoriesSet);

  const allTagsSet = new Set(allPosts.flatMap(({ node }) => node.frontmatter.tags || []));
  const allTags = Array.from(allTagsSet);

  const filteredPosts = allPosts.filter(({ node }) => {
    const { title, tags, category: categories, spotlight } = node.frontmatter;
    const titleMatch = query === "" || title.toLowerCase().includes(query.toLowerCase());
    const categoryMatch = selectedCategory === "" || (Array.isArray(categories) && categories.includes(selectedCategory));
    const tagMatch = selectedTag === "" || (tags && Array.isArray(tags) && tags.includes(selectedTag));
  
    // Check if spotlight is explicitly set to false or is undefined
    if (spotlight === false || spotlight === undefined) {
      return false; // Exclude posts with spotlight: false
    }
  
    return titleMatch && categoryMatch && tagMatch;
  });
  
  

  const sortedTags = allTags
  .filter(tag => tag)
  .sort((a, b) => {
    const countA = allPosts.filter(({ node }) => (node.frontmatter.tags || []).includes(a)).length;
    const countB = allPosts.filter(({ node }) => (node.frontmatter.tags || []).includes(b)).length;

    return countB - countA;
  });

/* eslint-disable no-useless-escape */
const extractVideoId = (url) => {
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/[^\/\n\s]+\/(?:\S+\/)?|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
};
/* eslint-enable no-useless-escape */
  
const playerRef = useRef(null);


const [playingIndex, setPlayingIndex] = useState(null);

  const handleVideoPlay = (index) => {
    setPlayingIndex(index);
  };

  const handleVideoPause = () => {
    setPlayingIndex(null);
  };




  useEffect(() => {
    setVisibleItems(postcount);
  }, [filteredPosts, postcount]);

  const handleSearch = (event) => {
    const query = event.target.value;
    setQuery(query);
    setVisibleItems(postcount);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    // Check if there are categories before updating the state
    if (allCategories.includes(category)) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory('');
    }
    setSelectedTag('');
    setVisibleItems(postcount);
  };
  

  const handleTagChange = (event) => {
    const tag = event.target.value;
    setSelectedTag(tag);
    setSelectedCategory("");
    setVisibleItems(postcount);
  };

  const [numVisibleItems, setNumVisibleItems] = useState(postcount);

  const showMoreItems = () => {
    setNumVisibleItems((prevNumVisibleItems) => prevNumVisibleItems + postcount);
  };

  function clearfield() {
    document.querySelector('#clearme').value = '';
    setQuery('');
    setSelectedCategory('');
    setSelectedTag('');
    setVisibleItems(postcount);
  }






  // const posts = data.allMarkdownRemark.edges;


  

  const renderContent = () => {
    const containerClass = isSliderVisible ? "slider" : "grid-container contentpanel";
    return (
      <>
<div className={containerClass}
      onWheel={handleScroll}
      ref={scrollRef}
      // style={{ paddingTop: showNav ? '8vw' : '8vw'}}
      >



        {filteredPosts.slice(0, numVisibleItems).map(({ node }, index) => (
  

<div key={index} className="post-card1" style={{ alignItems: '', overflow: 'visible', position:'relative' }}>

{(node.frontmatter.youtube?.showVidOnly && node.frontmatter.youtube.showVidOnly) ? (

<div style={{minWidth:'300px', minHeight: index === playingIndex ? '200px' : '200px', background: index === playingIndex ? 'rgba(0, 0, 0, 0.5)' : 'transparent', zindex:'1'}}>
                <ReactPlayer
                playing={index === playingIndex}
                ref={playerRef}
                url={node.frontmatter.youtube.youtuber}
                  allow="web-share"
                  // style={{ position: 'relative', margin: '0 auto 15px auto', zIndex: '',aspectRatio:'16/9', }}
                  width="350px"
                  height="200px"
                  className='inline'
                  playsinline
                  // className={`relative ${index === playingIndex ? 'fixed' : 'relative'}`}
                  style={{
                    position: index === playingIndex ? 'fixed' : 'relative',
                    
                    // top: index === playingIndex ? '50%' : 'auto',
                    // left: index === playingIndex ? '50%' : 'auto',
                    // transform: index === playingIndex ? 'translate(-50%, -50%)' : 'none',
                    bottom: index === playingIndex ? '10vh' : '',
                    left: index === playingIndex ? '5%' : '',
                    margin:'0 auto',
                    transition: 'all 1.3s ease-in-out',
                    // width: index === playingIndex ? '100%' : '350px',
                    // height: index === playingIndex ? '100%' : '200px',
                    border: index === playingIndex ? '1px solid var(--theme-ui-colors-siteColor)' : 'inherit',
                    boxShadow: index === playingIndex ? '2px 1px 10px 10px rgba(0, 0, 0, 0.5)' : 'inherit',
                    // width: '80vw',
                    // height:'60vh',
                    // margin: index === playingIndex ? '0' : '0 auto 15px auto',
                    zIndex: index === playingIndex ? '9999' : '1',
                    aspectRatio: '16/9',
                  }}
                  light={`https://i.ytimg.com/vi/${extractVideoId(node.frontmatter.youtube.youtuber)}/hqdefault.jpg`}
                  config={{
                    file: {
                      attributes: {
                        crossOrigin: "anonymous",
                      },
                    },
                    youtube: {
                      playerVars: { showinfo: 0, autoplay: 1, controls: 1, mute: 0, loop: 1 },
                    },
                  }}
                  playIcon={
                    <div style={{display:'flex', flexDirection:'column', placeContent:'', justifyContent:'', position:'absolute', zindex:'1', top:'', fontWeight:'bold', padding:'3% 0 0 0', width:'100%', maxWidth:'25vw', height:'', border:'0px solid', borderRadius:'12px', margin:'0 auto 0 auto', opacity:'.99', textShadow:'2px 2px 2px black', color:'#fff' }}>
                      <div className="spotlight font" style={{}}>
                        <div className="posticons" style={{ flexDirection: 'column', margin: '0 auto' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-around', gap: '2vw', color: 'fff', }}>
                            <ImPlay className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', fontSize: '' }} />
                          </div>
                          {dicPlayVideo}
                        </div>
                      </div>
                    </div>}
                    onPlay={() => handleVideoPlay(index)}
                    onPause={handleVideoPause}
                />
                </div>
              ) : (
                <Link className="postlink" state={showModals ? { modal: true } : {}} key={node.frontmatter.slug} to={node.frontmatter.slug}>
                  {node.frontmatter.featuredImage ? (
                    <GatsbyImage
                      image={node.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
                      alt={node.frontmatter.title + " - Featured image"}
                      className="featured-image1"
                      placeholder="blurred"
                      style={{ position: 'relative', zIndex: '1', maxHeight: '', margin: '0 auto', borderRadius:'var(--theme-ui-colors-borderRadius)' }}
                    />
                  ) : (
                    <StaticImage
                      className="featured-image1"
                      src="../../static/assets/default-og-image.webp"
                      alt="Default Image"
                      style={{ position: 'relative', zIndex: '1', maxHeight: '', margin: '0 auto', borderRadius:'var(--theme-ui-colors-borderRadius)' }}
                    />
                  )}
{(node.frontmatter.youtube?.youtuber && node.frontmatter.youtube.youtuber) ? (

                      <div className="spotlight font" style={{border:'0px solid'}}>
                        <div className="posticons" style={{ flexDirection: 'column', margin: '0 auto' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-around', gap: '2vw', color: 'fff', }}>
                            <FaImage className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', fontSize: '' }} />
                            <ImPlay className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', fontSize: '' }} />
                            <AiOutlinePicLeft className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', }} />
                          </div>
                          {dicPlayMultimedia}
                        </div>
                      </div>
                    ) : ("")}
                </Link>
              )}

              <div className="post-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '', position: 'relative', background: '', padding: '', margin: '0 auto 0 auto', textAlign: 'center', overFlow: 'hidden' }}>

{showTitles ? (
  <>
                <div className="panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', alignContent:'center', margin: '10px auto', maxWidth: '', gap: '.4vw', maxHeight: '74px', textAlign: 'left', padding: '10px 5%', fontSize: 'clamp(.7rem,.8vh,12px)', outline:'0px solid #444', overFlow:'hidden', lineHeight:'2.4vh', borderRadius:'var(--theme-ui-colors-borderRadius)', background: showTitles ? 'var(--theme-ui-colors-headerColor)' : 'transparent',color:'var(--theme-ui-colors-headerColorText)' }}>
                  
                    <h2 className="title1" style={{width:'', }}>{node.frontmatter.title}</h2>
            

                  {showDates ? (
                    <p style={{ position: '', textAlign: 'center', border: '0px solid red', fontSize: '', padding:'0', margin:'0 0 0 20px', maxWidth: '60px', lineHeight:'100%' }}>
                      <TimeAgo date={node.frontmatter.date} />
                    </p>
                  ) : ("")}


                </div>
                </>
) : (
  ""
)}
              </div>

          </div>


      
        ))}


<div className="loadmore post-card1" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '',  textAlign: 'center', zIndex:'1' }}>
{numVisibleItems < filteredPosts.length && (
          
          <button className="button font" onClick={showMoreItems} style={{maxWidth:''}}>
              {dicLoadMore}
          </button>
          
        )}

{showArchive ? (
      
      <Link state={showModals ? { modal: true } : {}} to="/archive" className="font" style={{ background: 'var(--theme-ui-colors-headerColor)', borderRadius: 'var(--theme-ui-colors-borderRadius)', color: 'var(--theme-ui-colors-headerColorText)', display: 'flex', padding: '8px', margin: '0 auto', justifyContent:'center', maxWidth:'300px', alignItems:'center', }}>{dicViewArchive} &nbsp;<MdArrowForwardIos style={{ marginTop: '' }} /></Link>

  ) : (
    ""
  )}
</div>

{showPopup ? (
  <div className="loadmore post-card1" style={{ display: 'grid', flexDirection: 'column', placeContent: 'center', gap: '',  textAlign: 'center', zIndex:'1' }}>
            <SignUp />
  </div>
        ) : (
          ""
)}







      </div>  
</>
  );
};


  
  return (
    <>
      <div
        className="magicshell"

        style={{
          overflowX: "auto",
          overflowY: "hidden",
          padding:'1.5vh 1vw 0 1vw'
        }}
      >


          <div className="magicisland">
            <div className="cattags font panel" >
              {showMagicCat ? (
                <>
                  {allCategories.length > 1 && (
                    <select
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      style={{
                        background: 'var(--theme-ui-colors-siteColor)',
                        color: 'var(--theme-ui-colors-siteColorText)',
                        borderRadius: 'var(--theme-ui-colors-borderRadius)',
                        minWidth: '100px',
                        maxWidth: '20%',
                        overflow: 'hidden',
                        height: '',
                        lineHeight: '100%',
                        padding: '5px 2px',
                      }}
                      aria-label="Select Category"
                    >
                      <option value="">{dicCategory}</option>
                      {allCategories.filter(category => category).map((category, index) => (
                        <option key={`${category}_${index}`} value={category.trim()}>
                          {category.trim()}
                        </option>
                      ))}
                    </select>
                  )}
                </>
              ) : (
                ""
              )}

{showMagicTag && allTags.length > 0 && (
  <select
    value={selectedTag}
    onChange={handleTagChange}
    style={{
      background: 'var(--theme-ui-colors-siteColor)',
      color: 'var(--theme-ui-colors-siteColorText)',
      borderRadius: 'var(--theme-ui-colors-borderRadius)',
      minWidth: '100px',
      maxWidth: '30%',
      overflow: 'hidden',
      height: '',
      lineHeight: '100%',
      padding: '5px 2px',
    }}
    aria-label="Select Keyword"
  >
    <option value="">{dicKeyword}</option>
    {sortedTags.map((tag, index) => (
      <option key={`${tag}_${index}`} value={tag.trim()}>
        {tag.trim()} ({allPosts.filter(({ node }) => (node.frontmatter.tags || []).includes(tag)).length})
      </option>
    ))}
  </select>
)}





                <>
                
                    <input
                      id="clearme"
                      type="text"
                      placeholder={dicSearch + ":"}
                      onChange={handleSearch}
                      style={{
                        width: '',
                        background: 'var(--theme-ui-colors-siteColor)',
                        color: 'var(--theme-ui-colors-siteColorText)',
                        marginRight: '',
                        borderRadius: 'var(--theme-ui-colors-borderRadius)',
                        height: '',
                        lineHeight: '100%',
                        padding: '6px 6px',
                        minWidth: '100px',
                        maxWidth: '80%',
                      }}
                      aria-label="Search"
                    />
                  
                </>
            

              <button
                type="reset"
                value="reset"
                className="muted"
                onClick={clearfield}
                style={{
                  position: '',
                  right: '',
                  top: '',
                  background: 'var(--theme-ui-colors-siteColor)',
                  color: 'var(--theme-ui-colors-siteColorText)',
                  textAlign: 'center',
                  fontSize: '10px',
                  maxWidth: '',
                  height: '',
                  lineHeight: '100%',
                  padding: '5px 2px',
                  borderRadius: 'var(--theme-ui-colors-borderRadius)',
                  // opacity: '.8'
                }}
                aria-label="{dicClear}"
              >
                {dicClear}
              </button>

              <div style={{ position: '', right: '', top: '', textAlign: 'center', fontSize: '9px', color: 'var(--theme-ui-colors-headerColorText)', maxWidth: '' }}>
                {filteredPosts.length} <br />
                {dicResults}{filteredPosts.length !== 1 && 's'}
              </div>
            </div>
          </div>


        {renderContent()}
      </div>
    </>
  );
};

export default BlogPosts;
