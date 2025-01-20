import React, { useState, useEffect } from 'react';
    import axios from 'axios';

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

    BacklinkChecker.check = async (url) => {
      try {
        const response = await axios.get(
          `https://api.example.com/backlinks?url=${encodeURIComponent(url)}`,
        );
        if (response.status === 200) {
          return response.data;
        } else {
          console.error('Failed to fetch backlinks:', response.status);
          return { totalBacklinks: 'N/A', qualityBacklinks: 'N/A' };
        }
      } catch (error) {
        console.error('Error fetching backlinks:', error);
        return { totalBacklinks: 'N/A', qualityBacklinks: 'N/A' };
      }
    };

    export default BacklinkChecker;
