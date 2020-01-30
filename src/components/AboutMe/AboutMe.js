import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import AboutMeSvg from './AboutMe.inline.svg';

const AboutMe = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          aboutMe
        }
      }
    }
  `);

  const aboutContent = data.site.siteMetadata.aboutMe.map((x) => <p className="pb-2">{x}</p>);
  return (
    <section id="about-me" className="py-10 container flex flex-wrap items-center -mx-5">
      <article className="w-full sm:w-1/2 md:w-1/2 px-5 mb-3 lg:mb-0">
        <h2>About Me</h2>
        {aboutContent}
      </article>
      <div className="flex justify-center items-center w-full sm:w-1/2 md:w-1/2 px-5">
        <AboutMeSvg width="100%" height="100%" className="w-2/3 block" />
      </div>
    </section>
  );
};

export default AboutMe;
