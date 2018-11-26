import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../servicios/usuario.service';
import { GlobalService } from '../servicios/global.service';
import { AuthService } from '../servicios/auth.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioService],
})
export class LoginComponent implements OnInit {
 
  userLogin: FormGroup;
  loading: boolean;
  private _error = new Subject<string>();
  errorMessage: string;

  constructor(private userService: UsuarioService, private router: Router, private global: GlobalService, private fb: FormBuilder) { 
    this.userLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this._error.pipe(
      debounceTime(5000)
    ).subscribe(() => this.errorMessage = null);

    this.loading = false;
    if(localStorage.getItem('token') && localStorage.getItem('account')){
      this.global.me = JSON.parse(localStorage.getItem('account'));
      this.router.navigate(['/mantenimientoUsuarios']);
    }    
  }

  onlogin(){
    this.loading = true;
    this.userService.loginUser(this.userLogin.value).subscribe(
      response => {
        this.loading = false;
        localStorage.setItem('token', response['token']);
        this.global.me = response['user'];
        this.router.navigate(['/mantenimientoUsuarios']);
      }, 
      error => {
        this.loading = false;
        this.changeErrorMessage();
        this._error.subscribe((message) => this.errorMessage = message);

      })
  }

  public changeErrorMessage() {
    this._error.next(`Usuario o contraseña incorrectos`);
  }

}
