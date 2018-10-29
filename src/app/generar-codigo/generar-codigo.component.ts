/*
-Nombre del Módulo: generar codigo.
-Dirección física: src/app/generar-codigo/generar-codigo.ts
-Objetivo: Modulo para generar codigos para poder ingresar al sitio web de estudiantes.
-Desarrollado por: Veronica Reyes.
*/
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormBuilder, FormGroup, FormControl , Validators} from '@angular/forms';
import { GenerarCodigoService } from './servicios/generar-codigo.service';
import { CodigosAspirante } from './servicios/codigos';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
       selector: 'app-generar-codigo',
       templateUrl: './generar-codigo.component.html',
       styleUrls: ['./generar-codigo.component.css'],
       providers: [GenerarCodigoService],
     })
     export class GenerarCodigoComponent implements OnInit {
      datosCodigo: FormGroup;
      submitted = false;
      ca: CodigosAspirante[];
  loading: boolean;
  _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  closeResult: string;
  options: FormGroup;
  hide = true;
  displayedColumns = ['number', 'codigo', 'vigencia'];
  dataSource = new MatTableDataSource();

     @ViewChild('content') content: ElementRef;
     @ViewChild('customers') customers: ElementRef;
     @ViewChild(MatSort) sort: MatSort;
       constructor(private generarCodService: GenerarCodigoService, private formBuilder: FormBuilder, private router: Router, private ngModal: NgbModal) {
      }
         ngOnInit() {
          this.loading = false;
       
    /*
    -Objetivo: Muestra un mensaje tipo alerta de exito cuando el registro se realiza correctamente.
    */
    this._success.subscribe((message) => this.successMessage = message);
      this._success.pipe(
        debounceTime(5000)
      ).subscribe(() => this.successMessage = null);
/*
    -Objetivo: Este metodo es para realizar las validaciones del formulario
    */
         this.datosCodigo = this.formBuilder.group({
        cantidad: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
        vigencia: ['', [Validators.required, Validators.minLength(10)]]
          });
       }

       get cantidad() {
        return this.datosCodigo.get('cantidad');
      }

      get vigencia() {
        return this.datosCodigo.get('vigencia');
      }

        /*
  -Objetivo: Este metodo es para generar la cantidad de codigos deseada por el usuario con su vigencia
  */
     generarcodigo( ) {
      console.log(this.datosCodigo.value);
      this.submitted = true;
      this.loading = true;
      // si el valor es invalido se detendra aca
       if (this.datosCodigo.invalid) {
           return;
       }
     this.generarCodService.generarcodigo(this.datosCodigo.value).subscribe(
      response => {
        this.loading = false;
        this._success.next(`Codigos creado exitosamente`);
        console.log(response);
        this.ca = response.codigos;
        this.dataSource.data = this.ca;
        this.ngAfterViewInit();
        console.log(this.ca);
        this.router.navigate(['/generarCodigo']);
        },
      error =>  {
        this.loading = false;
        console.log('error', error);
      });
  }

       /*
  -Objetivo: Este metodo es para generar un pdf con los datos del codigo generado y su vigencia.
  */
      public  downloadPDFTable () {
          let pdf = new jsPDF('p', 'pt', 'letter');
           const source = this.customers.nativeElement;
         let specialElementHandlers = {
              // element with id of "bypass" - jQuery style selector
              '#bypassme': function (element, renderer) {
                  // true = "manejado en cualquier lugar, bypass extraccion de texto"
                  return true;
              }
          };
          const margins = {
              top: 80,
              bottom: 60,
              left: 80,
              width: 522
          };
          // todas las coordenadas y anchos estan declaradas en unidades de las instancias de jsPDF 
          // 'pulgadas' en este caso
          pdf.fromHTML(
          source, // cadena HTML o referencia a un elemento del DOM
          margins.left, // coordenada x
          margins.top, { // coordenada y
              'width': margins.width, // maximo ancho del contenido del pdf
              'elementHandlers': specialElementHandlers
          },
          function (dispose) {
              // dispose: objeto con X, Y de la ultima linea agregada al pdf
              // esto permite la insercion de nuevas lineas despues del html
              pdf.save('Codigos.pdf');
          }, margins);


     }
/*
  -Objetivo: Muestra la paginacion de los datos registrados.
*/
ngAfterViewInit() {
  this.dataSource.sort = this.sort;
}
}
