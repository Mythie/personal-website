import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PostPreview from '../PostPreview';

const RecentPosts = () => {
  const data = useStaticQuery(graphql`
    query RecentPosts {
      allFile(
        filter: { sourceInstanceName: { eq: "blog" }, extension: { eq: "mdx" } }, 
        sort: {
          fields: childMdx___frontmatter___posted_on, 
          order: DESC
        }
      ) {
        edges {
          node {
            childMdx {
              frontmatter {
                author
                posted_on(fromNow: true)
                title
                slug
              }
              excerpt(pruneLength: 80)
            }
          }
        }
      }
    }  
  `);

  const posts = data.allFile.edges.map((x) => x.node.childMdx);

  return (
    <section id="recent-posts" className="py-10 bg-gray-700 text-white">
      <div className="container">
        <h2>My Recent Posts</h2>
        <div className="flex flex-wrap -mx-5">
          {posts.map((post) => (
            <PostPreview className="w-full md:w-1/2 lg:w-1/4 px-5 mb-3 lg:mb-0" key={post.frontmatter.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
