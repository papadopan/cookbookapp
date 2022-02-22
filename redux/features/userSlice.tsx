import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface Recipe {
  title: string
  description: string
}
interface Books {
  title: string
  description: string
  recipes: Recipe[]
}
interface User {
  name: string
  email: string
  books: Books[]
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
    login: (state, user: PayloadAction<User>) => {
      state.loggedIn = true
      state.user = user.payload
    },
    logout: (state) => {
      state.loggedIn = false
    },
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
