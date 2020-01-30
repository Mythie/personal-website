import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { MdMail } from 'react-icons/md';
import { FaGithub, FaLinkedin, FaLink } from 'react-icons/fa';

import ContactMeSvg from './ContactMe.inline.svg';

const ContactMe = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          contactMe
          social {
            linkedin
            github
            email
          }
        }
      }
    }
  `);

  const { linkedin, github, email } = data.site.siteMetadata.social;

  const [computedEmail, setComputedEmail] = useState('');

  const showEmail = () => {
    console.log('showEmail() called');
    setComputedEmail(atob(email));
  };

  const hideEmail = () => {
    console.log('hideEmail() called');
    setComputedEmail('');
  };

  return (
    <section id="contact-me" className="container py-10">
      <div className="flex items-center -mx-5">
        <div id="contact-me-call-to-action" className="w-1/2 sm:w-2/3 lg:w-1/3 px-5">
          <h2>Lets get in touch!</h2>
          <p>{data.site.siteMetadata.contactMe}</p>
        </div>
        <div id="contact-me-action-image" className="hidden lg:block w-1/3 px-5">
          <ContactMeSvg height="100%" width="100%" className="w-2/3 mx-auto" />
        </div>
        <div id="contact-me-socials" className="w-1/2 sm:w-1/3 px-5 flex flex-col font-semibold">
          <a href={`https://github.com/${github}`} className="block p-5 text-lg transition-300 hover:bg-gray-200">
            <FaGithub size="100%" className="inline w-6 mr-3" />
            Github
          </a>
          <a href={`https://linkedin.com/in/${linkedin}`} className="block p-5 text-lg transition-300 hover:bg-gray-200">
            <FaLinkedin size="100%" className="inline w-6 mr-3" />
            LinkedIn
          </a>
          <a
            href={`mailto:${computedEmail}`}
            className="block p-5 text-lg transition-300 hover:bg-gray-200"
            onFocus={showEmail}
            onBlur={hideEmail}
            onMouseOver={showEmail}
            onMouseOut={hideEmail}
          >
            <MdMail size="100%" className="inline w-6 mr-3" />
            Email
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
