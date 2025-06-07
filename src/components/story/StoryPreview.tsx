import React from 'react';

interface StoryPreviewProps {
  title: string;
  content: string;
  showRules?: boolean;
}

const StoryPreview: React.FC<StoryPreviewProps> = ({ title, content, showRules = false }) => {
  return (
    <div className="prose max-w-none">
      {title && <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>}
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        {content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-4 last:mb-0 text-gray-700">
            {paragraph}
          </p>
        ))}
      </div>
      
      {showRules && (
        <div className="mt-6 border-t pt-4">
          <h4 className="text-sm font-semibold mb-2 text-gray-700">STAR Method Tips</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• <strong>Situation:</strong> Set the context by describing the specific challenge or opportunity</li>
            <li>• <strong>Task:</strong> Explain your responsibility in that situation</li>
            <li>• <strong>Action:</strong> Detail the steps you took to address the situation</li>
            <li>• <strong>Result:</strong> Share the outcomes of your actions, using specific metrics when possible</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default StoryPreview;