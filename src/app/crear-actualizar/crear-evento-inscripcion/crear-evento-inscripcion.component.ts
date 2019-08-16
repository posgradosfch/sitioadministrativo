import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '../../../../node_modules/@angular/forms';
import { Subject } from '../../../../node_modules/rxjs';
import { NgbModal } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { debounceTime } from '../../../../node_modules/rxjs/operators';
import { Programas } from '../../clases/programas';
import { Router } from '@angular/router';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {NgbTimeStruct, NgbTimeAdapter} from '@ng-bootstrap/ng-bootstrap';
import { GestionInscripcionService } from '../../servicios/gestion-inscripcion.service';

@Injectable()
export class NgbTimeStringAdapter extends NgbTimeAdapter<string> {

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

  toModel(time: NgbTimeStruct): string {
    if (!time) {
      return null;
    }
    return `${this.pad(time.hour)}:${this.pad(time.minute)}:${this.pad(time.second)}`;
  }

  private pad(i: number): string {
    return i < 10 ? `0${i}` : `${i}`;
  }
}

@Component({
  selector: 'app-crear-evento-inscripcion',
  templateUrl: './crear-evento-inscripcion.component.html',
  styleUrls: ['./crear-evento-inscripcion.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'es-SV'},
    {provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter}
  ]
})

export class CrearEventoInscripcionComponent implements OnInit {
  register: FormGroup;
  loading: boolean;
  _success = new Subject<String>();
 //  programas: Programas[];
  staticAlertClosed = false;
  successMessage: String;
  closeResult: String;
  hide = true;
  time: '13:30:00';
  datosPeriodoInscripcion;

  constructor(private inscripcionService: GestionInscripcionService, private router: Router, private fb: FormBuilder,
    private ngModal: NgbModal) { }

  ngOnInit() {

     this.loading = false;
    /*
    Objetivo: validar el formulario
    */
   this.register = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern('^[ A-Za-záéíóúÁÉÍÓÚñ]+$')]],
    diaInicio: ['', Validators.required],
    diaFin: ['', Validators.required ],
    horaInicio: ['', Validators.required],
    horaFin: ['', Validators.required],
    anioAcademico: ['', Validators.required]
   });
   /*
  -Objetivo: Muestra un mensaje tipo alerta de exito cuando el registro se realiza correctamente
  tiene una duracion de 5 segundos.
  */
   this._success.subscribe((message) => this.successMessage = message);
   this._success.pipe(
    debounceTime(5000)
  ).subscribe(() => {
    this.successMessage = null;
    this.router.navigate(['/mantenimientoProgramas']);
  });
  }
   /*
  -Objetivo: Obtener los valores del FormBuilder secondFormGroup.
  */
get horaFin() {  return this.register.get('horaFin'); }
get horaInicio() {   return this.register.get('horaInicio'); }
get diaInicio() { return this.register.get('diaInicio'); }
get diaFin() {  return this.register.get('diaFin'); }
get nombre() { return this.register.get('nombre'); }
// get idCiclo() { return this.firstFormGroup.get('idCiclo'); }
// get idPrograma() { return this.firstFormGroup.get('idPrograma'); }

  registrarEvento() {
      this.loading = true;
      console.log(this.register.value);
      this.datosPeriodoInscripcion = {
        idCiclo: 1,
        nombre: this.nombre.value,
        diaInicio: this.diaInicio.value + ' ' + this.horaInicio.value,
        diaFin: this.diaFin.value + ' ' +  this.horaFin.value,
       id_programa: 7,
      };
      console.log(this.datosPeriodoInscripcion);
      console.log('esto se mandara a la ruta');
      console.log(this.datosPeriodoInscripcion);

      this.inscripcionService.periodoInscripcion(this.datosPeriodoInscripcion).subscribe(
       response => {
         this.loading = false;
         this._success.next('periodo de inscripcion creado exitosamente');
         console.log(response);
       }, error => {
         console.log('error', error);
       });
  }


}


