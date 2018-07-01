import { Component, OnInit } from '@angular/core';
import { MantenimientoRolesService } from '../servicios/mantenimiento-roles.service';
import { Roles } from '../servicios/roles';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-roles',
  templateUrl: './table-roles.component.html',
  styleUrls: ['./table-roles.component.css']
})

export class TableRolesComponent implements OnInit {

  roles:Roles[];

  constructor(private _rolService: MantenimientoRolesService, private _router:Router) { }

  ngOnInit():void {
  	
    if (localStorage.getItem('token') && localStorage.getItem('account')){
      localStorage.getItem('token');
      this._rolService.getRoles().subscribe(roles => {
      console.log(roles);
      this.roles = roles;
    },(error)=>{
      console.log(error);
    });
    } else {
      this._router.navigate(['/home']);
    }
  }

  /*deleteRol(rol){
    this._rolService.eliminarRol(rol.id).subscribe((data)=>{
      this.roles.splice(this.roles.indexOf(rol),1);
    }, (error)=>{
      console.log(error);
    })
  }*/

  updateRol(rol){
    this._rolService.setter(rol);
    this._router.navigate(['/rol']);
  }
}
