import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";

interface RegisterState {
    id: string;
    created_at: string;
    deleted_at: string;
    email: string;
    first_name: string;
    is_verified: string;
    last_name: string;
    phone_number: string;
    updated_at: string;
    username: string
    userData: RegisterState | null;
    isAuthenticated: boolean;
    error: string | null;
};

const initialState: RegisterState = {
    id:'',
    created_at:'',
    deleted_at:'',
    email:'',
    first_name:'',
    is_verified:'',
    last_name: '',
    phone_number: '',
    updated_at: '',
    username: '',
    userData: null,
    isAuthenticated: false,
    error: null
};

const RegisterUserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        registerSuccess: (state, action: PayloadAction<RegisterState>) => {
            // console.log('rrrrrrrrrrrrrrrraction',action)
            // console.log('rrrrrrrrrrrrrrrrstate',state)
            state.userData = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        },
        registerFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        }


        //     {
        //     state.username = action.payload.username;
        //     state.password = action.payload.password;
        //     // state.confirmPassword = action.payload.confirmPassword;
        // },
        // extraReducers: (builder) =>{
        //     builder
        //     .addCase()
        //     .addCase()
        //     .addCase()
        // }
        // registrationStart: (state) => {
        //     state.loading = true;
        //     state.error = null;
        // },
        // registrationSuccess: (state) => {
        //     state.loading = false;
        //     state.success = true;
        // },
        // registrationFailure: (state, action: PayloadAction<string>) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // }
    },
});

export const { registerSuccess, registerFailure} = RegisterUserSlice.actions;
export default RegisterUserSlice.reducer;



// Thunk action for registering the user
// export const registerUser = (userData: { username: string, password: string }) => {
//     return async (dispatch: AppDispatch) => {
//         dispatch(registrationStart());
//         try {
//             const response = await fetch('http://13.233.252.242:8081/api/v1/auth/register', {
//                 method: 'POST',
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     email: userData.username,
//                     password: userData.password,
//                 }),
//             });
//             if (response.ok) {
//                 const data = await response.json();
//                 console.log("Registration successful:", data);
//                 dispatch(registrationSuccess());
//             } else {
//                 const errorData = await response.json();
//                 dispatch(registrationFailure(errorData.message || 'Registration failed'));
//                 //   console.log('Failed to register. Please try again:', errorResponse);
//             }
//         } catch (error) {
//             dispatch(registrationFailure(error.message || 'Network error'));
//         }
//     };
// };

