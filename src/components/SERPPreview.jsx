import React from 'react';

    const SERPPreview = ({ results }) => {
      if (!results) {
        return <p>No SERP preview available.</p>;
      }
      return (
        <div>
          <h3>Title: {results.title}</h3>
          <p>Description: {results.description}</p>
        </div>
      );
    };

    SERPPreview.preview = (content) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const title = doc.querySelector('title')?.textContent || 'No Title';
      const description =
        doc.querySelector('meta[name="description"]')?.getAttribute('content') ||
        'No Description';
      return { title, description };
    };

    export default SERPPreview;
