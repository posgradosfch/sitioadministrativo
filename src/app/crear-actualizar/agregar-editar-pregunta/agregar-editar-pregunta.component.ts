/*
-Nombre del Módulo: Formulario de registro y edicion.
-Dirección física: src/app/crear-editar/agregar-editar-paso.ts
-Objetivo: Modulo para realizar el ingreso y la edicion de una pregunta del 
           instrumento de Evaluacion Docente.
-Desarrollado por: Marisol García.
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '../../../../node_modules/@angular/forms';
import { Subject } from '../../../../node_modules/rxjs';
import { NgbModal } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { debounceTime } from '../../../../node_modules/rxjs/operators';
import { Pregunta } from '../../clases/pregunta';
import { Categoria } from '../../clases/categoria';
import { Tipo } from '../../clases/tipo';
import { MantenimientoPreguntaService } from '../../servicios/mantenimiento-pregunta.service';

  const Elementos: Categoria[] = [
  {id: 1, name: 'Seccion A', padre: 0},
  {id: 2, name: 'Seccion B', padre: 0},
  {id: 3, name: 'Planeacion', padre: 1},
];

  const Tipos: Tipo[] = [
  {id: 1, name: 'Seleccion'},
  {id: 2, name: 'Comentario'},
  {id: 23, name: 'SI/NO'},
];

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
  pregunta: Pregunta[];
  datosPregunta;
  categorias : Categoria[];
  tipos : Tipo[];
  staticAlertClosed = false;
  successMessage: string;
  errorMessage: string
  closeResult: string;
  hide = true;
  myDropDown: string;
  
  constructor(private preguntaServices : MantenimientoPreguntaService,
    private _router:Router, private fb: FormBuilder, private ngModal: NgbModal) { 

  }
  /*
  -Objetivo: Todos los datos contenidos en este metodo son 
  inicializadas al cargar la vista.
  */
  ngOnInit(): void{

  	this.categorias = Elementos;
  	this.tipos = Tipos;

    console.log(this.categorias);
    this.loading = false;
    /*
    -Objetivo: Este metodo es para realizar las validaciones del formulario
    */
    this.register = this.fb.group({
      nombre: ['', Validators.required],
      clasificacion: [],
      categoria: ['', Validators.required],
      tipo: []
    });
    /*
    -Objetivo: Muestra un mensaje tipo alerta de exito cuando el registro se realiza correctamente.
    */
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => {
      this.successMessage = null;
      this._router.navigate(['/mantenimientoPreguntas']);
    });
    /*
    -Objetivo: Muestra un mensaje tipo alerta de error cuando el registro se almacena sin exito.
    */
    this._error.subscribe((message) => this.errorMessage = message);
    this._error.pipe(
      debounceTime(5000)
    ).subscribe(() => {
      this.errorMessage = null;
      this._router.navigate(['/pregunta']);
    });
  }
  /*
  -Objetivo: Este metodo es para realizar el registro de los preguntas
  */
  registrarPregunta(){
    this.loading = true;
    if (this.register.get('id').value === 1) {
      
      console.log(this.register.get('id').value);
    }
    this.preguntaServices.registrarPregunta(this.register.value).subscribe((
      response)=>{        
        this.loading = false;
        this._success.next(`pregunta creada exitosamente`);
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
    this.register.value.id_categoria='';
    this.register.value.id_tipo='';
  }

  /*
  Objetivo: Metodo para enlistar los procedimientos en un select.
  */
  mostrarCategorias(){
    this.preguntaServices.getCategorias().subscribe(response =>{
  		this.categorias = response;
  		console.log('categorias', response);
  	}, error =>{
  		console.log('error', error);
  	})
  }
  mostrarTipos(){
    this.preguntaServices.getTipos().subscribe(response =>{
      this.tipos = response;
      console.log('tipos', response);
    }, error =>{
      console.log('error', error);
    })
  }


}
