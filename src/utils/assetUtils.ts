import { JSZipObject } from 'jszip';
import { createBlobUrl } from './blobUtils';
import { getDirectoryPath, normalizeFilePath } from './fileUtils';

const MIME_TYPES: Record<string, string> = {
  'html': 'text/html',
  'css': 'text/css',
  'js': 'application/javascript',
  'json': 'application/json',
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'gif': 'image/gif',
  'svg': 'image/svg+xml',
  'webp': 'image/webp',
  'woff': 'font/woff',
  'woff2': 'font/woff2',
  'ttf': 'font/ttf',
  'eot': 'font/eot',
  'mp4': 'video/mp4',
  'webm': 'video/webm',
  'mp3': 'audio/mpeg',
  'wav': 'audio/wav'
};

export const getMimeType = (filename: string): string => {
  const ext = filename.toLowerCase().split('.').pop() || '';
  return MIME_TYPES[ext] || 'application/octet-stream';
};

export const getAssetMap = async (
  files: { [key: string]: JSZipObject },
  mainHtmlFile: string
): Promise<Map<string, string>> => {
  const assetUrls = new Map<string, string>();
  const mainHtmlDir = getDirectoryPath(mainHtmlFile);

  for (const [path, file] of Object.entries(files)) {
    if (!path.endsWith('/') && !path.startsWith('__MACOSX') && !file.dir) {
      try {
        const blob = await file.async('blob');
        const mimeType = getMimeType(path);
        const blobWithType = new Blob([blob], { type: mimeType });
        const blobUrl = createBlobUrl(blobWithType);
        
        // Store multiple variations of the path for better matching
        const normalizedPath = normalizeFilePath(path.replace(mainHtmlDir, ''));
        assetUrls.set(normalizedPath, blobUrl);
        
        // Also store the path without the directory
        const fileName = normalizedPath.split('/').pop() || '';
        if (fileName !== normalizedPath) {
          assetUrls.set(fileName, blobUrl);
        }
      } catch (error) {
        console.error(`Failed to process asset: ${path}`, error);
      }
    }
  }

  return assetUrls;
};