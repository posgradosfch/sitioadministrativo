import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '../../../../node_modules/@angular/forms';
import { Subject } from '../../../../node_modules/rxjs';
import { NgbModal } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { debounceTime } from '../../../../node_modules/rxjs/operators';
import { Paso } from '../../clases/paso';
import { Tipo } from '../../clases/tipo';
import { Categoria } from '../../clases/categoria';
import { Pregunta } from '../../clases/pregunta';
import { Procedimiento } from '../../clases/procedimiento';
import { MantenimientoPasosService } from '../../servicios/mantenimiento-pasos.service';
import { MantenimientoProcedimientosService } from '../../servicios/mantenimiento-procedimientos.service';


@Component({
  selector: 'app-agregar-editar-pregunta',
  templateUrl: './agregar-editar-pregunta.component.html',
  styleUrls: ['./agregar-editar-pregunta.component.css']
})
export class AgregarEditarPreguntaComponent implements OnInit {
	register:FormGroup;
  loading: boolean;
  _success = new Subject<string>();
  _error = new Subject<string>();
  categorias: Categoria[];
  tipos: Tipo[];
  pasos: Paso[];
  procedimientos: Procedimiento[];
  staticAlertClosed = false;
  successMessage: string;
  errorMessage: string;
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
      categoria: ['', Validators.required],
      clasificacion: [''],
      tipo: [''],
      titulo: ['', Validators.required]
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
    /*
    -Objetivo: Muestra un mensaje tipo alerta de error cuando el registro se almacena sin exito.
    */
    this._error.subscribe((message) => this.errorMessage = message);
    this._error.pipe(
      debounceTime(5000)
    ).subscribe(() => {
      this.errorMessage = null;
      this._router.navigate(['/paso']);
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
        this._error.next(`Error al crear el Paso de procedimiento. Intente nuevamente!!.`);
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
