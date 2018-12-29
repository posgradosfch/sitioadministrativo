import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { User } from '../../clases/user';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../servicios/global.service';
import { EvaluacionDocente } from '../../clases/evaluacion-docente';
import { Procedimiento } from '../../clases/procedimiento';
import { MantenimientoEvaluacionService } from '../../servicios/mantenimiento-evaluacion.service';
import { MantenimientoProcedimientosService } from '../../servicios/mantenimiento-procedimientos.service';

@Component({
  selector: 'app-evaluacion-docente-mantenimiento',
  templateUrl: './evaluacion-docente-mantenimiento.component.html',
  styleUrls: ['./evaluacion-docente-mantenimiento.component.css']
})
export class EvaluacionDocenteMantenimientoComponent implements OnInit {

  displayedColumns = ['number', 'nombre', 'objetivo', 'fecha_ini', 'fecha_fin', 'opcion'];
  evaluaciones: EvaluacionDocente[];
  procedimientos: Procedimiento[];
  dataSource = new MatTableDataSource();
  account: User = new User();
  userSub: Subscription;

  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private evaluacionService : MantenimientoEvaluacionService, private _router:Router, private global: GlobalService, 
    private procedimientoService : MantenimientoProcedimientosService) { 

  }

  ngOnInit(): void {
    //mostrar mensaje
    this.userSub = this.global.user.subscribe(me => this.account = me);	
    //Verificar el logueo
    if (localStorage.getItem('token') && localStorage.getItem('account')){     // 
      this.global.me = JSON.parse(localStorage.getItem('account'));
      this.getEvaluacion();
  } else {
      this._router.navigate(['/home']);
  }
}

  getEvaluacion(){
    this.evaluacionService.getEvaluaciones().subscribe(evaluaciones =>{
      //evaluaciones.sort(function(a, b){return a.fecha_ini - b.fecha_ini})
      this.dataSource.data = evaluaciones;
      this.dataSource.filterPredicate = (data: EvaluacionDocente, filter: string) => data.fecha_inicio.toString().indexOf(filter) != -1;
      this.evaluaciones = this.evaluaciones;
      this.ngAfterViewInit();
      console.log('evaluaciones', evaluaciones);
    }, error =>{
      console.log('error', error);
    })
  }

  newEvaluacion(){
    this._router.navigate(['/evaluacionDocente']);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue= filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filterPredicate = (data: EvaluacionDocente, filter: string) => data.fecha_inicio.toString().indexOf(filter) != -1;
  }

}
