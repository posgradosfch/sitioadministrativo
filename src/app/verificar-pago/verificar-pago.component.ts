import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { DecimalPipe } from '../../../node_modules/@angular/common';

export interface ElementDos {
  nombre: string;
  carnet: string;
  programa: string;
  ciclo: string;
  codigo: string;
  plan: number;
}

export interface Element {
  Arrancel: string;
  Monto: number;
  Anio: number;
  Fecha: string;
  Estado: string;
  Ciclo: number;
  NumeroRecibo: number;
  numcod: string;
  Verificado: boolean;
}

const ELEMENT1: ElementDos[] = [
  {nombre: 'Juan Perez', carnet: 'PG15001', programa: 'Maestría Investigación Social',
  ciclo: 'ciclo II 2018', codigo: 'PQR1009',  plan: 2001 },
 // {nombre: 'Ana Perez', carnet: 'PR15001', plan: 2009, codigo: 'MQR1009', programa: 'Maestria en traduccion', ciclo: 'ciclo I 2018'},
];

const ELEMENT2: Element[] = [
  {Arrancel: 'Ingreso a posgrados', Monto: 11.43, Anio: 2018,
  Fecha: '10/08/2018', Estado: 'Cancelado',  Ciclo: 1, NumeroRecibo: 1060000028, numcod: '203342106106990028',  Verificado: false},
 // {nombre: 'Ana Perez', carnet: 'PR15001', plan: 2009, codigo: 'MQR1009', programa: 'Maestria en traduccion', ciclo: 'ciclo I 2018'},
];
@Component({
  selector: 'app-verificar-pago',
  templateUrl: './verificar-pago.component.html',
  styleUrls: ['./verificar-pago.component.css']
})
export class VerificarPagoComponent implements OnInit {
  displayedColumns = ['carnet', 'Nombre del estudiante', 'Codigo del programa' ,
  'Nombre del programa', 'Plan de estudios'];

  displayedColumns2 = ['Arrancel o cuota', 'Monto', 'Año' ,
  'Fecha', 'Estado', 'Ciclo', 'Numero de recibo', 'Numero del codigo de barras', 'Verificar Pago' ];
// 'Verificado', 'acciones'
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = ELEMENT1;
  dataSource2 = ELEMENT2;

  constructor() { }

  ngOnInit() {
  }

}
