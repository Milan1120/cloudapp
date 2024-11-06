import { configureStore } from "@reduxjs/toolkit";
import LoginUserSlice from "./reducer/LoginUserSlice";
import PhoneUserSlice from "./reducer/PhoneUserSlice";
import UserProfileSlice from "./reducer/UserProfileSlice";
import RegisterUserSlice from "./reducer/RegisterUserSlice";


const store = configureStore({
    reducer: {
        loginUser: LoginUserSlice,
        phoneUser: PhoneUserSlice,
        profile: UserProfileSlice,
        registerUser: RegisterUserSlice,
    },
}); 

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;