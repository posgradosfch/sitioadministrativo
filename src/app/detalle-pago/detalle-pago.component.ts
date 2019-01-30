import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultarPagoService } from '../servicios/consultar-pago.service';
import { Estudiantes } from '../clases/estudiantes';
import { Cuota } from '../clases/cuota';

export interface ElementDos {
  nombre: string;
  carnet: string;
  nombre_programa: string;
  ciclo: string;
  codigo_programa: string;
  plan_estudio: number;
}

const ELEMENT1: ElementDos[] = [
  {nombre: 'Juan Perez', carnet: 'PG15001', nombre_programa: 'Maestría Investigación Social',
  ciclo: 'ciclo II 2018', codigo_programa: 'PQR1009',  plan_estudio: 2001 },
 // {nombre: 'Ana Perez', carnet: 'PR15001', plan: 2009, codigo: 'MQR1009', programa: 'Maestria en traduccion', ciclo: 'ciclo I 2018'},
];

@Component({
  selector: 'app-detalle-pago',
  templateUrl: './detalle-pago.component.html',
  styleUrls: ['./detalle-pago.component.css']
})
export class DetallePagoComponent implements OnInit {
  estudiantes: Estudiantes[];
  cuotasEstudiante: Cuota[];
 dataSource = new MatTableDataSource();
//  dataSource = ELEMENT1;
 dataSource2 = new MatTableDataSource();
  // this.dataSource = new MatTableDataSource(res.data.yourSubArray);
  displayedColumns = ['Nombre del estudiante', 'Codigo del programa' ,
  'Nombre del programa', 'Plan de estudios'];

  displayedColumns2 = ['Arrancel o cuota', 'Monto', 'Año' ,
  'Fecha', 'Estado', 'Ciclo', 'Numero de recibo', 'Numero del codigo de barras', 'Verificado', 'Acciones' ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private router: Router,  private consultarPagoServices: ConsultarPagoService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getEstudiante(this.route.snapshot.params['id_estudiante']);
    this.getCuotasEstudiantes(this.route.snapshot.params['id_estudiante']);
  }

  getEstudiante(id_estudiante) {
    this.consultarPagoServices.detallePago(id_estudiante).subscribe(
      data => {
        this.estudiantes = data.Estudiante;
        this.dataSource.data = this.estudiantes;
     //   this.ngAfterViewInit();
      console.log('esto tiene Estudiantes');
        console.log(this.estudiantes);
      }, (error) => {
        console.log(error);
      });
  }

  getCuotasEstudiantes(id_estudiante) {
    console.log('hola');
      let d = new Date();
      let n = d.getFullYear();
      console.log(n);
      this.consultarPagoServices.cuotasEstudiante(id_estudiante, n).subscribe(
        data => {
          this.cuotasEstudiante = data.cuotas;
          this.dataSource.data = this.cuotasEstudiante;
       //   this.ngAfterViewInit();
        console.log('esto tiene cuotas');
        console.log(this.cuotasEstudiante);
        }, (error) => {
          console.log(error);
        });

  }


applyFilter (filterValue: string) {
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  this.dataSource.filter = filterValue;
}

   regresar() {
    this.router.navigate(['/comprobantes']);
  }

  cancelarInscripcion() {
    if (confirm('Deseas cancelar la inscripcion del estudiante seleccionado?')) {
    }
  }

}
