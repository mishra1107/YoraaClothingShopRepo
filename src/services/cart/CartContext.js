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
            setCartCount(cartData.length);  // Count only the unique items
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



    return (
        <CartContext.Provider value={{ cart, cartCount, toggleCart, fetchCart,removeFromCart,updateCartItem }}>
            {children}
        </CartContext.Provider>
    );
};
