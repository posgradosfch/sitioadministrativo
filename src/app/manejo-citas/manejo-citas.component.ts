import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cita } from '../clases/cita';
import { CrearCitaService } from '../servicios/crear-cita.service';
import { FormGroup } from '@angular/forms';


export interface Detalle {
  evento: string;
  descripcion: string;
  fechaHorainicio: Date;
  fechaHorafin: Date;
  lugar: string;
  citaPara: string;
  citaCon: string;
  cancelado: boolean;
}

@Component({
  selector: 'app-manejo-citas',
  templateUrl: './manejo-citas.component.html',
  styleUrls: ['./manejo-citas.component.css']
})

export class ManejoCitasComponent implements OnInit{

  closeResult: string;
  panelOpenState = false;
  enero = 1;
  febrero = 2;
  marzo = 3;
  abril = 4;
  mayo = 5;
  junio = 6;
  julio = 7;
  agosto = 8;
  septiembre = 9;
  octubre = 10;
  noviembre = 11;
  diciembre = 12;
  anio= new Date().getFullYear();

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  citas: Cita[];
  citasMes: Cita[];
  detalle: Detalle[];

  constructor(private ngModal: NgbModal, private router: Router, 
    private citaService: CrearCitaService) {}

  ngOnInit() {
    
  }

  getCitasAnio(anio: number) {
    console.log(anio);
    this.citaService.getCitasAnio(anio).subscribe(data =>{
      this.citas = data.citas;
      console.log(this.citas);
    });
  }

  getCitasMes(mes: number, anio: number) {
    this.citaService.getCitasAnioMes(mes, anio).subscribe(data =>{
      this.citasMes = data.citas;
      console.log(this.citasMes);
    });
  }

  notificaciones() {
    this.router.navigate(['/notificarCita']);
  }

    newEvent(): void {
    this.router.navigate(['/agregarCita']);
  }
  
  /*
  -Objetivo: Metodo para abrir ventana emergente al cancelar el formulario.
  */
  openDialog(content) {
    this.ngModal.open(content, { centered: true });
  }

  getCitaDetalle(id: number){
    this.citaService.getDetalleCita(id).subscribe(data =>{
      this.detalle = data.detalle;
      console.log(this.detalle);
    });
  }
}

