import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { MantenimientoRolesService } from '../../servicios/mantenimiento-roles.service';
import { Roles } from '../../clases/roles';

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
  rolCtrl: FormControl = new FormControl();
  roles: Roles[];
  staticAlertClosed = false;
  successMessage: string;
  closeResult: string;
  options: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

    constructor(private usuarioService: UsuarioService, private rolService: MantenimientoRolesService, private fb: FormBuilder, private router: Router, private ngModal: NgbModal) {
    this.options = this.fb.group({
      hideRequired: false,
      floatLabel: 'never',
    })
  }
  
  ngOnInit() {
    this.loading = false;
    this.register = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(8)],
      password2: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required, Validators.email]
    });
    this.mostrarRol();
    this._success.subscribe((message) => this.successMessage = message);
      this._success.pipe(
        debounceTime(5000)
      ).subscribe(() => this.successMessage = null);
  }

 registrarUsuario() {
   this.loading = true;
   this.usuarioService.registerUser(this.register.value).subscribe(
      response => {
        this.loading = false;
        this._success.next(`Usuario creado exitosamente`);
        console.log(response);
        this.router.navigate(['/mantenimientoUsuarios']);
      }, error => {
        this.loading = false;
        console.log('error', error);
      })
 }
 //Metodo para abrir ventana emergente
 openVerticallyCentered(content) {
  this.ngModal.open(content, { centered: true });
  }

  mostrarRol(){
    this.rolService.getRoles().subscribe(response =>{
  		this.roles = response;
  		console.log('roles', response);
  	}, error =>{
  		console.log('error', error);
  	})
  }
  getErrorMessage() {
    return this.email.hasError('required') ? 'Debes ingresar un correo correcto' :
        this.email.hasError('email') ? 'Email no valido' :
            '';
  }
}
