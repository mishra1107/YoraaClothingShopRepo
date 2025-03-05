import React, { createContext, useState, useEffect, useContext } from "react";
import { getCart, addToCart, removeFromCart, updateCartItem } from "./cartService";

export const CartContext = createContext();
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

export const CartProvider = ({ children }) => {
   
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const cartData = await getCart();
            setCart(cartData);
            setCartCount(cartData.length);  
        } catch (error) {
            console.error("Fetch Cart Error:", error);
        }
    };
    
    const toggleCart = async (itemId) => {
        try {
            // console.log("inside toggler cart",itemId)
            //     console.log("cart",cart[0].item)
                const existingItem = cart.find(cartItem => cartItem.item === itemId);
                // console.log("existing item",existingItem);
            if (existingItem) {
               console.log("already existed") 
            } else {
                await addToCart(itemId, 1);
            }
            await fetchCart(); //  Ensure cart count updates dynamically
        } catch (error) {
            console.error(" Toggle Cart Error:", error);
        }
    };

     // ✅ Function to clear the cart after payment
     const clearCart = async () => {
        try {
            for (const item of cart) {
                await removeFromCart(item.cartId); // Remove each item from the cart
            }
            setCart([]); // Reset cart state
            setCartCount(0);
            console.log("Cart cleared after successful payment");
        } catch (error) {
            console.error("Clear Cart Error:", error);
        }
    };
    return (
        <CartContext.Provider value={{ cart, cartCount, toggleCart, fetchCart,removeFromCart,updateCartItem,clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
