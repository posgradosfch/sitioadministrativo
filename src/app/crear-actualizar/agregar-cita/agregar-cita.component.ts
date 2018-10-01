/*
-Nombre del Módulo: Formulario para crear un evento.
-Dirección física: src/app/crear-editar/agregar-cita.ts
-Objetivo: Modulo para crear una cita nueva al sistema.
-Desarrollado por: Veronica Reyes.
*/
import { Component, OnInit,  Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {NgbTimeStruct, NgbTimeAdapter} from '@ng-bootstrap/ng-bootstrap';
import { CrearCitaService } from '../../servicios/crear-cita.service';
import { Router } from '@angular/router';
import { ObtenerEntidadesService } from '../../servicios/obtener-entidades.service';
import { Usuarios } from '../../clases/usuarios';


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

@Component({
  selector: 'app-agregar-cita',
  templateUrl: './agregar-cita.component.html',
  styleUrls: ['./agregar-cita.component.css'],
  providers: [{provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter}]
})

export class AgregarCitaComponent implements OnInit {
  // time: NgbTimeStruct = {hour: 13, minute: 30, second: 30};
  time: '13:30:00';
  seconds = true;
  spinners = true;
 nuevaCita: FormGroup;
  loading: boolean;
  _success = new Subject<string>();
  successMessage: string;
  closeResult: string;
  cita;
  // checked = true;
  condicion = true;
  usu: Usuarios[];

  // show: boolean;
   // this.show = this.diaCompletoValor.value;

  constructor(private router: Router, private  obtenerEntidadesService: ObtenerEntidadesService, private fb: FormBuilder, private ngModal: NgbModal, private crearCitaService: CrearCitaService ) { }
 /*
  -Objetivo: Obtener los valores del FormBuilder nuevaCita.
  */
 get fechaInicio() { return this.nuevaCita.get('FechaInicio'); }

 get fechaFin() {  return this.nuevaCita.get('FechaFin'); }

 get horaFin() {  return this.nuevaCita.get('HoraFin'); }

 get horaInicio() {   return this.nuevaCita.get('HoraInicio'); }

 get eventoNombre() {   return this.nuevaCita.get('evento'); }

 get descripcionCita() {   return this.nuevaCita.get('descripcion'); }

 get citaParaEntidad() {   return this.nuevaCita.get('citaPara'); }

 get citaConEntidad() {   return this.nuevaCita.get('citaCon'); }

 get lugarCita() {   return this.nuevaCita.get('lugar'); }

 get diaCompletoValor() {   return this.nuevaCita.get('diaCompleto'); }


  ngOnInit() {
    this.loading = false;
    this.nuevaCita = this.fb.group({
      evento: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(8)]],
      citaPara: ['', [Validators.required, Validators.minLength(8)]],
      citaCon: ['', Validators.required],
      diaCompleto: [false],
      FechaInicio: ['', Validators.required],
      HoraInicio: ['', Validators.required],
      FechaFin: ['', Validators.required],
      HoraFin: ['', Validators.required],
      lugar: ['', [Validators.required, ]],
   //   nombrePara: ['', Validators.required],
   //   nombreCon: ['', Validators.required],
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

  soloFechaInicio() {
   this.condicion = !this.condicion;

  }

  agendarCita() {
    console.log(this.nuevaCita.value);
    this.cita = {
      evento : this.eventoNombre.value,
      descripcion : this.descripcionCita.value,
      citaPara : this.citaParaEntidad.value,
      citaCon : this.citaConEntidad.value,
      diaCompleto : this.diaCompletoValor.value,
      FechaHoraInicio : this.fechaInicio.value + ' ' + this.horaInicio.value,
      FechaHoraFin: this.fechaFin.value + ' ' + this.horaFin.value,
      lugar: this.lugarCita.value
    };
    console.log(this.cita);
    console.log('intentando');
    console.log(this.nuevaCita.value);
    this.loading = true;
     console.log('esto se mandara al microservicio');
    console.log(this.cita);

    this.crearCitaService.agendarCita(this.cita).subscribe(
      response => {
        this.loading = false;
        this._success.next(`Evento creado exitosamente`);
        console.log(response);
        this.router.navigate(['/agregarCita']);
      }, error => {
        this.loading = false;
        console.log('error', error);
      });

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

