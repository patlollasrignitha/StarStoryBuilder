import { query } from './database';
import { User } from '../types';

// Simple authentication functions for PostgreSQL
export const signUp = async (email: string, password: string): Promise<User> => {
  // In a real app, you'd hash the password
  const hashedPassword = btoa(password); // Simple base64 encoding (NOT secure for production)
  
  const result = await query(
    'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at',
    [email, hashedPassword]
  );
  
  return {
    id: result.rows[0].id,
    email: result.rows[0].email,
    created_at: new Date(result.rows[0].created_at)
  };
};

export const signIn = async (email: string, password: string): Promise<User> => {
  const hashedPassword = btoa(password);
  
  const result = await query(
    'SELECT id, email, created_at FROM users WHERE email = $1 AND password_hash = $2',
    [email, hashedPassword]
  );
  
  if (result.rows.length === 0) {
    throw new Error('Invalid email or password');
  }
  
  return {
    id: result.rows[0].id,
    email: result.rows[0].email,
    created_at: new Date(result.rows[0].created_at)
  };
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