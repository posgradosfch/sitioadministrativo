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
import { Paso } from '../../clases/paso';
import { Procedimiento } from '../../clases/procedimiento';
import { Documento } from '../../clases/documento';
import { MantenimientoPasosService } from '../../servicios/mantenimiento-pasos.service';
import { MantenimientoProcedimientosService } from '../../servicios/mantenimiento-procedimientos.service';
import { MantenimientoDocumentosService } from '../../servicios/mantenimiento-documentos.service';

/*
  -Objetivo: Objeto de tipo Genero para generar las opciones del select de genero.
  */
  export interface Ciclo {
    id_ciclo: number;
    numero: number;
    anio: number;
    activo: boolean;
  }

@Component({
  selector: 'app-agregar-editar-documento',
  templateUrl: './agregar-editar-documento.component.html',
  styleUrls: ['./agregar-editar-documento.component.css']
})
export class AgregarEditarDocumentoComponent implements OnInit {

  register:FormGroup;
  loading: boolean;
  _success = new Subject<string>();
  pasos: Paso[];
  procedimientos: Procedimiento[];
  documento: Documento[];
  staticAlertClosed = false;
  successMessage: string;
  closeResult: string;
  hide = true;
  ciclos: Ciclo[];
  
  constructor(private pasoServices : MantenimientoPasosService,
    private procedimientoServices : MantenimientoProcedimientosService, 
    private documentoServices : MantenimientoDocumentosService,
    private _router:Router, private fb: FormBuilder, private ngModal: NgbModal) { }
  /*
  -Objetivo: Todos los datos contenidos en este metodo son 
  inicializadas al cargar la vista.
  */
  ngOnInit() {
    this.loading = false;
    /*
    -Objetivo: Este metodo es para realizar las validaciones del formulario
    */
    this.register = this.fb.group({
      nombre: ['', Validators.required],
      id_paso: ['', Validators.required]
    });
    this.mostrarPaso();
    this.mostrarProcedimiento();
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
      this._router.navigate(['/mantenimientoDocumentos']);
    });
  }
  /*
  -Objetivo: Este metodo es para realizar el registro de los documentos
  */
  registrarDocumento(){
    this.loading = true;
    this.documentoServices.registrarDocumento(this.register.value).subscribe((
      response)=>{        
        this.loading = false;
        this._success.next(`Documento a entregar creado exitosamente`);
        console.log(response);
      }, (error)=>{
        this.loading = false;
        console.log(error);
      });
  }
  /*
  Objetivo: Metodo para enlistar los pasos en un select.
  */
  mostrarPaso(){
    this.pasoServices.getPasos().subscribe(response =>{
  		this.pasos = response;
  		console.log('pasos', response);
  	}, error =>{
  		console.log('error', error);
  	})
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
  /*
  -Objetivo: Metodo para abrir ventana emergente al cancelar el formulario.
  */
  openVerticallyCentered(content) {
    this.ngModal.open(content, { centered: true });
    this.register.value.nombre='';
    this.register.value.id_paso='';
  }
}
