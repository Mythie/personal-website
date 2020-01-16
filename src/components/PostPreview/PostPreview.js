import React from 'react';
import { Link } from 'gatsby';

import './PostPreview.css';

const PostPreview = ({ className = '', style = null, post }) => (
  <article className={`${className} PostPreview--Article py-3 transition-300 relative`} style={style} id={post.frontmatter.title}>
    <h4>
      {post.frontmatter.title}
      <small className="block text-sm">
        {post.frontmatter.posted_on}
      </small>
    </h4>
    <p>{post.excerpt}</p>
    <div className="text-right">
      <Link to={`/blog/${post.frontmatter.slug}`} className="PostPreview--Article--ReadMore hover:underline">Read More</Link>
    </div>
  </article>
);

export default PostPreview;
