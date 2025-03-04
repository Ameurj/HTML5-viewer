export interface BannerFormat {
  id: string;
  width: number;
  height: number;
  label: string;
  isCustom?: boolean;
}

// Default formats that are selected by default
export const DEFAULT_FORMATS = [
  '300x250', '300x600', '728x90', '300x50', '320x50',
  '980x100', '320x100', '200x200', '336x228', '970x250',
  '980x250', '600x300', '400x400', '600x600', '320x480'
].map(size => {
  const [width, height] = size.split('x').map(Number);
  return {
    id: `default_${width}_${height}`,
    width,
    height,
    label: `${width} × ${height}`
  };
});

export const BANNER_FORMATS: BannerFormat[] = [
  { id: 'skyscraper_120', width: 120, height: 600, label: '120 × 600' },
  { id: 'skyscraper_160', width: 160, height: 600, label: '160 × 600' },
  { id: 'square_200', width: 200, height: 200, label: '200 × 200' },
  { id: 'vertical_240', width: 240, height: 400, label: '240 × 400' },
  { id: 'square_250', width: 250, height: 250, label: '250 × 250' },
  { id: 'banner_300_50', width: 300, height: 50, label: '300 × 50' },
  { id: 'medium_rectangle', width: 300, height: 250, label: '300 × 250' },
  { id: 'square_300', width: 300, height: 300, label: '300 × 300' },
  { id: 'half_page', width: 300, height: 600, label: '300 × 600' },
  { id: 'portrait', width: 300, height: 1050, label: '300 × 1050' },
  { id: 'mobile_banner', width: 320, height: 50, label: '320 × 50' },
  { id: 'mobile_banner_large', width: 320, height: 100, label: '320 × 100' },
  { id: 'mobile_rectangle', width: 320, height: 250, label: '320 × 250' },
  { id: 'mobile_266', width: 320, height: 266, label: '320 × 266' },
  { id: 'mobile_280', width: 320, height: 280, label: '320 × 280' },
  { id: 'mobile_square', width: 320, height: 320, label: '320 × 320' },
  { id: 'mobile_interstitial', width: 320, height: 480, label: '320 × 480' },
  { id: 'large_rectangle', width: 336, height: 280, label: '336 × 280' },
  { id: 'rectangle_336_228', width: 336, height: 228, label: '336 × 228' },
  { id: 'mobile_360_50', width: 360, height: 50, label: '360 × 50' },
  { id: 'mobile_360_56', width: 360, height: 56, label: '360 × 56' },
  { id: 'mobile_360_280', width: 360, height: 280, label: '360 × 280' },
  { id: 'mobile_360_300', width: 360, height: 300, label: '360 × 300' },
  { id: 'square_400', width: 400, height: 400, label: '400 × 400' },
  { id: 'mobile_375_50', width: 375, height: 50, label: '375 × 50' },
  { id: 'mobile_375_312', width: 375, height: 312, label: '375 × 312' },
  { id: 'mobile_393_90', width: 393, height: 90, label: '393 × 90' },
  { id: 'mobile_412_90', width: 412, height: 90, label: '412 × 90' },
  { id: 'mobile_412_343', width: 412, height: 343, label: '412 × 343' },
  { id: 'mobile_414_50', width: 414, height: 50, label: '414 × 50' },
  { id: 'mobile_414_345', width: 414, height: 345, label: '414 × 345' },
  { id: 'banner', width: 468, height: 60, label: '468 × 60' },
  { id: 'mobile_480_320', width: 480, height: 320, label: '480 × 320' },
  { id: 'custom_580', width: 580, height: 400, label: '580 × 400' },
  { id: 'rectangle_600_300', width: 600, height: 300, label: '600 × 300' },
  { id: 'square_600', width: 600, height: 600, label: '600 × 600' },
  { id: 'leaderboard', width: 728, height: 90, label: '728 × 90' },
  { id: 'tablet_768_90', width: 768, height: 90, label: '768 × 90' },
  { id: 'tablet_768_1024', width: 768, height: 1024, label: '768 × 1024' },
  { id: 'custom_800', width: 800, height: 90, label: '800 × 90' },
  { id: 'large_leaderboard', width: 970, height: 90, label: '970 × 90' },
  { id: 'billboard', width: 970, height: 250, label: '970 × 250' },
  { id: 'billboard_980', width: 980, height: 250, label: '980 × 250' },
  { id: 'leaderboard_980', width: 980, height: 100, label: '980 × 100' },
  { id: 'custom_1024_90', width: 1024, height: 90, label: '1024 × 90' },
  { id: 'custom_1024_768', width: 1024, height: 768, label: '1024 × 768' }
];