import { Middleware, configureStore } from '@reduxjs/toolkit'
import usersReducer, { rollbackUser } from './users/slice'
import { createStandaloneToast } from '@chakra-ui/react'
const { toast } = createStandaloneToast()

const persistanceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
  next(action)
  localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
}

const sincWithDatabaseMiddleware: Middleware = (store) => (next) => (action) => {
  const { type, payload } = action

  const previousState = store.getState()

  next(action)

  if (type === 'users/deleteUserById') {
    const userIdToRemove = payload
    const userToRemove = previousState.users.find(user => user.id === payload)

    fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          toast({
            title: 'User deleted successfully',
            status: 'info',
            duration: 2500,
            isClosable: true
          })
        }
      })
      .catch(err => {
        toast({
          title: `Error deleteing user ${userIdToRemove}`,
          status: 'error',
          duration: 2500,
          isClosable: true
        })
        if (userToRemove) store.dispatch(rollbackUser(userToRemove))
        console.log(err)
      })
  }
}

export const store = configureStore({
  reducer: {
    users: usersReducer
  },
  middleware: [persistanceLocalStorageMiddleware, sincWithDatabaseMiddleware]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
