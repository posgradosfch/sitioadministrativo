import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../servicios/login.service';
import { GlobalService } from '../servicios/global.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
 
  userLogin: FormGroup;
  loading: boolean;

  constructor(private loginService: LoginService, private router: Router, private global: GlobalService, private fb: FormBuilder) { 
    
    this.userLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loading = false;
    if (localStorage.getItem('token') && localStorage.getItem('account')){     // 
      this.global.me = JSON.parse(localStorage.getItem('account'));
      this.router.navigate(['/mantenimientoUsuarios']);
    }
  }

  onlogin(){
    this.loading = true;
    this.loginService.loginUsuario(this.userLogin.value).subscribe(
      response => {
        this.loading = false;
        localStorage.setItem('token', response['token'])
        this.global.me = response['user'];
        console.log('token', response['token']);
        this.router.navigate(['/mantenimientoUsuarios']);
      }, error => {
        this.loginService.logout();
        this.loading = false;
        console.log('error', error);
        this.loginService.logout();
      })
    console.log(this.userLogin.value);
    this.router.navigate(['/home']);
    
  }

}
