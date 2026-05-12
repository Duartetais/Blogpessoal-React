import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/authContext"
import type Tema from "../../../models/Tema"
import { buscar, deletar } from "../../../services/service"
import { ClipLoader } from "react-spinners";

function DeletarTema() {

    const navigate = useNavigate()

    const [tema, setTema] = useState<Tema>({} as Tema)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: {
                    'Authorization': token
                }
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

    async function deletarTema() {
        setIsLoading(true)

        try {
            await deletar(`/temas/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            alert('Tema deletado com sucesso')

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }else {
                alert('Erro ao deletar o tema.')
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/temas")
    }
    
    return (
        <div className='container w-1/3 mx-auto'>
    <h1 className='text-4xl text-center my-4 font-bold text-[#cad0e7]'>Deletar tema</h1>
    
    <p className='text-center font-semibold mb-4 text-[#cad0e7]'>
        Você tem certeza de que deseja apagar o tema a seguir?
    </p>

    <div className='border border-[#4fd1c5]/30 flex flex-col rounded-2xl overflow-hidden justify-between shadow-lg'>
        <header 
            className='py-2 px-6 bg-[#020617] text-[#4fd1c5] font-bold text-2xl'>
            Tema
        </header>
        
        <p className='p-8 text-3xl bg-[#1e293b] text-slate-100 h-full border-x border-[#4fd1c5]/10'>
    {tema.descricao}
        </p>

        
        <div className="flex">
            <button 
                className='text-white bg-red-500 hover:bg-red-700 w-full py-2 font-bold transition-all'
                onClick={retornar}>
                Não
            </button>
            <button 
                className='w-full text-[#020617] bg-[#4fd1c5] hover:bg-[#38b2ac] flex items-center justify-center font-bold transition-all'
                onClick={deletarTema}>

                { isLoading ? 
                    <ClipLoader 
                        color="#020617" 
                        size={24}
                    /> : 
                    <span>Sim</span>
                }
            </button>
        </div>
    </div>
</div>
    )
}
export default DeletarTema