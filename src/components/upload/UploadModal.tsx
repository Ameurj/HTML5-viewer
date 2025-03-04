import React from 'react';
import { X } from 'lucide-react';
import FormatSelector from '../format/FormatSelector';
import DropZone from './DropZone';
import { BannerFormat } from '../../types/banner';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileSelect: (file: File) => void;
  selectedFormats: BannerFormat[];
  onFormatChange: (formats: BannerFormat[]) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onFileSelect,
  selectedFormats,
  onFormatChange,
}) => {
  // Create local state for formats within the modal
  const [localFormats, setLocalFormats] = React.useState<BannerFormat[]>(selectedFormats);

  // Reset local formats when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setLocalFormats(selectedFormats);
    }
  }, [isOpen, selectedFormats]);

  if (!isOpen) return null;

  const handleFile = (file: File) => {
    // Update the global format state with local formats before closing
    onFormatChange(localFormats);
    onFileSelect(file);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
            <div className="absolute top-0 right-0 pt-4 pr-4">
              <button
                onClick={onClose}
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-3 sm:mt-0 sm:text-left">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Upload a Different Banner
              </h3>
              <div className="space-y-6">
                <FormatSelector
                  selectedFormats={localFormats}
                  onFormatChange={setLocalFormats}
                />
                <DropZone onFileSelect={handleFile} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;