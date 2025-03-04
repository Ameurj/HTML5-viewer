import React, { useState, useRef, useEffect } from 'react';
import { BannerFormat } from '../../types/banner';
import { ChevronDown, X, Plus, Search } from 'lucide-react';
import FormatListItem from './FormatListItem';
import FormatInput from './FormatInput';

interface FormatDropdownProps {
  formats: BannerFormat[];
  selectedFormats: BannerFormat[];
  onFormatToggle: (format: BannerFormat) => void;
  onDeleteFormat?: (format: BannerFormat) => void;
  mode: 'select' | 'filter';
  onCustomFormat?: (width: string, height: string, editingFormat: BannerFormat | null) => void;
  defaultFormats?: BannerFormat[];
  onClearCustom?: () => void;
}

const FormatDropdown: React.FC<FormatDropdownProps> = ({
  formats,
  selectedFormats,
  onFormatToggle,
  onDeleteFormat,
  mode,
  onCustomFormat,
  defaultFormats,
  onClearCustom
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customWidth, setCustomWidth] = useState('');
  const [customHeight, setCustomHeight] = useState('');
  const [editingFormat, setEditingFormat] = useState<BannerFormat | null>(null);
  const [deletingFormat, setDeletingFormat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [validation, setValidation] = useState<{ width: string | null; height: string | null }>({
    width: null,
    height: null
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter formats based on search query
  const filteredFormats = React.useMemo(() => {
    if (!searchQuery) return formats;
    const query = searchQuery.toLowerCase();
    return formats.filter(format => 
      format.label.toLowerCase().includes(query) ||
      `${format.width}`.includes(query) ||
      `${format.height}`.includes(query)
    );
  }, [formats, searchQuery]);

  // Separate custom and standard formats
  const customFormats = filteredFormats.filter(f => f.isCustom);
  const standardFormats = filteredFormats.filter(f => !f.isCustom);

  // Check if only default formats are selected
  const areOnlyDefaultFormatsSelected = React.useMemo(() => {
    if (!defaultFormats || selectedFormats.length !== defaultFormats.length) return false;
    return selectedFormats.every(format => 
      defaultFormats.some(defaultFormat => 
        defaultFormat.width === format.width && 
        defaultFormat.height === format.height
      )
    );
  }, [selectedFormats, defaultFormats]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setDeletingFormat(null);
        setShowSearch(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const handleCustomFormatAdd = () => {
    if (!onCustomFormat) return;

    // Check if format already exists
    const width = parseInt(customWidth);
    const height = parseInt(customHeight);
    const formatExists = formats.some(f => f.width === width && f.height === height);

    if (formatExists) {
      setValidation({ 
        width: 'Format already exists', 
        height: null 
      });
      return;
    }

    onCustomFormat(customWidth, customHeight, editingFormat);
    setCustomWidth('');
    setCustomHeight('');
    setEditingFormat(null);
    setValidation({ width: null, height: null });
  };

  // Function to select all default formats
  const selectDefaultFormats = () => {
    if (!defaultFormats) return;

    // First, unselect any formats that aren't default formats
    selectedFormats.forEach(format => {
      const isDefault = defaultFormats.some(defaultFormat => 
        defaultFormat.width === format.width && 
        defaultFormat.height === format.height
      );
      if (!isDefault) {
        onFormatToggle(format);
      }
    });

    // Then, select any default formats that aren't already selected
    defaultFormats.forEach(defaultFormat => {
      const matchingFormat = formats.find(format => 
        format.width === defaultFormat.width && 
        format.height === defaultFormat.height
      );
      if (matchingFormat && !selectedFormats.some(f => f.id === matchingFormat.id)) {
        onFormatToggle(matchingFormat);
      }
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <div className="flex items-center justify-between">
          <span className="text-gray-700">
            {selectedFormats.length === 0
              ? `No formats ${mode === 'select' ? 'selected' : 'visible'}`
              : `${selectedFormats.length} format${selectedFormats.length === 1 ? '' : 's'} ${
                  mode === 'select' ? 'selected' : 'visible'
                }`}
          </span>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="sticky top-0 z-10 bg-white border-b p-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex space-x-2 flex-1">
                <FormatInput
                  value={customWidth}
                  onChange={setCustomWidth}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleCustomFormatAdd();
                    }
                  }}
                  placeholder="Width"
                  error={validation.width}
                  autoSelect={true}
                />
                <span className="text-gray-500">×</span>
                <FormatInput
                  value={customHeight}
                  onChange={setCustomHeight}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleCustomFormatAdd();
                    }
                  }}
                  placeholder="Height"
                  error={validation.height}
                  autoSelect={true}
                />
                <button
                  onClick={handleCustomFormatAdd}
                  className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
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
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
            {showSearch && (
              <div className="mt-2">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search formats..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          <div className="max-h-60 overflow-y-auto">
            {customFormats.length > 0 && (
              <div className="py-1">
                <div className="px-4 py-2 flex items-center justify-between border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Custom Formats</span>
                  {onClearCustom && (
                    <button
                      onClick={() => {
                        if (deletingFormat === 'clear_all') {
                          onClearCustom();
                          setDeletingFormat(null);
                        } else {
                          setDeletingFormat('clear_all');
                        }
                      }}
                      className={`text-sm font-medium ${
                        deletingFormat === 'clear_all'
                          ? 'text-red-600'
                          : 'text-gray-600 hover:text-gray-700'
                      }`}
                    >
                      {deletingFormat === 'clear_all' ? 'Click to confirm' : 'Clear All'}
                    </button>
                  )}
                </div>
                {customFormats.map((format) => (
                  <FormatListItem
                    key={format.id}
                    format={format}
                    isSelected={selectedFormats.some(f => f.id === format.id)}
                    onToggle={() => onFormatToggle(format)}
                    onEdit={() => {
                      setEditingFormat(format);
                      setCustomWidth(format.width.toString());
                      setCustomHeight(format.height.toString());
                      setDeletingFormat(null);
                      setValidation({ width: null, height: null });
                    }}
                    onDelete={() => {
                      if (deletingFormat === format.id && onDeleteFormat) {
                        onDeleteFormat(format);
                        setDeletingFormat(null);
                      } else {
                        setDeletingFormat(format.id);
                        setEditingFormat(null);
                      }
                    }}
                    isDeleting={deletingFormat === format.id}
                  />
                ))}
              </div>
            )}
            <div className="py-1">
              <div className="px-4 py-2 flex items-center justify-between border-b border-gray-200">
                <span className="text-sm font-medium text-gray-700">Native Formats</span>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={selectDefaultFormats}
                    disabled={areOnlyDefaultFormatsSelected}
                    className={`text-sm font-medium ${
                      areOnlyDefaultFormatsSelected
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    Select 15 native formats
                  </button>
                  <button
                    onClick={() => formats.forEach(format => {
                      if (!selectedFormats.some(f => f.id === format.id)) {
                        onFormatToggle(format);
                      }
                    })}
                    disabled={formats.length === selectedFormats.length}
                    className={`text-sm font-medium ${
                      formats.length === selectedFormats.length
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    Show All
                  </button>
                  <button
                    onClick={() => [...selectedFormats].forEach(format => onFormatToggle(format))}
                    disabled={selectedFormats.length === 0}
                    className={`text-sm font-medium ${
                      selectedFormats.length === 0
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-600 hover:text-gray-700'
                    }`}
                  >
                    Hide All
                  </button>
                </div>
              </div>
              {standardFormats.map((format) => (
                <FormatListItem
                  key={format.id}
                  format={format}
                  isSelected={selectedFormats.some(f => f.id === format.id)}
                  onToggle={() => onFormatToggle(format)}
                  isDeleting={false}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedFormats.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedFormats.map((format) => (
            <div
              key={format.id}
              className="inline-flex items-center bg-blue-50 text-blue-700 text-sm font-medium rounded-full"
            >
              <span className="px-3 py-1">{format.label}</span>
              <button
                onClick={() => onFormatToggle(format)}
                className="h-full px-2 hover:bg-blue-100 rounded-r-full transition-colors flex items-center"
                aria-label={`Remove ${format.label} format`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormatDropdown;