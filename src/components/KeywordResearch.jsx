import React from 'react';

    const KeywordResearch = ({ results }) => {
      if (!results) {
        return <p>No keyword research available.</p>;
      }
      return (
        <ul>
          {results.map((keyword, index) => (
            <li key={index}>
              <b>Keyword {index + 1}:</b> {keyword}
            </li>
          ))}
        </ul>
      );
    };

    KeywordResearch.research = (content) => {
      const keywords = ['keyword1', 'keyword2', 'keyword3'];
      return keywords;
    };

    export default KeywordResearch;
