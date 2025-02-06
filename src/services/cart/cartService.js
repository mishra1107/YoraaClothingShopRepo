import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL, API_ENDPOINTS } from "../../constants/config";

// ✅ Get Authorization Headers
export const getAuthHeaders = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log("🔑 Auth Token:", token);
    if (!token) throw new Error("⚠️ No token found. Please login again.");
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
        console.log("🛒 Add to Cart Response:", data);
        return data;
    } catch (error) {
        console.error("🚨 Add to Cart Error:", error);
        return { success: false, message: "Failed to add item to cart" };
    }
};

// ✅ Delete Item from Cart by ID
export const removeFromCart = async (cartItemId) => {
    try {
        const headers = await getAuthHeaders();
        const url = `${BASE_URL}${API_ENDPOINTS.REMOVE_CART}/${cartItemId}`;

        console.log("🗑️ DELETE Cart Item Request URL:", url);

        const response = await fetch(url, {
            method: "DELETE",
            headers,
        });

        const data = await response.json();
        console.log("🗑️ Remove Cart Item Response:", data);

        if (!response.ok) {
            console.warn("⚠️ API Error Message:", data.message);
            throw new Error(data.message || "Failed to remove item from cart");
        }

        return { success: true, message: "Removed from cart" };
    } catch (error) {
        console.error("🚨 Remove from Cart Error:", error);
        return { success: false, message: error.message || "Failed to remove item from cart" };
    }
};


export const getCart = async () => {
    try {
        const headers = await getAuthHeaders();
        const response = await fetch(`${BASE_URL}${API_ENDPOINTS.GET_CART}`, {
            method: "GET",
            headers,
        });

        const data = await response.json();
        console.log("📦 Get Cart Response:", data);

        if (!data.success) {
            throw new Error("Failed to fetch cart items");
        }

        // ✅ Extract only required details
        const cartItems = data.data.map(item => ({
            id: item._id,
            name: item.item.name,
            description: item.item.description,
            price: item.item.price,
            imageUrl: item.item.imageUrl,
            quantity: item.quantity,
            item: item.item._id
        }));

        console.log("🛒 Extracted Cart Items:", cartItems); // ✅ Log extracted data

        return cartItems;
    } catch (error) {
        console.error("🚨 Error fetching cart:", error);
        return [];
    }
};


// ✅ Update Cart Item by ID
export const updateCartItem = async (cartItemId, quantity) => {
    try {
        const headers = await getAuthHeaders();
        const response = await fetch(`${BASE_URL}${API_ENDPOINTS.UPDATE_CART}/${cartItemId}`, {
            method: "PUT",
            headers,
            body: JSON.stringify({ quantity }),
        });

        const data = await response.json();
        console.log("✏️ Update Cart Item Response:", data);

        if (!data.success) {
            throw new Error(data.message || "Failed to update cart item");
        }

        return data;
    } catch (error) {
        console.error("🚨 Update Cart Item Error:", error);
        return { success: false, message: "Failed to update cart item" };
    }
};