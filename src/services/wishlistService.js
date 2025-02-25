import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL, API_ENDPOINTS } from "../constants/config";

export const getAuthHeaders = async () => {
    const token = await AsyncStorage.getItem('token');
   
    if (!token) throw new Error(" No token found. Please login again.");
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
};

// ✅ Add to Wishlist
export const addToWishlist = async (itemId) => {
    try {
        const headers = await getAuthHeaders();
        const response = await fetch(`${BASE_URL}${API_ENDPOINTS.ADD_WISHLIST}`, {
            method: "POST",
            headers,
            body: JSON.stringify({ itemId }),
        });

        const data = await response.json();
       
        return data;
    } catch (error) {
       
        return { success: false, message: "Failed to add item to wishlist" };
    }
};

//  Remove from Wishlist
export const removeFromWishlist = async (itemId) => {
   
    try {
        const headers = await getAuthHeaders();
        const url = `${BASE_URL}${API_ENDPOINTS.REMOVE_WISHLIST}/${itemId}`;

       
        const response = await fetch(url, {
            method: "DELETE",
            headers,
        });

        const data = await response.json();
        

        if (!response.ok) {
            console.warn(" API Error Message:", data.message);
            throw new Error(data.message || "Failed to remove item from wishlist");
        }

        return { success: true, message: "Removed from wishlist" };
    } catch (error) {
        console.error(" Remove from Wishlist Error:", error);
        return { success: false, message: error.message || "Failed to remove item from wishlist" };
    }
};

// ✅ Fetch Wishlist Items
export const getWishlist = async () => {
    try {
        const headers = await getAuthHeaders();
        const response = await fetch(`${BASE_URL}${API_ENDPOINTS.GET_WISHLIST}?page=1&limit=22`, {
            method: "GET",
            headers,
        });

        const data = await response.json();
        
        if (!data.success) {
            throw new Error("Failed to fetch wishlist");
        }

        return data.data.wishlist || [];
    } catch (error) {
        console.error(" Error fetching wishlist:", error);
        return [];
    }
};