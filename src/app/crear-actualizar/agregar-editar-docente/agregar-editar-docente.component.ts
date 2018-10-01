/*
-Nombre del Módulo: Agregar Editar Docente.
-Dirección física: src/app/crear-editar/agregar-editar-docente.ts
-Objetivo: Modulo para realizar el ingreso y la edicion de un docente.
-Desarrollado por: Marisol García.
*/
import { Component, OnInit } from '@angular/core';
import { MantenimientoDocentesService } from '../../servicios/mantenimiento-docentes.service';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Docente } from '../../clases/docente';

/*
-Objetivo: Función encargado de la confirmacion de las contraseñas
*/
function passwordConfirming(c: AbstractControl): any {
  if(!c.parent || !c) return;
  const pwd = c.parent.get('password');
  const cpwd= c.parent.get('password2')

  if(!pwd || !cpwd) return ;
  if (pwd.value !== cpwd.value) {
      return { invalid: true };
    }
  }

  /*
  -Objetivo: Objeto de tipo Genero para generar las opciones del select de genero.
  */
  export interface Genero {
    id: string;
    name: string;
  }

@Component({
  selector: 'app-agregar-editar-docente',
  templateUrl: './agregar-editar-docente.component.html',
  styleUrls: ['./agregar-editar-docente.component.css']
})
export class AgregarEditarDocenteComponent implements OnInit {

  register:FormGroup;
  loading: boolean;
  _success = new Subject<string>();
  docenteCtrl: FormControl = new FormControl();
  docentes: Docente[];
  staticAlertClosed = false;
  successMessage: string;
  closeResult: string;
  options: FormGroup;
  hide = true;
  generos: Genero[];
  /*
  -Objetivo: Obtener el valor de la variable password2.
  */
  get cpwd() {
    return this.register.get('password2');
  }
    constructor(private docenteService: MantenimientoDocentesService, private fb: FormBuilder, private router: Router, private ngModal: NgbModal) {
    
  }
  /*
  -Objetivo: Todos los datos contenidos en este metodo son 
  inicializadas al cargar la vista.
  */
  ngOnInit() {
    this.loading = false;
    /*
    -Objetivo: Función encargado generar dos registro tipo Genero.
    */
    this.generos = [
      {id: 'fem',
      name: 'Femenino'},
      {id: 'mas',
      name: 'Masculino'}
    ]
    /*
    -Objetivo: Este metodo es para realizar las validaciones del formulario
    */
    this.register = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fecha_naci: ['', [Validators.required, Validators.minLength(10)]],
      dui: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]{8}[-]{1}[0-9]{1}')]],
      formacion: ['', Validators.required],
      titulo: ['', Validators.required],
      usuario: ['', [Validators.required, Validators.minLength(5), Validators.pattern('[A-Za-z0-9_]{5,20}')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required, Validators.minLength(8), passwordConfirming]], //llamado de la Funcion passwordConfirming; para verificar que la contraseña ingresada sea igual. 
      telefono: ['', [Validators.required, Validators.minLength(9),  Validators.pattern('^[2]{1}[0-9]{3}[-]{1}[0-9]{4}')]],
      movil: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[6-7]{1}[0-9]{3}[-]{1}[0-9]{4}')]],
      genero: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    }
  );
    /*
    -Objetivo: Muestra un mensaje tipo alerta de exito cuando el registro se realiza correctamente.
    */
    this._success.subscribe((message) => this.successMessage = message);
      this._success.pipe(
        debounceTime(5000)
      ).subscribe(() => this.successMessage = null);
  }
  /*
  -Objetivo: Este metodo es para realizar el registro de los docentes
  */
  registrarDocente() {
    this.loading = true;
    this.docenteService.registrarDocente(this.register.value).subscribe(
      response => {
        this.loading = false;
        this._success.next(`Docente creado exitosamente`);
        console.log(response);
        this.router.navigate(['/mantenimientoDocentes']);
      }, error => {
        this.loading = false;
        console.log('error', error);
      })
 }
  /*
  -Objetivo: Metodo para abrir ventana emergente al cancelar el formulario.
  */
  openVerticallyCentered(content) {
    this.ngModal.open(content, { centered: true });
    console.log(this.register.value.fecha_naci);

  }
}
