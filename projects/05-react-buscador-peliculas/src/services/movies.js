
const BASE_MOVIES_API_URL = 'https://www.omdbapi.com/'
const API_KEY = '1a34d794'

export const searchMovies = async ({ search }) => {

    if (search === '') return null

    try {
        const response = await fetch(`${BASE_MOVIES_API_URL}?apiKey=${API_KEY}&s=${search}`)
        const data = await response.json()

        const movies = data.Search
    
        const mappedMovies = movies?.map(movie => (
          {
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            image: movie.Poster
          }
        ))

        return mappedMovies

    } catch (error) {
        throw new Error('Error searching movies')
    }
}