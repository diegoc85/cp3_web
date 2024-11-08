import { useEffect, useState } from "react";

function ListaFilmes() {
    const [assistir, setAssistir] = useState([])
    const [assistido, setAssistido] = useState([])

    useEffect(() => {
        const storedAssistir = JSON.parse(localStorage.getItem('watchLater')) || []
        const storedAssistido = JSON.parse(localStorage.getItem('watched')) || []
        
        setAssistir(storedAssistir)
        setAssistido(storedAssistido)
    }, [])

    return (  
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 text-center mt-5">

            <div className="flex flex-col justify-start items-center bg-slate-600 rounded-lg">
                <h2 className="font-extrabold text-xl mb-4">Quero Assistir</h2>
                <ul className="flex flex-col items-center">
                    {assistir.length > 0 ? (
                        assistir.map((item) => (
                            <div key={item.name} className="w-40 mb-5">
                                <li className="text-sm font-semibold">{item.name}</li>
                                <img src={`https://image.tmdb.org/t/p/w154${item.poster}`} alt={item.name} className="my-2 rounded-lg" />
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">Lista de filmes para assistir vazia!</p>
                    )}
                </ul>
            </div>

            
            <div className="flex flex-col justify-start items-center bg-slate-600 rounded-lg">
                <h2 className="font-extrabold text-xl mb-4">Assistido</h2>
                <ul className="flex flex-col items-center">
                    {assistido.length > 0 ? (
                        assistido.map((item) => (
                            <div key={item.name} className="w-40 mb-5">
                                <li className="text-sm font-semibold">{item.name}</li>
                                <img src={`https://image.tmdb.org/t/p/w154${item.poster}`} alt={item.name} className="my-2 rounded-lg" />
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">Lista de filmes assistidos vazia!</p>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default ListaFilmes;
