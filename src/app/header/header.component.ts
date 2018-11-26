import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../servicios/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedOut$: Observable<boolean>;
    constructor(private login: LoginService) {
   }

  ngOnInit() {
  	this.isLoggedOut$ = this.login.isLoggedOut;
  }

}
