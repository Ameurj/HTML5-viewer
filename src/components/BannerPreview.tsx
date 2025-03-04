import React from 'react';
import { BannerFormat } from '../types/banner';
import BannerGrid from './BannerGrid';

interface BannerPreviewProps {
  url: string;
  formats: BannerFormat[];
}

const BannerPreview: React.FC<BannerPreviewProps> = ({ url, formats }) => {
  return <BannerGrid url={url} formats={formats} />;
};

export default BannerPreview;