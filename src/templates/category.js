import React from 'react';
import { graphql, Link, navigate } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/siteLayout"
import useSiteMetadata from "../hooks/SiteMetadata"
import { ImPlay } from "react-icons/im"
import { FaImage } from "react-icons/fa"
import { AiOutlinePicLeft } from "react-icons/ai"

import { Helmet } from "react-helmet"


const Category = ({ data, pageContext }) => {
  const { category } = pageContext
  const posts = data.posts.edges
  const categories = data.allMarkdownRemark.group.map((group) => group.fieldValue)

  const { showNav } = useSiteMetadata()

  return (
    <Layout>
      <Helmet>
        <body id="body" className="tag scroll" style={{}} />
      </Helmet>

      {showNav ? (
        <div className="spacer" style={{ height: "70px", border: "0px solid yellow" }}></div>
      ) : (
        ""
      )}

      <div>
<div style={{display:'flex', flexDirection:'column', justifyContent:'center', marginTop:''}}>
        {/* <h1 style={{ textAlign: "center" }}>{category}</h1> */}
        <select className="cattags"
  style={{}}
  onChange={(e) => {
    const selectedCategory = e.target.value;
    navigate(`/category/${selectedCategory}`);
  }}
  value={category}
>
  {categories.map((category) => (
    <option key={category} value={category} selected={category === pageContext.category}>
      {category}
    </option>
  ))}
</select>
 </div>       
        

        <div className="contentpanel horizontal-scroll panels" style={{ marginTop: "5vh" }}>
          <div className="sliderSpacer" style={{ height: "", paddingTop: "0", display: "none" }}></div>

          {posts.map(({ node }) => {
            const featuredImg = node.frontmatter.featuredImage;

            return (
              <div className="post-card1" style={{ justifyContent: "center", alignItems: "center" }} key={node.id}>
                {featuredImg && (
                  <Link key={node.id} to={node.frontmatter.slug}>
                    <GatsbyImage
                      image={node.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
                      alt={node.frontmatter.title + " - Featured image"}
                      className="featured-image1"
                      placeholder="blurred"
                      style={{ position: "relative", zIndex: "1", maxHeight: "", margin: "0 auto" }}
                    />

<div className="post-content" style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'100%', height:'', position:'relative', background:'', padding:'0', margin:'0 auto 0 auto', textAlign:'center', overFlow:'hidden'}}>

{node.frontmatter.youtube.youtuber ? (
<Link to={node.frontmatter.slug} style={{}}>

  <div className="spotlight" style={{marginLeft:'10%', marginTop:'-28%', margin:'-24% 10% 0 10%'}}>

<div className="posticons" style={{flexDirection:'column', margin:'0 auto'}}>

<div style={{display:'flex', justifyContent:'space-around', gap:'2vw', color:'fff', }}>
<FaImage className="posticon" style={{margin:'0 auto', width:'100%', height:'5vh', fontSize:''}} />
    <ImPlay className="posticon" style={{margin:'0 auto', width:'100%', height:'5vh', fontSize:''}} />
    <AiOutlinePicLeft className="posticon" style={{margin:'0 auto', width:'100%', height:'5vh', fontSize:''}} />
</div>

Play Multimedia
</div>

</div>

</Link>
) : (
  ""
)}

<div className="panel" style={{display:'flex', justifyContent:'space-between', alignItems:'center', margin:'0 auto', maxWidth:'80vw', gap:'.4vw', height:'', textAlign:'center', padding:'1vh 2vw', fontSize:'clamp(1rem, 1vw, 1rem)',  background:'rgba(0, 0, 0, 0.7)', borderRadius:'', color:'#aaa' }}>

<h2 className="title1" style={{ }}>
    {node.frontmatter.title}
</h2>
            </div>

            </div>


                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};


export const query = graphql`
query($category: String!) {
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          category
        }
      }
    }
    group(field: {frontmatter: {category: SELECT}}) {
      fieldValue
    }
  }
  posts: allMarkdownRemark(filter: {frontmatter: {category: {eq: $category}}}) {
    edges {
      node {
        id
        frontmatter {
          slug
          title
          date(formatString: "MMMM DD, YYYY")
          category
          youtube{
            youtuber
          }
          featuredImage {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
}

`

export default Category
