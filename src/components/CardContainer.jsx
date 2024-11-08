import { useRef } from "react";
import left from "../images/left.svg";
import right from "../images/right.svg";

export default function CardContainer({ titulo, children }) {
    const containerScroll = useRef(null);

    const moverEsquerda = (e) => {
        e.preventDefault();
        containerScroll.current.scrollLeft -= containerScroll.current.offsetWidth
    }

    const moverDireita = (e) => {
        e.preventDefault();
        containerScroll.current.scrollLeft += containerScroll.current.offsetWidth
    }

    return (
        <div className="w-full px-5 relative">
            <h1 className="text-2xl font-semibold mt-10">{titulo}</h1>
            <div className="flex overflow-hidden scrollbar-none" ref={containerScroll}>
                {children}
            </div>
            <button
                onClick={moverDireita}
                className="absolute top-1/2 right-5 transform -translate-y-1/2 z-10"
            >
                <img src={right} alt="Mover para direita" className="w-6 h-6" />
            </button>
            <button
                onClick={moverEsquerda}
                className="absolute top-1/2 left-5 transform -translate-y-1/2 z-10"
            >
                <img src={left} alt="Mover para esquerda" className="w-6 h-6" />
            </button>
        </div>
    );
}
