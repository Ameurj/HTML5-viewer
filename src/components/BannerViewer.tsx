import React from 'react';
import BannerPreview from './banner/BannerPreview';
import InitialView from './banner/InitialView';
import BannerHeader from './banner/BannerHeader';
import FormatFilter from './banner/FormatFilter';
import UploadModal from './upload/UploadModal';
import { extractZip, BannerData } from '../utils/zipUtils';
import { BannerFormat, BANNER_FORMATS } from '../types/banner';

const DEFAULT_FORMATS = [
  '300x250', '300x600', '728x90', '300x50', '320x50',
  '980x100', '320x100', '200x200', '336x228', '970x250',
  '980x250', '600x300', '400x400', '600x600', '320x480'
].map(size => {
  const [width, height] = size.split('x').map(Number);
  return BANNER_FORMATS.find(f => f.width === width && f.height === height)!;
});

const BannerViewer: React.FC = () => {
  const [bannerData, setBannerData] = React.useState<BannerData | null>(null);
  const [fileName, setFileName] = React.useState<string>('');
  const [selectedFormats, setSelectedFormats] = React.useState<BannerFormat[]>(DEFAULT_FORMATS);
  const [visibleFormats, setVisibleFormats] = React.useState<BannerFormat[]>(DEFAULT_FORMATS);
  const [availableFormats, setAvailableFormats] = React.useState<BannerFormat[]>(BANNER_FORMATS);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    return () => {
      if (bannerData) {
        URL.revokeObjectURL(bannerData.htmlUrl);
        bannerData.assetUrls.forEach(url => URL.revokeObjectURL(url));
      }
    };
  }, [bannerData]);

  const handleFile = async (file: File) => {
    if (file.type !== 'application/zip') {
      alert('Please upload a ZIP file');
      return;
    }

    try {
      if (bannerData) {
        URL.revokeObjectURL(bannerData.htmlUrl);
        bannerData.assetUrls.forEach(url => URL.revokeObjectURL(url));
      }

      const data = await extractZip(file);
      setBannerData(data);
      setFileName(file.name.replace('.zip', ''));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error processing file:', error);
      alert(error instanceof Error ? error.message : 'Error processing the banner file');
    }
  };

  const handleFormatChange = (formats: BannerFormat[]) => {
    // Update available formats to include custom formats
    const customFormats = formats.filter(f => f.isCustom);
    const standardFormats = BANNER_FORMATS;
    setAvailableFormats([...customFormats, ...standardFormats]);
    
    // Update selected formats
    setSelectedFormats(formats);
    // Reset visible formats to match selected formats when changing selection
    setVisibleFormats(formats);
  };

  const handleFormatToggle = (format: BannerFormat) => {
    setVisibleFormats(prev => {
      const isCurrentlyVisible = prev.some(f => f.id === format.id);
      if (isCurrentlyVisible) {
        return prev.filter(f => f.id !== format.id);
      } else {
        return [...prev, format];
      }
    });
  };

  return (
    <div className="space-y-6">
      {!bannerData ? (
        <InitialView
          selectedFormats={selectedFormats}
          onFormatChange={handleFormatChange}
          onFileSelect={handleFile}
        />
      ) : (
        <div className="space-y-6">
          <BannerHeader
            fileName={fileName}
            onUploadClick={() => setIsModalOpen(true)}
          />
          <FormatFilter
            formats={availableFormats}
            visibleFormats={visibleFormats}
            onFormatToggle={handleFormatToggle}
          />
          <div className="overflow-auto">
            <BannerPreview
              url={bannerData.htmlUrl}
              formats={visibleFormats}
            />
          </div>
        </div>
      )}

      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onFileSelect={handleFile}
        selectedFormats={selectedFormats}
        onFormatChange={handleFormatChange}
      />
    </div>
  );
};

export default BannerViewer;