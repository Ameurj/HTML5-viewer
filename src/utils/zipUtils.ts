import JSZip from 'jszip';
import { processHtmlContent } from './htmlUtils';
import { createBlobUrl } from './blobUtils';
import { findMainHtmlFile } from './fileUtils';
import { getAssetMap } from './assetUtils';

export interface BannerData {
  htmlUrl: string;
  assetUrls: Map<string, string>;
}

export const extractZip = async (file: File): Promise<BannerData> => {
  const zip = new JSZip();
  const contents = await zip.loadAsync(file);
  
  const mainHtmlFile = findMainHtmlFile(contents.files);
  const htmlContent = await contents.files[mainHtmlFile].async('text');
  
  const assetUrls = await getAssetMap(contents.files, mainHtmlFile);
  const processedHtml = processHtmlContent(htmlContent, assetUrls);
  
  const htmlBlob = new Blob([processedHtml], { type: 'text/html' });
  const htmlUrl = createBlobUrl(htmlBlob);

  return { htmlUrl, assetUrls };
};