import React from "react"
import { graphql, Link, navigate } from "gatsby"
import useSiteMetadata from "../hooks/SiteMetadata"
// import { GatsbyImage } from "gatsby-plugin-image"
// import { StaticImage } from "gatsby-plugin-image"
import { AiFillDownSquare } from "react-icons/ai"
import Layout from "../components/siteLayout"
import { Helmet } from "react-helmet"

const CategoryIndex = ({ data, pageContext }) => {
  const { category } = pageContext
  const categories = data.allMarkdownRemark.group.map((group) => group.fieldValue)

  const { showNav } = useSiteMetadata()
  // const { showDates } = useSiteMetadata()

  return (

    
    <Layout>
      <Helmet>
        <body className="category utilitypage" />
      </Helmet>
      {showNav ? (
        <div className="spacer" style={{ height: "70px", border: "0px solid yellow" }}></div>
      ) : (
        ""
      )}


<div className="selectArrow" style={{position:'fixed', top:'', left:'1%', right:'1%',  margin:'-55px auto 0 auto', zIndex:'3', display:'grid', placeSelf:'center',  padding:'',}}>
        {/* <h1 style={{ textAlign: "center" }}>{category}</h1> */}
        <select
  className="cattags"
  style={{}}
  onChange={(e) => {
    const selectedCategory = e.target.value;
    navigate(`/category/${selectedCategory}`);
  }}
  value={category}
>
  <option value="">Categories:</option>
  {categories.map((category) => (
    <option key={category} value={category}>
      {category}
    </option>
  ))}
</select>
<div style={{position:'absolute', right:'10px', top:'8px', height:'100%', color:'#fff', zIndex:'-1', fontSize:'30px'}}><AiFillDownSquare /></div>
 </div>    



 <div className="contentpanel grid-container" style={{ marginTop: "" }}>
          <div className="sliderSpacer" style={{ height: "", paddingTop: "", display: "" }}></div>

   
        {categories.map(category => (
          <div className="post-card12 font" key={category} style={{border:'0px solid red', display:'grid', width:'100%', maxWidth:'', height:'70vh', placeContent:'center', textTransform:'capitalize' }}>

            <Link style={{display:'grid', placeContent:'center', maxHeight:'250px', width:'100%', maxWidth:'350px', overFlow:'hidden', margin:'0 auto', padding:'18vh 20vw', border:'1px solid #999',fontSize:'clamp(3rem, 3.4vw, 3.2rem)',  background:'rgba(0, 0, 0, 0.5)', color:'#fff', textShadow:'2px 2px 0 #222',  backdropFilter:'blur(12px)', borderRadius:'8px', opacity:'.8'}} to={`/category/${category}`}>view<br />{category}</Link>

          </div>
        ))}
      </div>
  
  
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark {
      group(field: {frontmatter: {category: SELECT}}) {
        fieldValue
      }
    }
  }
`;

export default CategoryIndex;
