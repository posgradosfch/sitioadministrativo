/*
-Nombre del Módulo: Agregar Editar Procedimiento.
-Dirección física: src/app/crear-editar/agregar-editar-procedimiento.ts
-Objetivo: Modulo para realizar el ingreso y la edicion de un procedimiento.
-Desarrollado por: Marisol García.
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '../../../../node_modules/@angular/forms';
import { Subject } from '../../../../node_modules/rxjs';
import { NgbModal } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { debounceTime } from '../../../../node_modules/rxjs/operators';
import { Procedimiento } from '../../clases/procedimiento';
import { MantenimientoProcedimientosService } from '../../servicios/mantenimiento-procedimientos.service';

@Component({
  selector: 'app-agregar-editar-procedimiento',
  templateUrl: './agregar-editar-procedimiento.component.html',
  styleUrls: ['./agregar-editar-procedimiento.component.css']
})
export class AgregarEditarProcedimientoComponent implements OnInit {

  register:FormGroup;
  loading: boolean;
  _success = new Subject<string>();
  procedimientos: Procedimiento[];
  staticAlertClosed = false;
  successMessage: string;
  closeResult: string;
  hide = true;
  
  constructor(private procedimientoServices : MantenimientoProcedimientosService,
    private _router:Router, private fb: FormBuilder, private ngModal: NgbModal) { }
  /*
  -Objetivo: Todos los datos contenidos en este metodo son 
  inicializadas al cargar la vista.
  */
  ngOnInit(): void{
    this.loading = false;
    /*
    -Objetivo: Este metodo es para realizar las validaciones del formulario
    */
    this.register = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
    /*
    -Objetivo: Muestra un mensaje tipo alerta de exito cuando el registro se realiza correctamente.
    */
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => {
      this.successMessage = null;
      this._router.navigate(['/mantenimientoProcedimientos']);
    });
  }
  /*
  -Objetivo: Este metodo es para realizar el registro de los procedimiento
  */
  registrarProcedimiento(){
    this.loading = true;
    this.procedimientoServices.registrarProcedimiento(this.register.value).subscribe((
      response)=>{        
        this.loading = false;
        this._success.next(`Procedimiento creado exitosamente`);
        console.log(response);
      }, (error)=>{
        this.loading = false;
        console.log(error);
      });
  }
  /*
  -Objetivo: Metodo para abrir ventana emergente al cancelar el formulario.
  */
  openVerticallyCentered(content) {
    this.ngModal.open(content, { centered: true });
  }
}
