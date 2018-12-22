/*
-Nombre del Módulo: Formulario para crear un horario.
-Dirección física: src/app/crear-editar/agregar-horario.ts
-Objetivo: Modulo para crear un horario nuevo.
-Desarrollado por: Veronica Reyes.
*/
import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, AbstractControl } from '../../../../node_modules/@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {NgbTimeStruct, NgbTimeAdapter} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MantenimientoHorariosService } from '../../servicios/mantenimiento-horarios.service';

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

  toModel(horaInicio: NgbTimeStruct): string {
    if (!horaInicio) {
      return null;
    }
    return `${this.pad(horaInicio.hour)}:${this.pad(horaInicio.minute)}:${this.pad(horaInicio.second)}`;
  }

  private pad(i: number): string {
    return i < 10 ? `0${i}` : `${i}`;
  }
}


@Component({
  selector: 'app-agregar-horarios',
  templateUrl: './agregar-horarios.component.html',
  styleUrls: ['./agregar-horarios.component.css'],
  providers: [{provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter}]
})
export class AgregarHorariosComponent implements OnInit {
  register: FormGroup;
  loading: boolean;
  _success = new Subject<String>();
  staticAlertClosed = false;
  successMessage: String;
  closeResult: String;
  hide = true;
// variables usadas para la configiracion de los Time picker de ngbootstrap
  time: '13:30:00';
  seconds = true;
  spinners = true;

  constructor(private horarioService: MantenimientoHorariosService, private router: Router, private fb: FormBuilder,
    private ngModal: NgbModal) { }

    get horaFIn() {  return this.register.get('horaFIn'); }

    get horaInicio() {   return this.register.get('horaInicio'); }

  ngOnInit() {
    this.loading = false;
    /*
    Objetivo: validar el formulario
    */
   this.register = this.fb.group({
    codigo: ['', Validators.required],
    horaInicio: ['', Validators.required],
    horaFIn: ['', Validators.required]
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
    this.router.navigate(['/mantenimientoHorarios']);
  });
  }


  /*
  Objetivo: Guardar los datos del formulario, para crear un horario nuevo
  */
 registrarHorario() {
  this.loading = true;
  console.log(this.register.value);
  this.horarioService.registrarHorarios(this.register.value).subscribe((
    response) => {
      this.loading = false;
      this._success.next('Horario creado exitosamente');
      console.log(response);
    }, (error) => {
      this.loading = false;
      console.log(error);
    });
    }

    openVerticallyCentered(content) {
      this.ngModal.open(content, { centered: true });
      this.register.value.nombre = '';
      this.register.value.id_paso = '';
    }

}
