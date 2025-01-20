import React from 'react';

    const LinkAnalysis = ({ results }) => {
      if (!results) {
        return <p>No links found.</p>;
      }
      return (
        <ul>
          <li>
            <b>Internal Links:</b> {results.internalLinks.length}
          </li>
          <li>
            <b>External Links:</b> {results.externalLinks.length}
          </li>
          <li>
            <b>Broken Links:</b> {results.brokenLinks.length}
          </li>
        </ul>
      );
    };

    LinkAnalysis.analyze = (content) => {
      const internalLinks = [];
      const externalLinks = [];
      const brokenLinks = [];
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const links = doc.querySelectorAll('a');

      links.forEach((link) => {
        const href = link.getAttribute('href');
        if (href) {
          if (href.startsWith('/') || href.startsWith('#')) {
            internalLinks.push(href);
          } else if (href.startsWith('http')) {
            externalLinks.push(href);
          } else {
            brokenLinks.push(href);
          }
        }
      });

      return { internalLinks, externalLinks, brokenLinks };
    };

    export default LinkAnalysis;
