import React from 'react';
import { ChevronDown, Plus, Trash2, Pencil, X } from 'lucide-react';
import { BannerFormat, BANNER_FORMATS } from '../types/banner';

interface FormatSelectorProps {
  selectedFormats: BannerFormat[];
  onFormatChange: (formats: BannerFormat[]) => void;
}

interface ValidationState {
  width: string | null;
  height: string | null;
}

const FormatSelector: React.FC<FormatSelectorProps> = ({ selectedFormats, onFormatChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [customWidth, setCustomWidth] = React.useState('');
  const [customHeight, setCustomHeight] = React.useState('');
  const [editingFormat, setEditingFormat] = React.useState<BannerFormat | null>(null);
  const [validation, setValidation] = React.useState<ValidationState>({ width: null, height: null });
  const [deletingFormat, setDeletingFormat] = React.useState<string | null>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Combine standard and custom formats
  const allFormats = React.useMemo(() => {
    const customFormats = selectedFormats.filter(f => f.isCustom);
    return [...customFormats, ...BANNER_FORMATS];
  }, [selectedFormats]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setDeletingFormat(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const validateDimension = (value: string, field: 'width' | 'height'): boolean => {
    const num = parseInt(value);
    if (!value) {
      setValidation(prev => ({ ...prev, [field]: 'Required' }));
      return false;
    }
    if (isNaN(num) || num <= 0) {
      setValidation(prev => ({ ...prev, [field]: 'Must be greater than 0' }));
      return false;
    }
    setValidation(prev => ({ ...prev, [field]: null }));
    return true;
  };

  const handleFormatToggle = (format: BannerFormat) => {
    const isSelected = selectedFormats.some(f => f.id === format.id);
    if (isSelected) {
      onFormatChange(selectedFormats.filter(f => f.id !== format.id));
    } else {
      onFormatChange([...selectedFormats, format]);
    }
  };

  const handleCustomFormatAdd = () => {
    const isWidthValid = validateDimension(customWidth, 'width');
    const isHeightValid = validateDimension(customHeight, 'height');
    
    if (!isWidthValid || !isHeightValid) {
      return;
    }

    const width = parseInt(customWidth);
    const height = parseInt(customHeight);

    const newFormat: BannerFormat = {
      id: `custom_${width}_${height}`,
      width,
      height,
      label: `${width} x ${height}`,
      isCustom: true
    };

    onFormatChange([...selectedFormats, newFormat]);
    setCustomWidth('');
    setCustomHeight('');
    setValidation({ width: null, height: null });
  };

  const handleEditFormat = (format: BannerFormat) => {
    setEditingFormat(format);
    setCustomWidth(format.width.toString());
    setCustomHeight(format.height.toString());
    setValidation({ width: null, height: null });
    setDeletingFormat(null);
  };

  const handleUpdateFormat = () => {
    if (!editingFormat) return;

    const isWidthValid = validateDimension(customWidth, 'width');
    const isHeightValid = validateDimension(customHeight, 'height');
    
    if (!isWidthValid || !isHeightValid) {
      return;
    }

    const width = parseInt(customWidth);
    const height = parseInt(customHeight);

    const updatedFormat: BannerFormat = {
      ...editingFormat,
      width,
      height,
      label: `${width} x ${height}`
    };

    onFormatChange(
      selectedFormats.map(f => 
        f.id === editingFormat.id ? updatedFormat : f
      )
    );

    setEditingFormat(null);
    setCustomWidth('');
    setCustomHeight('');
    setValidation({ width: null, height: null });
  };

  const handleDeleteClick = (formatId: string) => {
    if (deletingFormat === formatId) {
      const format = selectedFormats.find(f => f.id === formatId);
      if (format) {
        onFormatChange(selectedFormats.filter(f => f.id !== formatId));
      }
      setDeletingFormat(null);
    } else {
      setDeletingFormat(formatId);
      setEditingFormat(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (editingFormat) {
        handleUpdateFormat();
      } else {
        handleCustomFormatAdd();
      }
    }
  };

  const handleInputChange = (value: string, field: 'width' | 'height') => {
    if (field === 'width') {
      setCustomWidth(value);
    } else {
      setCustomHeight(value);
    }
    validateDimension(value, field);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Select Banner Formats</h2>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Select formats...</span>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
            <div className="sticky top-0 z-10 bg-white border-b">
              <div className="p-4">
                <div className="flex space-x-2">
                  <div className="relative">
                    <input
                      type="number"
                      value={customWidth}
                      onChange={(e) => handleInputChange(e.target.value, 'width')}
                      onKeyPress={handleKeyPress}
                      placeholder="Width"
                      className={`w-24 px-2 py-1 border rounded ${
                        validation.width ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {validation.width && (
                      <div className="absolute left-0 top-full mt-1 text-xs text-red-500">
                        {validation.width}
                      </div>
                    )}
                  </div>
                  <span className="text-gray-500">×</span>
                  <div className="relative">
                    <input
                      type="number"
                      value={customHeight}
                      onChange={(e) => handleInputChange(e.target.value, 'height')}
                      onKeyPress={handleKeyPress}
                      placeholder="Height"
                      className={`w-24 px-2 py-1 border rounded ${
                        validation.height ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {validation.height && (
                      <div className="absolute left-0 top-full mt-1 text-xs text-red-500">
                        {validation.height}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={editingFormat ? handleUpdateFormat : handleCustomFormatAdd}
                    className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    {editingFormat ? 'Update' : 'Add'}
                  </button>
                  {editingFormat && (
                    <button
                      onClick={() => {
                        setEditingFormat(null);
                        setCustomWidth('');
                        setCustomHeight('');
                        setValidation({ width: null, height: null });
                      }}
                      className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="py-2">
              {allFormats.map((format) => {
                const isSelected = selectedFormats.some(f => f.id === format.id);
                const isDeleting = deletingFormat === format.id;
                return (
                  <div
                    key={format.id}
                    className={`px-4 py-2 flex items-center justify-between hover:bg-gray-100 ${
                      isSelected ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() => handleFormatToggle(format)}
                    >
                      <span className="text-sm">{format.label}</span>
                    </div>
                    {format.isCustom && isSelected && (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditFormat(format);
                          }}
                          className="p-1 text-gray-500 hover:text-blue-500"
                          disabled={isDeleting}
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(format.id);
                          }}
                          className={`p-1 flex items-center space-x-1 ${
                            isDeleting ? 'text-red-600' : 'text-gray-500 hover:text-red-500'
                          }`}
                        >
                          <Trash2 className="w-4 h-4" />
                          {isDeleting && (
                            <span className="text-xs font-medium">Click to confirm</span>
                          )}
                        </button>
                      </div>
                    )}
                    {isSelected && !format.isCustom && (
                      <span className="text-blue-500">✓</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {selectedFormats.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedFormats.map((format) => (
              <div
                key={format.id}
                className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium rounded-full overflow-hidden"
              >
                <span className="px-3 py-1">{format.label}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFormatToggle(format);
                  }}
                  className="h-full px-2 hover:bg-blue-200 transition-colors flex items-center"
                  aria-label={`Remove ${format.label} format`}
                >
                  <X className="w-3.5 h-3.5 text-blue-600/80" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormatSelector;