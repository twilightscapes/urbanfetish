const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogList = path.resolve(`./src/templates/blog-list.js`)

  const result = await graphql(`
  {
    allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
      edges {
        node {
          id
          frontmatter {
            slug
            template
            title
            category
            tags
          }
        }
      }
    }
  }
`)


  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }


      // Create team pages
const team = result.data.allMarkdownRemark.edges
team.forEach((team) => {
  createPage({
    path: team.node.frontmatter.slug,
    component: path.resolve(`src/templates/team.js`),
    context: {
      id: team.node.id,
    },
  })
})















  // Create markdown pages
  const posts = result.data.allMarkdownRemark.edges
  let blogPostsCount = 0
  const category = new Set()
  const tags = new Set()

  posts.forEach((post, index) => {
    const id = post.node.id
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.frontmatter.slug,
      component: path.resolve(
        `src/templates/${String(post.node.frontmatter.template)}.js`
      ),
      // additional data can be passed via context
      context: {
        id,
        previous,
        next,
      },
    })


    // Count blog posts.
    if (post.node.frontmatter.template === "blog-post") {
      blogPostsCount++
    }

// Collect categories and tags
if (post.node.frontmatter.category) {
  category.add(post.node.frontmatter.category)
}
if (post.node.frontmatter.tags) {
  post.node.frontmatter.tags.forEach((tag) => tags.add(tag))
}
})

// Create blog-list pages
const postsPerPage = 6
const numPages = Math.ceil(blogPostsCount / postsPerPage)

Array.from({ length: numPages }).forEach((_, i) => {
  createPage({
    path: i === 0 ? `/archive/` : `/archive/${i + 1}`,
    component: blogList,
    context: {
      limit: postsPerPage,
      skip: i * postsPerPage,
      numPages,
      currentPage: i + 1,
    },
  })
})

// Create category pages
const categoryTemplate = path.resolve(`./src/templates/category.js`)
category.forEach((category) => {
  createPage({
    path: `/category/${category}`,
    component: categoryTemplate,
    context: {
      category,
    },
  })

  // Create category index page
  const posts = result.data.allMarkdownRemark.edges.filter(
    ({ node }) => node.frontmatter.category === category
  )

  if (posts.length > 0) {
    createPage({
      path: `/category/${category}/`,
      component: categoryTemplate,
      context: {
        category,
        posts,
        tags,
      },
    })
  } else {
    createPage({
      path: `/category/${category}/`,
      component: categoryTemplate,
      context: {
        category,
        noPosts: true,
      },
    })
  }
})











  // Create tag pages
  const tagTemplate = path.resolve(`./src/templates/tag-template.js`)
  tags.forEach((tag) => {
    createPage({
      path: `/tag/${tag}`,
      component: tagTemplate,
      context: {
        tag,
      },
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    const slugWithoutPrefix = slug.replace(/^\/posts/, '')
    createNodeField({
      node,
      name: `slug`,
      value: slugWithoutPrefix,
    })

    // Add document type field
    createNodeField({
      node,
      name: `type`,
      value: getNode(node.parent).sourceInstanceName,
    })
  }
}

