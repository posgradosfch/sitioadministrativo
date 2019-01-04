import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-inscripcion',
  templateUrl: './menu-inscripcion.component.html',
  styleUrls: ['./menu-inscripcion.component.css']
})
export class MenuInscripcionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

  }

  crearInscripcion() {
    this.router.navigate(['/eventoInscripcion']);
  }

  comprobantesInscrip() {
    this.router.navigate(['/comprobantes']);
  }

  reaperturarInscrip() {
    this.router.navigate(['/reaperturarInscripcion']);
  }

  datosEstudiantes() {
    this.router.navigate(['/datosEstudiantes']);
  }
}
