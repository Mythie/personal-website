import React from 'react';

import Layout from '../layouts/Default';
import SEO from '../components/seo';
import Hero from '../components/Hero';
import AboutMe from '../components/AboutMe';
import RecentPosts from '../components/RecentPosts/RecentPosts';
import ContactMe from '../components/ContactMe';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Hero />
    <AboutMe />
    <RecentPosts />
    <ContactMe />
  </Layout>
);

export default IndexPage;
