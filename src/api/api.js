import { BASE_URL } from "../constants/config";

export const postRequest = async (endpoint, data) => {
  try {
    // Ensure phone number is always sent as a string
    if (data.phNo) {
      data.phNo = String(data.phNo);
    }

    console.log(`Sending POST request to: ${BASE_URL}${endpoint}`);
    console.log("Request Body:", data);

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const jsonResponse = await response.json();
    console.log("API Response:", jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.error("API Error:", error);
    return { success: false, message: "Something went wrong!" };
  }
};
