import React, { createContext, useContext, useEffect, useState } from "react";
import { addToCart, removeFromCart, updateCartItem, getCart } from "../cart/CartService";

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);

    // ✅ Load Cart Items on Component Mount
    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        setLoading(true);
        try {
            const cartItems = await getCart();
            setCart(cartItems);
        } catch (error) {
            console.error(" Fetch Cart Error:", error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Add to Cart
    const handleAddToCart = async (itemId, quantity) => {
        try {
            const response = await addToCart(itemId, quantity);
            if (response.success) {
                await fetchCart(); // ✅ Refresh cart count dynamically
            }
            return response;
        } catch (error) {
            console.error(" Add to Cart Error:", error);
        }
    };

    // ✅ Remove Item from Cart
    const handleRemoveFromCart = async (cartItemId) => {
        try {
            const response = await removeFromCart(cartItemId);
            if (response.success) {
                await fetchCart(); // ✅ Refresh cart count dynamically
            }
            return response;
        } catch (error) {
            console.error(" Remove from Cart Error:", error);
        }
    };

    return (
        <CartContext.Provider value={{
            cart,
            loading,
            fetchCart,
            handleAddToCart,
            handleRemoveFromCart,
        }}>
            {children}
        </CartContext.Provider>
    );
};
