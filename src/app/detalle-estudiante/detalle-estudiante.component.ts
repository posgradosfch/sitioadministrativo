import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-estudiante',
  templateUrl: './detalle-estudiante.component.html',
  styleUrls: ['./detalle-estudiante.component.css']
})
export class DetalleEstudianteComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  regresar() {
    this.router.navigate(['/menuInscripcion']);
  }

  exportarFicha() {

  }
}
