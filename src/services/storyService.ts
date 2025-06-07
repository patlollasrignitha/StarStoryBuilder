import { GenerateStoryRequest, RoleTemplate, Story, StoryDraft } from '../types';
import { query } from '../lib/database';

// Simulated AI response generation - would be replaced by actual API calls in a real implementation
export const generateStory = async (request: GenerateStoryRequest): Promise<string> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const { role, situation, task, action, result } = request;
  
  // Generate a concise, enhanced single-paragraph story
  return `As a ${role}, I faced ${situation.toLowerCase()}. I was responsible for ${task.toLowerCase()}. I ${action.toLowerCase()}, which resulted in ${result.toLowerCase()}. This experience demonstrated my problem-solving skills and ability to deliver results under pressure.`;
};

// Database operations for stories
export const saveStoryToDatabase = async (storyDraft: StoryDraft, userId: string): Promise<Story> => {
  const fullStory = await generateStory({
    role: storyDraft.role,
    situation: storyDraft.situation,
    task: storyDraft.task,
    action: storyDraft.action,
    result: storyDraft.result
  });

  const result = await query(
    `INSERT INTO stories (user_id, title, role, situation, task, action, result, full_story) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
     RETURNING *`,
    [userId, storyDraft.title, storyDraft.role, storyDraft.situation, storyDraft.task, storyDraft.action, storyDraft.result, fullStory]
  );

  const data = result.rows[0];
  return {
    id: data.id,
    user_id: data.user_id,
    title: data.title,
    role: data.role,
    situation: data.situation,
    task: data.task,
    action: data.action,
    result: data.result,
    full_story: data.full_story,
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at)
  };
};

export const getUserStories = async (userId: string): Promise<Story[]> => {
  const result = await query(
    'SELECT * FROM stories WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );

  return result.rows.map(story => ({
    id: story.id,
    user_id: story.user_id,
    title: story.title,
    role: story.role,
    situation: story.situation,
    task: story.task,
    action: story.action,
    result: story.result,
    full_story: story.full_story,
    created_at: new Date(story.created_at),
    updated_at: new Date(story.updated_at)
  }));
};

export const updateStoryInDatabase = async (storyId: string, storyDraft: StoryDraft, userId: string): Promise<Story> => {
  const fullStory = await generateStory({
    role: storyDraft.role,
    situation: storyDraft.situation,
    task: storyDraft.task,
    action: storyDraft.action,
    result: storyDraft.result
  });

  const result = await query(
    `UPDATE stories 
     SET title = $1, role = $2, situation = $3, task = $4, action = $5, result = $6, full_story = $7, updated_at = NOW()
     WHERE id = $8 AND user_id = $9 
     RETURNING *`,
    [storyDraft.title, storyDraft.role, storyDraft.situation, storyDraft.task, storyDraft.action, storyDraft.result, fullStory, storyId, userId]
  );

  if (result.rows.length === 0) {
    throw new Error('Story not found or unauthorized');
  }

  const data = result.rows[0];
  return {
    id: data.id,
    user_id: data.user_id,
    title: data.title,
    role: data.role,
    situation: data.situation,
    task: data.task,
    action: data.action,
    result: data.result,
    full_story: data.full_story,
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at)
  };
};

export const deleteStoryFromDatabase = async (storyId: string, userId: string): Promise<void> => {
  const result = await query(
    'DELETE FROM stories WHERE id = $1 AND user_id = $2',
    [storyId, userId]
  );

  if (result.rowCount === 0) {
    throw new Error('Story not found or unauthorized');
  }
};

// Predefined role templates for guidance
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

// Export functionality (simulated)
export const exportToPdf = async (story: Story): Promise<void> => {
  console.log('Exporting to PDF:', story);
  // In a real implementation, this would call a backend service to generate a PDF
  alert('PDF export functionality would be implemented in the actual product');
};

export const exportToCsv = async (stories: Story[]): Promise<void> => {
  console.log('Exporting to CSV:', stories);
  // In a real implementation, this would generate a CSV file
  alert('CSV export functionality would be implemented in the actual product');
};