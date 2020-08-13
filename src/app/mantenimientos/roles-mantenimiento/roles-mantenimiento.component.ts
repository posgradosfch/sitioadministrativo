import { Component, OnInit, ViewChild } from '@angular/core';
import { MantenimientoRolesService } from '../../servicios/mantenimiento-roles.service';
import { Roles } from '../../clases/roles';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { User } from '../../clases/user';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../servicios/global.service';
import { Permisos } from '../../clases/permisos';
import { MantenimientoPermisosService } from '../../servicios/mantenimiento-permisos.service';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-roles-mantenimiento',
  templateUrl: './roles-mantenimiento.component.html',
  styleUrls: ['./roles-mantenimiento.component.css']
})
export class RolesMantenimientoComponent implements OnInit {

  displayedColumns = ['number', 'name', /*'permissions',*/ 'opcion'];
  roles:Roles[];
  rol:Roles[];
  dataSource = new MatTableDataSource();
  account: User = new User();
  userSub: Subscription;
  permisos: Permisos[];
  loading: boolean;
  _success = new Subject<string>();
  successMessage: string;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _rolService : MantenimientoRolesService, private _permisoService : MantenimientoPermisosService, 
    private _router:Router, private global: GlobalService, private ngModal: NgbModal) { 

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

  getPermisos(){
    this._permisoService.getPermisos().subscribe(permisos => {
      this.permisos = permisos;
      console.log(permisos);
    }, (error)=> {
      console.log(error);
    })
  }

  newRol(){
    let rol = new Roles();
    this._rolService.setter(rol);
    this._router.navigate(['/rol']);
  }

  unableRol(rol: Roles): void {
    //this.loading = true;
    if (confirm('Deseas eliminar el rol seleccionado?')){
      this._rolService.unableRol(rol.id).subscribe(
        data => {
          console.log(data);
          //this.loading = false;
          this._success.next('Rol eliminado exitosamente');
          this.getRoles();
        }, (error)=>{
          //this.loading = false;
          console.log(error);
        });
    }
    
  }

  editRol(){

  }

  detRol(id: number): void {
    this._rolService.detRol(id).subscribe(
      data => {
        this.rol = data;
        console.log(this.rol);
      }, (error)=>{
        //this.loading = false;
        console.log(error);
      });
  }

  deleteUser(rol: Roles): void {
    if (confirm('Deseas eliminar el rol seleccionado?')){
    this._rolService.deleteUser(rol.id)
      .subscribe( data => {
        this.roles = this.roles.filter(u => u !== rol);
          //this.loading = false;
          this._success.next('Rol eliminado exitosamente');
          this.getRoles();
        }, (error)=>{
          //this.loading = false;
          console.log(error);
        });
    }
  };

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  /*
  -Objetivo: Metodo para abrir ventana emergente.
  */
  openDialog(content) {
    this.ngModal.open(content, { centered: true });
  }

  openDialogCancel(cancelContent, rol: Roles) {
    this.ngModal.open(cancelContent, { centered: true });
  }
}
