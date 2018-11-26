import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { User } from '../../clases/user';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../servicios/global.service';
import { Paso } from '../../clases/paso';
import { MantenimientoPasosService } from '../../servicios/mantenimiento-pasos.service';

export interface Paso {
    id_paso: number;
    nombre: string;
    id_proceimiento: number;
    descripcion: string;
}

@Component({
  selector: 'app-pasos-mantenimiento',
  templateUrl: './pasos-mantenimiento.component.html',
  styleUrls: ['./pasos-mantenimiento.component.css']
})

export class PasosMantenimientoComponent implements OnInit {

  displayedColumns = ['number', 'nombre', 'descripcion', 'procedimiento', 'orden', /*'opcion'*/];
  pasos = [
    
  ];
  dataSource = new MatTableDataSource();
  account: User = new User();
  userSub: Subscription;

  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private pasoService : MantenimientoPasosService, private _router:Router, private global: GlobalService) { 
  }

  ngOnInit(): void {
    //mostrar mensaje
    this.userSub = this.global.user.subscribe(me => this.account = me);	
    //Verificar el logueo
    if (localStorage.getItem('token') && localStorage.getItem('account')){     // 
      this.global.me = JSON.parse(localStorage.getItem('account'));
      this.getProcedimientos();
  } else {
      this._router.navigate(['/home']);
  }
}
  getProcedimientos(){
    this.pasoService.getPasos().subscribe(pasos =>{
      pasos.sort(function(a, b){return a.id_proceimiento - b.id_proceimiento})
      this.dataSource.data = pasos;
      this.dataSource.filterPredicate = (data: Paso, filter: string) => data.id_proceimiento.toString().indexOf(filter) != -1;
      this.pasos = this.pasos;
      this.ngAfterViewInit();
      console.log('pasos', pasos.sort(function(a, b){return a.id_proceimiento - b.id_proceimiento}));
    }, error =>{
      console.log('error', error);
    })
  }

  newPaso(){
    this._router.navigate(['/paso']);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue= filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
