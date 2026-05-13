import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/authContext";
import type Postagem from "../../../models/postagem";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/service";
import type Usuario from "../../../models/Usuario";

function FormPostagem() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [temas, setTemas] = useState<Tema[]>([])
    const [tema, setTema] = useState<Tema>({ id: 0, descricao: '', })
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token
    const { id } = useParams<{ id: string }>()

    async function buscarPostagemPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    async function buscarTemaPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    async function buscarTemas() {
        try {
            await buscar('/temas', setTemas, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado');
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        buscarTemas()
        if (id !== undefined) {
            buscarPostagemPorId(id)
        }
    }, [id])

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
        })
    }, [tema])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: usuario as Usuario,
        });
    }

    function retornar() {
        navigate('/postagens');
    }

    async function gerarNovaPostagem(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/postagens`, postagem, setPostagem, {
                    headers: { Authorization: token },
                });
                alert('Postagem atualizada com sucesso')
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    alert('Erro ao atualizar a Postagem')
                }
            }
        } else {
            try {
                await cadastrar(`/postagens`, postagem, setPostagem, {
                    headers: { Authorization: token },
                })
                alert('Postagem cadastrada com sucesso');
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    alert('Erro ao cadastrar a Postagem');
                }
            }
        }

        setIsLoading(false)
        retornar()
    }

    const carregandoTema = tema.descricao === '';

    return (
        <div className="flex flex-col items-center justify-center bg-[#0d1117] text-white min-h-[80vh] p-8">

            <h1 className="text-4xl text-center my-8 font-bold text-[#4fd1c5] uppercase tracking-widest">
                {id !== undefined ? 'Editar Postagem' : 'Nova Postagem'}
            </h1>

            <form className="flex flex-col w-full md:w-2/3 lg:w-1/2 gap-4 bg-slate-900 p-10 rounded-2xl border border-slate-800 shadow-2xl"
                onSubmit={gerarNovaPostagem}>

                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo" className="font-semibold text-slate-300">Título da Postagem</label>
                    <input
                        type="text"
                        placeholder="Insira o título"
                        name="titulo"
                        required
                        className="bg-[#0d1117] border-2 border-slate-700 rounded-lg p-3 focus:border-[#4fd1c5] outline-none transition-all text-white placeholder-slate-500"
                        value={postagem.titulo}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="texto" className="font-semibold text-slate-300">Conteúdo</label>
                    <textarea
                        placeholder="Escreva sua dúvida ou conhecimento..."
                        name="texto"
                        required
                        rows={4}
                        className="bg-[#0d1117] border-2 border-slate-700 rounded-lg p-3 focus:border-[#4fd1c5] outline-none transition-all text-white placeholder-slate-500 resize-none"
                        value={postagem.texto}
                        onChange={(e: any) => atualizarEstado(e)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <p className="font-semibold text-slate-300">Selecione o Tema</p>
                    <select
                        name="tema"
                        id="tema"
                        className='bg-[#0d1117] border-2 border-slate-700 p-3 rounded-lg focus:border-[#4fd1c5] outline-none text-white cursor-pointer'
                        onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
                    >
                        <option value="" selected disabled>Escolha uma categoria</option>
                        {temas.map((tema) => (
                            <option key={tema.id} value={tema.id} className="bg-slate-900">{tema.descricao}</option>
                        ))}
                    </select>
                </div>

                <button
                    type='submit'
                    className='rounded-xl disabled:bg-slate-800 bg-[#6366f1] hover:bg-[#4fd1c5] 
                               text-white font-bold w-full md:w-1/2 mx-auto py-4 mt-6 flex justify-center transition-all shadow-lg uppercase tracking-wider disabled:cursor-not-allowed'
                    disabled={carregandoTema || isLoading}
                >
                    {isLoading ?
                        <ClipLoader color="#ffffff" size={24} /> :
                        <span>{id === undefined ? 'Confirmar Cadastro' : 'Salvar Alterações'}</span>
                    }
                </button>
            </form>
        </div>
    );
}

export default FormPostagem;