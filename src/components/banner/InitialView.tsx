import React from 'react';
import WelcomeHeader from './WelcomeHeader';
import FormatSelector from '../format/FormatSelector';
import DropZone from '../upload/DropZone';
import { BannerFormat } from '../../types/banner';

interface InitialViewProps {
  selectedFormats: BannerFormat[];
  onFormatChange: (formats: BannerFormat[]) => void;
  onFileSelect: (file: File) => void;
}

const InitialView: React.FC<InitialViewProps> = ({
  selectedFormats,
  onFormatChange,
  onFileSelect,
}) => {
  return (
    <div className="space-y-6">
      <WelcomeHeader />
      <div className="space-y-6">
        <FormatSelector
          selectedFormats={selectedFormats}
          onFormatChange={onFormatChange}
        />
        <DropZone onFileSelect={onFileSelect} />
      </div>
    </div>
  );
};

export default InitialView;