import { useNavigate } from 'react-router-dom';
import cyberImg from "../../assets/imag.jpeg";

function Cadastro() {
  
  const navigate = useNavigate();

  return (
    <>
  
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold bg-[#0d1117] text-white">
        
     
      <div className="lg:flex hidden w-full h-full justify-center items-center overflow-hidden">
    
    <div className="w-130 h-130 overflow-hidden border-4 border-[#4fd1c5] rounded-[60px] animar-losango bg-slate-900">
        <img 
            src={cyberImg} 
            alt="Imagem de Cadastro" 
            className="-rotate- scale-[1.35] w-full h-full object-cover"
        />
    </div>
</div>


        <form className='flex justify-center items-center flex-col w-2/3 gap-3 z-10'>
          <h2 className='text-[#4fd1c5] text-5xl mb-6'>Cadastrar</h2>
          
          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Seu nome completo"
              className="border-2 border-slate-700 bg-slate-800 rounded p-2 text-white outline-none focus:border-[#4fd1c5] transition-colors"
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuário</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Ex: usuario@email.com"
              className="border-2 border-slate-700 bg-slate-800 rounded p-2 text-white outline-none focus:border-[#4fd1c5] transition-colors"
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto (URL)</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Link da sua foto de perfil"
              className="border-2 border-slate-700 bg-slate-800 rounded p-2 text-white outline-none focus:border-[#4fd1c5] transition-colors"
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Mínimo 8 caracteres"
              className="border-2 border-slate-700 bg-slate-800 rounded p-2 text-white outline-none focus:border-[#4fd1c5] transition-colors"
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Repita sua senha"
              className="border-2 border-slate-700 bg-slate-800 rounded p-2 text-white outline-none focus:border-[#4fd1c5] transition-colors"
            />
          </div>

          <div className="flex justify-around w-full gap-8 mt-6">
            <button
              type='reset'
              onClick={() => navigate('/login')}
              className='rounded text-white bg-red-500 hover:bg-red-700 w-1/2 py-2 transition-all shadow-md'
            >
              Cancelar
            </button>
            <button
              type='submit'
              className='rounded text-white bg-[#6366f1] hover:bg-[#4f46e5] w-1/2 py-2 flex justify-center transition-all shadow-md shadow-indigo-500/20'
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Cadastro;