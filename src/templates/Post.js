import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import PostLayout from '../layouts/Post';
import SEO from '../components/seo';

export const query = graphql`
  query ($slug: String!) {
    mdx(frontmatter: {slug: {eq: $slug}}) {
      frontmatter {
        title
        author
        posted_on(fromNow: true)
      }
      body
      excerpt
    }
  }
`;

const Post = ({ data: { mdx } }) => {
  const x = 'y';

  const { body, excerpt, frontmatter } = mdx;
  const { title, author, posted_on: postedOn } = frontmatter;

  return (
    <PostLayout>
      <SEO title={title} description={excerpt} />
      <article style={{ minHeight: '80vh' }} className="py-3">
        <h1 className="text-5xl pb-5">
          {title}
          <small className="block text-sm">
            Posted by
            {' '}
            {author}
            ,
            {' '}
            {postedOn}
          </small>
        </h1>
        <MDXRenderer>{body}</MDXRenderer>
      </article>
    </PostLayout>
  );
};

export default Post;
