import React from 'react';

    const UserBehaviorTracking = ({ results }) => {
      if (!results) {
        return <p>No user behavior data available.</p>;
      }
      return (
        <ul>
          <li>
            <b>Bounce Rate:</b> {results.bounceRate}
          </li>
          <li>
            <b>Time Spent:</b> {results.timeSpent}
          </li>
        </ul>
      );
    };

    UserBehaviorTracking.track = () => {
      return {
        bounceRate: '50%',
        timeSpent: '2 minutes',
      };
    };

    export default UserBehaviorTracking;
