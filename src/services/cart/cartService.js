import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL, API_ENDPOINTS } from "../constants/config";

export const getAuthHeaders = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(" Auth Token:", token);
    if (!token) throw new Error(" No token found. Please login again.");
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
};

// ✅ Create Cart (Add Item to Cart)
export const addToCart = async (itemId, quantity) => {
    try {
        const headers = await getAuthHeaders();
        const response = await fetch(`${BASE_URL}${API_ENDPOINTS.ADD_CART}`, {
            method: "POST",
            headers,
            body: JSON.stringify({ itemId, quantity }),
        });

        const data = await response.json();
        console.log(" Add to Cart Response:", data);
        return data;
    } catch (error) {
        console.error(" Add to Cart Error:", error);
        return { success: false, message: "Failed to add item to cart" };
    }
};

// ✅ Update Cart Item Quantity
export const updateCartItem = async (cartItemId, quantity) => {
    try {
        const headers = await getAuthHeaders();
        const response = await fetch(`${BASE_URL}${API_ENDPOINTS.UPDATE_CART}/${cartItemId}`, {
            method: "PUT",
            headers,
            body: JSON.stringify({ quantity }),
        });

        const data = await response.json();
        console.log("🔄 Update Cart Item Response:", data);
        return data;
    } catch (error) {
        console.error(" Update Cart Item Error:", error);
        return { success: false, message: "Failed to update cart item" };
    }
};

// ✅ Remove Item from Cart
export const removeFromCart = async (cartItemId) => {
    try {
        const headers = await getAuthHeaders();
        const url = `${BASE_URL}${API_ENDPOINTS.REMOVE_CART}/${cartItemId}`;

        console.log(" DELETE Request URL:", url);

        const response = await fetch(url, {
            method: "DELETE",
            headers,
        });

        const data = await response.json();
        console.log(" Remove Cart Item Response:", data);

        if (!response.ok) {
            console.warn(" API Error Message:", data.message);
            throw new Error(data.message || "Failed to remove item from cart");
        }

        return { success: true, message: "Removed from cart" };
    } catch (error) {
        console.error(" Remove from Cart Error:", error);
        return { success: false, message: error.message || "Failed to remove item from cart" };
    }
};

// ✅ Fetch Cart Items
export const getCart = async () => {
    try {
        const headers = await getAuthHeaders();
        const response = await fetch(`${BASE_URL}${API_ENDPOINTS.GET_CART}`, {
            method: "GET",
            headers,
        });

        const data = await response.json();
        console.log(" Fetch Cart Response:", data);

        if (!data.success) {
            throw new Error("Failed to fetch cart items");
        }

        return data.data.cart || [];
    } catch (error) {
        console.error(" Error fetching cart:", error);
        return [];
    }
};
