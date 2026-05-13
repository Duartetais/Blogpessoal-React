import { Link } from 'react-router-dom'
import type Postagem from '../../../models/postagem'

interface CardPostagensProps {
    postagem: Postagem
}

function CardPostagem({ postagem }: CardPostagensProps) {
    return (
        <div className='border-[#4fd1c5] border-2 bg-slate-900 
            flex flex-col rounded-xl overflow-hidden justify-between shadow-lg shadow-cyan-900/20'>
                
            <div>
                <div className="flex w-full bg-[#0d1117] py-2 px-4 items-center gap-4 border-b border-slate-800">
                    <img
                        src={postagem.usuario?.foto}
                        className='h-12 w-12 rounded-full border-2 border-[#4fd1c5]'
                        alt={postagem.usuario?.nome} />
                    <h3 className='text-lg font-bold text-[#4fd1c5] uppercase'>
                        {postagem.usuario?.nome}
                    </h3>
                </div>
                
                <div className='p-4 text-white'>
                    <h4 className='text-xl font-bold uppercase text-[#4fd1c5] mb-2'>{postagem.titulo}</h4>
                    <p className='text-slate-300 mb-4'>{postagem.texto}</p>
                    
                    <div className='text-sm text-slate-400 border-t border-slate-800 pt-2'>
                        <p>💻 Tema: <span className='text-[#4fd1c5]'>{postagem.tema?.descricao}</span></p>
                        <p>📅 {new Intl.DateTimeFormat("pt-BR", {
                            dateStyle: 'full',
                            timeStyle: 'medium',
                        }).format(new Date(postagem.data))}</p>
                    </div>
                </div>
            </div>

            <div className="flex border-t border-slate-800">
                <Link to={`/editarpostagem/${postagem.id}`} 
                    className='w-full text-white bg-slate-800 
                    hover:bg-[#6366f1] transition-all flex items-center justify-center py-2'>
                    <button className='font-bold'>Editar</button>
                </Link>
                <Link to={`/deletarpostagem/${postagem.id}`} 
                    className='text-white bg-red-900/50 
                    hover:bg-red-700 w-full flex items-center justify-center transition-all'>
                    <button className='font-bold'>Deletar</button>
                </Link>
            </div>
        </div>
    )
}

export default CardPostagem