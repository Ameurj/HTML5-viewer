import React from 'react';
import { BannerFormat } from '../../types/banner';
import BannerCard from './BannerCard';
import { useBannerSort } from '../../hooks/useBannerSort';

interface BannerGridProps {
  url: string;
  formats: BannerFormat[];
}

const BannerGrid: React.FC<BannerGridProps> = ({ url, formats }) => {
  const sortedFormats = useBannerSort(formats);

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