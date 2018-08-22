import { Component, OnInit, ViewChild } from '@angular/core';
import { MantenimientoRolesService } from '../../servicios/mantenimiento-roles.service';
import { Roles } from '../../servicios/roles';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '../../../../node_modules/@angular/material';
import { User } from '../../servicios/user';
import { Subscription } from '../../../../node_modules/rxjs';
import { GlobalService } from '../../servicios/global.service';

@Component({
  selector: 'app-roles-mantenimiento',
  templateUrl: './roles-mantenimiento.component.html',
  styleUrls: ['./roles-mantenimiento.component.css']
})
export class RolesMantenimientoComponent implements OnInit {

  displayedColumns = ['name', 'permissions', 'opcion'];
  roles:Roles[];
  dataSource = new MatTableDataSource();
  account: User = new User();
  userSub: Subscription;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _rolService : MantenimientoRolesService, private _router:Router, private global: GlobalService) { 

  }

  ngOnInit(): void {this.userSub = this.global.user.subscribe(
    me => this.account = me);	
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
