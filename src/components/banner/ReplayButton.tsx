import React from 'react';
import { RotateCw } from 'lucide-react';

interface ReplayButtonProps {
  onReplay: () => void;
}

const ReplayButton: React.FC<ReplayButtonProps> = ({ onReplay }) => {
  return (
    <button
      onClick={onReplay}
      className="p-1.5 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
      title="Replay banner"
    >
      <RotateCw className="w-4 h-4" />
    </button>
  );
}

export default ReplayButton;