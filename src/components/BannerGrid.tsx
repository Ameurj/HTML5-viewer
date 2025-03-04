import React from 'react';
import { BannerFormat } from '../types/banner';
import BannerCard from './BannerCard';

interface BannerGridProps {
  url: string;
  formats: BannerFormat[];
}

export const BannerGrid: React.FC<BannerGridProps> = ({ url, formats }) => {
  // Sort formats by height (ascending), then by width (descending)
  const sortedFormats = [...formats].sort((a, b) => {
    if (a.height === b.height) {
      return b.width - a.width;
    }
    return a.height - b.height;
  });

  return (
    <div className="flex flex-wrap gap-6 items-start">
      {sortedFormats.map((format) => (
        <BannerCard
          key={format.id}
          url={url}
          format={format}
        />
      ))}
    </div>
  );
};

export default BannerGrid;