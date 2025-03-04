import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-8 pb-4 border-b border-gray-200">
          Privacy Policy
        </h1>
        
        <div className="prose prose-blue max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information Collection</h2>
            <p className="text-gray-600 mb-4">
              We collect information when you:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Create an account or sign in using Google authentication</li>
              <li>Upload and preview HTML5 banners</li>
              <li>Interact with our services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Use of Information</h2>
            <p className="text-gray-600 mb-4">
              Your information helps us to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Provide and improve our banner preview service</li>
              <li>Personalize your experience</li>
              <li>Communicate with you about service updates</li>
              <li>Protect against misuse of our platform</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Data Protection</h2>
            <p className="text-gray-600 mb-4">
              We implement industry-standard security measures to protect your data:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Secure data transmission using SSL/TLS encryption</li>
              <li>Regular security assessments and updates</li>
              <li>Limited access to personal information by authorized personnel</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Third-Party Services</h2>
            <p className="text-gray-600 mb-4">
              We use trusted third-party services for:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Google Authentication for secure sign-in</li>
              <li>Cloud storage and processing</li>
              <li>Analytics to improve our service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Contact Information</h2>
            <p className="text-gray-600">
              For privacy-related questions or concerns, please contact us at:{' '}
              <a href="mailto:ameur.j@gmail.com" className="text-blue-600 hover:text-blue-700">
                ameur.j@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;