import React from 'react';

    const KeywordHighlighting = ({ results }) => {
      if (!results) {
        return <p>No keywords highlighted.</p>;
      }
      return <div dangerouslySetInnerHTML={{ __html: results }} />;
    };

    function escapeHtml(unsafe) {
      return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    }

    KeywordHighlighting.highlight = (content, keywords) => {
      let highlightedContent = escapeHtml(content);
      keywords.forEach((keyword) => {
        const regex = new RegExp(`(${escapeHtml(keyword)})`, 'gi');
        highlightedContent = highlightedContent.replace(
          regex,
          '<span class="keyword-highlight">$1</span>',
        );
      });
      return highlightedContent;
    };

    export default KeywordHighlighting;
