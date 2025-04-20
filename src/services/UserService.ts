import { User } from "../models";

const USER_DATA_KEY = 'userData';

export const UserService = {
  // Save user data to localStorage
  saveUserData: (data: User): void => {
    try {
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving user data to localStorage:', error);
    }
  },

  // Load user data from localStorage
  loadUserData: (): User | null => {
    try {
      const data = localStorage.getItem(USER_DATA_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading user data from localStorage:', error);
      return null;
    }
  },

  // Validate user data structure
  isValidUserData: (data: unknown): data is User => {
    return (
      typeof data === 'object' &&
      data !== null &&
      'firstName' in data &&
      'lastName' in data &&
      'email' in data &&
      'phoneNumber' in data
    );
  },

  // Clear user data from localStorage
  clearUserData: (): void => {
    localStorage.removeItem(USER_DATA_KEY);
  }
};