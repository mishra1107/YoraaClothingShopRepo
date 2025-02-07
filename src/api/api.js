import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../constants/config';

export const postRequest = async data => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log('Token lalalal:', token);
    console.log('Data to be sent to the boduyyyyy:', data);

    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || ''}`,
      },
      body: JSON.stringify(data),
    });

    // Check response status before parsing
    console.log('Response Status:', response.status);
    const contentType = response.headers.get('Content-Type');
    console.log('Content-Type:', contentType);

    // Handle non-JSON responses
    if (!response.ok) {
      const errorText = await response.text(); // Read raw response (could be HTML)
      console.error('Non-JSON Response:', errorText);
      throw new Error(`Server returned ${response.status}: ${errorText}`);
    }

    if (contentType && contentType.includes('application/json')) {
      const responseData = await response.json();
      console.log('Raw Response from API:', responseData);
      return responseData;
    } else {
      const errorText = await response.text();
      console.error('Unexpected Response (Not JSON):', errorText);
      throw new Error('Expected JSON but received non-JSON response.');
    }
  } catch (error) {
    console.error('Post Request Error:', error);
    return {
      success: false,
      message: 'Address creation failed',
      errorDetails: error,
    };
  }
};

// export const postRequest = async (endpoint, data) => {
//   try {
//     const token = await AsyncStorage.getItem('token');
//     if (!token) {
//       throw new Error('Token missing, please login again');
//     }

//     console.log(`Sending POST request to: ${BASE_URL}${endpoint}`);
//     console.log('Request Body:', data);

//     const response = await fetch(`${BASE_URL}${endpoint}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(data),
//     });

//     const jsonResponse = await response.json();
//     console.log('API Response:', jsonResponse);
//     return jsonResponse;
//   } catch (error) {
//     console.error('API Error:', error.message);
//     return {success: false, message: error.message || 'Something went wrong!'};
//   }
// };
