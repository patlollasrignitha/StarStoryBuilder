import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back
      </button>

      <h1 className="text-3xl font-bold mb-8 text-gray-800">Privacy Policy</h1>

      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Introduction</h2>
          <p className="text-gray-600">
            At STAR Story Builder, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Information We Collect</h2>
          <p className="text-gray-600 mb-4">
            We collect information that you voluntarily provide to us when you:
          </p>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Create and save STAR stories</li>
            <li>Subscribe to our newsletter</li>
            <li>Contact us through our website</li>
            <li>Provide feedback or respond to surveys</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">How We Use Your Information</h2>
          <p className="text-gray-600 mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Provide and maintain our services</li>
            <li>Improve our website and user experience</li>
            <li>Send you updates and newsletters (if subscribed)</li>
            <li>Respond to your inquiries and support requests</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Data Security</h2>
          <p className="text-gray-600">
            We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Rights</h2>
          <p className="text-gray-600 mb-4">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Us</h2>
          <p className="text-gray-600">
            If you have questions about this Privacy Policy, please contact us at privacy@starstorybuilder.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;