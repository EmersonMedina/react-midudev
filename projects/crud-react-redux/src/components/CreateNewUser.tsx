import { FormHelperText, FormErrorMessage, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useUserActions } from '../hooks/useUsersActions'

export const CreateNewUser = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { addUser } = useUserActions()
  const name = useRef(null)

  const [nameState, setValidName] = useState('')

  const isNameNotValid = nameState === ''

  const handleSubmit = (e: React.FormEvent<HTMLFormEvent>) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const github = formData.get('github') as string

    addUser({ name, email, github })
    onClose()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'name' && value !== '') {
      setValidName(value)
    } setValidName(value)
  }

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Button onClick={onOpen}>Add User</Button>
      </div>

      <Modal
        initialFocusRef={name}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent color='black'>
          <ModalHeader>Add a new user</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody pb={6}>

              <FormControl isInvalid={isNameNotValid}>
                <FormLabel>Name</FormLabel>
                <Input ref={name} placeholder='Name' name='name' onChange={handleInputChange} />
                {!isNameNotValid
                  ? (
                    <FormHelperText>
                      Enter your name
                    </FormHelperText>
                    )
                  : (
                    <FormErrorMessage>Name is required.</FormErrorMessage>
                    )}
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input name='email' placeholder='Email' />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Github</FormLabel>
                <Input name='github' placeholder='Github' />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type='submit' colorScheme='blue' mr={3}>
                Add
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>

        </ModalContent>
      </Modal>
    </>
  )
}
