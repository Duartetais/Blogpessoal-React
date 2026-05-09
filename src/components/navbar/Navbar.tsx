import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/authContext";
 
function Navbar() {
 
    const navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext)
 
    function logout() {
        handleLogout()
        alert('O Usuário foi desconectado com sucesso!')
        navigate('/')
    }
 
    return (
        <>
            <div className='w-full flex justify-center py-4 bg-[#020617] text-white border-b-2 border-[#4fd1c5] sticky top-0 z-50 shadow-2xl'>
 
                <div className="container flex justify-between text-lg mx-8 items-center">
                    <Link to='/home' className="text-2xl font-bold text-[#4fd1c5] hover:text-white transition-all">
                        Blog Pessoal
                    </Link>

                    <p className="hidden md:block text-sm uppercase tracking-widest font-light">
                        Protocolo: <span className="text-[#4fd1c5] font-bold">Cyber Segurança</span> | Operador: <span className="text-[#4fd1c5]">{usuario.nome}</span>
                    </p>

                    <div className='flex gap-6 items-center text-sm font-medium'>
                        <Link to='/postagens' className='hover:text-[#4fd1c5] transition-colors'>Postagens</Link>
                        <Link to='/temas' className='hover:text-[#4fd1c5] transition-colors'>Temas</Link>
                        <Link to='/cadastrar-tema' className='hover:text-[#4fd1c5] transition-colors'>Cadastrar tema</Link>
                        <Link to='/perfil' className='hover:text-[#4fd1c5] transition-colors'>Perfil</Link>
                        
                        <Link 
                            to='' 
                            onClick={logout} 
                            className='bg-red-500/20 border border-red-500/50 px-4 py-1 rounded-md hover:bg-red-600 transition-all text-xs uppercase'
                        >
                            Sair
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
 
export default Navbar;