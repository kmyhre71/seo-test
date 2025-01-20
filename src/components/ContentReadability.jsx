import React from 'react';

    const ContentReadability = ({ results }) => {
      if (!results) {
        return <p>No readability analysis available.</p>;
      }
      return (
        <ul>
          <li>
            <b>Flesch-Kincaid Score:</b> {results.fleschKincaidScore}
          </li>
          <li>
            <b>Average Sentence Length:</b> {results.averageSentenceLength}
          </li>
          <li>
            <b>Complexity:</b> {results.complexity}
          </li>
        </ul>
      );
    };

    ContentReadability.analyze = (content) => {
      const text = content.replace(/<[^>]*>/g, '');
      const sentences = text.split(/[.!?]+/);
      const words = text.split(/\s+/).filter(Boolean);
      const sentenceCount = sentences.length - 1;
      const wordCount = words.length;

      const averageSentenceLength = sentenceCount > 0 ? wordCount / sentenceCount : 0;
      const fleschKincaidScore =
        0.39 * (wordCount / sentenceCount) + 11.8 * (countSyllables(words) / wordCount) - 15.59;

      return {
        fleschKincaidScore: fleschKincaidScore.toFixed(2),
        averageSentenceLength: averageSentenceLength.toFixed(2),
        complexity: 'Moderate',
      };
    };

    function countSyllables(words) {
      let syllableCount = 0;
      for (const word of words) {
        const cleanedWord = word.toLowerCase().replace(/[^a-z]/g, '');
        if (cleanedWord.length === 0) continue;
        let count = 0;
        const vowels = 'aeiouy';
        let prevCharWasVowel = false;
        for (let i = 0; i < cleanedWord.length; i++) {
          const char = cleanedWord[i];
          if (vowels.includes(char)) {
            if (!prevCharWasVowel) {
              count++;
            }
            prevCharWasVowel = true;
          } else {
            prevCharWasVowel = false;
          }
        }
        if (cleanedWord.endsWith('e')) {
          count = Math.max(count - 1, 1);
        }
        syllableCount += count;
      }
      return syllableCount;
    }

    export default ContentReadability;
