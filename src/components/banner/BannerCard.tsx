import React, { useRef } from 'react';
import { BannerFormat } from '../../types/banner';
import BannerFrame from './BannerFrame';
import ReplayButton from './ReplayButton';

interface BannerCardProps {
  url: string;
  format: BannerFormat;
}

const BannerCard: React.FC<BannerCardProps> = ({ url, format }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleReplay = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden h-fit"
      style={{ width: format.width }}
    >
      <BannerFrame ref={iframeRef} url={url} format={format} />
      <div className="px-2 py-1.5 bg-gray-50 border-t flex justify-between items-center">
        <span className="text-sm text-gray-600">
          {format.width} × {format.height}
        </span>
        <ReplayButton onReplay={handleReplay} />
      </div>
    </div>
  );
};

export default BannerCard;