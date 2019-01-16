/*
-Nombre del Módulo: Formulario de registro.
-Dirección física: src/app/crear-editar/agregar-arancel.ts
-Objetivo: Modulo para crear un arancel a traves de un formulario.
-Desarrollado por: Veronica Reyes.
*/
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '../../../../node_modules/@angular/forms';
import { Subject } from '../../../../node_modules/rxjs';
import { NgbModal } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { debounceTime } from '../../../../node_modules/rxjs/operators';
import { Aranceles } from '../../clases/aranceles';
import { Router } from '@angular/router';
import { MantenimientoArancelesService } from '../../servicios/mantenimiento-aranceles.service';
import { CrearArancelService } from '../../servicios/crear-arancel.service';

@Component({
  selector: 'app-agregar-arancel',
  templateUrl: './agregar-arancel.component.html',
  styleUrls: ['./agregar-arancel.component.css']
})
export class AgregarArancelComponent implements OnInit {
  register: FormGroup;
  loading: boolean;
  _success = new Subject<String>();
  aranceles: Aranceles[];
  staticAlertClosed = false;
  successMessage: String;
  closeResult: String;
  hide = true;
  tipo: any;
  descuentos: any;

  constructor(private arancelesService: MantenimientoArancelesService, private router: Router, private fb: FormBuilder,
    private ngModal: NgbModal, private descuentoService: CrearArancelService ) { }

  ngOnInit() {
    this.loading = false;
    /*
    Objetivo: validar el formulario
    */
   this.register = this.fb.group({
    codigo: ['', [Validators.required, Validators.minLength(5), Validators.pattern('[A-Za-z0-9_]{5,20}')]],
    nombre: ['',  [Validators.required, Validators.pattern('^[ A-Za-záéíóúÁÉÍÓÚñ]+$')]],
    descripcion: ['',  [Validators.required, Validators.pattern('^[ A-Za-záéíóúÁÉÍÓÚñ]+$')]],
    monto: ['', [Validators.required, Validators.min(1.00)]],
    tipo: ['',  [Validators.required]],
    descuento: ['',  [Validators.required]]
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
    this.router.navigate(['/mantenimientoAranceles']);
  });

  this.getTipo();
  this.getDescuento();
  }

    /*
  Objetivo: Guardar los datos del formulario, para crear un aula nuevo
  */
 registrarArancel() {
  this.loading = true;
  console.log(this.register.value);
  this.arancelesService.registrarAranceles(this.register.value).subscribe((
    response) => {
      this.loading = false;
      this._success.next('Arancel creado exitosamente');
      console.log(response);
    }, (error) => {
      this.loading = false;
      console.log(error);
    });
}

getTipo() {
  this.arancelesService.tipoAranceles().subscribe( response => {
    this.tipo = response.Tipos;
    console.log('esto tiene Tipos');
    console.log('Tipos', this.tipo);
  }, error => {
    console.log('error', error);
  });
}

getDescuento() {
  this.descuentoService.getDescuento().subscribe( response => {
    this.descuentos = response.descuentos;
    console.log('esto tiene descuentos');
    console.log('descuentos', this.descuentos);
  }, error => {
    console.log('error', error);
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
