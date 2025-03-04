import { useMemo } from 'react';
import { BannerFormat } from '../types/banner';

export const useBannerSort = (formats: BannerFormat[]) => {
  return useMemo(() => {
    return [...formats].sort((a, b) => {
      if (a.height === b.height) {
        return b.width - a.width;
      }
      return a.height - b.height;
    });
  }, [formats]);
};