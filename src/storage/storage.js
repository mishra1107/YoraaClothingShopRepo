import AsyncStorage from "@react-native-async-storage/async-storage";

// Keys for storage
const TOKEN_KEY = "userToken";
const NAME_KEY = "userName";
const PHONE_KEY = "userPhone";
const ID_KEY = "userId";

//  Store user data in AsyncStorage
export const storeUserData = async ({ token, name, phNo, _id }) => {
  try {
    await AsyncStorage.multiSet([
      [TOKEN_KEY, token],
      [NAME_KEY, name],
      [PHONE_KEY, phNo],
      [ID_KEY, _id]
    ]);
    console.log(" User data stored successfully!");
  } catch (error) {
    console.error(" Error storing user data:", error);
  }
};

//  Retrieve user data from AsyncStorage
export const getUserData = async () => {
  try {
    const values = await AsyncStorage.multiGet([TOKEN_KEY, NAME_KEY, PHONE_KEY, ID_KEY]);
    const userData = {
      token: values[0][1],
      name: values[1][1],
      phNo: values[2][1], // Retrieve phone number
      id: values[3][1],
    };
    console.log(" Retrieved User Data:", userData);
    return userData;
  } catch (error) {
    console.error(" Error fetching user data:", error);
    return null;
  }
};

// ✅ Remove user data from AsyncStorage (Logout)
export const removeUserData = async () => {
  try {
    await AsyncStorage.multiRemove([TOKEN_KEY, NAME_KEY, PHONE_KEY, ID_KEY]);
    console.log("✅ User data removed successfully!");
  } catch (error) {
    console.error(" Error removing user data:", error);
  }
};
