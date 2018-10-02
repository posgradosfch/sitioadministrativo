import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbTimeAdapter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Cita } from '../clases/cita';
import { CrearCitaService } from '../servicios/crear-cita.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificarCitaService } from '../servicios/notificar-cita-proxima.service';
import { CitaDetalle } from '../clases/citaDetalle';
import { Subject } from 'rxjs';
import { Usuarios } from '../clases/usuarios';
import { ObtenerEntidadesService } from '../servicios/obtener-entidades.service';
import { debounceTime } from 'rxjs/operators';
import { Time } from '@angular/common';

@Injectable()
export class NgbTimeStringAdapter extends NgbTimeAdapter<string> {
  /*
  -Objetivo: Función encargada de cambiar el formato de la hora de json a hh:mm:ss
  */
  fromModel(value: string): NgbTimeStruct {
    if (!value) {
      return null;
    }
    const split = value.split(':');
    return {
      hour: parseInt(split[0], 10),
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10)
    };
  }

  toModel(HoraInicio: NgbTimeStruct): string {
    if (!HoraInicio) {
      return null;
    }
    return `${this.pad(HoraInicio.hour)}:${this.pad(HoraInicio.minute)}:${this.pad(HoraInicio.second)}`;
  }

  private pad(i: number): string {
    return i < 10 ? `0${i}` : `${i}`;
  }
}

export interface Detalle {
  evento: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  holaInicio: Time;
  horaFin: Time;
  diaCompleto: boolean;
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

export class ManejoCitasComponent implements OnInit {

  closeResult: string;
  cantidad: string;
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
  anio = new Date().getFullYear();

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  citas: Cita[];
  citasMes: Cita[];
  detalle: Detalle[];
  citaDetalle: CitaDetalle[];

  // time: NgbTimeStruct = {hour: 13, minute: 30, second: 30};
  time: '13:30:00';
  seconds = true;
  spinners = true;
  updateCita: FormGroup;
  loading: boolean;
  _success = new Subject<string>();
  successMessage: string;
  cita;
  // checked = true;
  condicion = true;
  usu: Usuarios[];

  // show: boolean;
  // this.show = this.diaCompletoValor.value;

  constructor(private ngModal: NgbModal, private router: Router,
    private citaService: CrearCitaService, private cantidadNotificacion: NotificarCitaService,
    private obtenerEntidadesService: ObtenerEntidadesService, private fb: FormBuilder) { }

  /*
-Objetivo: Obtener los valores del FormBuilder nuevaCita.
*/
  get fechaInicio() { return this.updateCita.get('FechaInicio'); }

  get fechaFin() { return this.updateCita.get('FechaFin'); }

  get horaFin() { return this.updateCita.get('HoraFin'); }

  get horaInicio() { return this.updateCita.get('HoraInicio'); }

  get eventoNombre() { return this.updateCita.get('evento'); }

  get descripcionCita() { return this.updateCita.get('descripcion'); }

  get citaParaEntidad() { return this.updateCita.get('citaPara'); }

  get citaConEntidad() { return this.updateCita.get('citaCon'); }

  get lugarCita() { return this.updateCita.get('lugar'); }

  get diaCompletoValor() { return this.updateCita.get('diaCompleto'); }



  ngOnInit() {
    this.getNumeroBadge();
    this.loading = false;
    this.updateCita = this.fb.group({
      evento: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(8)]],
      citaPara: ['', [Validators.required, Validators.minLength(8)]],
      citaCon: ['', Validators.required],
      diaCompleto: [false],
      FechaInicio: ['', Validators.required],
      HoraInicio: ['', Validators.required],
      FechaFin: ['', Validators.required],
      HoraFin: ['', Validators.required],
      lugar: ['', [Validators.required,]],
    });
    /*
    -Objetivo: Muestra un mensaje tipo alerta de exito cuando el registro se realiza correctamente.
    */
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
    /*
   -Objetivo: crear el json que se enviara al  microservicio para crear citas
    */

    this.mostrarEntidades();

  }

  getCitasAnio(anio: number) {
    console.log(anio);
    this.citaService.getCitasAnio(anio).subscribe(data => {
      this.citas = data.citas;
      console.log(this.citas);
    });
  }

  getCitasMes(mes: number, anio: number) {
    this.citaService.getCitasAnioMes(mes, anio).subscribe(data => {
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

  openEdit(contentEdit) {
    this.ngModal.open(contentEdit, { centered: true });
  }

  getCitaDetalle(id: number) {
    this.citaService.getDetalleCita(id).subscribe(data => {
      this.detalle = data.detalle;
      console.log(this.detalle);
    });
  }

  getCitaEditar(id: number) {
    this.citaService.getDetalleCita(id).subscribe(data => {
      this.detalle = data.detalle;
      console.log(this.detalle);
    });
  }

  //actualizar los datos
  actualizarCita(citas: Cita): void {
    this.citaService.updateCita(citas).subscribe(data => {
      /* this.detalle = data.detalle;
       console.log(this.detalle);*/
    });
  }

  getNumeroBadge() {
    this.cantidadNotificacion.getCantidadNotificaciones().subscribe(response => {
      this.cantidad = response.cantida;
      console.log(this.cantidad);
    }, error => {
      console.log('error', error)
    });

  }

  soloFechaInicio() {
    this.condicion = !this.condicion;

  }

  agendarCita() {
    console.log(this.updateCita.value);
    this.cita = {
      evento: this.eventoNombre.value,
      descripcion: this.descripcionCita.value,
      citaPara: this.citaParaEntidad.value,
      citaCon: this.citaConEntidad.value,
      diaCompleto: this.diaCompletoValor.value,
      FechaHoraInicio: this.fechaInicio.value + ' ' + this.horaInicio.value,
      FechaHoraFin: this.fechaFin.value + ' ' + this.horaFin.value,
      lugar: this.lugarCita.value
    };
    console.log(this.cita);
    console.log('intentando');
    console.log(this.updateCita.value);
    this.loading = true;
    console.log('esto se mandara al microservicio');
    console.log(this.cita);
  }

  mostrarEntidades() {
    this.obtenerEntidadesService.getEntidades().subscribe(response => {
      this.usu = response.usuarios;
      console.log('usuarios', response);
      console.log(this.usu);
      console.log(response);
    }, error => {
      console.log('error', error);
    });
  }

}

