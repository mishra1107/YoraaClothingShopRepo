
import { postRequest } from "./api";
import { API_ENDPOINTS } from "../constants/config";

//  Function for User Signup
export const signupUser = async (name, phNo, password) => {
  try {
    console.log("Signing up user with:", { name, phNo, password }); 
    const response = await postRequest(API_ENDPOINTS.SIGNUP, { name, phNo, password });
    console.log("Signup Response:", response);
    return response;
  } catch (error) {
    console.error("Signup Error:", error);
    return { success: false, message: "Signup request failed" };
  }
};

//  Function to Generate OTP
export const generateOTP = async (phNo) => {
    try {
      console.log("Generating OTP for:", phNo);
      const response = await postRequest(API_ENDPOINTS.GENERATE_OTP, { phNo });
      console.log("Generate OTP Response:", response);
      return response;
    } catch (error) {
      console.error("Generate OTP Error:", error);
      return { success: false, message: "OTP generation failed" };
    }
};

//  Function to Verify OTP
export const verifyOTP = async (phNo, otpCode) => {
    try {
        console.log("Verifying OTP for:", phNo, "with OTP:", otpCode);
        const response = await postRequest(API_ENDPOINTS.VERIFY_OTP, { phNo, otpCode });
        console.log("Verify OTP Response:", response);
        return response;
    } catch (error) {
        console.error("Verify OTP Error:", error);
        return { success: false, message: "OTP verification failed" };
    }
};

//  Function to Resend OTP
export const resendOTP = async (phNo) => {
    try {
        console.log("Resending OTP for:", phNo);
        const response = await postRequest(API_ENDPOINTS.GENERATE_OTP, { phNo });
        console.log("Resend OTP Response:", response);
        return response;
    } catch (error) {
        console.error("Resend OTP Error:", error);
        return { success: false, message: "Failed to resend OTP" };
    }
};

export const loginUser = async (phNo, password) => {
  try {
    console.log("🔑 Logging in user with:", { phNo, password });
    const response = await postRequest(API_ENDPOINTS.LOGIN, { phNo, password });
    console.log("🔓 Login Response:", response);
    return response;
  } catch (error) {
    console.error(" Login Error:", error);
    return { success: false, message: "Login request failed" };
  }
};




