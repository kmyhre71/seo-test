import React from 'react';

    const SchemaMarkupValidator = ({ results }) => {
      if (!results) {
        return <p>No schema markup found.</p>;
      }
      return (
        <ul>
          {results.map((item, index) => (
            <li key={index}>
              <b>Type:</b> {item.type}, <b>Valid:</b> {item.valid ? 'Yes' : 'No'}
            </li>
          ))}
        </ul>
      );
    };

    SchemaMarkupValidator.validate = (content) => {
      const schemaData = [];
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const scripts = doc.querySelectorAll('script[type="application/ld+json"]');

      scripts.forEach((script) => {
        try {
          const json = JSON.parse(script.textContent);
          if (json['@type']) {
            schemaData.push({ type: json['@type'], valid: true });
          } else {
            schemaData.push({ type: 'Unknown', valid: false });
          }
        } catch (e) {
          schemaData.push({ type: 'Invalid JSON', valid: false });
        }
      });
      return schemaData;
    };

    export default SchemaMarkupValidator;
