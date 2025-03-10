import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL, API_ENDPOINTS } from "../../constants/config";

//  Get Authorization Headers
export const getAuthHeaders = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error(" No token found. Please login again.");
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
};

//  Create Cart (Add Item to Cart)


//  Delete Item from Cart by ID

export const removeFromCart = async (cartItemId) => {
    try {
        const headers = await getAuthHeaders();
        const url = `${BASE_URL}${API_ENDPOINTS.REMOVE_CART}/${cartItemId}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers,
        });

        const data = await response.json();
        if (!response.ok) {
            console.warn(" API Error Message:", data.message);
            throw new Error(data.message || "Failed to remove item from cart");
        }

        return { success: true, message: "Removed from cart" };
    } catch (error) {
        console.error(" Remove from Cart Error:", error);
        Alert.alert("API Error", error.message); // Show error directly in the UI
        return { success: false, message: error.message || "Failed to remove item from cart" };
    }
};

// In CartService
export const addToCart = async (itemId, quantity, desiredSize) => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${BASE_URL}${API_ENDPOINTS.ADD_CART}`, {
        method: "POST",
        headers,
        body: JSON.stringify({ itemId, quantity, desiredSize }), // Updated JSON body
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to add item to cart");
      }
      return data;
    } catch (error) {
      console.error("Add to Cart Error:", error);
      return { success: false, message: "Failed to add item to cart" };
    }
  };
  
  // Update getCart to include desiredSize
  export const getCart = async () => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${BASE_URL}${API_ENDPOINTS.GET_CART}`, {
        method: "GET",
        headers,
      });
  
      const data = await response.json();
      if (!data.success) {
        throw new Error("Failed to fetch cart items");
      }
  
      // Extract desiredSize along with other details
      const cartItems = data.data.map(item => ({
        cartId: item._id,
        name: item.item.name,
        description: item.item.description,
        price: item.item.price,
        imageUrl: item.item.imageUrl,
        quantity: item.quantity,
        item: item.item._id,
        desiredSize: item.desiredSize, // Add desiredSize to cart item
      }));
      return cartItems;
    } catch (error) {
      console.error("Error fetching cart:", error);
      return [];
    }
  };
  
  // Update updateCartItem if size changes are allowed (optional)
  export const updateCartItem = async (cartId, quantity, desiredSize) => {
    try {
      const headers = await getAuthHeaders();
      const url = `${BASE_URL}${API_ENDPOINTS.UPDATE_CART}/${cartId}`;
      const body = desiredSize ? { quantity, desiredSize } : { quantity }; // Include desiredSize if provided
      const response = await fetch(url, {
        method: "PATCH",
        headers,
        body: JSON.stringify(body),
      });
  
      const responseText = await response.text();
      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }
  
      const data = JSON.parse(responseText);
      if (!data.success) {
        throw new Error(data.message || "Failed to update cart item");
      }
  
      return data;
    } catch (error) {
      console.error("Update Cart Item Error:", error);
      return { success: false, message: "Failed to update cart item" };
    }
  };



