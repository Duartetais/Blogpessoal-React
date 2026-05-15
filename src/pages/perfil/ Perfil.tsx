import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/authContext"
import fotoCapa from "../../assets/imagem.jpg"
import fotoPerfilPadrao from "../../assets/perfil.png"

function Perfil() {
    const navigate = useNavigate()

    const { usuario } = useContext(AuthContext)

    useEffect(() => {
        if (usuario.token === "") {
            alert("Você precisa estar logado")
            navigate("/")
        }
    }, [usuario.token])

  return (
        <div className="bg-[#020617] min-h-screen flex justify-center pt-8">
<div className="container mx-auto px-4 rounded-2xl overflow-hidden border-2 border-slate-800 bg-slate-900 shadow-2xl flex flex-col">
                
                <img
                    className="w-full h-72 object-cover border-b-4 border-[#4fd1c5]"
                    src={fotoCapa}
                    alt="Capa do Perfil"
                />

                <div className="relative flex justify-center h-28"> 
                    <img
                        className="rounded-full w-56 h-56 object-cover absolute -top-28 border-4 border-[#4fd1c5] shadow-2xl bg-slate-800"
                        src={fotoPerfilPadrao}
                        alt={`Foto de perfil de ${usuario.nome}`}
                    />
                </div>

                <div className="flex flex-col bg-slate-900 text-white items-center justify-center pb-12 mt-16">
                    <div className="bg-[#0d1117] p-8 rounded-xl border border-slate-800 flex flex-col gap-2 shadow-inner text-center">
                        <p className="text-2xl font-bold">
                            <span className="text-[#4fd1c5]">Operador:</span> {usuario.nome}
                        </p>
                        <p className="text-xl text-slate-300">
                            <span className="text-[#4fd1c5]">ID/Email:</span> {usuario.usuario}
                        </p>
                    </div>
                    
                    <div className="mt-6 text-sm text-[#4fd1c5] animate-pulse uppercase tracking-widest font-bold">
                        Nível de Acesso: Administrador
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Perfil