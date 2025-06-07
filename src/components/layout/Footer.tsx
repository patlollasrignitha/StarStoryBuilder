import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">STAR Story Builder</h3>
            <p className="text-gray-300 text-sm">
              An AI-powered tool to help you create compelling STAR format stories for job interviews.
              Perfect your interview responses and stand out from the competition.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link to="/" className="hover:text-indigo-300 transition-colors">Home</Link></li>
              <li><Link to="/builder" className="hover:text-indigo-300 transition-colors">Story Builder</Link></li>
              <li><Link to="/saved" className="hover:text-indigo-300 transition-colors">My Stories</Link></li>
              
              <li><Link to="/terms" className="hover:text-indigo-300 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://github.com/star-story-builder" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://twitter.com/starstoryapp" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com/company/star-story-builder" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
            <p className="text-gray-300 text-sm">
              Subscribe to our newsletter for updates and interview tips
            </p>
            <div className="mt-2 flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="py-1 px-3 rounded-l-md text-black text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded-r-md text-sm transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-gray-400 text-center">
          <p>© {new Date().getFullYear()} STAR Story Builder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;