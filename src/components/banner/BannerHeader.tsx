import React from 'react';
import { Plus } from 'lucide-react';

interface BannerHeaderProps {
  fileName: string;
  onUploadClick: () => void;
}

const BannerHeader: React.FC<BannerHeaderProps> = ({ fileName, onUploadClick }) => {
  return (
    <div className="pb-4 border-b border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">{fileName}</h1>
          <p className="mt-1 text-sm sm:text-base text-gray-500">HTML5 Banner Preview</p>
        </div>
        <button
          onClick={onUploadClick}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap"
        >
          <Plus className="h-5 w-5" />
          Upload a different banner
        </button>
      </div>
    </div>
  );
};

export default BannerHeader;