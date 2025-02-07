import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../constants/config';

export const postRequest = async (url, data) => {
  try {
    const token = await AsyncStorage.getItem('token');
console.log("data",data)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || ''}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server returned ${response.status}: ${errorText}`);
    }

    const contentType = response.headers.get('Content-Type');

    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      throw new Error('Expected JSON but received non-JSON response.');
    }
  } catch (error) {
    console.error('Post Request Error:', error);
    return {
      success: false,
      message: 'Request failed',
      errorDetails: error.message,
    };
  }
};



