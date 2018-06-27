import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Roles } from '../servicios/roles';
import { MantenimientoRolesService } from '../servicios/mantenimiento-roles.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-agregar-editar-rol',
  templateUrl: './agregar-editar-rol.component.html',
  styleUrls: ['./agregar-editar-rol.component.css']
})
export class AgregarEditarRolComponent implements OnInit {

	private rol: Roles;


  constructor(private _rolService : MantenimientoRolesService, private _router:Router) { }

  onNameKeyUp(event:any){
  	console.log(event.target.value);
  }

  ngOnInit(): void{
      this.rol=this._rolService.getter();
  	}

  processForm(){
    this._rolService.agregarRol(this.rol).subscribe((rol)=>{
        console.log(rol);
      }, (error)=>{
        console.log(error);
        this._router.navigate(['/mantenimientoRoles']);
      });
  }

}
