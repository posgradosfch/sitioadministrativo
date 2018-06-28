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
       email: '',
       password: '',
       nombres: '',
       apellidos: ''
    };
  }
 registrarUsuario() {
   this.usuarioService.registerUser(this.register).subscribe(
     response => {
       alert('User' + ' ' + this.register.username + ' ' + 'has been created' );
     },
     error => console.log('error', error)
   );
 }

}
