import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './AuthSlice'

export const store = configureStore({
  reducer: {
    auth: counterReducer,
  },
})