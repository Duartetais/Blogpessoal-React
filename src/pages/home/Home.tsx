import ListaPostagens from "../../components/postagem/listapostagem/ListaPostagens";
import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem";
import homeImg from "../../assets/blog.jpg";

function Home() {
    return (
        <>
            <div className="bg-[#0d1117] flex justify-center py-12 min-h-[80vh]">
                <div className='container grid grid-cols-1 md:grid-cols-2 text-white'>
                    <div className="flex flex-col gap-4 items-center justify-center py-4">

                        <h2 className='text-5xl font-bold text-[#4fd1c5] text-center uppercase tracking-tighter'>
                            Seja Bem Vinde!
                        </h2>
                        <p className='text-xl text-center text-slate-300'>
                            Deixe suas dúvidas e vamos fortalecer nossa base de conhecimento.
                        </p>

                        <div className="flex justify-around gap-4">
                          
                            <ModalPostagem />
                        </div>
                    </div>

                    <div className="flex justify-center items-center">
                        <div className="w-112.5 h-112.5 overflow-hidden border-4 border-[#4fd1c5] rounded-full animar-redondo bg-slate-900 shadow-2xl shadow-cyan-900/20">
                            <img
                                src={homeImg} 
                                alt="Imagem Cibersegurança"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
            
          
            <ListaPostagens />
        </>
    );
}

export default Home;