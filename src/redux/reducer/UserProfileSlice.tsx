import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
    name:string,
    phone:string,
    email:string,
    profileImage: string | null;
  };
const initialState:ProfileState ={
    name:'',
    phone:'',
    email:'',
    profileImage: null,
};

const UserProfileSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setProfileImage:(state, actions:PayloadAction<string|null>) =>{
            state.profileImage = actions.payload;
        },
        setUserData:(state, action:PayloadAction<Omit<UserProfile,'profileImage'>>)=>{
            state.name = action.payload.name;
            state.phone = action.payload.phone;
            state.email = action.payload.email;

        },
        clearProfileImage:(state) =>{
            state.profileImage = null;
        }
    },
});



export const {setProfileImage, setUserData,clearProfileImage} = UserProfileSlice.actions;  // Export the actions
export default UserProfileSlice.reducer;  // Export the reducer
