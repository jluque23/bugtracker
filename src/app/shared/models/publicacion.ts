import { Usuario } from './usuario';
import { PublicacionCategoria } from './publicacion-categoria';

export class Publicacion {

    id: number;
    titulo: string;
    sinopsis: string;
    autor: Usuario;
    createAt: string;
    foto: string;
    texto: string;
    categorias: PublicacionCategoria[] = [];
}
