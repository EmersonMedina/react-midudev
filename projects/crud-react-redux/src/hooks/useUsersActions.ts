import { UserId, deleteUserById, addNewUser, User } from '../store/users/slice'
import { useAppDispatch } from './store'

export const useUserActions = () => {
  const dispatch = useAppDispatch()

  const removeUser = (id: UserId) => {
    dispatch(deleteUserById(id))
  }

  const addUser = (user: User) => {
    dispatch(addNewUser(user))
  }

  return { removeUser, addUser }
}
