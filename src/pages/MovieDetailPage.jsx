import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DetalhesFilme() {
    const { id } = useParams();

    const [filme, setFilme] = useState({})
    const [elenco, setElenco] = useState([])
    const [trailers, setTrailers] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const respostaFilme = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`);
                const dadosFilme = await respostaFilme.json();
                setFilme(dadosFilme);

                const respostaElenco = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`);
                const dadosElenco = await respostaElenco.json()
                setElenco(dadosElenco.cast);

                const respostaTrailer = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_API_KEY}&language=en`);
                const dadosTrailer = await respostaTrailer.json()
                setTrailers(dadosTrailer.results)
            } catch (erro) {
                console.log(erro)
            }
        }
        fetchData()
    }, [id])

    const trailerOficial = trailers.find(
        video => video.name === "Official Trailer" && video.site === "YouTube"
    )

    return (
        <div className="flex flex-col items-center text-center my-10 space-y-4">
            <h1 className="text-4xl font-bold">{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`} alt={filme.title} className="w-80" />
            <p className="text-lg">Avaliação: {filme.vote_average}</p>
            <p>Data de lançamento: {filme.release_date}</p>
            <p className="max-w-xl">{filme.overview}</p>
            <div className="flex flex-wrap justify-center gap-2">
                {elenco.map((ator) => (
                    <span key={ator.id} className="text-sm">{ator.name}</span>
                ))}
            </div>
            {trailerOficial ? (
                <div className="my-4 w-full max-w-lg h-96">
                    <iframe
                        src={`https://www.youtube.com/embed/${trailerOficial.key}`}
                        title="Trailer Oficial"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                </div>
            ) : (
                <p>Trailer não disponível</p>
            )}
        </div>
    );
}
