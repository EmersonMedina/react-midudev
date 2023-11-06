import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type UserId = string;

export interface User {
    name: string;
    email: string;
    github: string;
}

export interface UserWithId extends User {
    id:UserId;
}

const DEFAULT_STATE: UserWithId[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'johndoe@example.com',
    github: 'johndoe_github'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    github: 'janesmith_github'
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'michaeljohnson@example.com',
    github: 'michaeljohnson_github'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emilydavis@example.com',
    github: 'emilydavis_github'
  },
  {
    id: '5',
    name: 'William Wilson',
    email: 'williamwilson@example.com',
    github: 'williamwilson_github'
  },
  {
    id: '6',
    name: 'Olivia Brown',
    email: 'oliviabrown@example.com',
    github: 'oliviabrown_github'
  },
  {
    id: '7',
    name: 'James Lee',
    email: 'jameslee@example.com',
    github: 'jameslee_github'
  },
  {
    id: '8',
    name: 'Ava Miller',
    email: 'avamiller@example.com',
    github: 'avamiller_github'
  },
  {
    id: '9',
    name: 'Benjamin Anderson',
    email: 'benjaminanderson@example.com',
    github: 'benjaminanderson_github'
  },
  {
    id: '10',
    name: 'Sophia Taylor',
    email: 'sophiataylor@example.com',
    github: 'sophiataylor_github'
  }
]

const initialState: UserWithId[] = (() => {
  const persistedState = localStorage.getItem('__redux__state__')

  return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE
})()

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID()
      state.push({ id, ...action.payload })
    },
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload
      return state.filter(user => user.id !== id)
    },
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const isUserAlreadyDefined = state.some(user => user.id === action.payload.id)
      if (!isUserAlreadyDefined) {
        state.push(action.payload)
      }
    }
  }
})

export default usersSlice.reducer

export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions
