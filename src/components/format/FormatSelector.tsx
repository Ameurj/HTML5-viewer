import React from 'react';
import { BannerFormat, DEFAULT_FORMATS, BANNER_FORMATS } from '../../types/banner';
import FormatDropdown from './FormatDropdown';
import { validateDimension } from '../../utils/validation';

interface FormatSelectorProps {
  selectedFormats: BannerFormat[];
  onFormatChange: (formats: BannerFormat[]) => void;
}

const FormatSelector: React.FC<FormatSelectorProps> = ({
  selectedFormats,
  onFormatChange,
}) => {
  const [customFormats, setCustomFormats] = React.useState<BannerFormat[]>([]);

  // Keep custom formats at the top
  const allFormats = React.useMemo(() => {
    const standardFormats = BANNER_FORMATS.filter(f => !f.isCustom);
    return [...customFormats, ...standardFormats];
  }, [customFormats]);

  const handleCustomFormat = (width: string, height: string, editingFormat: BannerFormat | null = null) => {
    const widthValidation = validateDimension(width, 'width');
    const heightValidation = validateDimension(height, 'height');
    
    if (widthValidation || heightValidation) return;

    const w = parseInt(width);
    const h = parseInt(height);

    if (editingFormat) {
      // Update existing format
      const updatedFormat = {
        ...editingFormat,
        width: w,
        height: h,
        label: `${w} × ${h}`
      };

      setCustomFormats(prev => prev.map(f => 
        f.id === editingFormat.id ? updatedFormat : f
      ));

      onFormatChange(selectedFormats.map(f => 
        f.id === editingFormat.id ? updatedFormat : f
      ));
    } else {
      // Create new format
      const newFormat: BannerFormat = {
        id: `custom_${w}_${h}_${Date.now()}`,
        width: w,
        height: h,
        label: `${w} × ${h}`,
        isCustom: true
      };

      setCustomFormats(prev => [...prev, newFormat]);
      onFormatChange([...selectedFormats, newFormat]);
    }
  };

  const handleFormatToggle = (format: BannerFormat) => {
    const isSelected = selectedFormats.some(f => f.id === format.id);
    if (isSelected) {
      onFormatChange(selectedFormats.filter(f => f.id !== format.id));
    } else {
      onFormatChange([...selectedFormats, format]);
    }
  };

  const handleDeleteFormat = (format: BannerFormat) => {
    setCustomFormats(prev => prev.filter(f => f.id !== format.id));
    onFormatChange(selectedFormats.filter(f => f.id !== format.id));
  };

  const handleClearCustomFormats = () => {
    // Remove all custom formats from selected formats
    customFormats.forEach(format => {
      if (selectedFormats.some(f => f.id === format.id)) {
        handleFormatToggle(format);
      }
    });
    setCustomFormats([]);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-800">Select Banner Formats</h3>
      <FormatDropdown
        formats={allFormats}
        selectedFormats={selectedFormats}
        onFormatToggle={handleFormatToggle}
        onDeleteFormat={handleDeleteFormat}
        mode="select"
        onCustomFormat={handleCustomFormat}
        defaultFormats={DEFAULT_FORMATS}
        onClearCustom={handleClearCustomFormats}
      />
    </div>
  );
};

export default FormatSelector;