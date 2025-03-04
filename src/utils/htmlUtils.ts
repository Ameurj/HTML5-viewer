import { replaceGWDImages } from './gwdImageUtils';

const BASE_STYLES = `
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  * {
    box-sizing: border-box;
  }
`;

export const processHtmlContent = (html: string, assetUrls: Map<string, string>): string => {
  let processedHtml = ensureHtmlStructure(html);
  // Use GWD-specific image replacement
  processedHtml = replaceGWDImages(processedHtml, assetUrls);
  processedHtml = ensureMetaTags(processedHtml);
  processedHtml = addBaseStyles(processedHtml);
  return processedHtml;
};

const ensureHtmlStructure = (html: string): string => {
  let processedHtml = html;
  
  if (!processedHtml.includes('<!DOCTYPE html>')) {
    processedHtml = '<!DOCTYPE html>\n' + processedHtml;
  }
  
  if (!processedHtml.includes('<html')) {
    processedHtml = processedHtml.replace('<!DOCTYPE html>', '<!DOCTYPE html>\n<html>');
  }
  
  if (!processedHtml.includes('<head>')) {
    processedHtml = processedHtml.replace(/<html[^>]*>/i, '$&\n<head>');
    processedHtml = processedHtml.replace('</html>', '</head>\n</html>');
  }
  
  if (!processedHtml.includes('<body>')) {
    processedHtml = processedHtml.replace('</head>', '</head>\n<body>');
    processedHtml = processedHtml.replace('</html>', '</body>\n</html>');
  }
  
  return processedHtml;
};

const ensureMetaTags = (html: string): string => {
  const metaTags = [
    '<meta charset="UTF-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">'
  ];
  
  let processedHtml = html;
  const headEnd = processedHtml.indexOf('</head>');
  
  if (headEnd !== -1) {
    metaTags.forEach(tag => {
      if (!processedHtml.includes(tag)) {
        const insertPosition = headEnd;
        processedHtml = processedHtml.slice(0, insertPosition) + 
                       `  ${tag}\n  ` + 
                       processedHtml.slice(insertPosition);
      }
    });
  }
  
  return processedHtml;
};

const addBaseStyles = (html: string): string => {
  const styleTag = `  <style>\n    ${BASE_STYLES}\n  </style>\n`;
  return html.replace('</head>', `${styleTag}  </head>`);
};