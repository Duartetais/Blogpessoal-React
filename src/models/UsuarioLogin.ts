export default interface UsuarioLogin {
    id: number;
    nome: string;
    usuario: string;
    senha?: string; // opcional no retorno do login
    foto: string;
    token: string;
}