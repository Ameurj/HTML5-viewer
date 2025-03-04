const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];

export const findAndReplaceImages = (html: string, assetUrls: Map<string, string>): string => {
  let processedHtml = html;
  
  // Get all image files from assetUrls
  const imageFiles = Array.from(assetUrls.entries())
    .filter(([path]) => IMAGE_EXTENSIONS.some(ext => path.toLowerCase().endsWith(`.${ext}`)));

  // Replace all occurrences of image filenames with their blob URLs
  imageFiles.forEach(([filename, blobUrl]) => {
    // Get just the base filename without path
    const baseName = filename.split('/').pop() || filename;
    
    // Create patterns for different scenarios
    const patterns = [
      // Basic image references
      `(["'])?[./]*?${escapeRegExp(baseName)}\\1`,
      
      // GWD specific patterns
      `(source=["'])${escapeRegExp(baseName)}(["'])`,
      `(data-gwd-media-override=[^>]*"source":\\s*"?)${escapeRegExp(baseName)}("?)`,
      
      // JSON attribute patterns
      `("source":\\s*"?)${escapeRegExp(baseName)}("?)`,
      `(\\"source\\":\\s*\\"?)${escapeRegExp(baseName)}(\\"?)`,
      
      // CSS url() patterns
      `(url\\(['"]?)${escapeRegExp(baseName)}(['"]?\\))`,
      
      // Background image patterns
      `(background(?:-image)?:\\s*url\\(['"]?)${escapeRegExp(baseName)}(['"]?\\))`
    ];

    // Apply each pattern
    patterns.forEach(pattern => {
      const regex = new RegExp(pattern, 'g');
      processedHtml = processedHtml.replace(regex, (match, prefix = '', suffix = '') => {
        // If it's a JSON pattern, we need to keep the quotes
        if (pattern.includes('source')) {
          return `${prefix}${blobUrl}${suffix}`;
        }
        return blobUrl;
      });
    });
  });

  // Log replacements in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Image replacements:', imageFiles.map(([filename, url]) => ({
      original: filename,
      blob: url
    })));
  }

  return processedHtml;
};

const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};