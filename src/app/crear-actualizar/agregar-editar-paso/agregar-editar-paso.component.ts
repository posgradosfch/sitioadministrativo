/*
-Nombre del Módulo: Formulario de registro y edicion.
-Dirección física: src/app/crear-editar/agregar-editar-paso.ts
-Objetivo: Modulo para realizar el ingreso y la edicion de un paso.
-Desarrollado por: Marisol García.
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '../../../../node_modules/@angular/forms';
import { Subject } from '../../../../node_modules/rxjs';
import { NgbModal } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { debounceTime } from '../../../../node_modules/rxjs/operators';
import { Paso } from '../../clases/paso';
import { Procedimiento } from '../../clases/procedimiento';
import { MantenimientoPasosService } from '../../servicios/mantenimiento-pasos.service';
import { MantenimientoProcedimientosService } from '../../servicios/mantenimiento-procedimientos.service';


@Component({
  selector: 'app-agregar-editar-paso',
  templateUrl: './agregar-editar-paso.component.html',
  styleUrls: ['./agregar-editar-paso.component.css']
})
export class AgregarEditarPasoComponent implements OnInit {
  register:FormGroup;
  loading: boolean;
  _success = new Subject<string>();
  pasos: Paso[];
  procedimientos: Procedimiento[];
  staticAlertClosed = false;
  successMessage: string;
  closeResult: string;
  hide = true;
  
  constructor(private pasoServices : MantenimientoPasosService, private procedimientoServices : MantenimientoProcedimientosService,
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
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      id_proceimiento: ['', Validators.required]
    });
    this.mostrarProcedimiento();
    /*
    -Objetivo: Muestra un mensaje tipo alerta de exito cuando el registro se realiza correctamente.
    */
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => {
      this.successMessage = null;
      this._router.navigate(['/mantenimientoPasos']);
    });
  }
  /*
  -Objetivo: Este metodo es para realizar el registro de los pasos
  */
  registrarPaso(){
    this.loading = true;
    this.pasoServices.registrarPaso(this.register.value).subscribe((
      response)=>{        
        this.loading = false;
        this._success.next(`Paso de procedimiento creado exitosamente`);
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
    this.register.value.nombre='';
    this.register.value.descripcion='';
    this.register.value.id_proceimiento='';
  }

  /*
  Objetivo: Metodo para enlistar los procedimientos en un select.
  */
  mostrarProcedimiento(){
    this.procedimientoServices.getProcedimiento().subscribe(response =>{
  		this.procedimientos = response;
  		console.log('procedimientos', response);
  	}, error =>{
  		console.log('error', error);
  	})
  }

}
