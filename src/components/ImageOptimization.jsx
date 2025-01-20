import React from 'react';

    const ImageOptimization = ({ results }) => {
      if (!results) {
        return <p>No images found.</p>;
      }
      return (
        <ul>
          {results.map((image, index) => (
            <li key={index}>
              <b>Image {index + 1}:</b>
              <ul>
                <li><b>Alt Text:</b> {image.altText}</li>
                <li><b>File Name:</b> {image.fileName}</li>
                <li><b>Lazy Loading:</b> {image.lazyLoading}</li>
                <li><b>File Size:</b> {image.fileSize}</li>
              </ul>
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
        const fileName = src ? src.split('/').pop() : 'Unknown';
        const lazyLoading = img.getAttribute('loading') === 'lazy' ? 'Yes' : 'No';
        const fileSize = 'Unknown';
        images.push({ altText, fileName, lazyLoading, fileSize });
      });
      return images;
    };

    export default ImageOptimization;
