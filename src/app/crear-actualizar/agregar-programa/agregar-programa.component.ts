/*
-Nombre del Módulo: Formulario de registro.
-Dirección física: src/app/crear-editar/agregar-programa.ts
-Objetivo: Modulo para crear una programa a traves de un formulario.
-Desarrollado por: Veronica Reyes.
*/
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '../../../../node_modules/@angular/forms';
import { Subject } from '../../../../node_modules/rxjs';
import { NgbModal } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { debounceTime } from '../../../../node_modules/rxjs/operators';
import { Programas } from '../../clases/programas';
import { Router } from '@angular/router';
import { MantenimientoProgramasService } from '../../servicios/mantenimiento-programas.service';


@Component({
  selector: 'app-agregar-programa',
  templateUrl: './agregar-programa.component.html',
  styleUrls: ['./agregar-programa.component.css']
})
export class AgregarProgramaComponent implements OnInit {
  register: FormGroup;
  loading: boolean;
  _success = new Subject<String>();
  programas: Programas[];
  staticAlertClosed = false;
  successMessage: String;
  closeResult: String;
  hide = true;

  constructor(private programaService: MantenimientoProgramasService, private router: Router, private fb: FormBuilder,
    private ngModal: NgbModal) { }

  ngOnInit() {
    this.loading = false;
    /*
    Objetivo: validar el formulario
    */
   this.register = this.fb.group({
    codigo: ['', [Validators.required, Validators.minLength(5), Validators.pattern('[A-Za-z0-9_]{5,20}')]],
    nombre: ['',  [Validators.required, Validators.pattern('^[ A-Za-záéíóúÁÉÍÓÚñ]+$')]],
    descripcion: ['',  [Validators.required, Validators.pattern('^[ A-Za-záéíóúÁÉÍÓÚñ]+$')]],
    totalUV: ['',  [Validators.required,  Validators.minLength(1), Validators.max(200)]],
    plan_estudio: ['', [Validators.required, Validators.pattern('[0-9][0-9][0-9][0-9]')]],
    duracion_ciclo: ['', [Validators.required,  Validators.minLength(1), Validators.max(15)]],
    duracion_anio: ['', [Validators.required, Validators.pattern('[0-9][0-9][0-9][0-9]')]],
    titulo: ['',  [Validators.required, Validators.pattern('^[ A-Za-záéíóúÁÉÍÓÚñ]+$')]],
    total_asignaturas: ['',  [Validators.required,  Validators.minLength(1), Validators.max(50)]],
    nota_minima: ['', [Validators.required, Validators.min(6.00), Validators.max(10.00)]],
    cum_minimo: ['',  [Validators.required, Validators.min(6.00), Validators.max(10.00)]],
    caracteristicas: ['',  [Validators.required, Validators.pattern('^[ A-Za-záéíóúÁÉÍÓÚñ]+$')]],
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
  
  get cum_minimo() {
    return this.register.get('cum_minimo');
  }

  get nota_minima() {
    return this.register.get('nota_minima');
  }
  /*
  Objetivo: Guardar los datos del formulario, para crear un aula nuevo
  */
 registrarPrograma() {
  this.loading = true;
  this.programaService.registrarPrograma(this.register.value).subscribe((
    response) => {
      this.loading = false;
      this._success.next('Programa de educación continua creado exitosamente');
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
