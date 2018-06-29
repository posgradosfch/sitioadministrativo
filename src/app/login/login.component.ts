import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpResponse} from '@angular/common/http';
import { LoginService } from '../servicios/login.service';
import { GlobalService } from '../servicios/global.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
 
  userLogin: FormGroup;

  constructor(private loginService: LoginService,
              private router: Router, private global: GlobalService) { }

  ngOnInit() {
    if (localStorage.getItem('token') && localStorage.getItem('account')){
     // this.global.me = JSON.parse(localStorage.getItem('account'));
      this.router.navigate(['/mantenimientoRoles']);
    }
  }

  onlogin(event){
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;
    this.loginService.loginUsuario(username, password).subscribe(
      response => {
        localStorage.setItem('token', response['token']);
        this.global.me = response['user'];
        this.router.navigate(['/mantenimientoRoles']);
        console.log('token', response['token']);
      },
      error => {
        console.log('error', error);
      })
    
  }

}
