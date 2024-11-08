import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ id, title, name, vote_average, poster_path, alignment }) {
    const [watchedList, setWatchedList] = useState([])
    const [watchLaterList, setWatchLaterList] = useState([])
    const movieName = title || name
    const moviePoster = poster_path

    useEffect(() => {
        setWatchedList(JSON.parse(localStorage.getItem('watched')) || [])
        setWatchLaterList(JSON.parse(localStorage.getItem('watchLater')) || [])
    }, [])

    const updateList = (key, list, setList, movie) => {
        if (list.some(item => item.name === movie.name)) {
            alert(`O filme já está na lista de ${key === 'watched' ? 'assistidos' : 'quero assistir'}`);
            return
        }
        const updatedList = [...list, movie];
        setList(updatedList);
        localStorage.setItem(key, JSON.stringify(updatedList));
    }

    const addToWatched = () => {
        updateList('watched', watchedList, setWatchedList, { name: movieName, poster: moviePoster })
    }

    const addToWatchLater = () => {
        updateList('watchLater', watchLaterList, setWatchLaterList, { name: movieName, poster: moviePoster })
    }

    return (
        <div className="flex pr-8">
            <div className="flex-col mt-4 w-48">
                <h2 className="flex-wrap w-56">{movieName}</h2>
                <p>{vote_average.toFixed(2)}</p>
                <div className={`flex flex-col ${alignment} text-center`}>
                    <img src={`https://image.tmdb.org/t/p/w154${moviePoster}`} alt={movieName} className="h-[230px]" />
                    <Link to={`/movies/${id}`}>Mais detalhes</Link>
                    <button onClick={addToWatched}>Assistido</button>
                    <button onClick={addToWatchLater}>Quero assistir</button>
                </div>
            </div>
        </div>
    );
}
