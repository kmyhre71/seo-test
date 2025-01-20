import React, { useState } from 'react';
    import Analysis from './components/Analysis';
    import KeywordHighlighting from './components/KeywordHighlighting';
    import MetaTagInspection from './components/MetaTagInspection';
    import LinkAnalysis from './components/LinkAnalysis';
    import SERPPreview from './components/SERPPreview';
    import HttpStatus from './components/HttpStatus';
    import MobileFriendliness from './components/MobileFriendliness';
    import ContentReadability from './components/ContentReadability';
    import SchemaMarkupValidator from './components/SchemaMarkupValidator';
    import ImageOptimization from './components/ImageOptimization';
    import SocialMediaIntegration from './components/SocialMediaIntegration';
    import axios from 'axios';

    function App() {
      const [url, setUrl] = useState('');
      const [analysisResults, setAnalysisResults] = useState(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      const [status, setStatus] = useState('');

      const isValidUrl = (urlString) => {
        try {
          new URL(urlString);
          return true;
        } catch (e) {
          return false;
        }
      };

      const fetchWithTimeout = async (url, retries = 5) => {
        let delay = 1000;
        for (let i = 0; i < retries; i++) {
          console.log(`Fetch attempt ${i + 1} started.`);
          try {
            const response = await axios.get(url, {
            });

            if (response.status !== 200) {
              const message = `HTTP error! status: ${response.status}`;
              console.log(`Fetch attempt ${i + 1} failed: ${message}`);
              throw new Error(message);
            }
            console.log(`Fetch attempt ${i + 1} successful.`);
            return response.data;
          } catch (e) {
            console.log(`Fetch attempt ${i + 1} failed: ${e.message}`);
             if (i === retries - 1) {
              throw e;
            }
            await new Promise((resolve) => setTimeout(resolve, delay));
            delay *= 2;
          }
        }
      };

      const handleAnalyze = async () => {
        setLoading(true);
        setError(null);
        setStatus('Validating URL...');

        if (!isValidUrl(url)) {
          setError('Invalid URL');
          setLoading(false);
          setStatus('URL validation failed.');
          return;
        }

        const proxyUrl = 'https://thingproxy.freeboard.io/fetch/';
        const targetUrl = proxyUrl + url;

        try {
          setStatus('Fetching content...');
          const htmlContent = await fetchWithTimeout(targetUrl);

          setStatus('Analyzing content...');
          const results = {
            analysis: Analysis.analyze(htmlContent),
            keywords: KeywordHighlighting.highlight(htmlContent, ['keyword1', 'keyword2']),
            metaTags: MetaTagInspection.inspect(htmlContent),
            links: LinkAnalysis.analyze(htmlContent),
            serpPreview: SERPPreview.preview(htmlContent),
            httpStatus: HttpStatus.check(htmlContent),
            mobileFriendliness: MobileFriendliness.check(htmlContent),
            readability: ContentReadability.analyze(htmlContent),
            schema: SchemaMarkupValidator.validate(htmlContent),
            images: ImageOptimization.check(htmlContent),
            social: SocialMediaIntegration.analyze(htmlContent),
          };
          setAnalysisResults(results);
          setStatus('Analysis complete.');
        } catch (e) {
          setError(e.message);
          setAnalysisResults(null);
          setStatus('Analysis failed.');
        } finally {
          setLoading(false);
        }
      };

      return (
        <div className="container">
          <h1>On-Page SEO Analyzer</h1>
          <input
            type="url"
            placeholder="Enter URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ width: '80%', padding: '10px', marginBottom: '10px' }}
          />
          <button onClick={handleAnalyze} disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
          {status && <p>Status: {status}</p>}
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}

          {analysisResults && (
            <>
              <div className="analysis-section">
                <h2>Analysis</h2>
                <Analysis results={analysisResults.analysis} />
              </div>
              <div className="analysis-section">
                <h2>Keyword Highlighting</h2>
                <KeywordHighlighting results={analysisResults.keywords} />
              </div>
              <div className="analysis-section">
                <h2>Meta Tag Inspection</h2>
                <MetaTagInspection results={analysisResults.metaTags} />
              </div>
              <div className="analysis-section">
                <h2>Link Analysis</h2>
                <LinkAnalysis results={analysisResults.links} />
              </div>
              <div className="analysis-section">
                <h2>SERP Preview</h2>
                <SERPPreview results={analysisResults.serpPreview} />
              </div>
              <div className="analysis-section">
                <h2>HTTP Status</h2>
                <HttpStatus results={analysisResults.httpStatus} />
              </div>
              <div className="analysis-section">
                <h2>Mobile Friendliness</h2>
                <MobileFriendliness results={analysisResults.mobileFriendliness} />
              </div>
              <div className="analysis-section">
                <h2>Content Readability</h2>
                <ContentReadability results={analysisResults.readability} />
              </div>
              <div className="analysis-section">
                <h2>Schema Markup Validator</h2>
                <SchemaMarkupValidator results={analysisResults.schema} />
              </div>
              <div className="analysis-section">
                <h2>Image Optimization</h2>
                <ImageOptimization results={analysisResults.images} />
              </div>
              <div className="analysis-section">
                <h2>Social Media Integration</h2>
                <SocialMediaIntegration results={analysisResults.social} />
              </div>
            </>
          )}
        </div>
      );
    }

    export default App;
