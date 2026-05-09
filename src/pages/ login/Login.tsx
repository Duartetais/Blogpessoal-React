import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../contexts/authContext";
import type UsuarioLogin from "../../models/UsuarioLogin";

import cyberImg from "../../assets/Cyber.png";

function Login() {

    const navigate = useNavigate();

    const { usuario, handleLogin, isLoading } = useContext(AuthContext)

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    )

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home')
        }
    }, [usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        })
    }

    function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(usuarioLogin)
    }

   return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold bg-[#0d1117] text-white">
                
                <form className="flex justify-center items-center flex-col w-1/2 gap-4" onSubmit={login}>
                    <h2 className="text-[#4fd1c5] text-5xl mb-4">Entrar</h2> {/* Cor ciana para o título */}
                    
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario">Usuário</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Usuario"
                            className="border-2 border-slate-700 bg-slate-800 rounded p-2 text-white focus:border-[#4fd1c5] outline-none"
                            value={usuarioLogin.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className="border-2 border-slate-700 bg-slate-800 rounded p-2 text-white focus:border-[#4fd1c5] outline-none"
                            value={usuarioLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>

                    <button 
                        type='submit' 
                        className="rounded bg-[#21226a] hover:bg-[#4f46e5] flex justify-center text-white w-1/2 py-2 transition-all"
                    >
                        {isLoading ? <ClipLoader color="#ffffff" size={24} /> : <span>Entrar</span>}
                    </button>

                    <hr className="border-slate-700 w-full" />

                    <p>
                        Ainda não tem uma conta?{' '}
                        <Link to="/cadastro" className="text-[#4fd1c5] hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </form>

                <div 
                    style={{ backgroundImage: `url(${cyberImg})` }}
                    className="lg:block hidden bg-no-repeat w-full h-full bg-contain bg-center bg-[#0d1117]"
                ></div>
            </div>
        </>
    );
}

export default Login;