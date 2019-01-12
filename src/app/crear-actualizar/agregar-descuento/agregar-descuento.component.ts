import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-descuento',
  templateUrl: './agregar-descuento.component.html',
  styleUrls: ['./agregar-descuento.component.css']
})
export class AgregarDescuentoComponent implements OnInit {
 // variables usadas para el select de dias
 ListaDias: string[] = ['Cuotas', 'Ingreso a posgrados', 'Preinscripcion', 'Inscrpcion anual', 'Matricula anual'];
 ListaDias2: string[] = ['Maestrias', 'Diplomados', 'Doctorados'];
 ListaDias3: string[] = ['Estudiantes', 'Docentes', 'Empleados escuela de posgrados cchh'];
  constructor() { }

  ngOnInit() {
  }

}
