import React from 'react';

    const MobileFriendliness = ({ results }) => {
      if (!results) {
        return <p>No mobile-friendliness check available.</p>;
      }
      return <p>Mobile-Friendly: {results ? 'Yes' : 'No'}</p>;
    };

    MobileFriendliness.check = (content) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const viewport = doc.querySelector('meta[name="viewport"]');
      return !!viewport;
    };

    export default MobileFriendliness;
