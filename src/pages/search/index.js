import * as React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { ImPlay } from "react-icons/im"
import { FaImage } from "react-icons/fa"
import { AiOutlinePicLeft } from "react-icons/ai"
import Layout from "../../components/siteLayout"
import { Helmet } from "react-helmet"
import TwilightLogo from "../../../static/assets/logo.svg"
import { StaticImage } from "gatsby-plugin-image"

// import TimeAgo from 'react-timeago'

function clearfield() {  
  document.querySelector('#clearme').value = ''
}





const SearchPage = ({ data }) => {
  const allPosts = data.allMarkdownRemark.edges
  const [query, setQuery] = React.useState("")
  const [filteredPosts, setFilteredPosts] = React.useState(allPosts)

  const handleSearch = event => {
    const query = event.target.value
    setQuery(query)

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
  <body id="body" className="search scroll" style={{}} />
</Helmet>


<div id="top" className="spacer" style={{height:'80px', border:'0px solid yellow'}}></div>

      <div className="searchform" style={{position:'fixed', left:'1%', right:'1%', width:'380px', margin:'0 auto 0 auto', padding:'2vh 1vw', zIndex:'3', display:'grid', placeSelf:'center'}}>

      <label style={{border:'1px solid #fff', outline:'#fff', display:'block', borderRadius:'10px'}}>
        <input id="clearme" type="text" placeholder="filter by keyword" onChange={handleSearch} style={{maxWidth:'80vw'}} /> 
<button type="reset" value="reset" onClick={() => clearfield()} style={{position:'absolute', right:'2.5vw', top:'3vh', color:'#fff'}}>clear</button>

              <div style={{position:'absolute', right:'6vw', top:'2.8vh', textAlign:'center', fontSize:'10px', color:'#fff'}}>{filteredPosts.length} <br />result{filteredPosts.length !== 1 && 's'}</div>
      </label>
              

      </div>

      <TwilightLogo className="bglogo darkened" />
      <div className="contentpanel horizontal-scroll panels" style={{justifyContent:'center', alignItems:'center',}}>

<div className="sliderSpacer" style={{height:'', paddingTop:'', display:'none'}}></div>


  {/* {filteredPosts.length} result{filteredPosts.length !== 1 && 's'} */}


        {filteredPosts.map(({ node }) => (
          <Link key={node.id} to={node.frontmatter.slug}>








<div
    className="post-card1"
    style={{  alignItems:'center'}}
  >



{node.frontmatter.featuredImage ? (
      <Link to={node.frontmatter.slug}>
        <GatsbyImage
          image={node.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
          alt={node.frontmatter.title + " - Featured image"}
          className="featured-image1"
          placeholder="blurred"
              // loading="eager"
    
              style={{position:'relative', zIndex:'1', maxHeight:'', margin:'0 auto'}}
        />
      </Link>
      
    ) : (
      <Link  to={node.frontmatter.slug}><StaticImage className="featured-image1" src="../../static/assets/default-og-image.jpg" alt="Default Image" style={{position:'relative', zIndex:''}} /></Link>
    )}

<div className="post-content" style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'100%', height:'', position:'relative', background:'', padding:'0', margin:'0 auto 0 auto', textAlign:'center', overFlow:'hidden'}}>

{node.frontmatter.youtuber ? (
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





<div className="panel" style={{display:'flex', justifyContent:'space-between', alignItems:'center', margin:'10px auto', maxWidth:'80vw', gap:'.4vw', height:'', textAlign:'center', padding:'1vh 2vw', fontSize:'clamp(1rem, 1vw, 1rem)',  background:'rgba(0, 0, 0, 0.7)', borderRadius:'', color:'#aaa' }}>

<h2 className="title1" style={{ }}>
    {node.frontmatter.title}
</h2>


            </div>

            </div>

</div>
            
          </Link>
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
          youtuber
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




