export interface Story {
  id: string;
  user_id?: string;
  title: string;
  role: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  full_story: string;
  created_at: Date;
  updated_at: Date;
}

export type StoryDraft = Omit<Story, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'full_story'> & {
  id?: string;
};

export interface GenerateStoryRequest {
  role: string;
  situation: string;
  task: string;
  action: string;
  result: string;
}

export interface RoleTemplate {
  id: string;
  name: string;
  description: string;
  situationPrompt: string;
  taskPrompt: string;
  actionPrompt: string;
  resultPrompt: string;
}

export interface User {
  id: string;
  email: string;
  created_at: Date;
}