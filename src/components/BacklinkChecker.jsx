import React from 'react';

    const BacklinkChecker = ({ results }) => {
      if (!results) {
        return <p>No backlink data available.</p>;
      }
      return (
        <ul>
          <li>
            <b>Total Backlinks:</b> {results.totalBacklinks}
          </li>
          <li>
            <b>Quality Backlinks:</b> {results.qualityBacklinks}
          </li>
        </ul>
      );
    };

    BacklinkChecker.check = () => {
      return {
        totalBacklinks: 100,
        qualityBacklinks: 70,
      };
    };

    export default BacklinkChecker;
