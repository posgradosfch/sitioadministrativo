import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReactiveFormsModule,  } from '@angular/forms';
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
    //    alert('Codes' + ' ' + 'has been created' );
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
     public  downloadPDF () {
      let doc = new jsPDF();
      let specialElementHandlers = {
       '#editor': function(element, renderer) {
          return true;
          }
       };
      const content = this.content.nativeElement;
      doc.fromHTML(content.innerHTML, 15, 15, {
        'width': 190,
        'elementHandlers': specialElementHandlers
      });
      doc.save('test.pdf');
      }
      // prueba dos
      public  downloadPDFTable () {
          let pdf = new jsPDF('p', 'pt', 'letter');
          // source can be HTML-formatted string, or a reference
          // to an actual DOM element from which the text will be scraped.
       //  const source = '#customers';
           const source = this.customers.nativeElement;
          // we support special element handlers. Register them with jQuery-style 
          // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
          // There is no support for any other type of selectors 
          // (class, of compound) at this time.
         let specialElementHandlers = {
              // element with id of "bypass" - jQuery style selector
              '#bypassme': function (element, renderer) {
                  // true = "handled elsewhere, bypass text extraction"
                  return true;
              }
          };
          const margins = {
              top: 80,
              bottom: 60,
              left: 40,
              width: 522
          };
          // all coords and widths are in jsPDF instance's declared units
          // 'inches' in this case
          pdf.fromHTML(
          source, // HTML string or DOM elem ref.
          margins.left, // x coord
          margins.top, { // y coord
              'width': margins.width, // max width of content on PDF
              'elementHandlers': specialElementHandlers
          },
          function (dispose) {
              // dispose: object with X, Y of the last line add to the PDF 
              //          this allow the insertion of new lines after html
              pdf.save('Test.pdf');
          }, margins);
      }

ngAfterViewInit() {
  this.dataSource.sort = this.sort;
}
}
