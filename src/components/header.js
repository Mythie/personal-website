import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const Header = ({ siteTitle }) => (
  <header className="bg-blue-600 py-5 px-5 lg:px-10 flex justify-between items-center">
    <h1 className="m-0 p-0 text-lg">
      <Link
        to="/"
        className="text-white no-decoration hover:underline"
      >
        {siteTitle}
      </Link>
    </h1>
    <div className="-mx-2 text-white">
      <Link className="px-2 hover:underline" activeClassName="underline" to="/">Home</Link>
      <Link className="px-2 hover:underline" activeClassName="underline" to="/blog" partiallyActive>Blog</Link>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
