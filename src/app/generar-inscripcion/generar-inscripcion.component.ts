/*
-Nombre del Módulo: generador de inscripcion provisional.
-Dirección física: src/app/generar-inscripcion.ts
-Objetivo: Modulo para crear inscripcion prvisional por materia.
-Desarrollado por: Veronica Reyes.
*/
import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '../../../node_modules/@angular/forms';
import { Subject } from '../../../node_modules/rxjs';
import { NgbModal } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { debounceTime } from '../../../node_modules/rxjs/operators';
import { Ciclo } from '../clases/ciclo';
import { MantenimientoMateriasService } from '../servicios/mantenimiento-materias.service';
import { MantenimientoProgramasService } from '../servicios/mantenimiento-programas.service';
import { Programas } from '../clases/programas';
import { Materia } from '../clases/materia';
import { GestionInscripcionService } from '../servicios/gestion-inscripcion.service';
import { MantenimientoAulasService } from '../servicios/mantenimiento-aulas.service';
import { Aulas } from '../clases/aulas';
import { MantenimientoHorariosService } from '../servicios/mantenimiento-horarios.service';
import { Horario } from '../clases/horario';
import { MantenimientoDocentesService } from '../servicios/mantenimiento-docentes.service';
import { Docente } from '../clases/docente';
import {NgbTimeStruct, NgbTimeAdapter} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class NgbTimeStringAdapter extends NgbTimeAdapter<string> {
/*
-Objetivo: Función encargada de cambiar el formato de la hora de json a hh:mm:ss
*/
  fromModel(value: string): NgbTimeStruct {
    if (!value) {
      return null;
    }
    const split = value.split(':');
    return {
      hour: parseInt(split[0], 10),
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10)
    };
  }

  toModel(horaInicio: NgbTimeStruct): string {
    if (!horaInicio) {
      return null;
    }
    return `${this.pad(horaInicio.hour)}:${this.pad(horaInicio.minute)}:${this.pad(horaInicio.second)}`;
  }

  private pad(i: number): string {
    return i < 10 ? `0${i}` : `${i}`;
  }
}

@Component({
  selector: 'app-generar-inscripcion',
  templateUrl: './generar-inscripcion.component.html',
  styleUrls: ['./generar-inscripcion.component.css'],
  providers: [{provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter}]
})
export class GenerarInscripcionComponent implements OnInit {
  programas: Programas[];
  materias: Materia[];
  ciclos: Ciclo[];
  aulas: Aulas[];
  horarios: Horario[];
  docentes: Docente[];
  // parametros usados para mostrar mensajes con ngbootstrap
  loading: boolean;
  _success = new Subject<String>();
  staticAlertClosed = false;
  successMessage: String;
  closeResult: String;
  hide = true;
  // parametros que utiliza el stepper
  isLinear = true;
  firstFormGroup: FormGroup; // primer Formulario del stepper
  secondFormGroup: FormGroup; // segundo formulario del stepper
  // variables usadas para el select de dias
  ListaDias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  // variables usadas para la configiracion de los Time picker de ngbootstrap
  time: '13:30:00';
  seconds = true;
  spinners = true;
  // variable que se enviara al servicio de /inscripcion
  datosPeriodoInscripcion;

  constructor(private _formBuilder: FormBuilder, private programasService: MantenimientoProgramasService,
    private MateriasService: MantenimientoMateriasService, private inscripcionService: GestionInscripcionService,
     private AulasService: MantenimientoAulasService, private HorariosService: MantenimientoHorariosService,
      private docenteService: MantenimientoDocentesService) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      idPrograma: ['', Validators.required],
      idCiclo: ['', Validators.required],
      idMateria: ['', Validators.required],
      grupos: this._formBuilder.array([])
    });
    this.secondFormGroup = this._formBuilder.group({
   //   idCiclo: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.pattern('^[ A-Za-záéíóúÁÉÍÓÚñ]+$')]],
      diaInicio: ['', Validators.required],
      diaFin: ['', Validators.required ],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required],
   //   id_programa: ['', Validators.required],

    });

     /*
  -Objetivo: Muestra un mensaje tipo alerta de exito cuando el registro se realiza correctamente
  tiene una duracion de 5 segundos.
  */
   this._success.subscribe((message) => this.successMessage = message);
   this._success.pipe(
    debounceTime(5000)
  ).subscribe(() => {
    this.successMessage = null;
  });
    this.getMaterias();
    this.getProgramas();
    this.getCiclos();
    this.getAulas();
    this.getHorarios();
    this.getDocentes();
    this.addGrupo();
  }

  /* Objetivo:
  Manejar el json de grupos
  */
 get grupoForms() {
  return this.firstFormGroup.get('grupos') as FormArray;
}

 /*
  -Objetivo: Obtener los valores del FormBuilder secondFormGroup.
  */
get horaFinFormDos() {  return this.secondFormGroup.get('horaFin'); }
get horaInicioFormDos() {   return this.secondFormGroup.get('horaInicio'); }
get diaInicioFormDos() { return this.secondFormGroup.get('diaInicio'); }
get diaFinFormDos() {  return this.secondFormGroup.get('diaFin'); }
get nombreFormDos() { return this.secondFormGroup.get('nombre'); }
get idCicloFormUno() { return this.firstFormGroup.get('idCiclo'); }
get idProgramaFormUno() { return this.firstFormGroup.get('idPrograma'); }


addGrupo() {

  const grupo = this._formBuilder.group({
    idAula:  ['', Validators.required],
    idHorario:  ['', Validators.required],
    idDocente:  ['', Validators.required],
    cupo:  ['', Validators.required],
    multiple:  ['', Validators.required],
    numeroGrupo: ['', Validators.required],
  });

  this.grupoForms.push(grupo);
}

deleteGrupo(i) {
  this.grupoForms.removeAt(i);
}

   /*Objetivo:
  Devolver un listado de materias para se usado en el combox
  */
  getMaterias() {
    this.MateriasService.getMaterias().subscribe( response => {
      this.materias = response.materias;
      console.log('esto tiene materias');
      console.log('materias', this.materias);
    }, error => {
      console.log('error', error);
    });
  }
  /*Objetivo:
  Devolver un listado de programas para se usado en el combox
  */
  getProgramas() {
    this.programasService.getProgramas().subscribe( response => {
     this.programas = response.programas;
     console.log('esto tiene programas');
     console.log('programas', this.programas);
   }, error => {
     console.log('error', error);
   });
 }

 getCiclos() {
   this.inscripcionService.getCiclos().subscribe(response => {
     this.ciclos = response.ciclos;
     console.log('esto tiene ciclos');
     console.log('ciclos', this.ciclos);
   }, error => {
     console.log('error', error);
   });
 }

 getAulas() {
  this.AulasService.getAulas().subscribe( response => {
   this.aulas = response.aulas;
   console.log('esto tiene aulas');
   console.log('aulas', this.aulas);
 }, error => {
   console.log('error', error);
 });
}

getHorarios() {
  this.HorariosService.getHorarios().subscribe( response => {
    this.horarios = response.horarios;
    console.log('esto tiene horarios');
    console.log('horarios', this.horarios);
  }, error => {
    console.log('error', error);
  });
}

getDocentes() {
  this.docenteService.getDocentes().subscribe(docentes => {
    this.docentes = docentes;
    this.docentes = docentes;
    console.log('docentes', docentes);
  }, error => {
    console.log('error', error);
  });
}

guardarGT() {
  this.inscripcionService.registrarGrupoT(this.firstFormGroup.value).subscribe( (response) => {
    this.loading = false;
    this._success.next('Grupo creado exitosamente');
    console.log(response);
  }, (error) => {
    this.loading = false;
    console.log(error);
  });

}

guardarPeriodoInscripcion() {
  this.loading = true;
  console.log(this.secondFormGroup.value);
  this.datosPeriodoInscripcion = {
    idCiclo: this.idCicloFormUno.value,
    nombre: this.nombreFormDos.value,
    diaInicio: this.diaInicioFormDos.value + ' ' + this.horaInicioFormDos.value,
    diaFin: this.diaFinFormDos.value + ' ' +  this.horaFinFormDos.value,
    id_programa: this.idProgramaFormUno.value,
  };
  console.log(this.datosPeriodoInscripcion);
  console.log('esto se mandara a la ruta');
  console.log(this.datosPeriodoInscripcion);

  this.inscripcionService.periodoInscripcion(this.datosPeriodoInscripcion).subscribe(
   response => {
     this.loading = false;
     this._success.next('periodo de inscripcion creado exitosamente');
     console.log(response);
   }, error => {
     console.log('error', error);
   });

}


}
