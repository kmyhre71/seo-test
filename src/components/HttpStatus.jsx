import React from 'react';

    const HttpStatus = ({ results }) => {
      if (!results) {
        return <p>No HTTP status available.</p>;
      }
      return <p>Status: {results}</p>;
    };

    HttpStatus.check = () => {
      return '200 OK';
    };

    export default HttpStatus;
