import { Usuario } from './usuario';
import { Bugcomentario } from './bugcomentario';

export class Bug {
    id: number;
    descripcion: string;
    title: string;
    usuario: Usuario;
    createAt: string;
    bugComentario: Bugcomentario [] = [];
    enabled: boolean;
    foto: string;
}
