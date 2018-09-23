import { Component, OnInit } from '@angular/core';
import { Roles } from '../../clases/roles';
import { Permisos } from '../../clases/permisos';
import { MantenimientoRolesService } from '../../servicios/mantenimiento-roles.service';
import { Router } from '@angular/router';
import { MantenimientoPermisosService } from '../../servicios/mantenimiento-permisos.service';

@Component({
  selector: 'app-agregar-editar-rol',
  templateUrl: './agregar-editar-rol.component.html',
  styleUrls: ['./agregar-editar-rol.component.css']
})
export class AgregarEditarRolComponent implements OnInit {

	rol: Roles;
  permisos: Permisos[];

  constructor(private _rolService : MantenimientoRolesService,
    private _router:Router,
    private permisoServicio: MantenimientoPermisosService) { }

  ngOnInit(): void{
      this.rol=this._rolService.getter();
      this.permisoServicio.getPermisos().subscribe(permisos => {
        console.log(permisos);
        this.permisos = permisos;
      }, (error)=> {
        console.log(error);
      })
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
