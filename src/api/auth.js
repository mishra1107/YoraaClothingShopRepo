import { postRequest } from "./api";
import { API_ENDPOINTS } from "../constants/config";

//  Function for User Signup
// export const signupUser = async (name, phNo, password) => {
//   console.log("Signing up user with:", { name, phNo, password });
//   const url = "http://10.0.2.2:8080/api/auth/signup";
//   const data = {
//     phNo: "545454",
//     name: "pushkar",
//     password: "2002"
//   };

//   try {
//     console.log(`Sending POST request to: ${url}`);
//     console.log("Request Body:", data);

//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//    console.log("response" ,response);
// if (!response) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const responseData = await response.json();
//     console.log("Response:", responseData);
//     return responseData;
//   } catch (error) {
//     if (error instanceof TypeError) {
//       console.error("Network error: Unable to connect to the server.");
//     } else {
//       console.error("Error:", error.message);
//     }
//   }
// };

export const signupUser = async (name, phNo, password) => {
  try {
    const phoneNumber = String(phNo); // Ensure phNo is a string
    console.log("Signing up user with:", { name, phoneNumber, password });

    const response = await postRequest(API_ENDPOINTS.SIGNUP, { name, phNo: phoneNumber, password });
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
    const phoneNumber = String(phNo); // Ensure phNo is a string
    console.log("Generating OTP for:", phoneNumber);

    const response = await postRequest(API_ENDPOINTS.GENERATE_OTP, { phNo: phoneNumber });
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
    const phoneNumber = String(phNo); // Ensure phNo is a string
    const otpString = String(otpCode); // Ensure OTP is a string
    console.log("Verifying OTP for:", phoneNumber, "with OTP:", otpString);

    const response = await postRequest(API_ENDPOINTS.VERIFY_OTP, { phNo: phoneNumber, otp: otpString });
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
    const phoneNumber = String(phNo); // Ensure phNo is a string
    console.log("Resending OTP for:", phoneNumber);

    const response = await postRequest(API_ENDPOINTS.GENERATE_OTP, { phNo: phoneNumber });
    console.log("Resend OTP Response:", response);
    return response;
  } catch (error) {
    console.error("Resend OTP Error:", error);
    return { success: false, message: "Failed to resend OTP" };
  }
};



//  Function for User Login
export const loginUser = async (phNo, password) => {
  try {
    const phoneNumber = String(phNo); // Ensure phNo is a string
    console.log("🔑 Logging in user with:", { phoneNumber, password });

    const response = await postRequest(API_ENDPOINTS.LOGIN, { phNo: phoneNumber, password });
    console.log("🔓 Login Response:", response);
    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, message: "Login request failed" };
  }
};
