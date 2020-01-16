const siteData = require('./site-data');

const createPostsForSource = async (sourceName, { actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      allFile(filter: {
        sourceInstanceName: { eq: "${sourceName}" }, 
        extension: { eq: "mdx" }
      }) {
        nodes {
          childMdx {
            frontmatter {
              title
              slug
            }
          }
        }
      }
    }
    
  `);

  if (result.errors) {
    reporter.panic(`Failed to create posts for ${sourceName}`, result.errors);
  }

  if (result.data.allFile.nodes.length === 0) {
    reporter.info(`No nodes for ${sourceName}, not creating pages..`);
    return;
  }

  const posts = result.data.allFile.nodes.map((x) => x.childMdx);

  posts.forEach((post) => {
    reporter.info(`Creating ${post.frontmatter.title}`);
    actions.createPage({
      path: `${sourceName}/${post.frontmatter.slug}`,
      component: require.resolve('./src/templates/Post.js'),
      context: {
        slug: post.frontmatter.slug,
      },
    });
  });
};

const createPaginationForSource = async (sourceName, { actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      allFile(
        filter: { 
          sourceInstanceName: { eq: "${sourceName}" }, 
          extension: { eq: "mdx" } 
        },
        sort: { fields: childMdx___frontmatter___posted_on, order: DESC }
      ) {
        nodes {
          name
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic(`Failed to create pagination for ${sourceName}`, result.errors);
  }

  if (result.data.allFile.nodes.length === 0) {
    reporter.info(`No nodes for ${sourceName}, not creating pagination pages..`);
    return;
  }

  const posts = result.data.allFile.nodes;

  const { postsPerPage } = siteData.content.pagination;

  const numPages = Math.ceil(posts.length / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    if (i === 0) {
      actions.createPage({
        path: `/${sourceName}`,
        component: require.resolve('./src/templates/Pagination.js'),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
          postsPerPage,
        },
      });
    }

    actions.createPage({
      path: `/${sourceName}/${i + 1}`,
      component: require.resolve('./src/templates/Pagination.js'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        postsPerPage,
      },
    });
  });
};

module.exports = {
  createPages: async ({ actions, graphql, reporter }) => {
    await createPostsForSource('blog', { actions, graphql, reporter });
    await createPaginationForSource('blog', { actions, graphql, reporter });
  },
};
