import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Badge
} from '@chakra-ui/react'

import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { useAppSelector } from '../hooks/store'
import { useUserActions } from '../hooks/useUsersActions'

export function ListOfUsers () {
  const users = useAppSelector(state => state.users)
  const { removeUser } = useUserActions()

  return (
    <TableContainer>
      <Table colorScheme='whatsapp'>
        <TableCaption placement='top' color='white'>
          LISTA DE USUARIOS
          <Badge variant='outline' colorScheme='green' marginLeft={2}>{users.length}</Badge>
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            users.map(user => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <img
                    style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                    src={`https://unavatar.io/${user.github}`}
                    alt='An user image'
                  />
                  {user.name}
                </Td>
                <Td>{user.email}</Td>
                <Td>
                  <button aria-label='Remove element' type='button' style={{ marginRight: '1rem' }}>
                    <AddIcon />
                  </button>

                  <button onClick={() => removeUser(user.id)} type='button'>
                    <DeleteIcon />
                  </button>

                </Td>
              </Tr>
            ))
          }
        </Tbody>
      </Table>
    </TableContainer>
  )
}
