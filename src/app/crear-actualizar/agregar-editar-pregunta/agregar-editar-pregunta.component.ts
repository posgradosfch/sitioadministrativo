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
import { Categoria } from '../../clases/categoria';
import { Tipo } from '../../clases/tipo';
import { MantenimientoPreguntaService } from '../../servicios/mantenimiento-pregunta.service';

@Component({
  selector: 'app-agregar-editar-pregunta',
  templateUrl: './agregar-editar-pregunta.component.html',
  styleUrls: ['./agregar-editar-pregunta.component.css']
})
export class AgregarEditarPreguntaComponent implements OnInit {

  register:FormGroup;
  loading: boolean;
  _success = new Subject<string>();
  categorias: Categoria[];
  clasificaciones: Categoria[];
  tipos: Tipo[];
  staticAlertClosed = false;
  successMessage: string;
  closeResult: string;
  hide = true;
  datosPregunta;
  myDropDown: string;

  constructor(private preguntaService : MantenimientoPreguntaService,
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
      titulo: ['', Validators.required],
      id_categoria: ['', Validators.required],
      id_clasificacion: [],
      id_tipo: []
    });
    this.mostrarCategoria();
    this.mostrarClasificacion();
    this.mostrarTipos();

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
      this._router.navigate(['/mantenimientoPreguntas']);
    });
  }

  get categoria() { return this.register.get('id_categoria'); }

  get titulo() {  return this.register.get('titulo'); }

  get tipo() {  return this.register.get('id_tipo'); }

  get clasificacion() {   return this.register.get('id_clasificacion'); }

  /*
  -Objetivo: Este metodo es para realizar el registro de los preguntas
  */
  registrarPregunta(){
    this.loading = true;
    if (this.categoria.value === 1) {
      this.datosPregunta = {
        titulo: this.titulo.value,
        id_categoria: this.clasificacion.value,
        id_tipo: 1,
      };
      
      console.log(this.datosPregunta);
    } else {
      this.datosPregunta = {
        titulo: this.titulo.value,
        id_categoria: this.categoria.value,
        id_tipo: this.tipo.value,
      };
      
      console.log(this.datosPregunta);
    }

    this.preguntaService.registrarPregunta(this.datosPregunta).subscribe(
      response=>{        
        this.loading = false;
        this._success.next(`pregunta creada exitosamente`);
        console.log(response);
      }, error=>{
        this.loading = false;
        console.log('error', error);
      });
  }
    
  /*
  Objetivo: Metodo para enlistar los procedimientos en un select.
  */
  mostrarCategoria(){
    this.preguntaService.mostrarCategorias().subscribe(response =>{
      this.categorias = response;
      console.log('categorias', response);
    }, error =>{
      console.log('error', error);
    })
  }

  mostrarClasificacion(){
    this.preguntaService.mostrarClasificacion().subscribe(response =>{
      this.clasificaciones = response.clasificacion;
      console.log('clasificacion', this.clasificaciones);
    }, error =>{
      console.log('error', error);
    })
  }

  mostrarTipos(){
    this.preguntaService.mostrarTipos().subscribe(response =>{
      this.tipos = response.tipos;
      console.log('tipos', this.tipos);
    }, error =>{
      console.log('error', error);
    })
  }

  /*
  -Objetivo: Metodo para abrir ventana emergente al cancelar el formulario.
  */
  openVerticallyCentered(content) {
    this.ngModal.open(content, { centered: true });
    this.register.value.titulo='';
    this.register.value.id_categoria='';
    this.register.value.id_clasificacion='';
    this.register.value.id_tipo='';
  }
}
