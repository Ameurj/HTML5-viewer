import React, { useEffect, useState } from 'react';
import { Check, Pencil, Trash2 } from 'lucide-react';
import { BannerFormat } from '../../types/banner';
import AnimatedFormat from './AnimatedFormat';

interface FormatListItemProps {
  format: BannerFormat;
  isSelected: boolean;
  onToggle: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isDeleting: boolean;
}

const FormatListItem: React.FC<FormatListItemProps> = ({
  format,
  isSelected,
  onToggle,
  onEdit,
  onDelete,
  isDeleting
}) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [prevLabel, setPrevLabel] = useState(format.label);

  useEffect(() => {
    if (format.label !== prevLabel) {
      setIsUpdated(true);
      setPrevLabel(format.label);
      
      const timer = setTimeout(() => {
        setIsUpdated(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [format.label, prevLabel]);

  return (
    <div
      className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between ${
        isSelected ? 'bg-blue-50' : ''
      }`}
    >
      <button
        onClick={onToggle}
        className="flex-1 text-left"
      >
        <AnimatedFormat label={format.label} isUpdated={isUpdated} />
      </button>
      <div className="flex items-center space-x-2">
        {format.isCustom && onEdit && onDelete && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="p-1 text-gray-500 hover:text-blue-500"
              disabled={isDeleting}
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className={`p-1 flex items-center space-x-1 ${
                isDeleting ? 'text-red-600' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Trash2 className="w-4 h-4" />
              {isDeleting && (
                <span className="text-xs font-medium">Click again to delete</span>
              )}
            </button>
          </>
        )}
        {isSelected && (
          <Check className="w-4 h-4 text-blue-600" />
        )}
      </div>
    </div>
  );
};

export default FormatListItem;