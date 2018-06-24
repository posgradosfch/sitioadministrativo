import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MantenimientoRolesService } from '../servicios/mantenimiento-roles.service';
import { Roles } from '../servicios/roles';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles-mantenimiento',
  templateUrl: './roles-mantenimiento.component.html',
  styleUrls: ['./roles-mantenimiento.component.css']
})
export class RolesMantenimientoComponent implements OnInit {


  constructor(private _rolService : MantenimientoRolesService, private _router:Router) { 


  }

  ngOnInit(): void {

  }

  newRol(){
    let rol = new Roles();
    this._rolService.setter(rol);
    this._router.navigate(['/rol']);
  }
}
