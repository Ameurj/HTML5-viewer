import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-8 pb-4 border-b border-gray-200">
          Terms of Service
        </h1>
        
        <div className="prose prose-blue max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Service Agreement</h2>
            <p className="text-gray-600 mb-4">
              By using Banner Viewer, you agree to these terms. We reserve the right to modify
              these terms at any time, with changes effective upon posting to the site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Account Terms</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>You must provide accurate information when creating an account</li>
              <li>You are responsible for maintaining account security</li>
              <li>You must notify us of any unauthorized account use</li>
              <li>We may terminate accounts that violate our policies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Acceptable Use</h2>
            <p className="text-gray-600 mb-4">
              When using our service, you agree not to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Upload malicious or harmful content</li>
              <li>Violate intellectual property rights</li>
              <li>Attempt to breach our security measures</li>
              <li>Use the service for any illegal purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Service Limitations</h2>
            <p className="text-gray-600 mb-4">
              We strive to maintain high availability but:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Services may be interrupted for maintenance</li>
              <li>We may modify or discontinue features</li>
              <li>We're not responsible for third-party service interruptions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Contact Us</h2>
            <p className="text-gray-600">
              For questions about these terms, please contact:{' '}
              <a href="mailto:legal@bannerviewer.com" className="text-blue-600 hover:text-blue-700">
                legal@bannerviewer.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;