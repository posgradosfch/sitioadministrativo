/*
-Nombre del Módulo: Formulario de registro y edicion.
-Dirección física: src/app/crear-editar/agregar-editar-ducumento.ts
-Objetivo: Modulo para realizar el ingreso y la edicion de un documento a entregar.
-Desarrollado por: Marisol García.
*/
import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '../../../../node_modules/@angular/forms';
import { Subject } from '../../../../node_modules/rxjs';
import { NgbModal } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { debounceTime } from '../../../../node_modules/rxjs/operators';
import { EvaluacionDocente } from '../../clases/evaluacion-docente';
import { MantenimientoEvaluacionService } from '../../servicios/mantenimiento-evaluacion.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {NgbTimeStruct, NgbTimeAdapter} from '@ng-bootstrap/ng-bootstrap';

/*
  -Objetivo: Objeto de tipo Genero para generar las opciones del select de genero.
  */
  export interface Ciclo {
    id_ciclo: number;
    numero: number;
    anio: number;
    activo: boolean;
  }

@Injectable()
export class NgbTimeStringAdapter extends NgbTimeAdapter<string> {

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

  toModel(time: NgbTimeStruct): string {
    if (!time) {
      return null;
    }
    return `${this.pad(time.hour)}:${this.pad(time.minute)}:${this.pad(time.second)}`;
  }

  private pad(i: number): string {
    return i < 10 ? `0${i}` : `${i}`;
  }
}


@Component({
  selector: 'app-crear-editar-evaluacion',
  templateUrl: './crear-editar-evaluacion.component.html',
  styleUrls: ['./crear-editar-evaluacion.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'es-SV'},
    {provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter}
  ]
})
export class CrearEditarEvaluacionComponent implements OnInit {

  register:FormGroup;
  loading: boolean;
  _success = new Subject<string>();
  evaluacion: EvaluacionDocente[];
  staticAlertClosed = false;
  successMessage: string;
  closeResult: string;
  hide = true;
  time: '13:30:00';
  ciclos: Ciclo[];

  constructor(private evaluacionServices : MantenimientoEvaluacionService,
    private _router:Router, private fb: FormBuilder, private ngModal: NgbModal) { }
  /*
  -Objetivo: Todos los datos contenidos en este metodo son 
  inicializadas al cargar la vista.
  */
  ngOnInit(): void{
    this.loading = false;
    /*
    -Objetivo: Este metodo es para realizar las validaciones del formulario
    */
    this.register = this.fb.group({
      titulo: ['', Validators.required],
      objetivo: ['', Validators.required],
      instrucciones: ['', Validators.required],
      id_ciclo: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      hora_inicio: ['', Validators.required],
      hora_fin: ['', Validators.required]
    });
    this.mostrarCiclos();
    /*
    -Objetivo: Muestra un mensaje tipo alerta de exito cuando el registro se realiza correctamente
    tiene una duracion de 5 segundos.
    */
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      //Duracion de 5 segundos
      debounceTime(5000) 
    ).subscribe(() => {
      this.successMessage = null;
      this._router.navigate(['/mantenimientoEvaluacionDocente']);
    });
  }
  /*
  -Objetivo: Este metodo es para realizar el registro de los documentos
  */
  registrarEvaluacion(){
    this.loading = true;
    this.evaluacionServices.registrarEvaluacion(this.register.value).subscribe((
      response)=>{        
        this.loading = false;
        this._success.next(`Evento de Evaluación Docente creado exitosamente`);
        console.log(response);
      }, (error)=>{
        this.loading = false;
        console.log(error);
      });
  }
  /*
  -Objetivo: Metodo para abrir ventana emergente al cancelar el formulario.
  */
  openVerticallyCentered(content) {
    this.ngModal.open(content, { centered: true });
    //this.register.value.nombre='';
    //this.register.value.id_paso='';
  }

  /*
  Objetivo: Metodo para enlistar los pasos en un select.
  */
  mostrarCiclos(){
    this.evaluacionServices.getCiclos().subscribe(response =>{
      this.ciclos = response.ciclos;
      console.log('ciclos', response);
    }, error =>{
      console.log('error', error);
    })
  }
}
