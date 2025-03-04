import React, { forwardRef, useEffect } from 'react';
import { BannerFormat } from '../../types/banner';

interface BannerFrameProps {
  url: string;
  format: BannerFormat;
}

const BannerFrame = forwardRef<HTMLIFrameElement, BannerFrameProps>(({ url, format }, ref) => {
  useEffect(() => {
    // Log frame information in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Loading banner: ${format.width}x${format.height}`, {
        url,
        format
      });
    }
  }, [url, format]);

  return (
    <iframe
      ref={ref}
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
});

BannerFrame.displayName = 'BannerFrame';

export default BannerFrame;