import React, {
  useEffect, lazy, Suspense, useState,
} from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Typing from '../Typing';
import loadable from '@loadable/component'

// eslint-disable-next-line
const ParticlesBg = loadable(() => import('particles-bg')); 

const Hero = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          heroPhrases
        }
      }
    }
  `);

  const { heroPhrases: phrases } = data.site.siteMetadata;

  useEffect(() => {
    // We need this to cleanup after ParticlesBg since it doesn't manage its lifecycle
    return () => {
      let id = setInterval((noop) => noop, 1000);

      while (id) {
        clearInterval(id);

        id -= 1;
      }
    };
  }, []);

  return (
    <section className="w-full text-white text-center relative flex items-center justify-center" style={{ height: '40vh', maxHeight: 250 }} id="hero">
      <Typing tag="h1" className="px-5 text-4xl" interval={150} style={{ transition: '300ms' }} phrases={phrases} />

      {/* This is a dirty workaround to the lack of precise configuration for this element */}
      <div
        className="bg-gray-700 absolute"
        style={{
          zIndex: -1,
          height: '100%',
          width: '100%',
          top: 0,
          left: 0,
        }}
      >
        <ParticlesBg type="cobweb" color="#CCCCCC" num={15} />
      </div>
    </section>
  );
};

export default Hero;
