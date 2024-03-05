import React, { useState } from "react";
import { graphql, Link, navigate } from "gatsby";
import useSiteMetadata from "../hooks/SiteMetadata";
// import { AiFillDownSquare } from "react-icons/ai";
import Layout from "../components/siteLayout";
import { Helmet } from "react-helmet";

const CategoryIndex = ({ data, pageContext }) => {
  const { category } = pageContext;
  const categories = data.allMarkdownRemark.group.map((group) => group.fieldValue);






  const {  postcount, language, proOptions } = useSiteMetadata()

  const { showModals  } = proOptions
  const { dicCategory } = language;


  const [visibleItems, setVisibleItems] = useState(postcount);

  const showMoreItems = () => {
    setVisibleItems(visibleItems + postcount);
  };

  return (
    <Layout>
      <Helmet>
        <body className="category utilitypage" />
      </Helmet>


      <div className="magicisland">
        <div className="cattags font panel">
        <select
          className=""
          style={{ background: 'var(--theme-ui-colors-siteColor)', borderRadius: 'var(--theme-ui-colors-borderRadius)', padding: '2px', width:'380px', display:'block', margin:'0 1%', overflow:'hidden', height:'34px', lineHeight:'100%', color:'var(--theme-ui-colors-siteColorText)' }}
          onChange={(e) => {
            const selectedCategory = e.target.value;
            navigate(`/category/${selectedCategory}`);
          }}
          value={category}
        >
          <option value="">{dicCategory}:</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {/* <div style={{ position: 'absolute', right: '10px', top: '8px', height: '100%', color: '#fff', zIndex: '-1', fontSize: '30px' }}><AiFillDownSquare /></div> */}
      </div>
</div>

      <div className="contentpanel grid-container" style={{ justifyContent: 'center', alignItems: 'center', marginTop: '', padding:'12vh 10vw 10vh 10vw' }}>

        <div className="sliderSpacer" style={{ height: "", paddingTop: "", display: "" }}></div>

        {categories.slice(0, visibleItems).map((category, index) => (
          <Link
            key={index}
            state={showModals ? { modal: true } : {}}
            style={{
              display: 'block',
              maxHeight: '',
              width: '',
              height: '',
              maxWidth: '',
              overflow: 'hidden',
              padding: '',
              fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
              border: '1px solid',
              color: '#fff',
              textShadow: '2px 2px 0 #222',
              borderRadius: '8px',
              opacity: '.8',
              textAlign:'center'
            }}
            to={`/category/${category}`}
          >
            <div
              className="post-card12 font"
              key={index}
              style={{
                display: 'grid',
                width: '100%',
                maxWidth: '',
                height: '90%',
                minHeight: '350px',
                placeContent: 'center',
                textTransform: 'capitalize',
                background: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid #999',
                borderRadius: '8px',
                fontSize: 'clamp(2.5rem,3vw,3rem)'
              }}
            >
              {category}
            </div>
          </Link>
        ))}
        {visibleItems < categories.length && (
          <button className="post-card1" style={{ justifyContent: "center", alignItems: "center" }} onClick={showMoreItems}>
            Load more
          </button>
        )}
      </div>
    </Layout>
  );
};

export const query = graphql`
query {
  allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
    group(field: {frontmatter: {category: SELECT}}) {
      fieldValue
    }
  }
}
`;


export default CategoryIndex;
