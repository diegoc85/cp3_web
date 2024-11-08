import { useEffect, useState } from "react";
import CardContainer from "../components/CardContainer";
import MovieCard from "../components/MovieCard";

export default function Home() {
    const [topMovies, setTopMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [tvSeries, setTvSeries] = useState([]);

    const fetchMovies = async () => {
        try {
            const [resTop, resUpcoming, resTvSeries] = await Promise.all([
                fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`),
                fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`),
                fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`)
            ])

            const topMoviesData = await resTop.json()
            const upcomingMoviesData = await resUpcoming.json()
            const tvSeriesData = await resTvSeries.json()

            setTopMovies(topMoviesData.results)
            setUpcomingMovies(upcomingMoviesData.results)
            setTvSeries(tvSeriesData.results)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchMovies()
    }, [])

    return (
        <>
            <CardContainer titulo="Filmes Populares">
                {topMovies.map(filme => (
                    <MovieCard
                        key={filme.id}
                        {...filme}
                    />
                ))}
            </CardContainer>
            <CardContainer titulo="Filmes a caminho" className="p-5 bg-gray-900 rounded-lg shadow-lg mt-6">
                {upcomingMovies.map(filme => (
                    <MovieCard
                        key={filme.id}
                        {...filme}
                    />
                ))}
            </CardContainer>
            <CardContainer titulo="Séries de TV" className="p-5 bg-gray-900 rounded-lg shadow-lg mt-6">
                {tvSeries.map(filme => (
                    <MovieCard
                        key={filme.id}
                        {...filme}
                    />
                ))}
            </CardContainer>
        </>
    );
}
