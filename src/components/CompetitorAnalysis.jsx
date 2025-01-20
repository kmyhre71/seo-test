import React from 'react';

    const CompetitorAnalysis = ({ results }) => {
      if (!results) {
        return <p>No competitor analysis available.</p>;
      }
      return (
        <ul>
          {results.map((item, index) => (
            <li key={index}>
              <b>{item.competitor}:</b> {item.metric}
            </li>
          ))}
        </ul>
      );
    };

    CompetitorAnalysis.analyze = () => {
      return [
        { competitor: 'Competitor A', metric: 'Good SEO' },
        { competitor: 'Competitor B', metric: 'Average SEO' },
      ];
    };

    export default CompetitorAnalysis;
