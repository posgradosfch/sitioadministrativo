import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '../../../../node_modules/@angular/forms';
import { User } from '../../clases/user';
import { GlobalService } from '../../servicios/global.service';
import { Subscription } from 'rxjs';
import { MantenimientoArancelesService } from '../../servicios/mantenimiento-aranceles.service';
import { Aranceles } from '../../clases/aranceles';
import { NgbModal, NgbActiveModal} from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { debounceTime } from '../../../../node_modules/rxjs/operators';
import { Subject } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-aranceles-mantenimiento',
  templateUrl: './aranceles-mantenimiento.component.html',
  styleUrls: ['./aranceles-mantenimiento.component.css']
})
export class ArancelesMantenimientoComponent implements OnInit {
  register: FormGroup;
  modalReference: any; // variable que guarda la referencia al modal de crear cuota al ser abierto
  account: User = new User();
  userSub: Subscription;
  displayedColumns = ['codigo', 'Nombre del arrancel', 'monto' ,
  'descripcion', 'Estado', 'opcion'];
  dataSource = new MatTableDataSource();
  aranceles: Aranceles[];
  aranceles2: Aranceles;
  prueba: number; // puede ser borrada solo almacena el id
  // variables usadas para mostrar mensajes
  loading: boolean;
  _success = new Subject<String>();
  staticAlertClosed = false;
  successMessage: String;
  closeResult: String;
  hide = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private global: GlobalService, private router: Router, private ArancelesService: MantenimientoArancelesService,
    private changeDetectorRefs: ChangeDetectorRef, private ngModal: NgbModal, private fb: FormBuilder ) { }

  ngOnInit() {
    this.loading = false;
       /*
    Objetivo: validar el formulario
    */
   this.register = this.fb.group({
    anio: ['', [Validators.required, Validators.pattern('[0-9][0-9][0-9][0-9]')]]
  });
    this.userSub = this.global.user.subscribe( me => this.account = me);
     if (localStorage.getItem('token') && localStorage.getItem('account')) {
        this.global.me = JSON.parse(localStorage.getItem('account'));
        this.getAranceles();
    } else {
      this.router.navigate(['/home']);
    }

     /*
    -Objetivo: Muestra un mensaje tipo alerta de exito cuando el registro se realiza correctamente
    tiene una duracion de 5 segundos.
    */
      this._success.subscribe((message) => this.successMessage = message);
      this._success.pipe(
      debounceTime(5000)
      ).subscribe(() => {
      this.successMessage = null;
      });
  }

  getAranceles() {
    this.ArancelesService.getAranceles().subscribe( response => {
     this.aranceles = response.aranceles;
     this.dataSource.data = this.aranceles;
  //   this.dataSource.filterPredicate = (data: Aulas, filter: string) => data.codigo.toString().indexOf(filter) !== -1;
     this.ngAfterViewInit();
     console.log('esto tiene aranceles');
     console.log('aranceles', this.aranceles);
     this.changeDetectorRefs.detectChanges();
   }, error => {
     console.log('error', error);
   });
 }

 /**
  * Set the paginator and sort after the view init since this component will
  * be able to query its view for the initialized paginator and sort.
  */
 ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
 }

 applyFilter (filterValue: string) {
   filterValue = filterValue.trim(); // Remove whitespace
   filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
   this.dataSource.filter = filterValue;
 }

 onDelete(id: number) {
   this.loading = true;
   if (confirm('Deseas eliminar el arancel seleccionada?')) {
     this.prueba = id;
     console.log(this.prueba);
     this.ArancelesService.deshabilitarAranceles(id).subscribe((
       response) => {
         console.log(response);
         this.loading = false;
         this._success.next('Arancel eliminado exitosamente');
         this.getAranceles();
       }, (error) => {
         this.loading = false;
         console.log(error);
       });
      }
   }

        /*
 -Objetivo: Metodo para abrir ventana emergente.
 */
openDialog(content, id: number) {
 console.log(id);
 this.ArancelesService.detalleArancel(id).subscribe((
   response) => {
     this.aranceles = response.arancel;
     console.log(this.aranceles);
     this.ngModal.open(content, { centered: true });
   }, (error) => {
     console.log(error);
   });
}

openDialogCancel(cancelContent) {
 this.ngModal.open(cancelContent, { centered: true });
}

  registrarArancel() {

  }

  crearCuota() {
     this.loading = true;
    this.ArancelesService.generarCuotas(this.register.value).subscribe((response) => {
      this.loading = false;
      this.modalReference.close();
      this._success.next('Cuotas creadas exitosamente');
      console.log(response);
    }, (error) => {
      this.loading = false;
      console.log(error);
    });
  }

/*
-Objetivo: Metodo para abrir ventana emergente al cancelar el formulario.
*/
  openDialogCuota(contentCuota) {
    this.modalReference =  this.ngModal.open(contentCuota, { centered: true });
  }



}
