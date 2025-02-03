import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice'; // ✅ Correct path

const store = configureStore({
  reducer: {
    category: categoryReducer,
  },
});

export default store;
