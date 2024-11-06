import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LoginState {
    // user: string | null;
    // jwtToken: string | null;
    // refreshToken: string | null;
    loginData:{
        jwtToken: string | null;
        refreshToken: string | null;
    } | null;
    isAuthenticated: boolean;
    error: String | null;
};

const initialState: LoginState = {
    // user: null,
    // jwtToken: null,
    // refreshToken: null,
    loginData: null,
    isAuthenticated: false,
    error: null,
};

const LoginUserSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<LoginState['loginData']>) => {
            // console.log('state====================>', state)
            console.log('action====================>', action)
            // state.user = action.payload.user;
            // state.jwtToken = action.payload.jwtToken;
            // state.refreshToken = action.payload.refreshToken;
            const {jwtToken, refreshToken} = action.payload || {};
            if(jwtToken && refreshToken){
                AsyncStorage.multiSet([
                    ['@jwtToken',jwtToken],
                    ['@refreshToken',refreshToken],
                ])
                .then(()=>console.log("Tokens saved securely in AsyncStorage"))
                .catch((err)=>console.error("Error saving tokens", err))
                
            }
            state.loginData = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            // console.log('state======fail==============>', state)
            // console.log('action=====fail===============>', action)
        },
        logout: (state) => {
            // state.user = null;
            // state.jwtToken = null;
            // state.refreshToken = null;
            state.loginData = null;
            state.isAuthenticated = false;
            state.error = null;
        }
    },
});

export const { loginSuccess, loginFailure, logout } = LoginUserSlice.actions;
export default LoginUserSlice.reducer;
