import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {DetalleEstudiante} from '../clases/detalle-estudiante';
import { EstudiantesService } from '../../app/servicios/estudiantes.service';

@Component({
  selector: 'app-detalle-estudiante',
  templateUrl: './detalle-estudiante.component.html',
  styleUrls: ['./detalle-estudiante.component.css']
})
export class DetalleEstudianteComponent implements OnInit {
detalleEstudiante: DetalleEstudiante;

  constructor(private router: Router, private route: ActivatedRoute, private estudianteService: EstudiantesService ) { }

  ngOnInit() {
    this.getDetalleEstudiantes(this.route.snapshot.params['id_estudiante']);
  }

  regresar() {
    this.router.navigate(['/datosEstudiantes']);
  }

  exportarFicha() {

  }

  getDetalleEstudiantes(id_estudiante: number) {
    console.log('hola estas en el metodo detalle estudiante');
      this.estudianteService.getDetalleEstudiante(id_estudiante).subscribe(
        data => {
          this.detalleEstudiante = data.Estudiante;
        console.log('esto tiene detalleEstudiante');
        console.log(this.detalleEstudiante);
        }, (error) => {
          console.log(error);
        });

  }
}
