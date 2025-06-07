import axios from 'axios';
import { GenerateStoryRequest, RoleTemplate, Story, StoryDraft } from '../types';

// Simulated AI generation
export const generateStory = async (request: GenerateStoryRequest): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  const { role, situation, task, action, result } = request;
  return `As a ${role}, I faced ${situation.toLowerCase()}. I was responsible for ${task.toLowerCase()}. I ${action.toLowerCase()}, which resulted in ${result.toLowerCase()}. This experience demonstrated my problem-solving skills and ability to deliver results under pressure.`;
};

// API-backed DB operations
export const saveStoryToDatabase = async (storyDraft: StoryDraft, userId: string): Promise<Story> => {
  const response = await axios.post('/api/stories', { storyDraft, userId });
  return response.data;
};

export const getUserStories = async (userId: string): Promise<Story[]> => {
  const response = await axios.get(`/api/stories?userId=${userId}`);
  return response.data;
};

export const updateStoryInDatabase = async (storyId: string, storyDraft: StoryDraft, userId: string): Promise<Story> => {
  const response = await axios.put(`/api/stories/${storyId}`, { storyDraft, userId });
  return response.data;
};

export const deleteStoryFromDatabase = async (storyId: string, userId: string): Promise<void> => {
  await axios.delete(`/api/stories/${storyId}`, { data: { userId } });
};

// Role templates
export const getRoleTemplates = (): RoleTemplate[] => {
  return [
    {
      id: '1',
      name: 'Software Developer',
      description: 'For technical roles focusing on programming and software development',
      situationPrompt: 'Describe a challenging technical problem you encountered in a project',
      taskPrompt: 'What was your specific responsibility in addressing this technical challenge?',
      actionPrompt: 'What programming skills, tools, or methodologies did you use to solve the problem?',
      resultPrompt: 'How did your solution impact the project, team, or organization?'
    },
    {
      id: '2',
      name: 'Project Manager',
      description: 'For roles focused on leading projects and coordinating teams',
      situationPrompt: 'Describe a project that faced significant challenges or risks',
      taskPrompt: 'What was your role in managing this project and addressing these challenges?',
      actionPrompt: 'What project management methodologies or leadership approaches did you employ?',
      resultPrompt: 'How did the project conclude, and what metrics showed your success?'
    },
    {
      id: '3',
      name: 'Product Manager',
      description: 'For roles focused on product strategy and development',
      situationPrompt: 'Describe a situation where you identified a product opportunity or challenge',
      taskPrompt: 'What was your responsibility in developing or improving this product?',
      actionPrompt: 'What techniques did you use for gathering requirements and making product decisions?',
      resultPrompt: 'How did your product decisions impact user satisfaction, revenue, or other key metrics?'
    },
    {
      id: '4',
      name: 'Marketing Specialist',
      description: 'For roles focusing on marketing strategies and campaigns',
      situationPrompt: 'Describe a marketing campaign or initiative you worked on',
      taskPrompt: 'What specific marketing objectives were you responsible for achieving?',
      actionPrompt: 'What marketing strategies, channels, or tools did you utilize?',
      resultPrompt: 'What were the quantifiable results of your marketing efforts?'
    }
  ];
};

export const exportToPdf = async (story: Story): Promise<void> => {
  alert('PDF export functionality would be implemented in the actual product');
};

export const exportToCsv = async (stories: Story[]): Promise<void> => {
  alert('CSV export functionality would be implemented in the actual product');
};
