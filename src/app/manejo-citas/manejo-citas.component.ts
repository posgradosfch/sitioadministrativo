import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manejo-citas',
  templateUrl: './manejo-citas.component.html',
  styleUrls: ['./manejo-citas.component.css']
})

export class ManejoCitasComponent implements OnInit {

  constructor( private router: Router) { }
var = 10;

  ngOnInit() {
  }

  newEvent() {
// let usuarios = new User();
// this.userService.setter(usuarios);
    this.router.navigate(['/agregarCita']);
  }

  notificaciones() {
    this.router.navigate(['/notificarCita']);
  }
}
