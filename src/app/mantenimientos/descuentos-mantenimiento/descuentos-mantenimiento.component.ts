import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { DecimalPipe } from '../../../../node_modules/@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface ElementDos {
  nombre: string;
  porcentaje: number;
  Beneficiados: string;
  programa: string;
}

const ELEMENT1: ElementDos[] = [
  {nombre: 'Ingreso a Posgrado', porcentaje: 10 , Beneficiados: 'empleados administrativos ues',
   programa: 'Maestrias y doctorados'},
 // {nombre: 'Ana Perez', carnet: 'PR15001', plan: 2009, codigo: 'MQR1009', programa: 'Maestria en traduccion', ciclo: 'ciclo I 2018'},
];

@Component({
  selector: 'app-descuentos-mantenimiento',
  templateUrl: './descuentos-mantenimiento.component.html',
  styleUrls: ['./descuentos-mantenimiento.component.css']
})
export class DescuentosMantenimientoComponent implements OnInit {
  displayedColumns = ['Nombre', 'Porcentaje de descuento', 'Beneficiados' ,
  'Programa con descuento', 'opcion'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = ELEMENT1;

  constructor(private router: Router, private ngModal: NgbModal) { }

  ngOnInit() {
  }

  newDescuento() {
    this.router.navigate(['/descuento']);
  }
     /*
  -Objetivo: Metodo para abrir ventana emergente.
  */
 openDialog(content) {
  this.ngModal.open(content, { centered: true });
}

openDialogCancel(cancelContent) {
  this.ngModal.open(cancelContent, { centered: true });
}

}
