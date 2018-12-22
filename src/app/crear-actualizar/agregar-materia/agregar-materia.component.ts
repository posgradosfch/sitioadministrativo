/*
-Nombre del Módulo: Formulario de registro.
-Dirección física: src/app/crear-editar/agregar-programa.ts
-Objetivo: Modulo para crear una programa a traves de un formulario.
-Desarrollado por: Veronica Reyes.
*/
import { Component, OnInit } from '@angular/core';
import { MantenimientoMateriasService } from '../../servicios/mantenimiento-materias.service';
import { Materia } from '../../clases/materia';
import { FormGroup, Validators, FormBuilder } from '../../../../node_modules/@angular/forms';
import { Subject } from '../../../../node_modules/rxjs';
import { NgbModal } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { debounceTime } from '../../../../node_modules/rxjs/operators';
import { Router } from '@angular/router';
import { MantenimientoProgramasService } from '../../servicios/mantenimiento-programas.service';
import { Programas } from '../../clases/programas';


@Component({
  selector: 'app-agregar-materia',
  templateUrl: './agregar-materia.component.html',
  styleUrls: ['./agregar-materia.component.css']
})
export class AgregarMateriaComponent implements OnInit {
  programas: Programas[];
  materias: Materia[];
  register: FormGroup;
  loading: boolean;
  _success = new Subject<String>();
  staticAlertClosed = false;
  successMessage: String;
  closeResult: String;
  hide = true;

  constructor(private MateriasService: MantenimientoMateriasService, private router: Router, private fb: FormBuilder,
    private ngModal: NgbModal, private programasService: MantenimientoProgramasService) { }

  ngOnInit() {
    this.loading = false;
    /*
    Objetivo: validar el formulario
    */
   this.register = this.fb.group({
    codigo: ['', Validators.required],
    nombre: ['', Validators.required],
    correlativo: ['', [Validators.required, Validators.minLength(1), Validators.max(50)]],
    unidad_valorativa: ['', [Validators.required,  Validators.minLength(1), Validators.max(50)]],
    prerequisito: [''],
    id_programa: ['', Validators.required],
    ciclo: ['', [Validators.required,  Validators.minLength(1), Validators.max(50)]],
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
    this.router.navigate(['/matenimientoMaterias']);
  });
    this.getMaterias();
    this.getProgramas();
  }

  get f() { return this.register.controls; }

  get correlativo() {
    return this.register.get('correlativo');
  }

  get unidad_valorativa() {
    return this.register.get('unidad_valorativa');
  }

  get ciclo() {
    return this.register.get('ciclo');
  }
  /*Objetivo:
  Devolver un listado de materias para se usado en el combox de prerrequisito  
  */
  getMaterias() {
    this.MateriasService.getMaterias().subscribe( response => {
      this.materias = response.materias;
      console.log('esto tiene materias');
      console.log('materias', this.materias);
    }, error => {
      console.log('error', error);
    });
  }
  /*Objetivo:
  Devolver un listado de programas para se usado en el combox de prerrequisito  
  */
  getProgramas() {
    this.programasService.getProgramas().subscribe( response => {
     this.programas = response.programas;
     console.log('esto tiene programas');
     console.log('programas', this.programas);
   }, error => {
     console.log('error', error);
   });
 }

    /*
  Objetivo: Guardar los datos del formulario, para crear un aula nuevo
  */
 registrarMateria() {
  this.loading = true;
  console.log('esto es lo que se mandara el servicio');
  console.log(this.register.value);
  this.MateriasService.registrarMateria(this.register.value).subscribe((
    response) => {
      this.loading = false;
      this._success.next('Materia creada exitosamente');
      console.log(response);
    }, (error) => {
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
