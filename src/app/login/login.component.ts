import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpResponse} from '@angular/common/http';
import { LoginService } from '../servicios/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
 
 private token;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {

  }

  onlogin(event){
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;
    this.loginService.getUserDetails(username, password);
    console.log(username, password);

    this.router.navigate(['/mantenimientoRoles']);
    
  }

}
