import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { User } from '../../clases/user';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../servicios/global.service';
import { Paso } from '../../clases/paso';
import { Procedimiento } from '../../clases/procedimiento';
import { MantenimientoPasosService } from '../../servicios/mantenimiento-pasos.service';
import { MantenimientoProcedimientosService } from '../../servicios/mantenimiento-procedimientos.service';

@Component({
  selector: 'app-pasos-mantenimiento',
  templateUrl: './pasos-mantenimiento.component.html',
  styleUrls: ['./pasos-mantenimiento.component.css']
})
export class PasosMantenimientoComponent implements OnInit {

  displayedColumns = ['number', 'nombre', 'descripcion', 'procedimiento', 'orden', /*'opcion'*/];
  pasos: Paso[];
  procedimientos: Procedimiento[];
  dataSource = new MatTableDataSource();
  account: User = new User();
  userSub: Subscription;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private pasoService : MantenimientoPasosService, private _router:Router, private global: GlobalService, 
    private procedimientoService : MantenimientoProcedimientosService) { 

  }

  ngOnInit(): void {
    //mostrar mensaje
    this.userSub = this.global.user.subscribe(me => this.account = me);	
    //Verificar el logueo
    if (localStorage.getItem('token') && localStorage.getItem('account')){     // 
      this.global.me = JSON.parse(localStorage.getItem('account'));
      this.getPaso();
      this.getProcedimimentos();
  } else {
      this._router.navigate(['/home']);
  }
}

  getPaso(){
    this.pasoService.getPasos().subscribe(pasos =>{
      this.dataSource.data = pasos;
      this.ngAfterViewInit();
      this.pasos = this.pasos;
      console.log('pasos', pasos);
    }, error =>{
      console.log('error', error);
    })
  }

  getProcedimimentos(){
    this.procedimientoService.getProcedimiento().subscribe(procedimentos =>{
      this.procedimientos = procedimentos;
      console.log('procedimientos', procedimentos);
    }, error =>{
      console.log('error', error);
    })
  }

  newPaso(){
    this._router.navigate(['/paso']);
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
