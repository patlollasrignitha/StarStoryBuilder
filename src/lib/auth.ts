import axios from 'axios';
import { User } from '../types';

export const signUp = async (email: string, password: string): Promise<User> => {
  const response = await axios.post('/api/signup', { email, password });
  return response.data;
};

export const signIn = async (email: string, password: string): Promise<User> => {
  const response = await axios.post('/api/signin', { email, password });
  return response.data;
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};

export const setCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('currentUser');
  }
};
