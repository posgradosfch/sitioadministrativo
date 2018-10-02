import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { User } from '../../clases/user';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../servicios/global.service';
import { Procedimiento } from '../../clases/procedimiento';
import { MantenimientoProcedimientosService } from '../../servicios/mantenimiento-procedimientos.service';

@Component({
  selector: 'app-procedimientos-mantenimiento',
  templateUrl: './procedimientos-mantenimiento.component.html',
  styleUrls: ['./procedimientos-mantenimiento.component.css']
})
export class ProcedimientosMantenimientoComponent implements OnInit {

  displayedColumns = ['number', 'nombre', 'descripcion', /*'opcion'*/];
  procedimientos:Procedimiento[];
  dataSource = new MatTableDataSource();
  account: User = new User();
  userSub: Subscription;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private procedimientoService : MantenimientoProcedimientosService, private _router:Router, private global: GlobalService) { 

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
    this.procedimientoService.getProcedimiento().subscribe(procedimientos =>{
      this.dataSource.data = procedimientos;
      this.ngAfterViewInit();
      this.procedimientos = procedimientos;
      console.log('procedimientos', procedimientos);
    }, error =>{
      console.log('error', error);
    })
  }

  newProcedimiento(){
    this._router.navigate(['/procedimiento']);
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
