import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from '../clases/user';
import { GlobalService } from '../servicios/global.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsuarioService } from '../servicios/usuario.service';


@Component({
  selector: 'app-table-usuarios',
  templateUrl: './table-usuarios.component.html',
  styleUrls: ['./table-usuarios.component.css'],
  providers: [UsuarioService]
})
export class TableUsuariosComponent implements OnInit {
  account: User = new User();
  userSub: Subscription;
  users;
  constructor(private userService: UsuarioService, private router: Router, private global: GlobalService) { }

  ngOnInit() {
  	this.userSub = this.global.user.subscribe(
      me => this.account = me);	
  	  if (localStorage.getItem('token') && localStorage.getItem('account')){     // 
        this.global.me = JSON.parse(localStorage.getItem('account'));
    	  this.getUsuarios();
    } else {
    	  this.router.navigate(['/home']);
    }
  }
  getUsuarios(){
  	this.userService.getUsers().subscribe(response =>{
  		this.users = response;
  		console.log('users', response);
  	}, error =>{
  		console.log('error', error);
  	})
  }

}
