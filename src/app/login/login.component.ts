import { Component, OnInit } from '@angular/core';
/*import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../servicios/login.service';
*/
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(  ) { }

  login;

  ngOnInit() {
  }

  onlogin(event){
   console.log(event)
    
  }

}
