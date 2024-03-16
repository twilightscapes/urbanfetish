const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  // const blogList = path.resolve(`./src/templates/blog-list.js`);

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        edges {
          node {
            id
            frontmatter {
              slug
              template
              title
              category
              tags
              draft
              spotlight
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // const teamMembers = result.data.allMarkdownRemark.edges.filter(
  //   (edge) => edge.node.frontmatter.template === "team"
  // );
  
  // teamMembers.forEach((teamMember) => {
  //   createPage({
  //     path: `/team/${teamMember.node.frontmatter.slug}`,
  //     component: path.resolve(`src/templates/team.js`),
  //     context: {
  //       id: teamMember.node.id,
  //     },
  //   });
  // });
  

  const posts = result.data.allMarkdownRemark.edges;
  let blogPostsCount = 0;
  const categories = new Set();
  // const tags = new Set();

  posts.forEach((post, index) => {
    const id = post.node.id;
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    if (post.node.frontmatter.template) {
      createPage({
        path: post.node.frontmatter.slug,
        component: path.resolve(
          `src/templates/${String(post.node.frontmatter.template)}.js`
        ),
        context: {
          id,
          previous,
          next,
        },
      });
    } else {
      console.warn(`Missing template for markdown file with id: ${id}`);
    }

    if (post.node.frontmatter.template === "blog-post") {
      blogPostsCount++;
    }

    if (post.node.frontmatter.category) {
      const postCategories = Array.isArray(post.node.frontmatter.category)
        ? post.node.frontmatter.category
        : [post.node.frontmatter.category];
      postCategories.forEach((cat) => categories.add(cat));
    }

    // if (post.node.frontmatter.tags) {
    //   post.node.frontmatter.tags.forEach((tag) => tags.add(tag));
    // }


  });

  const postsPerPage = 18;
  const numPages = Math.ceil(blogPostsCount / postsPerPage);

  // Array.from({ length: numPages }).forEach((_, i) => {
  //   createPage({
  //     path: i === 0 ? `/archive/` : `/archive/${i + 1}`,
  //     component: blogList,
  //     context: {
  //       limit: postsPerPage,
  //       skip: i * postsPerPage,
  //       numPages,
  //       currentPage: i + 1,
  //     },
  //   });
  // });

  // // Create home page with context including homecount
  // createPage({
  //   path: "/",
  //   component: path.resolve("./src/templates/index-page.js"),
  //   // context: {
  //   //   homecount: 2, 
  //   // },
  // });

  const categoryTemplate = path.resolve(`./src/templates/category.js`);
  categories.forEach((category) => {
    const categoryArray = Array.isArray(category) ? category : [category];

    categoryArray.forEach((singleCategory) => {
      createPage({
        path: `/category${singleCategory.toLowerCase()}`,
        component: categoryTemplate,
        context: {
          category: singleCategory.toLowerCase(),
        },
      });

      const categoryPosts = posts.filter(
        ({ node }) =>
          Array.isArray(node.frontmatter.category)
            ? node.frontmatter.category.includes(singleCategory)
            : node.frontmatter.category === singleCategory
      );

      if (categoryPosts.length > 0) {
        createPage({
          path: `/category${singleCategory.toLowerCase()}/`,
          component: categoryTemplate,
          context: {
            category: singleCategory.toLowerCase(),
            posts: categoryPosts,
            // tags,
          },
        });
      } else {
        createPage({
          path: `/category${singleCategory.toLowerCase()}/`,
          component: categoryTemplate,
          context: {
            category: singleCategory.toLowerCase(),
            noPosts: true,
          },
        });
      }
    });
  });

  // const tagTemplate = path.resolve(`./src/templates/tag-template.js`);
  // tags.forEach((tag) => {
  //   createPage({
  //     path: `/tag/${tag}`,
  //     component: tagTemplate,
  //     context: {
  //       tag,
  //     },
  //   });
  // });

  
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug =
      node.frontmatter.slug ||
      createFilePath({ node, getNode, basePath: `pages` });
    const slugWithoutPrefix = slug.replace(/^\/posts/, '');
    createNodeField({
      node,
      name: `slug`,
      value: slugWithoutPrefix,
    });

    createNodeField({
      node,
      name: `type`,
      value: getNode(node.parent).sourceInstanceName,
    });
  }
};


exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        "process": require.resolve("process")
      }
    }
  });
};