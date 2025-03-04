import React from 'react';

const WelcomeHeader: React.FC = () => {
  return (
    <div className="pb-4 border-b border-gray-200">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600">HTML5 Banner Viewer</h1>
      <p className="mt-2 text-sm sm:text-base text-gray-500">Upload your HTML5 banner ZIP file to preview it in different formats</p>
    </div>
  );
};

export default WelcomeHeader;