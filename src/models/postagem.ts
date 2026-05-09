import type Tema from "./Tema.ts";
import type Usuario from "./Usuario.ts";

export default interface Postagem {
    id: number;
    titulo: string;
    texto: string;
    data: string; // No Front, tratamos como string para exibição
    tema: Tema | null;
    usuario: Usuario | null;
}