import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL, API_ENDPOINTS } from "../constants/config";

export const getAuthHeaders = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log("🔐 Auth Token:", token);
    if (!token) throw new Error("⚠️ No token found. Please login again.");
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
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
        console.log("📦 Wishlist Response:", data);

        if (!data.success) {
            throw new Error("Failed to fetch wishlist");
        }

        return data.data.wishlist || [];
    } catch (error) {
        console.error("❌ Error fetching wishlist:", error);
        return [];
    }
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
        console.error("❌ Add to Wishlist Error:", error);
        return { success: false, message: "Failed to add item to wishlist" };
    }
};

// ✅ Remove from Wishlist
export const removeFromWishlist = async (itemId) => {
    try {
        const headers = await getAuthHeaders();
        const response = await fetch(`${BASE_URL}${API_ENDPOINTS.REMOVE_WISHLIST}/${itemId}`, {
            method: "DELETE",
            headers,
        });

        if (!response.ok) throw new Error("Failed to remove item from wishlist");

        const data = await response.json();
        console.log("🗑️ Remove from Wishlist Response:", data);
        return { success: true, message: "Removed from wishlist" };
    } catch (error) {
        console.error("❌ Remove from Wishlist Error:", error);
        return { success: false, message: "Failed to remove item from wishlist" };
    }
};
