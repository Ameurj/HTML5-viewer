import { JSZipObject } from 'jszip';

export const findMainHtmlFile = (files: { [key: string]: JSZipObject }): string => {
  const htmlFiles = Object.keys(files).filter(name => 
    name.toLowerCase().endsWith('.html') && 
    !name.startsWith('__MACOSX') &&
    !files[name].dir
  );
  
  if (htmlFiles.length === 0) {
    throw new Error('No HTML file found in the ZIP');
  }

  // Find the HTML file in the root or shortest path
  return htmlFiles.sort((a, b) => {
    const depthA = a.split('/').length;
    const depthB = b.split('/').length;
    return depthA - depthB;
  })[0];
};

export const getDirectoryPath = (filePath: string): string => {
  return filePath.includes('/') 
    ? filePath.substring(0, filePath.lastIndexOf('/') + 1)
    : '';
};

export const normalizeFilePath = (path: string): string => {
  return path.replace(/^[./]+/, '').replace(/^\/+/, '');
};