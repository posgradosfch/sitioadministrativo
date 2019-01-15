import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-pagos',
  templateUrl: './menu-pagos.component.html',
  styleUrls: ['./menu-pagos.component.css']
})
export class MenuPagosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  consultarPago() {
    this.router.navigate(['/consultarPagos']);
  }

  guardarPago() {
    this.router.navigate(['/guardarPago']);
  }

  verificarPago() {
    this.router.navigate(['/verificarPago']);
  }

  arrancelesCuotas() {
    this.router.navigate(['/mantenimientoAranceles']);
  }
}
