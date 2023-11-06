import './App.css'
import { ListOfUsers } from './components/ListOfUsers'
import { CreateNewUser } from './components/CreateNewUser'
import { createStandaloneToast } from '@chakra-ui/react'

const { ToastContainer } = createStandaloneToast()

function App () {
  return (
    <>
      <CreateNewUser />
      <ListOfUsers />
      <ToastContainer />
    </>
  )
}

export default App
