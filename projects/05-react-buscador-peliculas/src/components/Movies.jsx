export function ListOfMovies({ movies }) {
    return (
        <ul className="movies">
            {
                (movies.map(movie => (
                    <li className="movie" key={movie.id}>
                    <h3>{movie.title}</h3>
                    <h3>{movie.year}</h3>
                    <img src={movie.image} alt={movie.title} />
                    </li>
                )))
            }
        </ul>
    )
}

export function NoMoviesResult ({ movies }) {
    return (
        <p>No se encontraron películas para la busqueda</p>
    )
}

export function Movies ( { movies }) {
    const hasMovies = movies?.length > 0 

    return (
        hasMovies 
            ? <ListOfMovies movies={movies}/>
            : <NoMoviesResult/>
    )
}