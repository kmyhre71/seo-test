import React from 'react';

    const CustomReports = ({ results }) => {
      if (!results) {
        return <p>No custom reports available.</p>;
      }
      return (
        <ul>
          {results.map((report, index) => (
            <li key={index}>
              <b>Report {index + 1}:</b> {report}
            </li>
          ))}
        </ul>
      );
    };

    CustomReports.generate = () => {
      return ['Report 1', 'Report 2'];
    };

    export default CustomReports;
