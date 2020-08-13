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
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-evaluacion-docente-mantenimiento',
  templateUrl: './evaluacion-docente-mantenimiento.component.html',
  styleUrls: ['./evaluacion-docente-mantenimiento.component.css']
})
export class EvaluacionDocenteMantenimientoComponent implements OnInit {

  displayedColumns = ['number', 'titulo', 'fecha_inicio', 'hora_inicio', /*'fecha_fin', 'hora_fin',*/ 'id_ciclo', /*'activo',*/ 'opcion'];
  evaluacion: EvaluacionDocente[];
  dataSource = new MatTableDataSource();
  account: User = new User();
  userSub: Subscription;
  loading: boolean;
  _success = new Subject<string>();
  successMessage: string;

  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private evaluacionService : MantenimientoEvaluacionService, private _router:Router, private global: GlobalService, 
    private procedimientoService : MantenimientoProcedimientosService, private ngModal: NgbModal) { 

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

  this._success.subscribe((message) => this.successMessage = message);
   this._success.pipe(
     debounceTime(5000)
   ).subscribe(() => this.successMessage = null);
}

  getEvaluacion(){
    this.evaluacionService.getEvaluaciones().subscribe(response =>{
      //evaluaciones.sort(function(a, b){return a.fecha_ini - b.fecha_ini})
      this.dataSource.data = response.encuestas;
      this.dataSource.filterPredicate = (data: EvaluacionDocente, filter: string) => data.fecha_inicio.toString().indexOf(filter) != -1;
      this.ngAfterViewInit();
      console.log('evaluaciones', response.encuestas);
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

  unableEvaluacion(evaluacion: EvaluacionDocente): void {
    this.loading = true;
    if (confirm('Deseas calcelar la evaluación docente seleccionada')){
      this.evaluacionService.unableEvaluacion(evaluacion.id_encuesta).subscribe(
        data => {
          console.log(data);
          this.loading = false;
          this._success.next('Evaluacion Docente cancelada exitosamente');
          this.getEvaluacion();
        }, (error)=>{
          this.loading = false;
          console.log(error);
        });
    }
    
  }

  detEvaluacion(id_encuesta: number): void {
    this.evaluacionService.detEvaluacion(id_encuesta).subscribe(
      data => {
        this.evaluacion = data.encuesta;
        console.log(this.evaluacion);
      }, (error)=>{
        //this.loading = false;
        console.log(error);
      });
  }

  /*
  -Objetivo: Metodo para abrir ventana emergente.
  */
  openDialog(content) {
    this.ngModal.open(content, { centered: true });
  }

}
