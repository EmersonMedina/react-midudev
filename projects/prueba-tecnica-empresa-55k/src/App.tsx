import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { SortBy, type User } from './types/users.types';
import { UsersList } from './components/UsersList';

function App() {

  const BASE_RANDOM_USER_API_URL = 'https://randomuser.me/api';

  const [users, setUsers] = useState<User[]>([]);
  const [enableColor, setEnableColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const originalUsers = useRef<User[]>([])

  //useRef -> Para guardar un valor que queremos que se comparta entre renderizados
  //pero que al cambiar, no vuelva a renderizar el componente

  const toggleColors = () => setEnableColors(!enableColor)
  const toggleSortByCountry  = () => {
    const newSorting = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSorting)
  }

  const handleDelete = (uuid: string) => { 
    const filteredUsers = users.filter(user => user.login.uuid != uuid)
    setUsers(filteredUsers)
  } 

  const handleReset = () => { 
    setUsers(originalUsers.current)
  }

  const filterByCountry = (e: ChangeEvent<HTMLInputElement>) => { 
    setFilterCountry(e.target.value)
  }

  const handleChangeSorting = (sort: SortBy) => { 
    setSorting(sort)
  }

  useEffect(() => {
    fetch(`${BASE_RANDOM_USER_API_URL}/?results=100`)
      .then(response => response.json())
      .then(({results}) =>{    
        setUsers(results)
        originalUsers.current = results
        })
      .catch(error => console.log(error))
  }, []) //Array vacío para que solo se ejecuta una vez

  const filteredUsers = useMemo(() => {
    return filterCountry != null && filterCountry.length > 0
      ? users.filter(user => user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
      : users
  }, [users, filterCountry])

  //DE ESTA FORMA SE HACE UNA COPIA PARA NO MUTAR EL ARREGLO ORIGINAL 
  // const sortedUsers = sortByCountry 
  //   ? [...users].sort((a, b) => a.location.country.localeCompare(b.location.country)) 
  //   : users

  //DE ESTA OTRA FORMA NO SE NECESITA LA COPIA PORQUE toSorted no muta el arreglo original
  const sortedUsers = useMemo(() => { 

    if (sorting === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filteredUsers.toSorted((a, b) => {
      const stractProperty = compareProperties[sorting]
      return stractProperty(a).localeCompare(stractProperty(b))
    })
  }, [filteredUsers, sorting])
  
  
  
  
  return (
    <>
      <h1>Random Users</h1>
      <header className='tableButtons'>
        <button onClick={toggleColors}>Colorear Filas</button>
        <button onClick={toggleSortByCountry}>
          { sorting === SortBy.COUNTRY  ? 'No ordenar por país' : 'Ordenar por país'}
        </button>
        <button onClick={handleReset}>Restablecer estado original</button>
        <input type="text" id="" placeholder='Filtrar por país' onChange={(e) => filterByCountry(e)}/>
      </header>
      <main>
        <UsersList handleChangeSorting={handleChangeSorting} enableColors={enableColor} users={sortedUsers} handleDelete={handleDelete}/>
      </main>
    </>
  )
}

export default App
