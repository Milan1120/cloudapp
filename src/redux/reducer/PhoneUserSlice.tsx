import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PhoneState{
    phone: string;  
};

const initialState: PhoneState = {
    phone: '',   
};

const PhoneUserSlice = createSlice({
name: 'login',
initialState,
reducers:{
    phoneSuccess: (state, action:PayloadAction<PhoneState>)=>{
        console.log('state====================>', state)
        console.log('action====================>', action)
    },
    phoneFailure: (state, action:PayloadAction<PhoneState>) =>{
        console.log('state======fail==============>', state)
        console.log('action=====fail===============>', action)
    }
},
});

export const {phoneSuccess, phoneFailure} = PhoneUserSlice.actions;
export default PhoneUserSlice.reducer;
