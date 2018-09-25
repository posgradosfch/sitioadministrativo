/*
-Nombre del Módulo: Agregar Editar Usuario.
-Dirección física: src/app/crear-editar/agregar-editar-usuario.ts
-Objetivo: Modulo para realizar el ingreso y la edicion de un usuario.
-Desarrollado por: Marisol García.
*/

import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { MantenimientoRolesService } from '../../servicios/mantenimiento-roles.service';
import { Roles } from '../../clases/roles';

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
  
@Component({
  selector: 'app-agregar-editar-usuario',
  templateUrl: './agregar-editar-usuario.component.html',
  styleUrls: ['./agregar-editar-usuario.component.css'],
  providers: [UsuarioService],
})

export class AgregarEditarUsuarioComponent implements OnInit {
  
  register:FormGroup;
  loading: boolean;
  _success = new Subject<string>();
  roles: Roles[];
  staticAlertClosed = false;
  successMessage: string;
  closeResult: string;
  hide = true;
  get cpwd() {
    return this.register.get('password2');
  }
    constructor(private usuarioService: UsuarioService, private rolService: MantenimientoRolesService, private fb: FormBuilder, private router: Router, private ngModal: NgbModal) {
  }
  /*
  -Objetivo: Todos los datos contenidos en este metodo son 
  inicializadas al cargar la vista.
  */
  ngOnInit() {
    this.loading = false;
    this.register = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.pattern('[A-Za-z0-9_]{5,20}')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required, Validators.minLength(8), passwordConfirming]], //llamado de la Funcion passwordConfirming; para verificar que la contraseña ingresada sea igual. 
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
    /*
    -Objetivo: Muestra un mensaje de exito cuando el registro se realiza correctamente.
    */
    this._success.subscribe((message) => this.successMessage = message);
      this._success.pipe(
        debounceTime(5000)
      ).subscribe(() => {
        this.successMessage = null;
        this.router.navigate(['/mantenimientoUsuarios']);
      });
  }
  /*
  -Objetivo: Este metodo es para realizar el registro de los usuarios
  */
  registrarUsuario() {
    this.loading = true;
    this.usuarioService.registerUser(this.register.value).subscribe(
      response => {
        this.loading = false;
        this._success.next(`Usuario creado exitosamente`);
        console.log(response);
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
  }
}