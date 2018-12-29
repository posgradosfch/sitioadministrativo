import { Paso } from '../clases/paso';

export class Documento {
	id: number;
    nombre: string;
    id_paso: Paso[];
    orden: number;
    entregado: boolean;
}
