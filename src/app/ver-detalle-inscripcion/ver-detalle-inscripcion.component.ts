import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

export interface ElementDos {
  nombre: string;
  carnet: string;
  programa: string;
  ciclo: string;
  codigo: string;
  plan: number;
}

export interface Element {
  carnet: string;
  email: string;
  telefono: number;
  programa: string;
  materia: string;
  matricula: number;
  grupoT: number;
  horario: string;
  aula: string;
}

const ELEMENT1: ElementDos[] = [
  {nombre: 'Juan Perez', carnet: 'PG15001', programa: 'Maestría Investigación Social',
  ciclo: 'ciclo II 2018', codigo: 'PQR1009',  plan: 2001 },
 // {nombre: 'Ana Perez', carnet: 'PR15001', plan: 2009, codigo: 'MQR1009', programa: 'Maestria en traduccion', ciclo: 'ciclo I 2018'},
];

const ELEMENT2: Element[] = [
  {email: 'Juan@gmail.com', carnet: 'PG15001', programa: 'Maestría Investigación Social',
  telefono: 22112211, materia: 'tecnicas I',  matricula: 1, grupoT: 1, horario: '11:00-12:00', aula: 'C31' },
 // {nombre: 'Ana Perez', carnet: 'PR15001', plan: 2009, codigo: 'MQR1009', programa: 'Maestria en traduccion', ciclo: 'ciclo I 2018'},
];

@Component({
  selector: 'app-ver-detalle-inscripcion',
  templateUrl: './ver-detalle-inscripcion.component.html',
  styleUrls: ['./ver-detalle-inscripcion.component.css']
})
export class VerDetalleInscripcionComponent implements OnInit {
  displayedColumns = ['carnet', 'Nombre del estudiante', 'Codigo del programa' ,
  'Nombre del programa', 'Ciclo y año'];

  displayedColumns2 = ['carnet', 'Email', 'Telefono' ,
  'Programa que estudia', 'Materia', 'Matricula', 'Grupo teórico', 'Horario', 'Aula'  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = ELEMENT1;
  dataSource2 = ELEMENT2;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  regresar() {
    this.router.navigate(['/comprobantes']);
  }

  cancelarInscripcion() {
    if (confirm('Deseas cancelar la inscripcion del estudiante seleccionado?')) {
    }
  }
}
