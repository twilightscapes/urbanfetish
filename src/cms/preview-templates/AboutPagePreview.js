import React from 'react'
import PropTypes from 'prop-types'
import { AboutPageTemplate } from '../../templates/about-page.js'
import Layout from "../../../src/components/siteLayout"


const AboutPagePreview = ({ entry, widgetFor }) => (
  <Layout>
  <AboutPageTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
    style={{border:'2px dotted red'}}
  />
  </Layout>
)

AboutPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default AboutPagePreview
