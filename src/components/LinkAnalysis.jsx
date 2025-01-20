import React from 'react';

    const LinkAnalysis = ({ results }) => {
      if (!results) {
        return <p>No links found.</p>;
      }
      return (
        <ul>
          <li>
            <b>Internal Links:</b>
            <ul>
              <li><b>Broken Links:</b> {results.internalLinks.brokenLinks.length}</li>
              <li><b>Anchor Text:</b> {results.internalLinks.anchorText}</li>
            </ul>
          </li>
          <li>
            <b>External Links:</b>
             <ul>
              <li><b>Nofollow:</b> {results.externalLinks.nofollow}</li>
              <li><b>Sponsored:</b> {results.externalLinks.sponsored}</li>
              <li><b>Reputable Sites:</b> {results.externalLinks.reputable}</li>
            </ul>
          </li>
          <li>
            <b>Broken Links:</b> {results.brokenLinks.length}
          </li>
        </ul>
      );
    };

    LinkAnalysis.analyze = (content) => {
      const internalLinks = {
        brokenLinks: [],
        anchorText: 'TODO',
      };
      const externalLinks = {
        nofollow: 0,
        sponsored: 0,
        reputable: 'TODO',
      };
      const brokenLinks = [];
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const links = doc.querySelectorAll('a');

      links.forEach((link) => {
        const href = link.getAttribute('href');
        const rel = link.getAttribute('rel');
        if (href) {
          if (href.startsWith('/') || href.startsWith('#')) {
            // Internal Link
            if (href.startsWith('#')) {
              // Check if the anchor exists
              const anchor = doc.querySelector(href);
              if (!anchor) {
                internalLinks.brokenLinks.push(href);
              }
            }
          } else if (href.startsWith('http')) {
            // External Link
            if (rel && rel.includes('nofollow')) {
              externalLinks.nofollow++;
            }
            if (rel && rel.includes('sponsored')) {
              externalLinks.sponsored++;
            }
          } else {
            brokenLinks.push(href);
          }
        }
      });

      return { internalLinks, externalLinks, brokenLinks };
    };

    export default LinkAnalysis;
