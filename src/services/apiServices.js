// Base URL for your API
const API_BASE_URL = 'http://192.168.1.11:8080/api/';

// Login function
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}auth/login/normal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    // Parse and return the response data
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error || 'An error occurred during login';
  }
};

// Signup function
export const signup = async (name, email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}auth/signup/normal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password }),
    });

    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    // Parse and return the response data
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    // Handle error response if it exists
    if (error.response) {
      throw error.response.data || 'An error occurred during signup';
    } else {
      console.error('Error object:', error);
      throw 'An error occurred during signup';
    }
  }
};

// Firebase Login function
export const firebaseLogin = async (firebaseToken) => {
  try {
    const response = await fetch(`${API_BASE_URL}auth/login/firebase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firebaseToken }),
    });

    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    // Parse and return the response data
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error || 'An error occurred during Firebase login';
  }
};
