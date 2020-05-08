import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { EstudiantesService } from '../../app/servicios/estudiantes.service';
import { Estudiantes } from '../clases/estudiantes';
import {DetalleEstudiante} from '../clases/detalle-estudiante';
import { NgbModal, NgbActiveModal} from '../../../node_modules/@ng-bootstrap/ng-bootstrap';

/*
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
*/

@Component({
  selector: 'app-exportar-datos-estudiante',
  templateUrl: './exportar-datos-estudiante.component.html',
  styleUrls: ['./exportar-datos-estudiante.component.css']
})
export class ExportarDatosEstudianteComponent implements OnInit {
  Estudiante: Estudiantes[];
  detalleEstudiante: DetalleEstudiante;
  dataSource = new MatTableDataSource();
  displayedColumns = ['Nombre', 'Programa de estudio', 'Codigo de programa', 'Plan de estudio', 'acciones'];
// dataSource = new MatTableDataSource();

 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;
 // this.dataSource.data = this.aulas;
  constructor(private router: Router, private ngModal: NgbModal, private _router: Router, 
    private EstudianteService: EstudiantesService ) { }

  ngOnInit() {

    this.getEstudiantes();
  }

  getEstudiantes() {
    this.EstudianteService.getEstudiante().subscribe( response => {
     this.Estudiante = response.Estudiantes;
     this.dataSource.data = this.Estudiante;
  //   this.dataSource.filterPredicate = (data: Aulas, filter: string) => data.codigo.toString().indexOf(filter) !== -1;
     this.ngAfterViewInit();
     console.log('esto tiene estudiantes');
     console.log('estudiantes', this.Estudiante);
   }, error => {
     console.log('error', error);
   });
 }

 ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

applyFilter (filterValue: string) {
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  this.dataSource.filter = filterValue;
}

  regresar() {
    this.router.navigate(['/menuInscripcion']);
  }

  openDialog(content, id: number) {
    console.log(id);
    this.EstudianteService.getDetalleEstudiante(id).subscribe((
      response) => {
        this.detalleEstudiante = response.Estudiante;
        console.log(this.detalleEstudiante);
        this.ngModal.open(content, { centered: true });
      }, (error) => {
        console.log(error);
      });
  }

  openDialogCancel(cancelContent) {
    this.ngModal.open(cancelContent, { centered: true });
    }

   verDetalleEstudiante(estudiante: Estudiantes) {
    localStorage.removeItem('estudianteId');
    localStorage.setItem('estudianteId', estudiante.id_estudiante.toString());
    this._router.navigate(['detalleEstudiante', estudiante.id_estudiante]);
  //  this.router.navigate(['/detalleEstudiante']);
  }
}
