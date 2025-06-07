import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, CheckCircle, FileText, Download } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-900 to-purple-800 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Create Perfect STAR Interview Stories with AI
          </h1>
          <p className="text-xl mb-10 max-w-3xl mx-auto text-indigo-100">
            Prepare compelling Situation, Task, Action, Result stories that impress interviewers and showcase your achievements.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate('/builder')}
              className="bg-white text-indigo-900 font-medium px-8 py-3 rounded-lg hover:bg-indigo-100 transition-colors duration-300 flex items-center justify-center"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Create Your Story
            </button>
            <button 
              onClick={() => navigate('/saved')}
              className="bg-transparent border-2 border-white text-white font-medium px-8 py-3 rounded-lg hover:bg-white/10 transition-colors duration-300 flex items-center justify-center"
            >
              <FileText className="h-5 w-5 mr-2" />
              View Saved Stories
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-indigo-800 font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Input Your Experience</h3>
              <p className="text-gray-600">
                Choose a role template and fill in the details of your situation, task, action, and result.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-indigo-800 font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Generate STAR Story</h3>
              <p className="text-gray-600">
                Our AI technology transforms your inputs into a cohesive, professional STAR format story.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-indigo-800 font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Save & Export</h3>
              <p className="text-gray-600">
                Save your stories, edit them anytime, and export as PDF or CSV for interview preparation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Key Features</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard 
              icon={<Sparkles className="h-6 w-6 text-indigo-600" />}
              title="AI-Powered Generation"
              description="Our intelligent algorithms craft polished STAR stories based on your input, ensuring professional quality responses."
            />
            
            <FeatureCard 
              icon={<FileText className="h-6 w-6 text-indigo-600" />}
              title="Role-Specific Templates"
              description="Choose from templates tailored to different job roles with guided prompts to showcase relevant skills."
            />
            
            <FeatureCard 
              icon={<CheckCircle className="h-6 w-6 text-indigo-600" />}
              title="Feedback & Suggestions"
              description="Receive instant feedback and suggestions to enhance your stories and make them more impactful."
            />
            
            <FeatureCard 
              icon={<Download className="h-6 w-6 text-indigo-600" />}
              title="Multiple Export Options"
              description="Export your stories in PDF or CSV format for easy sharing, printing, or inclusion in your interview preparation materials."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-indigo-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Ace Your Next Interview?</h2>
          <p className="text-xl mb-8 text-indigo-100">
            Start creating professional STAR stories that showcase your achievements and skills.
          </p>
          <button 
            onClick={() => navigate('/builder')}
            className="bg-white text-indigo-900 font-medium px-8 py-3 rounded-lg hover:bg-indigo-100 transition-colors duration-300"
          >
            Build Your First Story
          </button>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="mr-4 mt-1">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default HomePage;