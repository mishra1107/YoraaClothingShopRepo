import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL, API_ENDPOINTS } from "../constants/config";

export const getAuthHeaders = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(" Auth Token:", token);
    if (!token) throw new Error("⚠️ No token found. Please login again.");
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
        console.log("✅ Add to Wishlist Response:", data);
        return data;
    } catch (error) {
        console.error(" Add to Wishlist Error:", error);
        return { success: false, message: "Failed to add item to wishlist" };
    }
};

// ✅ Remove from Wishlist
export const removeFromWishlist = async (itemId) => {
    console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
    try {
        const headers = await getAuthHeaders();
        const url = `${BASE_URL}${API_ENDPOINTS.REMOVE_WISHLIST}/${itemId}`;

        console.log("🗑️ DELETE Request URL:", url);

        const response = await fetch(url, {
            method: "DELETE",
            headers,
        });

        const data = await response.json();
        console.log("🗑️ Remove Wishlist Response:", data);

        if (!response.ok) {
            console.warn("⚠️ API Error Message:", data.message);
            throw new Error(data.message || "Failed to remove item from wishlist");
        }

        return { success: true, message: "Removed from wishlist" };
    } catch (error) {
        console.error("🚨 Remove from Wishlist Error:", error);
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
        console.log("📦 fetch the  wishlist response yha aayyyaaa:", data);

        if (!data.success) {
            throw new Error("Failed to fetch wishlist");
        }

        return data.data.wishlist || [];
    } catch (error) {
        console.error(" Error fetching wishlist:", error);
        return [];
    }
};