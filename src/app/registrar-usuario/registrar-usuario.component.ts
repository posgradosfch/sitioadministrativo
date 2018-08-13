import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../servicios/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { MantenimientoRolesService } from '../servicios/mantenimiento-roles.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css'],
  providers: [UsuarioService],
})

export class RegistrarUsuarioComponent implements OnInit {
  
  register:FormGroup;
  loading: boolean;
  _success = new Subject<string>();

  roles;
  staticAlertClosed = false;
  successMessage: string;
  closeResult: string;

  constructor(private usuarioService: UsuarioService, private rolService: MantenimientoRolesService, private fb: FormBuilder, private router: Router, private ngModal: NgbModal) {
      this.register = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      rol: ['', Validators.required]
    });
  }
  
  ngOnInit() {
    this.loading = false;
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
        this.router.navigate(['/mantenimientoUsuarios']);
        console.log(response);
      }, error => {
        this.loading = false;
        console.log('error', error);
      })
 }

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
}
