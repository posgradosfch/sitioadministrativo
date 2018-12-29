/*
-Nombre del Módulo: Formulario de registro.
-Dirección física: src/app/crear-editar/agregar-aula.ts
-Objetivo: Modulo para crear una aula a traves de un formulario.
-Desarrollado por: Veronica Reyes.
*/
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '../../../../node_modules/@angular/forms';
import { Subject } from '../../../../node_modules/rxjs';
import { NgbModal } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { debounceTime } from '../../../../node_modules/rxjs/operators';
import { Aulas } from '../../clases/aulas';
import { Router } from '@angular/router';
import { MantenimientoAulasService } from '../../servicios/mantenimiento-aulas.service';

@Component({
  selector: 'app-agregar-aula',
  templateUrl: './agregar-aula.component.html',
  styleUrls: ['./agregar-aula.component.css']
})
export class AgregarAulaComponent implements OnInit {
register: FormGroup;
loading: boolean;
_success = new Subject<String>();
aula: Aulas[];
staticAlertClosed = false;
successMessage: String;
closeResult: String;
hide = true;

  constructor(private aulaService: MantenimientoAulasService, private router: Router, private fb: FormBuilder,
     private ngModal: NgbModal ) { }

  ngOnInit() {
      this.loading = false;
      /*
      Objetivo: validar el formulario
      */
     this.register = this.fb.group({
      codigo: ['', Validators.required],
      ubicacion: ['',  [Validators.required, Validators.pattern('^[ A-Za-záéíóúÁÉÍÓÚñ]+$')]],
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
      this.router.navigate(['/mantenimientoAulas']);
    });
  }

  /*
  Objetivo: Guardar los datos del formulario, para crear un aula nuevo
  */
  registrarAula() {
        this.loading = true;
        this.aulaService.registrarAula(this.register.value).subscribe((
          response) => {
            this.loading = false;
            this._success.next('Aula creada exitosamente');
            console.log(response);
          }, (error) => {
            this.loading = false;
            console.log(error);
          });
  }

   /*
  -Objetivo: Metodo para abrir ventana emergente al cancelar el formulario.
  */
 openVerticallyCentered(content) {
  this.ngModal.open(content, { centered: true });
  this.register.value.nombre = '';
  this.register.value.id_paso = '';
}
}
