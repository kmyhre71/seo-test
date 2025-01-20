import React from 'react';

    const SocialMediaIntegration = ({ results }) => {
      if (!results) {
        return <p>No social media tags found.</p>;
      }
      return (
        <ul>
          {results.map((tag, index) => (
            <li key={index}>
              <b>{tag.name}:</b> {tag.content}
            </li>
          ))}
        </ul>
      );
    };

    SocialMediaIntegration.analyze = (content) => {
      const socialTags = [];
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');

      doc.querySelectorAll('meta[property^="og:"]').forEach((meta) => {
        const name = meta.getAttribute('property');
        const content = meta.getAttribute('content');
        if (name && content) {
          socialTags.push({ name, content });
        }
      });

      doc.querySelectorAll('meta[name^="twitter:"]').forEach((meta) => {
        const name = meta.getAttribute('name');
        const content = meta.getAttribute('content');
        if (name && content) {
          socialTags.push({ name, content });
        }
      });

      return socialTags;
    };

    export default SocialMediaIntegration;
