import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { DecimalPipe } from '../../../../node_modules/@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface ElementDos {
  nombre: string;
  codigo: string;
  monto: number;
  descripcion: string;
  programa: string;
}

const ELEMENT1: ElementDos[] = [
  {nombre: 'Ingreso a Posgrado', codigo: '1', monto: 11.43,
  descripcion: '03-05', programa: 'Maestrias y doctorados'},
 // {nombre: 'Ana Perez', carnet: 'PR15001', plan: 2009, codigo: 'MQR1009', programa: 'Maestria en traduccion', ciclo: 'ciclo I 2018'},
];

@Component({
  selector: 'app-aranceles-mantenimiento',
  templateUrl: './aranceles-mantenimiento.component.html',
  styleUrls: ['./aranceles-mantenimiento.component.css']
})
export class ArancelesMantenimientoComponent implements OnInit {
  displayedColumns = ['codigo', 'Nombre del arrancel', 'monto' ,
  'descripcion', 'Programa al que pertenece', 'opcion'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = ELEMENT1;

  constructor(private router: Router, private ngModal: NgbModal ) { }

  ngOnInit() {
  }

  unableArancel() {
    if (confirm('Deseas eliminar el arancel seleccionada?')) {

    }
  }

  newArancel() {
    this.router.navigate(['/arancel']);
  }

  registrarArancel() {

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
