import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReactiveFormsModule,  } from '@angular/forms';
import {FormBuilder, FormGroup, FormControl , Validators} from '@angular/forms';
import { GenerarCodigoService } from './servicios/generar-codigo.service';
import { CodigosAspirante } from './servicios/codigos';
import { ConsultarCodigosService } from './servicios/consultar-codigos.service';

@Component({
       selector: 'app-generar-codigo',
       templateUrl: './generar-codigo.component.html',
       styleUrls: ['./generar-codigo.component.css'],
       providers: [GenerarCodigoService],
     })
     export class GenerarCodigoComponent implements OnInit {
   //  myForm: FormGroup;
private codigosAspirante: CodigosAspirante[];
       codigo: any ;
       correlativo: any;
       vigencia: any;
     @ViewChild('content') content: ElementRef;
     public nombre = 'nombre del componente';
     public codigos1: number[] = this.getCodigos(100);
     codigosArreglo;

       constructor(private generarCodService: GenerarCodigoService, private consultarCodService: ConsultarCodigosService) {
            }
         ngOnInit() {
        // this.myForm = this.fb.group({
        // cantidad: [null, [
        //   Validators.required,
        //   Validators.min(1),
        //   Validators.max(100)
        // ]]
      // });
      this.codigosArreglo = {
      codigos: this.codigos1
      };
    console.log(this.codigosArreglo);
  //  console.log(this.codigos1);
       // this.myForm.valueChanges.subscribe(console.log);
       }
       // metodo generador de codigo, solo no se como desplegarlo en el html
       public getCodigos(cantidad: number) {
         var hoy = new Date();
         var res = hoy.toISOString().slice(0, 10).replace(/-/g, "");
         console.log(res);
         var cod = [];
         for (let index = 1; index < cantidad; index++) {
             cod.push(res + index);
         }

         return cod;
     }


     generarcodigo( ) {
     //  this.codigo =;
      // this.codigos: number[] = this.getCodigos(100);
      this.vigencia = '5 dias';
      this.correlativo = 1;
     this.generarCodService.generarcodigo(this.codigosArreglo).subscribe(
      response => {
    //    alert('codigos' + ' ' + this.codigosArreglo.codigos + ' ' + 'has been created' );
    alert('codigos creados exitosamente!' );
       this.consultarCodService.getCodigosAspirante().subscribe(codigosAspirante1 => {
        console.log(codigosAspirante1);
         this.codigosAspirante = codigosAspirante1;
       }, (error) => {
          console.log(error);
        });
        },
      error => console.log('error', error)
    );
  }


    //   get cantidad() {
      //   return this.myForm.get('cantidad');
      // }
    // public  downloadPDF () {
     // let doc = new jsPDF;
     // let specialElementHandlers = {
     //   '#editor': function(element, renderer) {
     //     return true;
      //  }
      // };
     //  let content = this.content.nativeElement;
     //  doc.fromHTML(content.innerHTML, 15, 15, {
     // 'width': 190,
     // 'elementHandlers': specialElementHandlers
     // });
     // doc.save('test.pdf');
     // }
     //  uniqueNumber.previous = 0;
     // uniqueNumber()
        // let date = Date.now();
        // if (date <= this.uniqueNumber.previous) {
        //     date = ++uniqueNumber.previous;
        // } else {
        //     uniqueNumber.previous = date;
        // }
         // return date;
     // }
     // ID() {
      // return uniqueNumber ();
     // }
}
