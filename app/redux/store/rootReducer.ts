import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "~/redux/features/userSlice";
import cartReducer from "~/redux/features/cartSlice";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
