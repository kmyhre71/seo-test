import React from 'react';

    const MetaTagInspection = ({ results }) => {
      if (!results) {
        return <p>No meta tags found.</p>;
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

    MetaTagInspection.inspect = (content) => {
      const metaTags = [];
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const title = doc.querySelector('title')?.textContent;
      if (title) {
        metaTags.push({ name: 'Title', content: title });
      }
      doc.querySelectorAll('meta').forEach((meta) => {
        const name = meta.getAttribute('name') || meta.getAttribute('property');
        const content = meta.getAttribute('content');
        if (name && content) {
          metaTags.push({ name, content });
        }
      });
      return metaTags;
    };

    export default MetaTagInspection;
