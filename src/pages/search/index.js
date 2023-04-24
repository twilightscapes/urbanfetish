import React from "react"

import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { ImPlay } from "react-icons/im"
import { FaImage } from "react-icons/fa"
import { AiOutlinePicLeft } from "react-icons/ai"
import Layout from "../../components/siteLayout"
import { Helmet } from "react-helmet"
// import TwilightLogo from "../../../static/assets/logo.svg"
import { StaticImage } from "gatsby-plugin-image"

import useSiteMetadata from "../../hooks/SiteMetadata"

import TimeAgo from 'react-timeago'

function clearfield() {  
  document.querySelector('#clearme').value = ''
}





const SearchPage = ({ data }) => {

  const { showModals } = useSiteMetadata();
  const { showDates } = useSiteMetadata()

  const allPosts = data.allMarkdownRemark.edges
  const [query, setQuery] = React.useState("")
  const [filteredPosts, setFilteredPosts] = React.useState(allPosts)

  const handleSearch = event => {
    const query = event.target.value
    setQuery(query)
    console.log(query);
  
    const filteredPosts = allPosts.filter(({ node }) => {
      const { title, tags } = node.frontmatter
      return (
        title.toLowerCase().includes(query.toLowerCase()) ||
        (tags && tags.join("").toLowerCase().includes(query.toLowerCase()))
      )
    })
    setFilteredPosts(filteredPosts)
  }
  
  

  return (
<Layout>

<Helmet>
  <body id="body" className="search"  />
</Helmet>


<div className="spacer" style={{height:'80px', border:'0px solid yellow'}}>{query}</div>



      <div className="cattags" style={{position:'fixed', top:'', left:'1%', right:'1%', maxWidth:'380px', margin:'15px auto 0 auto', zIndex:'3', display:'grid', placeSelf:'center', outline:'1px solid #999', borderRadius:'3px', padding:'', color:''}}>
      <label style={{}}>
        <input id="clearme" type="text" placeholder="Search:" onChange={handleSearch} style={{maxWidth:'80vw', background:'transparent'}} /> 
<button type="reset" value="reset" onClick={() => clearfield()} style={{position:'absolute', right:'20px', top:'10px', color:'#fff'}}>clear</button>

              <div style={{position:'absolute', right:'100px', top:'10px', textAlign:'center', fontSize:'10px', color:'#fff'}}>{filteredPosts.length} <br />result{filteredPosts.length !== 1 && 's'}</div>
      </label>
      </div>

      {/* <TwilightLogo className="bglogo darkened" /> */}
      <div className="contentpanel grid-container" style={{justifyContent:'center', alignItems:'center', marginTop:'70px'}}>

<div className="sliderSpacer" style={{height:'', paddingTop:'', display:''}}></div>


  {/* {filteredPosts.length} result{filteredPosts.length !== 1 && 's'} */}

  {filteredPosts.map(({ node }, index) => (
 









<div  key={index}
    className="post-card1"
    style={{  alignItems:'center'}}
  >
<Link className="postlink" state={showModals ? { modal: true } : {}} key={node.frontmatter.slug} to={node.frontmatter.slug}>

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
            src="../../../static/assets/default-og-image.webp"
            alt="Default Image"
            style={{ position: 'relative', zIndex: '' }}
          />

      )}





<div className="post-content" style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'100%', height:'', position:'relative', background:'', padding:'0', margin:'0 auto 0 auto', textAlign:'center', overFlow:'hidden'}}>

{node.frontmatter.youtube.youtuber ? (


  <div className="spotlight" style={{marginLeft:'10%', marginTop:'-28%', margin:'-24% 10% 0 10%'}}>

<div className="posticons" style={{flexDirection:'column', margin:'0 auto'}}>

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





<div className="panel" style={{display:'flex', justifyContent:'space-between', alignItems:'center', margin:'10px auto', maxWidth:'80vw', gap:'.4vw', height:'', textAlign:'center', padding:'1vh 2vw', fontSize:'clamp(1rem, 1vw, 1rem)',  background:'rgba(0, 0, 0, 0.7)', borderRadius:'', color:'#aaa' }}>

<h2 className="title1" style={{ }}>
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

          
        ))}
        
      </div>

      </Layout>


  )
}

export const pageQuery = graphql`
query pageUsersSitesssrcpagessearchindexJs3773404046 {
  allMarkdownRemark(
    sort: {frontmatter: {date: DESC}}
    filter: {frontmatter: {template: {eq: "blog-post"}}}
  ) {
    edges {
      node {
        id
        excerpt(pruneLength: 250)
        frontmatter {
          title
          date(formatString: "YYYY-MM-DD-HH-MM-SS")
          youtube{
            youtuber
          }
          featuredImage {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
            }
          }
          slug




        }
      }
    }
  }
}
`


export default SearchPage




