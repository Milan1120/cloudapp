// import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// interface LockState {
//  pin: string | null,
//  confirmPin: string | null,
//  error: string | null,
// };

// const initialState: LockState = {
//     pin: null,
//     confirmPin: null,
//     error: null,
// };


// const ScreenLockSlice = createSlice({
//     name: 'Screen_Lock',
//     initialState,
//     reducers:{
//         lockSuccess:(state, action:PayloadAction<LockState>)=>{
//             console.log('======state===========',state)
//             console.log('========action=========',action)

//         },
//         lockFailure: (state, action:PayloadAction<LockState>)=>{
//             console.log('======state===========',state)
//             console.log('========action=========',action)
//         },
//     }
// })

// export const {lockSuccess, lockFailure} = ScreenLockSlice.actions;
// export default ScreenLockSlice.reducer;