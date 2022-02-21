import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface User {
  name: string
  email: string
}
interface UserState {
  loggedIn: boolean
  user: User | null
}

const initialState: UserState = {
  loggedIn: false,
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.loggedIn = true
      state.user = { email: 'antonios.papadopan@gmail.com', name: 'Antonis' }
    },
    logout: (state) => {
      state.loggedIn = false
    },
  },
})

export const { login, logout } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const userStatus = (state: RootState) => state.user.loggedIn
export const user = (state: RootState) => state.user.user

export default userSlice.reducer
