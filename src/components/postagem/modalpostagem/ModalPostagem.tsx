import Popup from "reactjs-popup";
import FormPostagem from '..//formpostagem/FormPostagem';

function ModalPostagem() {
    return (
        <>
            <Popup
                trigger={
       
                    <button 
                        className='border-2 border-[#4fd1c5] text-[#4fd1c5] rounded-full px-6 py-2 font-bold hover:bg-[#6366f1] hover:text-white transition-all shadow-lg'>
                        Nova Postagem
                    </button>
                }
                modal
              
                contentStyle={{
                    borderRadius: '1.5rem',
                    padding: '0', 
                    backgroundColor: '#0d1117', 
                    border: '2px solid #4fd1c5',
                    width: '90%', 
                    maxWidth: '800px'
                }}
                overlayStyle={{
                    background: 'rgba(0, 0, 0, 0.7)' 
                }}
            >
                <FormPostagem />
            </Popup>
        </>
    );
}

export default ModalPostagem;