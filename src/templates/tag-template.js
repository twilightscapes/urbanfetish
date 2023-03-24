import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import Layout from '../components/siteLayout';
import useSiteMetadata from '../hooks/SiteMetadata';
import { Helmet } from 'react-helmet';
import { ImPlay } from "react-icons/im"
import { FaImage } from "react-icons/fa"
import { AiOutlinePicLeft } from "react-icons/ai"

const Tag = ({ data, pageContext }) => {
  const { tag } = pageContext;
  const posts = data.allMarkdownRemark.edges;
  const { showNav } = useSiteMetadata();


  const [selectedTag, setSelectedTag] = useState(tag);

  const allTags = data.allMarkdownRemark.group.map(tag => tag.fieldValue);
  const filteredPosts = selectedTag ? posts.filter(({ node }) => node.frontmatter.tags.includes(selectedTag)) : posts;

  if (posts.length === 0) {
    return <p>No posts found.</p>;
  }

  return (
    <Layout>
      <Helmet>
        <body id='body' className='tag scroll' style={{}} />
      </Helmet>

      {showNav ? (
        <div className='spacer' style={{ height: '70px', border: '0px solid yellow' }}></div>
      ) : (
        ''
      )}
      {/* <h1 style={{ textAlign: 'center' }}>{tag}</h1> */}

      <div style={{display:'flex', flexDirection:'column', justifyContent:'center', marginTop:''}}>
        
      <select className="cattags" style={{}} value={selectedTag} onChange={e => setSelectedTag(e.target.value)}>
        <option value=''>All tags</option>
        {allTags.map(tag => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
      </div> 

      <div className='contentpanel horizontal-scroll panels' style={{ marginTop: '1.5rem' }}>
        <div className='sliderSpacer' style={{ height: '', paddingTop: '0', display: 'none' }}></div>

        {filteredPosts.map(({ node }) => {
          const featuredImg = node.frontmatter.featuredImage;
          return (
            <div className='post-card1' style={{ justifyContent: 'center', alignItems: 'center' }} key={node.id}>
              {/* Render featured image thumbnail if it exists */}
              {featuredImg && (
                <a key={node.id} href={node.frontmatter.slug}>
                  <GatsbyImage
                    image={node.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
                    alt={node.frontmatter.title + ' - Featured image'}
                    className='featured-image1'
                    placeholder='blurred'
                    style={{ position: 'relative', zIndex: '1', maxHeight: '', margin: '0 auto' }}
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


                </a>
              )}
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($tag: String!) {
    allMarkdownRemark(
      filter: {frontmatter: {tags: {in: [$tag]}}}
      sort: {frontmatter: {date: DESC}}
    ) {
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
            tags
          }
        }
      }
      group(field: {frontmatter: {tags: SELECT}}) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default Tag;
