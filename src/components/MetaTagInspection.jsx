import React from 'react';

    const MetaTagInspection = ({ results }) => {
      if (!results) {
        return <p>No meta tags found.</p>;
      }
      return (
        <ul>
          <li>
            <b>Title Tag:</b>
            <ul>
              <li><b>Presence:</b> {results.title.presence}</li>
              <li><b>Length:</b> {results.title.length}</li>
              <li><b>Keywords:</b> {results.title.keywords}</li>
            </ul>
          </li>
          <li>
            <b>Meta Description:</b>
            <ul>
              <li><b>Presence:</b> {results.description.presence}</li>
              <li><b>Length:</b> {results.description.length}</li>
              <li><b>Keywords:</b> {results.description.keywords}</li>
            </ul>
          </li>
           <li>
            <b>Meta Robots Tag:</b>
            <ul>
              <li><b>Directives:</b> {results.robots.directives}</li>
            </ul>
          </li>
           <li>
            <b>Header Tags:</b>
            <ul>
              <li><b>Hierarchical Structure:</b> {results.headers.structure}</li>
              <li><b>H1 Count:</b> {results.headers.h1Count}</li>
              <li><b>Empty/Duplicate Tags:</b> {results.headers.emptyOrDuplicate}</li>
            </ul>
          </li>
        </ul>
      );
    };

    MetaTagInspection.inspect = (content) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const titleTag = doc.querySelector('title');
      const metaDescriptionTag = doc.querySelector('meta[name="description"]');
      const metaRobotsTag = doc.querySelector('meta[name="robots"]');
      const headerTags = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');

      const title = {
        presence: titleTag ? 'Yes' : 'No',
        length: titleTag ? titleTag.textContent.length : 'N/A',
        keywords: titleTag ? 'TODO' : 'N/A',
      };

      const description = {
        presence: metaDescriptionTag ? 'Yes' : 'No',
        length: metaDescriptionTag ? metaDescriptionTag.getAttribute('content')?.length : 'N/A',
        keywords: metaDescriptionTag ? 'TODO' : 'N/A',
      };

      const robots = {
        directives: metaRobotsTag ? metaRobotsTag.getAttribute('content') : 'N/A',
      };

      const headers = {
        structure: 'TODO',
        h1Count: doc.querySelectorAll('h1').length,
        emptyOrDuplicate: 'TODO',
      };

      return { title, description, robots, headers };
    };

    export default MetaTagInspection;
