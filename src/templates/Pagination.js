import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';

import { sortBy, uniq } from 'lodash';
import PaginationLayout from '../layouts/Pagination';

export const query = graphql`
  query ($skip: Int!, $limit: Int!) {
    allFile(
      filter: { 
        sourceInstanceName: { eq: "blog" }, 
        extension: { eq: "mdx" } 
      },
      sort: { fields: childMdx___frontmatter___posted_on, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        childMdx {
          frontmatter {
            title
            author
            posted_on(fromNow: true)
            slug
          }
          excerpt(pruneLength: 120)
        }
      }
    }
  }
`;

const Pagination = ({ data, pageContext: { numPages, currentPage } }) => {
  const posts = data.allFile.nodes.map((x) => x.childMdx);

  const pagesToShow = 6;

  const allPages = new Array(numPages).fill(null).map((_, index) => index + 1);

  const pages = [];

  // Attempt to jump back 6 pages if possible
  const backwardPages = allPages.slice(Math.max(currentPage - pagesToShow, 0), currentPage);
  // Attempt to jump forward 6 pages if possible
  const forwardPages = allPages.slice(currentPage, Math.min(currentPage + pagesToShow, numPages));

  // Add all the pages into one large array
  pages.push(...backwardPages);
  pages.push(currentPage);
  pages.push(...forwardPages);

  const sortedPages = sortBy(uniq(pages));

  // Get the middle of the list and then step back half of the amount of the pages to show
  const startIndex = Math.ceil(sortedPages.length / 2) - Math.ceil(pagesToShow / 2);

  // Grab the number of pages we need and map them into a friendly markup
  const paginationMarkup = sortedPages.slice(startIndex, startIndex + pagesToShow)
    .map((page) => (
      <Link
        to={`/blog/${page}`}
        key={page}
        className={`
        border 
        border-gray-400 
        ${page === currentPage ? 'bg-gray-400' : ''} 
        hover:bg-gray-400 
        transition-300 
        inline 
        px-4 
        py-2 
        rounded
      `}
      >
        {page}
      </Link>
    ));

  const postsMarkup = posts.map((post) => (
    <article key={post.frontmatter.slug} className="w-full relative py-3">
      <h3>
        {post.frontmatter.title}
        <small className="block text-sm">
          {`Posted by ${post.frontmatter.author}`}
          {' '}
          {post.frontmatter.posted_on}
        </small>
      </h3>

      <p>
        {post.excerpt}
      </p>

      <div className="text-right w">
        <Link to={`/blog/${post.frontmatter.slug}`} className="underline font-semibold">Read More</Link>
      </div>
    </article>
  ));

  return (
    <PaginationLayout>
      <h1 className="pt-5">
          My Posts
        <small className="block text-base">
            Page
          {' '}
          {currentPage}
        </small>
      </h1>
      {postsMarkup}
      <div className="w-full flex justify-center items-center py-3">
        {paginationMarkup}
      </div>
    </PaginationLayout>
  );
};

Pagination.propTypes = {
  data: PropTypes.shape({
    allFile: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
  }).isRequired,

  pageContext: PropTypes.shape({
    numPages: PropTypes.number,
    currentPage: PropTypes.number,
    postsPerPage: PropTypes.number,
  }).isRequired,
};

export default Pagination;
