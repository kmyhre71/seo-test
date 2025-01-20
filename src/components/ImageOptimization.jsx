import React from 'react';

    const ImageOptimization = ({ results }) => {
      if (!results) {
        return <p>No images found.</p>;
      }
      return (
        <ul>
          {results.map((image, index) => (
            <li key={index}>
              <b>Image {index + 1}:</b> Alt Text: {image.altText}, File Size: {image.fileSize}, Format: {image.format}
            </li>
          ))}
        </ul>
      );
    };

    ImageOptimization.check = (content) => {
      const images = [];
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const imgElements = doc.querySelectorAll('img');

      imgElements.forEach((img) => {
        const altText = img.getAttribute('alt') || 'No alt text';
        const src = img.getAttribute('src');
        const fileSize = 'Unknown';
        const format = src ? src.split('.').pop() : 'Unknown';
        images.push({ altText, fileSize, format });
      });
      return images;
    };

    export default ImageOptimization;
