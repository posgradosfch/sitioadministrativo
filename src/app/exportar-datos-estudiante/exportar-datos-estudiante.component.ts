import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

export interface Element {
  nombre: string;
  apellido: string;
  programa: string;
  anioIngreso: number;
  exportado: boolean;
  id: number;
}


const ELEMENT1: Element[] = [
  { id: 1, nombre: 'Juan', apellido: 'Perez',
   programa: 'Maestria en Métodos y Tecnicas de Investigacion Social', anioIngreso: 2018, exportado: false},
//  {nombre: 'Ana Perez', carnet: 'PR15001', programa: 'Maestria en traduccion', materias: 1, estado: 'reaperturada'},
];

@Component({
  selector: 'app-exportar-datos-estudiante',
  templateUrl: './exportar-datos-estudiante.component.html',
  styleUrls: ['./exportar-datos-estudiante.component.css']
})
export class ExportarDatosEstudianteComponent implements OnInit {
  displayedColumns = ['Nombre', 'Apellido', 'Programa de estudio',
  'Año de ingreso', 'Exportar Ficha', 'acciones'];
// dataSource = new MatTableDataSource();

 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;

 dataSource = ELEMENT1;
 // this.dataSource.data = this.aulas;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  regresar() {
    this.router.navigate(['/menuInscripcion']);
  }

  verDetalleInscrip() {
    this.router.navigate(['/detalleEstudiante']);
  }

}
