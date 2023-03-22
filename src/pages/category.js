import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/siteLayout"
const CategoryIndex = ({ data }) => {
  const categories = data.allMarkdownRemark.group.map(group => group.fieldValue);

  return (
    <Layout>
      <div className="spacer" style={{ height: '70px', border: '0px solid yellow' }}></div>
      <div style={{textAlign:'center', paddingTop:'2rem'}}>
      <h1>Urban Fetish Magazine</h1>



      <ul style={{display:'flex', justifyItems:'center', justifyContent:'center', gap:'3vw', textTransform:'capitalize', margin:'20vh'}}>
        {categories.map(category => (
          <li key={category}>
            <Link to={`/category/${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
      <strong>Edition 1 coming soon!</strong>
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
