import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

export interface Element {
  nombre: string;
  carnet: string;
  programa: string;
  materias: number;
}

const ELEMENT1: Element[] = [
  {nombre: 'Juan Perez', carnet: 'PG15001', programa: 'Maestria en Metodos y Tecnicas de Investigacion Social', materias: 1},
  {nombre: 'Ana Perez', carnet: 'PR15001', programa: 'Maestria en traduccion', materias: 1},
];

@Component({
  selector: 'app-comprobantes-inscripcion',
  templateUrl: './comprobantes-inscripcion.component.html',
  styleUrls: ['./comprobantes-inscripcion.component.css']
})



export class ComprobantesInscripcionComponent implements OnInit {
  displayedColumns = ['Nombre del estudiante', 'carnet', 'Programa que estudia',
   'Materias inscritas', 'acciones'];
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
    this.router.navigate(['/detalleInscripcion']);
  }

}
