import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import {Estudiantes} from '../clases/estudiantes';
import { User } from '../clases/user';
import { Subscription } from 'rxjs';
import { GlobalService } from '../servicios/global.service';
import { ConsultarPagoService } from '../servicios/consultar-pago.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-consultar-pago',
  templateUrl: './consultar-pago.component.html',
  styleUrls: ['./consultar-pago.component.css']
})
export class ConsultarPagoComponent implements OnInit {
  displayedColumns = [ 'Nombre del estudiante', 'Codigo del programa',
'Nombre del Programa', 'Plan de estudios', 'acciones'];
// , 'Email'
  dataSource = new MatTableDataSource();
  account: User = new User();
  userSub: Subscription;
  estudiante: Estudiantes[];

 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private global: GlobalService, private _router: Router, 
    private consultarPago: ConsultarPagoService) { }

  ngOnInit() {
      // mostrar mensaje
      this.userSub = this.global.user.subscribe(me => this.account = me);	
      // Verificar el logueo
      if (localStorage.getItem('token') && localStorage.getItem('account')){     // 
        this.global.me = JSON.parse(localStorage.getItem('account'));
        this.getEstudiantes();
    } else {
        this._router.navigate(['/home']);
    }
  }

  regresar() {
    this.router.navigate(['/menuInscripcion']);
  }
  getEstudiantes() {
    this.consultarPago.getEstudiante().subscribe( response => {
      this.estudiante = response.Estudiantes;
      this.dataSource.data = this.estudiante;
   //   this.dataSource.filterPredicate = (data: Aulas, filter: string) => data.codigo.toString().indexOf(filter) !== -1;
      this.ngAfterViewInit();
      console.log('esto tiene Estudiantes');
      console.log('Estudiantes', this.estudiante);
    }, error => {
      console.log('error', error);
    });
  }
  consultaPagoEstudiante(estudiante: Estudiantes) {
    localStorage.removeItem('estudianteId');
    localStorage.setItem('estudianteId', estudiante.id_estudiante.toString());
    this._router.navigate(['detallePagos', estudiante.id_estudiante]);
  //  this.router.navigate(['/detallePagos']);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
 
}
