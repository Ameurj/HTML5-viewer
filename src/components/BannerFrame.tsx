import React from 'react';
import { BannerFormat } from '../types/banner';

interface BannerFrameProps {
  url: string;
  format: BannerFormat;
}

const BannerFrame: React.FC<BannerFrameProps> = ({ url, format }) => {
  return (
    <iframe
      src={url}
      width={format.width}
      height={format.height}
      className="border-0 bg-white"
      style={{
        width: `${format.width}px`,
        height: `${format.height}px`,
        maxWidth: '100%',
        display: 'block'
      }}
      title={`Banner Preview - ${format.label}`}
      sandbox="allow-scripts allow-same-origin"
      scrolling="no"
    />
  );
};

export default BannerFrame;