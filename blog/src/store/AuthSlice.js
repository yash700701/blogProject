import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: false,
  userData: null,
}

export const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action)=>{
        state.status = true;
        state.userData = action.payload;
        console.log(`state`);
        console.log(state)
        
    },
    logout: (state)=>{
        state.status = false;
        state.userData = null;
    }
  },
})

export const { login, logout } = counterSlice.actions
export default counterSlice.reducer