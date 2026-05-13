import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/authContext";
import type Postagem from "../../../models/postagem";
import { buscar } from "../../../services/service";
import CardPostagem from "../cardpostagem/CardPostagem";

function ListaPostagens() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [postagens, setPostagens] = useState<Postagem[]>([])
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscarPostagens()    
    }, [postagens.length])

    async function buscarPostagens() {
        try {
            setIsLoading(true)
            await buscar('/postagens', setPostagens, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="bg-[#0d1117] min-h-[80vh] flex flex-col items-center">
                
                {isLoading && (
                    <div className="flex justify-center items-center w-full my-20">
                        <SyncLoader
                            color="#4fd1c5"
                            size={20}
                        />
                    </div>
                )}

                <div className="flex justify-center w-full my-4">
                    <div className="container flex flex-col p-4">

                        {(!isLoading && postagens.length === 0) && (
                            <div className="flex flex-col items-center gap-4 my-20">
                                <span className="text-3xl text-center text-[#4fd1c5] font-bold uppercase tracking-widest">
                                    Nenhuma Postagem foi encontrada!
                                </span>
                                <p className="text-slate-400">O banco de dados parece estar vazio por enquanto.</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {postagens.map((postagem) => (
                                <CardPostagem key={postagem.id} postagem={postagem}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListaPostagens;