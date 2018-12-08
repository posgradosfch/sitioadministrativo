/*
-Nombre del Módulo: Formulario de registro y edicion.
-Dirección física: src/app/crear-editar/agregar-editar-ducumento.ts
-Objetivo: Modulo para realizar el ingreso y la edicion de un documento a entregar.
-Desarrollado por: Marisol García.
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '../../../../node_modules/@angular/forms';
import { Subject } from '../../../../node_modules/rxjs';
import { NgbModal } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { debounceTime } from '../../../../node_modules/rxjs/operators';
import { EvaluacionDocente } from '../../clases/evaluacion-docente';
import { MantenimientoEvaluacionService } from '../../servicios/mantenimiento-evaluacion.service';

@Component({
  selector: 'app-crear-editar-evaluacion',
  templateUrl: './crear-editar-evaluacion.component.html',
  styleUrls: ['./crear-editar-evaluacion.component.css']
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
      evaluacion: ['', Validators.required],
      objetivo: ['', Validators.required],
      instrucciones: ['', Validators.required],
      fecha_ini: ['', Validators.required],
      fecha_fin: ['', Validators.required]
    });
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

}
