import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  constructor( private router: Router, private loginService: LoginService ) { }

  login;

  ngOnInit() {
    this.login = {
      usuario: '',
      contra: '',
    };
  }

  onlogin(){
    this.loginService.loginUsuario(this.login).subscribe(
      response => {
        console. log(response);
        alert(this.login.usuario + 'Bienvenido');
        this.router.navigate(['/mantenimientoRoles']);
      },
      error => {
        console. log('Usuario o password incorrecto', error);
        this.router.navigate(['/home']);
      } 
    );
    
  }

}
