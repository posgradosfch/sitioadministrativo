export class Docente {
    id: number;
    nombre: string;
    apellido: string;
    usuario: string;
    password: string;
    email: string;
    fecha_naci: Date;
    genero: string;
    dui: string;
    telefono: string;
    moovil: string;
    formacion: Array<string>[];
    titulo_pregrado: Array<string>[];
}
