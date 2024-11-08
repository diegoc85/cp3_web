import { coresGenreCard } from "../data/cores"

export default function GenreCard({nome, onclick}) {
    
    const genero = nome.name.toLowerCase()

    const cor = coresGenreCard[genero] 

    return(
        <div className="rounded-xl h-auto p-10 items-center justify-center flex  cursor-pointer max-w-72 w-full" style={{backgroundColor: cor}}  onClick={onclick}>
            <h1 className='font-extrabold'>{nome.name}</h1>
        </div>
    )
}