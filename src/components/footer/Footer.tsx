import { FacebookLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"

function Footer() {

    let data = new Date().getFullYear()

    return (
        <>
            <div className="flex justify-center bg-[#020617] text-white border-t-2 border-[#4fd1c5]">
                <div className="container flex flex-col items-center py-4">
                    <p className='text-xl font-bold'>
                       Cyber Blog Generation | Copyright: {data}
                    </p>
                    <p className='text-lg mb-2'>Acesse nossas redes sociais</p>
                    <div className='flex gap-4'>
                        <a href="https://www.linkedin.com/in/seu_usuario" target="_blank" rel="noopener noreferrer" className="hover:text-[#4fd1c5] transition-colors">
                            <LinkedinLogoIcon size={48} weight='bold' />
                        </a>
                        <a href="https://www.instagram.com/seu_usuario" target="_blank" rel="noopener noreferrer" className="hover:text-[#4fd1c5] transition-colors">
                            <InstagramLogoIcon size={48} weight='bold' />
                        </a>
                        <a href="https://www.facebook.com/seu_usuario" target="_blank" rel="noopener noreferrer" className="hover:text-[#4fd1c5] transition-colors">
                            <FacebookLogoIcon size={48} weight='bold' />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer