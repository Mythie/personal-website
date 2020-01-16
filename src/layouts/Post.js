/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';

import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from '../components/header';

import './Default.css';
import './Post.css';
import 'prismjs/themes/prism-okaidia.css';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <main className="mx-auto px-5" style={{ maxWidth: 650 }}>
        {children}
      </main>
      <footer className="container py-3">
        Built with ❤ and
        {' '}
        <a className="font-semibold hover:underline" href="https://gatsby.org">Gatsby</a>
      </footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
