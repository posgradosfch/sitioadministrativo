import { Time } from '@angular/common';

export class EvaluacionDocente {
	id_encuesta: number;
	titulo: string;
	objetivo: string;
	instrucciones: string;
	id_ciclo: number;
	fecha_inicio: Date;
	fecha_fin: Date;
	hora_inicio: Time;
	hora_fin: Time;
	activo: boolean;
	anio_ciclo: number;
}
