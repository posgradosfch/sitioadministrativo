/*
-Nombre del Módulo: Agregar Editar Noticia.
-Dirección física: src/app/crear-editar/agregar-editar-noticia.ts
-Objetivo: Modulo para realizar el ingreso y la edicion de un noticia.
-Desarrollado por: Marisol García.
*/
import { Component, OnInit } from '@angular/core';
import { MantenimientoNoticiasService } from '../../servicios/mantenimiento-noticias.service';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from '../../../../node_modules/rxjs';
import { debounceTime } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-agregar-editar-noticia',
  templateUrl: './agregar-editar-noticia.component.html',
  styleUrls: ['./agregar-editar-noticia.component.css']
})
export class AgregarEditarNoticiaComponent implements OnInit {

  register:FormGroup;
  loading: boolean;
  _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  closeResult: string;
  hide = true;
  constructor(private noticiasService : MantenimientoNoticiasService,
    private router:Router, private fb: FormBuilder, private ngModal: NgbModal) {
     }
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
        cuerpo: ['', Validators.required],
        emcabezado: ['', Validators.required]
      });
      /*
      -Objetivo: Muestra un mensaje tipo alerta de exito cuando el registro se realiza correctamente.
      */
      this._success.subscribe((message) => this.successMessage = message);
      this._success.pipe(
        debounceTime(5000)
      ).subscribe(() => {
        this.successMessage = null;
        this.router.navigate(['/mantenimientoNoticias']);
      });
  	}
  /*
  -Objetivo: Este metodo es para realizar el registro de las noticias
  */
  registrarNoticia(){
    this.loading = true;
     this.noticiasService.agregarNoticia(this.register.value).subscribe(
      response => {
        this.loading = false;
        this._success.next(`Noticia creada exitosamente`);
        console.log(response);
      }, error => {
        this.loading = false;
        console.log('error', error);
      })
    console.log(this.register.value);
 }
  /*
  -Objetivo: Metodo para abrir ventana emergente al cancelar el formulario.
  */
  openVerticallyCentered(content) {
    this.ngModal.open(content, { centered: true });
  }

}
