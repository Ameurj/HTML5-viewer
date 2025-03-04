import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 items-center sm:items-start">
            <Link to="/privacy" className="text-sm sm:text-base text-gray-600 hover:text-gray-900">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm sm:text-base text-gray-600 hover:text-gray-900">
              Terms of Service
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <a
              href="mailto:contact@bannerviewer.com"
              className="text-gray-600 hover:text-gray-900"
              aria-label="Contact us via email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-4 text-center text-xs sm:text-sm text-gray-500">
          © {new Date().getFullYear()} Banner Viewer. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;