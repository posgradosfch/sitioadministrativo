import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

export interface Element {
  nombre: string;
  carnet: string;
  codigoPrograma: string;
  programa: string;
  planEstudios: number;
  email: string;
}

const ELEMENT1: Element[] = [
  {nombre: 'Juan Perez', carnet: 'PG15001',
  codigoPrograma: 'PQR1009', programa: 'Maestria en Métodos y Tecnicas de Investigacion Social',
   planEstudios: 2001, email: 'Juan@gmail.com'},
 // {nombre: 'Ana Perez', carnet: 'PR15001', programa: 'Maestria en traduccion', materias: 1, estado: 'reaperturada'},
];
@Component({
  selector: 'app-consultar-pago',
  templateUrl: './consultar-pago.component.html',
  styleUrls: ['./consultar-pago.component.css']
})
export class ConsultarPagoComponent implements OnInit {
  displayedColumns = [ 'carnet', 'Nombre del estudiante', 'Codigo del programa',
'Nombre del Programa', 'Plan de estudios', 'Email', 'acciones'];

 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;

 dataSource = ELEMENT1;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  regresar() {
    this.router.navigate(['/menuInscripcion']);
  }

  consultaPagoEstudiante() {
    this.router.navigate(['/detallePagos']);
  }
}
