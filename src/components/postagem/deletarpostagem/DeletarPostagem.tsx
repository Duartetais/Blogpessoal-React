import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/authContext"
import type Postagem from "../../../models/postagem"
import { buscar, deletar } from "../../../services/service" 
import { ClipLoader } from "react-spinners"

function DeletarPostagem() {

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    const { id } = useParams<{ id: string }>()
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { 'Authorization': token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarPostagem() {
        setIsLoading(true)
        try {
            await deletar(`/postagens/${id}`, {
                headers: { 'Authorization': token }
            })
            alert('Postagem apagada com sucesso')
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                alert('Erro ao deletar a postagem.')
            }
        }
        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/postagens")
    }
    
    return (
        <div className='flex flex-col items-center justify-center bg-[#0d1117] text-white min-h-[80vh] p-4'>
            <div className='container w-full md:w-1/3 mx-auto'>
                <h1 className='text-4xl text-center my-4 font-bold text-[#4fd1c5]'>Deletar Postagem</h1>

                <p className='text-center font-semibold mb-4 text-slate-300'>
                    Você tem certeza de que deseja apagar a postagem a seguir?
                </p>

                <div className='border-2 border-[#4fd1c5] bg-slate-900 flex flex-col rounded-2xl overflow-hidden justify-between shadow-lg shadow-cyan-900/20'>
                    <header 
                        className='py-2 px-6 bg-[#0d1117] text-[#4fd1c5] font-bold text-2xl border-b border-slate-800 uppercase'>
                        Postagem
                    </header>
                    <div className="p-6">
                        <p className='text-2xl font-bold mb-2 text-white'>{postagem.titulo}</p>
                        <p className='text-slate-400'>{postagem.texto}</p>
                    </div>
                    <div className="flex border-t border-slate-800">
                        <button 
                            className='text-white bg-slate-800 hover:bg-slate-700 w-full py-3 transition-all font-bold'
                            onClick={retornar}>
                            Não
                        </button>
                        <button 
                            className='w-full text-white bg-red-900/60 hover:bg-red-700 flex items-center justify-center transition-all font-bold'
                            onClick={deletarPostagem}>

                            { isLoading ? 
                                <ClipLoader color="#ffffff" size={24} /> : 
                                <span>Sim</span>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeletarPostagem