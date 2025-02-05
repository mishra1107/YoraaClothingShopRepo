import React, { createContext, useState, useEffect } from "react";
import { addToWishlist, getWishlist, removeFromWishlist } from "../wishlistService"; // Import wishlist functions
import AsyncStorage from "@react-native-async-storage/async-storage";


export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    console.log("insiden wishlist provider")
    const [wishlist, setWishlist] = useState({});
    const [wishlistCount, setWishlistCount] = useState(0); // ✅ Added wishlist count

    useEffect(() => {
        loadWishlist(); // Load wishlist when app starts
    }, []);

    const loadWishlist = async () => {
        console.log("insiden wishlist loadWishlist")

        try {
            
            const wishlistData = await getWishlist(); // Fetch latest wishlist from API
            const wishlistMap = wishlistData.reduce((acc, item) => {
                acc[item.item._id] = true; // Create map with item IDs
                return acc;
            }, {});

            setWishlist(wishlistMap);
            setWishlistCount(wishlistData.length); // ✅ Correctly update wishlist count
            await AsyncStorage.setItem("wishlistItems", JSON.stringify(wishlistMap));
        } catch (error) {
            console.error(" Error loading wishlist:", error);
        }
    };

    const toggleWishlist = async (itemId) => {
        let updatedWishlist = { ...wishlist };
        let updatedCount = wishlistCount;

        if (wishlist[itemId]) {
            const response = await removeFromWishlist(itemId);
            if (response.success) {
                delete updatedWishlist[itemId];
                updatedCount -= 1; // Decrement count when removed
            }
        } else {
            const response = await addToWishlist(itemId);
            if (response.success) {
                updatedWishlist[itemId] = true;
                updatedCount += 1; // Increment count when added
            }
        }

        setWishlist(updatedWishlist);
        setWishlistCount(updatedCount);
        await AsyncStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
    };

    return (
        <WishlistContext.Provider value={{ wishlist, wishlistCount, toggleWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};
