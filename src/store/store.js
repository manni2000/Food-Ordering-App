import { configureStore } from '@reduxjs/toolkit';
import commentSlice from './review-comments/commentSlice';
import cartSlice from './shopping-cart/cartSlice';
import cartUiSlice from './shopping-cart/cartUiSlice';

const store = configureStore({
  reducer: {
    cart: cartSlice,
    cartUi: cartUiSlice,
    comment: commentSlice,
  },
});

export default store;
