import { Link } from "react-router-dom";
import type Tema from "../../../models/Tema";

interface CardTemaProps {
    tema: Tema
}

function CardTema({ tema }: CardTemaProps) {
    return (
        <div className='border border-[#4fd1c5]/20 flex flex-col rounded-2xl overflow-hidden justify-between bg-[#111827] shadow-lg'>

            <header className='py-2 px-6 bg-[#0f172a] text-[#4fd1c5] font-bold text-2xl border-b border-[#4fd1c5]/20'>
                Tema
            </header>

            <p className='p-8 text-2xl text-slate-300 bg-[#1e293b] h-full'>
                {tema.descricao}
            </p>

            <div className="flex">
        =
                <Link to={`/editar-tema/${tema.id}`}
                    className='w-full text-[#020617] bg-[#4fd1c5] hover:bg-[#38b2ac] 
        flex items-center justify-center py-2 font-bold transition-all'>
                    <button>Editar</button>
                </Link>

                <Link to={`/deletar-tema/${tema.id}`}
                    className='text-white bg-red-500 hover:bg-red-700 w-full 
        flex items-center justify-center font-bold transition-all'>
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
    )
}
export default CardTema;