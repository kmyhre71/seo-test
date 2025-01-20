import React from 'react';

    const KeywordHighlighting = ({ results }) => {
      if (!results) {
        return <p>No keywords highlighted.</p>;
      }
      return <div dangerouslySetInnerHTML={{ __html: results }} />;
    };

    KeywordHighlighting.highlight = (content, keywords) => {
      let highlightedContent = content;
      keywords.forEach((keyword) => {
        const regex = new RegExp(`(${keyword})`, 'gi');
        highlightedContent = highlightedContent.replace(
          regex,
          '<span class="keyword-highlight">$1</span>',
        );
      });
      return highlightedContent;
    };

    export default KeywordHighlighting;
