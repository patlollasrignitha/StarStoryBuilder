import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Story, StoryDraft } from '../types';
import { saveStoryToDatabase, getUserStories, updateStoryInDatabase, deleteStoryFromDatabase } from '../services/storyService';
import { useAuth } from './AuthContext';

interface StoryContextType {
  stories: Story[];
  loading: boolean;
  addStory: (story: StoryDraft) => Promise<Story>;
  updateStory: (id: string, updatedStory: StoryDraft) => Promise<Story>;
  deleteStory: (id: string) => void;
  getStory: (id: string) => Story | undefined;
  refreshStories: () => Promise<void>;
}

const StoryContext = createContext<StoryContextType | undefined>(undefined);

export const useStories = () => {
  const context = useContext(StoryContext);
  if (context === undefined) {
    throw new Error('useStories must be used within a StoryProvider');
  }
  return context;
};

export const StoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Load stories from database when user changes
  useEffect(() => {
    if (user) {
      refreshStories();
    } else {
      setStories([]);
    }
  }, [user]);

  const refreshStories = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const userStories = await getUserStories(user.id);
      setStories(userStories);
    } catch (error) {
      console.error('Failed to load stories:', error);
      toast.error('Failed to load stories');
    } finally {
      setLoading(false);
    }
  };

  const addStory = async (storyDraft: StoryDraft): Promise<Story> => {
    if (!user) {
      throw new Error('User must be authenticated to save stories');
    }

    setLoading(true);
    try {
      const newStory = await saveStoryToDatabase(storyDraft, user.id);
      setStories(prevStories => [newStory, ...prevStories]);
      toast.success('Story saved successfully!');
      return newStory;
    } catch (error) {
      console.error('Failed to add story:', error);
      toast.error('Failed to save story');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateStory = async (id: string, updatedStoryDraft: StoryDraft): Promise<Story> => {
    if (!user) {
      throw new Error('User must be authenticated to update stories');
    }

    setLoading(true);
    try {
      const updatedStory = await updateStoryInDatabase(id, updatedStoryDraft, user.id);
      setStories(prevStories => 
        prevStories.map(story => story.id === id ? updatedStory : story)
      );
      toast.success('Story updated successfully!');
      return updatedStory;
    } catch (error) {
      console.error('Failed to update story:', error);
      toast.error('Failed to update story');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteStory = async (id: string) => {
    if (!user) {
      throw new Error('User must be authenticated to delete stories');
    }

    try {
      await deleteStoryFromDatabase(id, user.id);
      setStories(prevStories => prevStories.filter(story => story.id !== id));
      toast.success('Story deleted');
    } catch (error) {
      console.error('Failed to delete story:', error);
      toast.error('Failed to delete story');
    }
  };

  const getStory = (id: string) => {
    return stories.find(story => story.id === id);
  };

  return (
    <StoryContext.Provider value={{ 
      stories, 
      loading, 
      addStory, 
      updateStory, 
      deleteStory, 
      getStory,
      refreshStories
    }}>
      {children}
    </StoryContext.Provider>
  );
};