import { Component, OnInit } from '@angular/core';
import { Procedimiento } from '../clases/procedimiento';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MantenimientoProcedimientosService } from '../servicios/mantenimiento-procedimientos.service';

@Component({
  selector: 'app-manejo-citas-vista',
  templateUrl: './manejo-citas-vista.component.html',
  styleUrls: ['./manejo-citas-vista.component.css']
})
export class ManejoCitasVistaComponent implements OnInit {

  
  panelOpenState = false;
  procedimientos: Procedimiento[];
  
  constructor(private modal: NgbModal, private router: Router, 
    private procedimientoServices: MantenimientoProcedimientosService) {}

  ngOnInit() {
    this.mostrarProcedimiento(); 

  }
  mostrarProcedimiento(){
    this.procedimientoServices.getProcedimiento().subscribe(response =>{
  		this.procedimientos = response;
  		console.log('procedimientos', response);
  	}, error =>{
  		console.log('error', error);
  	})
  }

}
