import { useState, useEffect, RefObject } from 'react';
import { BannerFormat } from '../types/banner';

export const useBannerScale = (
  containerRef: RefObject<HTMLDivElement>,
  format: BannerFormat
) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const newScale = Math.min(1, containerWidth / format.width);
        setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [format.width]);

  return scale;
};