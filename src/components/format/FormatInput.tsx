import React, { useRef, useEffect } from 'react';

interface FormatInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  error: string | null;
  autoSelect?: boolean;
}

const FormatInput: React.FC<FormatInputProps> = ({
  value,
  onChange,
  onKeyPress,
  placeholder,
  error,
  autoSelect = false
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isInitialFocus = useRef(true);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (isInitialFocus.current && value) {
      e.target.select();
      isInitialFocus.current = false;
    }
  };

  const handleBlur = () => {
    isInitialFocus.current = true;
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`w-24 px-2 py-1 border rounded ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && (
        <div className="absolute left-0 top-full mt-1 text-xs text-red-500">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormatInput;