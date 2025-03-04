export const createBlobUrl = (content: string | Blob, type: string): string => {
  const blob = typeof content === 'string' 
    ? new Blob([content], { type }) 
    : content;
  return URL.createObjectURL(blob);
};

export const revokeBlobUrl = (url: string): void => {
  URL.revokeObjectURL(url);
};

export type BlobUrlMap = Map<string, string>;

export const createBlobUrlMap = async (files: Record<string, any>, mainHtmlDir: string): Promise<BlobUrlMap> => {
  const blobUrls = new Map<string, string>();
  
  for (const path of Object.keys(files)) {
    if (!path.endsWith('/') && !path.startsWith('__MACOSX')) {
      const file = files[path];
      const blob = await file.async('blob');
      const blobUrl = createBlobUrl(blob, file.type || 'application/octet-stream');
      const relativePath = path.replace(mainHtmlDir, '');
      blobUrls.set(relativePath, blobUrl);
    }
  }

  return blobUrls;
};