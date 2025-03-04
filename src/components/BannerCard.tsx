import React from 'react';
import { BannerFormat } from '../types/banner';
import BannerFrame from './BannerFrame';

interface BannerCardProps {
  url: string;
  format: BannerFormat;
}

export const BannerCard: React.FC<BannerCardProps> = ({ url, format }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden h-fit"
      style={{ width: format.width }}
    >
      <BannerFrame url={url} format={format} />
      <div className="px-2 py-1.5 bg-gray-50 border-t">
        <span className="text-sm text-gray-600">
          {format.width} × {format.height}
        </span>
      </div>
    </div>
  );
};

export default BannerCard;