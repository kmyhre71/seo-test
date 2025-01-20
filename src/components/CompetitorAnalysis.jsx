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

    CompetitorAnalysis.analyze = (content, competitorKeywords, competitorDescription) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const metaDescription =
        doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      const textContent = doc.body?.textContent || '';
      const pageKeywords = textContent.toLowerCase().split(/\s+/);

      const competitorA = {
        competitor: 'Competitor A',
        metric: 'No Match',
      };
      const competitorB = {
        competitor: 'Competitor B',
        metric: 'No Match',
      };

      if (competitorKeywords.some(keyword => pageKeywords.includes(keyword.toLowerCase()))) {
        competitorA.metric = 'Keyword Match';
      }

      if (metaDescription.toLowerCase().includes(competitorDescription)) {
        competitorB.metric = 'Description Match';
      }

      return [competitorA, competitorB];
    };

    export default CompetitorAnalysis;
