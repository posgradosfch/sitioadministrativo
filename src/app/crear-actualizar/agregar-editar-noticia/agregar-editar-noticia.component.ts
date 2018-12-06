/*
-Nombre del Módulo: Agregar Editar Noticia.
-Dirección física: src/app/crear-editar/agregar-editar-noticia.ts
-Objetivo: Modulo para realizar el ingreso y la edicion de un noticia.
-Desarrollado por: Marisol García.
*/
import { Component, OnInit } from '@angular/core';
import { MantenimientoNoticiasService } from '../../servicios/mantenimiento-noticias.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subject } from '../../../../node_modules/rxjs';
import { debounceTime } from '../../../../node_modules/rxjs/operators';
import { GlobalService } from '../../servicios/global.service';
import { Subscription } from 'rxjs';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-agregar-editar-noticia',
  templateUrl: './agregar-editar-noticia.component.html',
  styleUrls: ['./agregar-editar-noticia.component.css']
})



export class AgregarEditarNoticiaComponent implements OnInit {
  today: number = Date.now();

  selectedFile: File = null;
  imagenBase64: String;
  imagenNoticia: String;
  register: FormGroup;
  datosNoticia;
  userSub: Subscription;
 // register1: FormGroup;
  loading: boolean;
  _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  closeResult: string;
  hide = true;
  idUsuario: Number;
  dia = Date.now();
  name = 'Angular 6';

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '5rem',
    placeholder: 'Introduzca el contenido de la noticia*',
    translate: 'no',
    uploadUrl: 'v1/images', // if needed
  };

  constructor(private noticiasService : MantenimientoNoticiasService,
    private router:Router, private fb: FormBuilder, private ngModal: NgbModal, private global: GlobalService) {
     }
 get imagen() {   return this.register.get('imagen'); }
  /*
  -Objetivo: Todos los datos contenidos en este metodo son 
  inicializadas al cargar la vista.
  */
  ngOnInit(): void{
      let usuario1 = JSON.parse(localStorage.getItem('account'));
      this.idUsuario = usuario1.id;
      this.loading = false;
      /*
      -Objetivo: Este metodo es para realizar las validaciones del formulario
      */
      this.register = this.fb.group({
        cuerpo: ['', Validators.required],
        encabezado: ['', Validators.required],
        imagen:  null
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
  registrarNoticia() {
    const utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    this.datosNoticia = {
      encabezado: this.register.get('encabezado').value,
      cuerpo: this.register.get('cuerpo').value,
      fechas: utc,
      idUsuario: this.idUsuario,
      foto: this.imagenNoticia,
    };
    console.log(this.datosNoticia);
    this.loading = true;
     this.noticiasService.agregarNoticia(this.datosNoticia).subscribe(
      response => {
        this.loading = false;
        this._success.next(`Noticia creada exitosamente`);
        console.log(response);
      }, error => {
        this.loading = false;
        console.log('error', error);
      });
    console.log(this.register.value);
 }
/*
convert(file: File) {
  const reader: FileReader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (): void => {
      const base64String: string = (reader.result as string).match(
          /.+;base64,(.+)/
      )[1];
      return base64String;
  };
}

*/
    onFileSelected(event) {
      this.selectedFile = <File>event.target.files[0];
      console.log(this.selectedFile);
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (): void => {
           this.imagenBase64 = (reader.result as string).match(
              /.+;base64,(.+)/
          )[1];
     this.imagenNoticia = 'data:image/png;base64,' + this.imagenBase64;
     console.log(this.imagenNoticia);
      };
  }
  /*
  -Objetivo: Metodo para abrir ventana emergente al cancelar el formulario.
  */
  openVerticallyCentered(content) {
    this.ngModal.open(content, { centered: true });
  }

}
