import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../servicios/usuario.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css'],
  providers: [UsuarioService],
})

export class RegistrarUsuarioComponent implements OnInit {
  constructor(private usuarioService: UsuarioService) { }
  register;
  ngOnInit() {
    this.register = {
       username: '',
       password: '',
       email: '',
       nombres: '',
       apellidos: ''
    };
  }
 registrarUsuario() {
   this.usuarioService.registerUser(this.register).subscribe(
     response => {
       alert('Usuario' + ' ' + this.register.username + ' ' + 'ha sido creado' );
     },
     error => console.log('error', error)
   );
 }

}
