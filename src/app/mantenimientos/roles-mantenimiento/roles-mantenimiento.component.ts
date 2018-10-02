import { Component, OnInit, ViewChild } from '@angular/core';
import { MantenimientoRolesService } from '../../servicios/mantenimiento-roles.service';
import { Roles } from '../../clases/roles';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { User } from '../../clases/user';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../servicios/global.service';
import { Permisos } from '../../clases/permisos';

@Component({
  selector: 'app-roles-mantenimiento',
  templateUrl: './roles-mantenimiento.component.html',
  styleUrls: ['./roles-mantenimiento.component.css']
})
export class RolesMantenimientoComponent implements OnInit {

  displayedColumns = ['number', 'name', 'permissions', /*'opcion'*/];
  roles:Roles[];
  dataSource = new MatTableDataSource();
  account: User = new User();
  userSub: Subscription;
  permisos: Permisos;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _rolService : MantenimientoRolesService, private _router:Router, private global: GlobalService) { 

  }

  ngOnInit(): void {
    //mostrar mensaje
    this.userSub = this.global.user.subscribe(me => this.account = me);	
    //Verificar el logueo
    if (localStorage.getItem('token') && localStorage.getItem('account')){     // 
      this.global.me = JSON.parse(localStorage.getItem('account'));
      this.getRoles();
  } else {
      this._router.navigate(['/home']);
  }
}
  getRoles(){
    this._rolService.getRoles().subscribe(roles =>{
      this.dataSource.data = roles;
      this.ngAfterViewInit();
      this.roles = roles;
      console.log('roles', roles);
    }, error =>{
      console.log('error', error);
    })
  }

  newRol(){
    let rol = new Roles();
    this._rolService.setter(rol);
    this._router.navigate(['/rol']);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
