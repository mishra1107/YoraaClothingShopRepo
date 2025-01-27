// src/utils/api.js

import axios from 'axios';
import { API_CONFIG } from './constants'; // Import baseURL and timeout from constants

// Create an Axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  async (config) => {
    // Add an authorization token, if available
    const token = await getAuthToken(); // Replace with actual token retrieval logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

// Helper function to get the authentication token (Example: from AsyncStorage)
const getAuthToken = async () => {
  try {
    // Replace with your logic to get the token
    return null; // Example: await AsyncStorage.getItem('authToken');
  } catch (error) {
    console.error('Error retrieving auth token:', error);
    return null;
  }
};

// Export the API client for use across the app
export default apiClient;
