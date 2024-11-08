import { useEffect, useState } from "react";
import GenreCard from "../components/GenreCard";
import MovieCard from "../components/MovieCard";

export default function GenreListPage() {
  const [genre, setGenre] = useState([]);
  const [movie, setMovie] = useState([]);
  const [showMovie, setShowMovie] = useState(true);
  const [id, setId] = useState(0);
  const [page, setPage] = useState(1);

  const getDiscoverMovies = async (id, page) => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br&with_genres=${id}&page=${page}`
    try {
      const res = await fetch(url)
      const data = await res.json()
      setMovie(prevMovies => [...prevMovies, ...data.results])
    } catch (error) {
      console.error(`Erro ao buscar filme. ${error}`)
    }
  }

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`)
        const data = await res.json()
        setGenre(data.genres)
      } catch (error) {
        console.error(`Erro ao buscar o genero. ${error}`)
      }
    }
    fetchGenres()
  }, [])

  const handleGenreSelect = (genreId) => {
    setShowMovie(false)
    setPage(1)
    setId(genreId)
    setMovie([])
    getDiscoverMovies(genreId, 1)
  }

  const handleLoadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    getDiscoverMovies(id, nextPage)
  }

  return (
    <div className="flex flex-col items-center">
      <button onClick={() => setShowMovie(true)} className="px-5 py-2 mt-5 bg-violet-600 rounded-lg">Voltar</button>
      <div className="grid gap-5 lg:grid-cols-5 sm:grid-cols-3 grid-cols-1 w-full max-w-screen-xl my-5">
        {showMovie ? (
          genre.map(({ id, name }) => (
            <GenreCard key={id} nome={{ id, name }} onclick={() => handleGenreSelect(id)} />
          ))
        ) : (
          <>
            {movie.map(movieData => (
              <MovieCard key={movieData.id} {...movieData} />
            ))}
            <div className="w-full flex justify-center col-span-full mt-5">
              <button onClick={handleLoadMore} className="px-5 py-2 bg-violet-600 rounded-lg">Carregar mais</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
