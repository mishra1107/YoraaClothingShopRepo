import React, { createContext, useState, useEffect, useContext } from "react";
import { getCart, addToCart, removeFromCart, updateCartItem } from "./CartService";

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
    
    const toggleCart = async (itemId, desiredSize) => {
        try {
          const existingItem = cart.find(cartItem => cartItem.item === itemId && cartItem.desiredSize === desiredSize);
          if (existingItem) {
            console.log("Item with this size already exists in cart");
          } else {
            await addToCart(itemId, 1, desiredSize); // Pass desiredSize to addToCart
          }
          await fetchCart(); // Refresh cart after adding
        } catch (error) {
          console.error("Toggle Cart Error:", error);
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
