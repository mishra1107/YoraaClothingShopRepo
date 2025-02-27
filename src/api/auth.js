import {postRequest} from './api';
import {BASE_URL, API_ENDPOINTS} from '../constants/config';

// function for signup
export const signupUser = async (name, phNo, password) => {
  try {
    const phoneNumber = String(phNo); // Ensure phNo is a string
   


    const response = await postRequest("https://api.yoraa.in/api/auth/signup", {
      name,
      phNo: phoneNumber,
      password,
    });
   
    return response;
  } catch (error) {
    
    return {success: false, message: 'Signup request failed'};
  }
};

//  Function to Generate OTP
export const generateOTP = async phNo => {
  try {
    const phoneNumber = String(phNo); // Ensure phNo is a string
 

    const response = await postRequest(API_ENDPOINTS.GENERATE_OTP, {
      phNo: phoneNumber,
    });
  
    return response;
  } catch (error) {
    console.error('Generate OTP Error:', error);
    return {success: false, message: 'OTP generation failed'};
  }
};

//  Function to Verify OTP
export const verifyOTP = async (phNo, otpCode) => {
  try {
    const phoneNumber = String(phNo); // Ensure phNo is a string
    const otpString = String(otpCode); // Ensure OTP is a string
  
    const response = await postRequest(API_ENDPOINTS.VERIFY_OTP, {
      phNo: phoneNumber,
      otp: otpString,
    });
    
    return response;
  } catch (error) {
    console.error('Verify OTP Error:', error);
    return {success: false, message: 'OTP verification failed'};
  }
};

//  Function to Resend OTP
export const resendOTP = async phNo => {
  try {
    const phoneNumber = String(phNo); // Ensure phNo is a string
   
    const response = await postRequest(API_ENDPOINTS.GENERATE_OTP, {
      phNo: phoneNumber,
    });
   
    return response;
  } catch (error) {
    console.error('Resend OTP Error:', error);
    return {success: false, message: 'Failed to resend OTP'};
  }
};

//  Function for User Login
export const loginUser = async (phNo, password) => {
  try {
    const phoneNumber = String(phNo); // Ensure phNo is a string
    

    const response = await postRequest(API_ENDPOINTS.LOGIN, {
      phNo: phoneNumber,
      password,
    });
   
    return response;
  } catch (error) {
    console.error('Login Error:', error);
    return {success: false, message: 'Login request failed'};
  }
};


export const createAddress = async (addressData) => {
  try {
    const response = await postRequest(`${BASE_URL}/address/createAddress`, {
      ...addressData,
      type: 'new',  // API expects this
      country: 'USA',  // Hardcoded country as per your request
    });
   
    return response;
  } catch (error) {
    console.error('Create Address Error:', error);
    return { success: false, message: 'Address creation failed' };
  }
};
