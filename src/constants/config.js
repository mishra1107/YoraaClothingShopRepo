export const BASE_URL='https://api.yoraa.in/api';
export const API_ENDPOINTS = {
  SIGNUP: '/auth/signup',
  LOGIN: '/auth/login',
  VERIFY_OTP: '/auth/verify-otp',
  GENERATE_OTP: '/auth/generate-otp',
  ADD_WISHLIST: '/wishlist/add',
  GET_WISHLIST: '/wishlist',
  REMOVE_WISHLIST: '/wishlist/remove',
  REMOVE_ALL_WISHLIST: '/wishlist/clear',
  ADD_CART: '/cart',
  UPDATE_CART: '/cart',
  REMOVE_CART: '/cart',
  GET_CART: '/cart/user',
  CREATE_ADDRESS: '/address/createAddress',
  FIREBASE_SIGNUP: '/auth/signup/firebase',  
};
export const getApiUrl = (endpoint) => `${BASE_URL}${endpoint}`;