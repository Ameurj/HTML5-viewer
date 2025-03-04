import React from 'react';
import { BannerFormat, DEFAULT_FORMATS } from '../../types/banner';
import FormatDropdown from '../format/FormatDropdown';
import { validateDimension } from '../../utils/validation';

interface FormatFilterProps {
  formats: BannerFormat[];
  visibleFormats: BannerFormat[];
  onFormatToggle: (format: BannerFormat) => void;
}

const FormatFilter: React.FC<FormatFilterProps> = ({
  formats,
  visibleFormats,
  onFormatToggle,
}) => {
  const [customFormats, setCustomFormats] = React.useState<BannerFormat[]>([]);

  // Keep custom formats at the top
  const allFormats = React.useMemo(() => {
    const standardFormats = formats.filter(f => !f.isCustom);
    return [...customFormats, ...standardFormats];
  }, [formats, customFormats]);

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

      // Toggle off the old format and toggle on the new one
      onFormatToggle(editingFormat);
      onFormatToggle(updatedFormat);
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
      onFormatToggle(newFormat);
    }
  };

  const handleDeleteFormat = (format: BannerFormat) => {
    setCustomFormats(prev => prev.filter(f => f.id !== format.id));
    if (visibleFormats.some(f => f.id === format.id)) {
      onFormatToggle(format);
    }
  };

  const handleClearCustomFormats = () => {
    // Remove all custom formats from visible formats
    customFormats.forEach(format => {
      if (visibleFormats.some(f => f.id === format.id)) {
        onFormatToggle(format);
      }
    });
    setCustomFormats([]);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Visible Formats</h3>
      <FormatDropdown
        formats={allFormats}
        selectedFormats={visibleFormats}
        onFormatToggle={onFormatToggle}
        onDeleteFormat={handleDeleteFormat}
        mode="filter"
        onCustomFormat={handleCustomFormat}
        defaultFormats={DEFAULT_FORMATS}
        onClearCustom={handleClearCustomFormats}
      />
    </div>
  );
};

export default FormatFilter;