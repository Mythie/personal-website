import React, { useEffect } from 'react';
import ParticlesBg from 'particles-bg';
import Typing from '../Typing';


const phrases = [
  'Full Stack Developer... ',
  'DevOps Engineer... ',
  'Problem Solver... ',
];

const Hero = () => {
  useEffect(() => {
    console.log('Setting up partcles fixer');

    return () => {
      console.log('Clearing intervals');
      let id = setInterval((noop) => noop, 1000);
      console.log(id);

      while (id--) {
        clearInterval(id);
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
