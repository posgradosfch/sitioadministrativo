import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UsuarioService } from '../servicios/usuario.service';
import { User } from '../servicios/user';
import { GlobalService } from '../servicios/global.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios-mantenimiento',
  templateUrl: './usuarios-mantenimiento.component.html',
  styleUrls: ['./usuarios-mantenimiento.component.css']
})
export class UsuariosMantenimientoComponent implements OnInit {
  
  constructor(private userService: UsuarioService, private router: Router, private global: GlobalService) { }

  account: User = new User();
  userSub: Subscription;

  ngOnInit() {
    /*this.userSub = this.global.user.subscribe(
      me => {
        console.log('me', me);
        this.account = me;
      });*/
  }

  newUsuarios(){
  	let usuarios = new User();
  	//this.userService.setter(usuarios);
  	this.router.navigate(['/usuario']);
  }
}
