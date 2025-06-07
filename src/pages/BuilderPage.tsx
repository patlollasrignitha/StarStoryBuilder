import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Save, Sparkles, ArrowLeft, RotateCcw, LogIn } from 'lucide-react';
import { useStories } from '../context/StoryContext';
import { useAuth } from '../context/AuthContext';
import { RoleTemplate, StoryDraft } from '../types';
import { getRoleTemplates, generateStory } from '../services/storyService';
import StoryPreview from '../components/story/StoryPreview';

const BuilderPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addStory, updateStory, getStory, loading } = useStories();
  const { user } = useAuth();
  const [roleTemplates, setRoleTemplates] = useState<RoleTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<RoleTemplate | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStory, setGeneratedStory] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<StoryDraft>({
    title: '',
    role: '',
    situation: '',
    task: '',
    action: '',
    result: ''
  });

  // Load role templates
  useEffect(() => {
    const templates = getRoleTemplates();
    setRoleTemplates(templates);
  }, []);

  // Check if we're editing an existing story
  useEffect(() => {
    const editId = searchParams.get('edit');
    if (editId && user) {
      const existingStory = getStory(editId);
      if (existingStory) {
        setIsEditing(true);
        setEditingStoryId(editId);
        setFormData({
          title: existingStory.title,
          role: existingStory.role,
          situation: existingStory.situation,
          task: existingStory.task,
          action: existingStory.action,
          result: existingStory.result
        });
        setGeneratedStory(existingStory.full_story);
        
        // Set the template if it matches
        const matchingTemplate = templates.find(t => t.name === existingStory.role);
        if (matchingTemplate) {
          setSelectedTemplate(matchingTemplate);
        }
      }
    }
  }, [searchParams, getStory, user]);

  const handleTemplateSelect = (template: RoleTemplate) => {
    setSelectedTemplate(template);
    setFormData(prev => ({
      ...prev,
      role: template.name
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.role || !formData.situation || !formData.task || !formData.action || !formData.result) {
      alert('Please fill out all fields');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const story = await generateStory({
        role: formData.role,
        situation: formData.situation,
        task: formData.task,
        action: formData.action,
        result: formData.result
      });
      
      setGeneratedStory(story);
    } catch (error) {
      console.error('Failed to generate story:', error);
      alert('Failed to generate story. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!user) {
      alert('Please sign in to save your story');
      return;
    }
    
    if (!formData.title) {
      alert('Please provide a title for your story');
      return;
    }
    
    if (!generatedStory) {
      alert('Please generate a story first');
      return;
    }
    
    try {
      if (isEditing && editingStoryId) {
        await updateStory(editingStoryId, formData);
      } else {
        await addStory(formData);
      }
      navigate('/saved');
    } catch (error) {
      console.error('Failed to save story:', error);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      role: selectedTemplate ? selectedTemplate.name : '',
      situation: '',
      task: '',
      action: '',
      result: ''
    });
    setGeneratedStory('');
    setIsEditing(false);
    setEditingStoryId(null);
    navigate('/builder', { replace: true });
  };

  // Show sign-in prompt if user is not authenticated
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
            Please sign in to create and save your STAR stories. Your stories will be securely stored and accessible from any device.
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back
      </button>
      
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {isEditing ? 'Edit Your STAR Story' : 'Create Your STAR Story'}
      </h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Story Details</h2>
          
          {/* Role Templates */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select a Role Template
            </label>
            <div className="grid grid-cols-2 gap-2">
              {roleTemplates.map(template => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className={`text-sm p-2 rounded border transition-colors text-left
                    ${selectedTemplate?.id === template.id
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 hover:border-indigo-300 hover:bg-indigo-50'
                    }`}
                >
                  <div className="font-medium">{template.name}</div>
                  <div className="text-xs text-gray-500 truncate">{template.description}</div>
                </button>
              ))}
            </div>
          </div>
          
          <form onSubmit={handleGenerate}>
            {/* Title */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Story Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="E.g., Resolving a Critical Bug in Production"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            {/* Role */}
            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Your Role
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="E.g., Software Developer, Project Manager"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            {/* Situation */}
            <div className="mb-4">
              <label htmlFor="situation" className="block text-sm font-medium text-gray-700 mb-1">
                Situation
                {selectedTemplate && (
                  <span className="text-xs text-gray-500 ml-1">
                    ({selectedTemplate.situationPrompt})
                  </span>
                )}
              </label>
              <textarea
                id="situation"
                name="situation"
                value={formData.situation}
                onChange={handleChange}
                rows={3}
                placeholder="Describe the situation you faced..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            {/* Task */}
            <div className="mb-4">
              <label htmlFor="task" className="block text-sm font-medium text-gray-700 mb-1">
                Task
                {selectedTemplate && (
                  <span className="text-xs text-gray-500 ml-1">
                    ({selectedTemplate.taskPrompt})
                  </span>
                )}
              </label>
              <textarea
                id="task"
                name="task"
                value={formData.task}
                onChange={handleChange}
                rows={3}
                placeholder="What were you specifically responsible for?"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            {/* Action */}
            <div className="mb-4">
              <label htmlFor="action" className="block text-sm font-medium text-gray-700 mb-1">
                Action
                {selectedTemplate && (
                  <span className="text-xs text-gray-500 ml-1">
                    ({selectedTemplate.actionPrompt})
                  </span>
                )}
              </label>
              <textarea
                id="action"
                name="action"
                value={formData.action}
                onChange={handleChange}
                rows={3}
                placeholder="What steps did you take to address the situation?"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            {/* Result */}
            <div className="mb-6">
              <label htmlFor="result" className="block text-sm font-medium text-gray-700 mb-1">
                Result
                {selectedTemplate && (
                  <span className="text-xs text-gray-500 ml-1">
                    ({selectedTemplate.resultPrompt})
                  </span>
                )}
              </label>
              <textarea
                id="result"
                name="result"
                value={formData.result}
                onChange={handleChange}
                rows={3}
                placeholder="What was the outcome of your actions?"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isGenerating}
                className={`flex items-center justify-center px-4 py-2 rounded-md text-white font-medium
                  ${isGenerating 
                    ? 'bg-indigo-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700'} 
                  transition-colors`}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                {isGenerating ? 'Generating...' : 'Generate Story'}
              </button>
              
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </button>
            </div>
          </form>
        </div>
        
        {/* Preview Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Story Preview</h2>
            {generatedStory && (
              <button
                onClick={handleSave}
                disabled={loading || !formData.title}
                className={`flex items-center px-4 py-2 rounded-md text-white font-medium 
                  ${loading || !formData.title
                    ? 'bg-green-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700'} 
                  transition-colors`}
              >
                <Save className="h-5 w-5 mr-2" />
                {loading ? 'Saving...' : isEditing ? 'Update Story' : 'Save Story'}
              </button>
            )}
          </div>
          
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
              <p>Generating your story...</p>
            </div>
          ) : generatedStory ? (
            <StoryPreview
              title={formData.title || 'Untitled Story'}
              content={generatedStory}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg p-6">
              <Sparkles className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-center">
                Your generated STAR story will appear here after you fill out the form and click "Generate Story"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;