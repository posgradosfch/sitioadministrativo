import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { User } from '../../servicios/user';
import { GlobalService } from '../../servicios/global.service';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-usuarios-mantenimiento',
  templateUrl: './usuarios-mantenimiento.component.html',
  styleUrls: ['./usuarios-mantenimiento.component.css']
})
export class UsuariosMantenimientoComponent implements OnInit {
  
  account: User = new User();
  userSub: Subscription;
  users;
  /*search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.users.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );*/
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

  newUsuarios(){
  	let usuarios = new User();
  	//this.userService.setter(usuarios);
  	this.router.navigate(['/usuario']);
  }
}
