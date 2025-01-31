import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem("userToken", token);
    console.log(" Token stored successfully!");
  } catch (error) {
    console.error(" Error storing token:", error);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem("userToken");
  } catch (error) {
    console.error(" Error fetching token:", error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("userToken");
    console.log(" Token removed successfully!");
  } catch (error) {
    console.error(" Error removing token:", error);
  }
};
