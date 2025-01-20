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

    const commonWords = [
      'the', 'a', 'an', 'and', 'or', 'but', 'if', 'then', 'else', 'of', 'to', 'in', 'on', 'at', 'for', 'with', 'by', 'from', 'about', 'as', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'can', 'could', 'will', 'would', 'should', 'may', 'might', 'must', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'this', 'that', 'these', 'those', 'my', 'your', 'his', 'her', 'its', 'our', 'their', 'some', 'any', 'all', 'no', 'not', 'only', 'just', 'so', 'very', 'too', 'also', 'up', 'down', 'out', 'in', 'here', 'there', 'when', 'where', 'why', 'how', 'what', 'which', 'who', 'whom', 'whose',
        'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
        'get', 'use', 'make', 'go', 'see', 'know', 'take', 'come', 'think', 'look', 'want', 'give', 'use', 'find', 'tell', 'ask', 'work', 'seem', 'feel', 'try', 'leave', 'call'
      ];

    KeywordHighlighting.highlight = (content) => {
      const text = content.replace(/<[^>]*>/g, '').toLowerCase();
      const words = text.split(/\s+/).filter(Boolean);
      const wordCounts = {};

      words.forEach(word => {
        if (!commonWords.includes(word)) {
          wordCounts[word] = (wordCounts[word] || 0) + 1;
        }
      });

      const sortedKeywords = Object.entries(wordCounts)
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, 10)
        .map(([keyword]) => keyword);

      let highlightedContent = escapeHtml(content);
      sortedKeywords.forEach((keyword) => {
        const escapedKeyword = escapeHtml(keyword);
        const regex = new RegExp(`(${escapedKeyword})`, 'gi');
        highlightedContent = highlightedContent.replace(
          regex,
          '<span class="keyword-highlight">$1</span>',
        );
      });
      return highlightedContent;
    };

    export default KeywordHighlighting;
