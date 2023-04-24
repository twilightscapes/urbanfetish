import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/siteLayout"
import { ImPlay } from "react-icons/im"
import { FaImage } from "react-icons/fa"
import { AiOutlinePicLeft, AiFillDownSquare } from "react-icons/ai"
import { Helmet } from "react-helmet"
import TimeAgo from 'react-timeago'
import useSiteMetadata from "../hooks/SiteMetadata"
const TagIndex = ({ data }) => {
  const { showDates } = useSiteMetadata()
  const [selectedTag, setSelectedTag] = useState(''); // State to keep track of selected tag

  const handleTagChange = (event) => { // Handler for select change
    setSelectedTag(event.target.value);
  }


  
  const tags = data.allMarkdownRemark.group.filter(
    group => group.fieldValue !== null && group.fieldValue !== ""
  ).map(group => group.fieldValue);

  if (!tags || tags.length === 0) {
    return <div>No keywords found.</div>;
  }

  return (
    <Layout>
        <Helmet>
        <body className="tagpage utilitypage" />
      </Helmet>
      <div className="spacer" style={{ height: '70px', border: '0px solid yellow', }}></div>


        


        <div className="selectArrow" style={{position:'fixed', top:'', left:'1%', right:'1%',  margin:'-55px auto 0 auto', zIndex:'3', display:'grid', placeSelf:'center',  padding:'',}}>
          <select className="cattags" id="tag-select" value={selectedTag} onChange={handleTagChange}>
            <option value="">keyword:</option>
            {tags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
          <div style={{position:'absolute', right:'10px', top:'8px', height:'100%', color:'#fff', zIndex:'-1', fontSize:'30px'}}><AiFillDownSquare /></div>
        </div>

       

        <div className="contentpanel grid-container" style={{ marginTop: "" }}>
          <div className="sliderSpacer" style={{ height: "", paddingTop: "", display: "" }}></div>
   
          {data.allMarkdownRemark.edges &&
            data.allMarkdownRemark.edges
              .filter(({ node }) => !selectedTag || (node.frontmatter.tags && node.frontmatter.tags.includes(selectedTag)))
              .reverse()
              .map(({ node }) => {
                // const { featuredImage } = node.frontmatter;

                return (
                  <div key={node.fields.slug} className="post-card1" style={{ justifyContent: "center", alignItems: "center" }}>
      
                    <Link className="postlink" to={node.fields.slug}>

{node.frontmatter.featuredImage ? (
    <GatsbyImage
      image={node.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
      alt={node.frontmatter.title + " - Featured image"}
      className="featured-image1"
      placeholder="blurred"
      loading="eager"
      style={{ position: 'relative', zIndex: '1', maxHeight: '', margin: '0 auto' }}
    />
) : (

    <StaticImage
      className="featured-image1"
      src="../../static/assets/default-og-image.webp"
      alt="Default Image"
      style={{ position: 'relative', zIndex: '' }}
    />

)}


<div className="post-content" style={{display:'flex', flexDirection:'column', justifyContent:'start', width:'100%', height:'', position:'relative', background:'', padding:'0', margin:'0 auto 0 auto', textAlign:'center', overFlow:'hidden'}}>

  {node.frontmatter.youtube.youtuber ? (

<div className="spotlight" style={{border:'0px solid green', }}>
<div className="posticons" style={{flexDirection:'column', justifyContent:'center', margin:'0 auto'}}>
<div style={{display:'flex', justifyContent:'space-around', gap:'2vw', color:'fff', }}>
<FaImage className="posticon" style={{margin:'0 auto', width:'60%', height:'30px', fontSize:''}} />
<ImPlay className="posticon" style={{margin:'0 auto', width:'60%', height:'30px', fontSize:''}} />
<AiOutlinePicLeft className="posticon" style={{margin:'0 auto', width:'60%', height:'30px', fontSize:''}} />
</div>
Play Multimedia
</div>
</div>

) : (
""
)}

<div className="panel" style={{display:'flex', justifyContent:'space-between', alignItems:'center', margin:'10px auto', width:'auto', maxWidth:'80vw', gap:'.4vw', height:'', textAlign:'center', padding:'1vh 2vw', fontSize:'clamp(1rem, 1vw, 1rem)',  background:'rgba(0, 0, 0, 0.7)', borderRadius:'', border:'0px solid red', color:'#aaa' }}>
      <h2 className="title" style={{ }}>
        {node.frontmatter.title}
      </h2>
  </div>








</div>

</Link>
{showDates ? (
            <p style={{position:'', textAlign:'center', border:'0px solid red', fontSize:'70%', minWidth:'100px'}}>
            <TimeAgo date={node.frontmatter.date}/>
          </p>
          ) : (
            ""
          )}
                  </div>
                )
              })
          }
        </div>

    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: {frontmatter: {template: {eq: "blog-post"}}}
      sort: {frontmatter: {date: ASC}}
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date
            title
            tags
            youtube {
              youtuber
            }
            featuredImage {
              childImageSharp {
                gatsbyImageData(
                  width: 800
                  quality: 80
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
      }
      group(field: {frontmatter: {tags: SELECT}}) {
        fieldValue
      }
    }
  }
`;

export default TagIndex;
