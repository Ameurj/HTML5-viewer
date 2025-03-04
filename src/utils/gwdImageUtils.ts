/**
 * Special handling for Google Web Designer banner images
 */
export const replaceGWDImages = (html: string, assetUrls: Map<string, string>): string => {
  let processedHtml = html;
  
  // Get all image files from assetUrls
  const imageFiles = Array.from(assetUrls.entries())
    .filter(([path]) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(path));

  // Replace all occurrences of image filenames with their blob URLs
  imageFiles.forEach(([filename, blobUrl]) => {
    // Get just the base filename without path
    const baseName = filename.split('/').pop() || filename;
    
    // Only replace actual image references, not script references
    if (processedHtml.includes(baseName)) {
      // Handle GWD intermediate elements specially
      const intermediatePattern = new RegExp(
        `(<div class="intermediate-element"><img[^>]*?)(src="[^"]*")?([^>]*?style="[^"]*background-image: url\\(['"']?)${escapeRegExp(baseName)}(['"']?\\)[^"]*"[^>]*?>)`,
        'g'
      );
      processedHtml = processedHtml.replace(intermediatePattern, `$1$2$3${blobUrl}$4`);

      // Handle GWD source attributes
      const sourcePattern = new RegExp(
        `(source=["'])${escapeRegExp(baseName)}\\?[^"']*?(["'])`,
        'g'
      );
      processedHtml = processedHtml.replace(sourcePattern, `$1${blobUrl}$2`);

      // Handle data-gwd-media-override
      const mediaOverridePattern = new RegExp(
        `("source":"?)${escapeRegExp(baseName)}\\?[^"'}]*?(["'}])`,
        'g'
      );
      processedHtml = processedHtml.replace(mediaOverridePattern, `$1${blobUrl}$2`);
    }
  });

  // Log replacements in development
  if (process.env.NODE_ENV === 'development') {
    console.log('GWD Image replacements:', imageFiles.map(([filename, url]) => ({
      original: filename,
      blob: url
    })));
  }

  return processedHtml;
};

const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};