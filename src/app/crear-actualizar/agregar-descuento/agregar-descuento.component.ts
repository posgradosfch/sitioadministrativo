/*
-Nombre del Módulo: Formulario de registro.
-Dirección física: src/app/crear-editar/agregar-descuento.ts
-Objetivo: Modulo para crear un descuento a traves de un formulario.
-Desarrollado por: Veronica Reyes.
*/

import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '../../../../node_modules/@angular/forms';
import { Subject } from '../../../../node_modules/rxjs';
import { NgbModal } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { debounceTime } from '../../../../node_modules/rxjs/operators';
import { Descuento } from '../../clases/descuento';
import { Router } from '@angular/router';
import { MantenimientoDescuentosService } from '../../servicios/mantenimiento-descuentos.service';

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

  register: FormGroup;
  loading: boolean;
  _success = new Subject<String>();
  descuento: Descuento[];
  staticAlertClosed = false;
  successMessage: String;
  closeResult: String;
  hide = true;
  tipo: any;
  descuentos: any;
  constructor(private descuentoService: MantenimientoDescuentosService, private router: Router, private fb: FormBuilder,
    private ngModal: NgbModal) { }

  ngOnInit() {
    this.loading = false;
    /*
    Objetivo: validar el formulario
    */
   this.register = this.fb.group({
    nombre: ['',  [Validators.required, Validators.pattern('^[ A-Za-záéíóúÁÉÍÓÚñ]+$')]],
    descripcion: ['',  [Validators.required, Validators.pattern('^[ A-Za-záéíóúÁÉÍÓÚñ]+$')]],
    monto: ['', [Validators.required, Validators.min(1.00)]],
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
    this.router.navigate(['/mantenimientoDescuentos']);
  });
  }

   /*
  Objetivo: Guardar los datos del formulario, para crear un aula nuevo
  */
 registrarDescuento() {
  this.loading = true;
  console.log(this.register.value);
  this.descuentoService.registrarDescuento(this.register.value).subscribe((
    response) => {
      this.loading = false;
      this._success.next('Descuento creado exitosamente');
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
