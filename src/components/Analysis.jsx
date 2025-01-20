import React from 'react';

    const Analysis = ({ results }) => {
      if (!results) {
        return <p>No analysis available.</p>;
      }

      return (
        <ul>
          {results.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    };

    Analysis.analyze = (content) => {
      const analysis = [];
      if (content.length === 0) {
        analysis.push('No content provided.');
        return analysis;
      }
      analysis.push(`Content length: ${content.length} characters.`);
      const wordCount = content.trim().split(/\s+/).length;
      analysis.push(`Word count: ${wordCount} words.`);
      return analysis;
    };

    export default Analysis;
