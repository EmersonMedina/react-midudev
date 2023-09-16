import './App.css'
import { useState, useCallback } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App() { 
  const [sort, setSort] = useState(false)
  const { search, error, updateSearch} = useSearch()
  const { movies, getMovies, loading} = useMovies({search, sort})

  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({search})
    }, 300)
  , [getMovies]) 
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // const { query } = Object.fromEntries(
    //   new FormData(e.target)
    // )
      
      getMovies({search})
  }
    
  const handleChange = (e) => {
    const newSearch = e.target.value 
    updateSearch(newSearch)

    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
    // getMovies()
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
            <input  onChange={handleChange} value={search} name='query' type="text" placeholder='Avengers, Star Wars, The Hunger Games...'/>
            <input type="checkbox" onChange={handleSort} checked={sort} />
            <button type='submit'> Search </button>      
        </form>
        { error && <p style={{color: 'red'}}>{error}</p> }
      </header>

      <main>
        { 
          loading ? <p>Loading...</p> : <Movies movies={ movies }/>
        }
        
      </main>
    </div>
  )
}

export default App
