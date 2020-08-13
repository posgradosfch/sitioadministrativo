import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';

export interface ElementDos {
  nombre: string;
  carnet: string;
  programa: string;
  ciclo: string;
  codigo: string;
  plan: number;
}

const ELEMENT1: ElementDos[] = [
  {nombre: 'Juan Perez', carnet: 'PG15001', programa: 'Maestría Investigación Social',
  ciclo: 'ciclo II 2018', codigo: 'PQR1009',  plan: 2001 },
 // {nombre: 'Ana Perez', carnet: 'PR15001', plan: 2009, codigo: 'MQR1009', programa: 'Maestria en traduccion', ciclo: 'ciclo I 2018'},
];

@Component({
  selector: 'app-guardar-pago',
  templateUrl: './guardar-pago.component.html',
  styleUrls: ['./guardar-pago.component.css']
})
export class GuardarPagoComponent implements OnInit {
  toppings = new FormControl();
  toppingList: string[] = ['Cuota 1', 'Cuota 2', 'Cuota 3', 'Cuota 4'];
  displayedColumns = ['carnet', 'Nombre del estudiante', 'Codigo del programa' ,
  'Nombre del programa', 'Plan de estudios'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  dataSource = ELEMENT1;
 // dataSource2 = ELEMENT2;
  constructor(private router: Router) { }

  ngOnInit() {
  }

}
