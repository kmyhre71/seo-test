import React from 'react';

    const RealTimeAlerts = ({ results }) => {
      if (!results) {
        return <p>No real-time alerts available.</p>;
      }
      return (
        <ul>
          {results.map((alert, index) => (
            <li key={index}>
              <b>Alert {index + 1}:</b> {alert}
            </li>
          ))}
        </ul>
      );
    };

    RealTimeAlerts.check = () => {
      return ['Alert 1', 'Alert 2'];
    };

    export default RealTimeAlerts;
