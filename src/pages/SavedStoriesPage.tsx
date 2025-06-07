import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Edit, Trash2, Download, LogIn } from 'lucide-react';
import { useStories } from '../context/StoryContext';
import { useAuth } from '../context/AuthContext';
import { Story } from '../types';
import { exportToPdf, exportToCsv } from '../services/storyService';
import StoryPreview from '../components/story/StoryPreview';

const SavedStoriesPage: React.FC = () => {
  const navigate = useNavigate();
  const { stories, deleteStory } = useStories();
  const { user } = useAuth();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [showExportOptions, setShowExportOptions] = useState(false);

  // If user is not authenticated, show login prompt
  if (!user) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </button>
        
        <div className="bg-white rounded-lg shadow-md p-10 text-center">
          <LogIn className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Sign In Required</h2>
          <p className="text-gray-500 mb-6">
            Please sign in to view your saved stories. Your stories are securely stored and accessible from any device.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            Go to Home Page
          </button>
        </div>
      </div>
    );
  }

  const handleSelectStory = (story: Story) => {
    setSelectedStory(story);
    setShowExportOptions(false); // Close export options when switching stories
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      deleteStory(id);
      if (selectedStory?.id === id) {
        setSelectedStory(null);
      }
    }
  };

  const handleExportPdf = async () => {
    if (!selectedStory) return;
    await exportToPdf(selectedStory);
  };

  const handleExportAllCsv = async () => {
    await exportToCsv(stories);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back
      </button>
      
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Saved Stories</h1>
      
      {stories.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-10 text-center">
          <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold mb-2 text-gray-700">No Stories Yet</h2>
          <p className="text-gray-500 mb-6">
            You haven't created any STAR stories yet. Create your first story to prepare for your interviews!
          </p>
          <button 
            onClick={() => navigate('/builder')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            Create Your First Story
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Story List */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-gray-700">Your Stories</h2>
                  <button 
                    onClick={handleExportAllCsv}
                    className="text-xs flex items-center text-indigo-600 hover:text-indigo-800"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Export All (CSV)
                  </button>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                {stories.map(story => (
                  <button
                    key={story.id}
                    onClick={() => handleSelectStory(story)}
                    className={`w-full px-4 py-3 text-left transition-colors hover:bg-indigo-50
                      ${selectedStory?.id === story.id ? 'bg-indigo-50 border-l-4 border-indigo-500' : ''}`}
                  >
                    <div className="font-medium text-gray-800 truncate">{story.title}</div>
                    <div className="text-xs text-gray-500">
                      Role: {story.role} · {new Date(story.updated_at).toLocaleDateString()}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Story View */}
          <div className="md:col-span-2">
            {selectedStory ? (
              <div className="bg-white rounded-lg shadow-md">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">{selectedStory.title}</h2>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setShowExportOptions(!showExportOptions)}
                        className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                      >
                        <Download className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => navigate(`/builder?edit=${selectedStory.id}`)}
                        className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(selectedStory.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Basic Info */}
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {selectedStory.role}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Created: {new Date(selectedStory.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {/* Export Options Dropdown */}
                  {showExportOptions && (
                    <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        <button
                          onClick={handleExportPdf}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          role="menuitem"
                        >
                          Export as PDF
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <StoryPreview 
                    title=""
                    content={selectedStory.full_story} 
                    showRules={true}
                  />
                </div>
                
                <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Story Components</h3>
                  <div className="space-y-3">
                    <DetailItem label="Situation" content={selectedStory.situation} />
                    <DetailItem label="Task" content={selectedStory.task} />
                    <DetailItem label="Action" content={selectedStory.action} />
                    <DetailItem label="Result" content={selectedStory.result} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-10 text-center h-full flex flex-col items-center justify-center">
                <FileText className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Select a Story</h3>
                <p className="text-gray-500">
                  Click on a story from the list to view its details
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface DetailItemProps {
  label: string;
  content: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, content }) => {
  return (
    <div>
      <div className="text-xs font-medium text-gray-500 uppercase">{label}</div>
      <div className="text-sm text-gray-700 mt-1">{content}</div>
    </div>
  );
};

export default SavedStoriesPage;