import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { User } from '../../clases/user';
import { GlobalService } from '../../servicios/global.service';
import { Subscription } from 'rxjs';
import { MantenimientoDescuentosService } from '../../servicios/mantenimiento-descuentos.service';
import { Descuento } from '../../clases/descuento';
import { NgbModal, NgbActiveModal} from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { debounceTime } from '../../../../node_modules/rxjs/operators';
import { Subject } from '../../../../node_modules/rxjs';
import { CrearArancelService } from '../../servicios/crear-arancel.service';

@Component({
  selector: 'app-descuentos-mantenimiento',
  templateUrl: './descuentos-mantenimiento.component.html',
  styleUrls: ['./descuentos-mantenimiento.component.css']
})
export class DescuentosMantenimientoComponent implements OnInit {
  account: User = new User();
  userSub: Subscription;
  displayedColumns = ['Nombre', 'Porcentaje de descuento', 'Descripcion' ,
  'Estado', 'opcion'];
  dataSource = new MatTableDataSource();
  descuento: Descuento[];
  descuentos2: Descuento;
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


  constructor(private global: GlobalService, private router: Router, private DescuentoService: MantenimientoDescuentosService,
    private changeDetectorRefs: ChangeDetectorRef, private ngModal: NgbModal, private crearArancelService: CrearArancelService ) { }

  ngOnInit() {
    this.loading = false;
 this.userSub = this.global.user.subscribe( me => this.account = me);
  if (localStorage.getItem('token') && localStorage.getItem('account')) {
     this.global.me = JSON.parse(localStorage.getItem('account'));
     this.getDescuentos();
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

  newDescuento() {
    this.router.navigate(['/descuento']);
  }

  getDescuentos() {
    this.crearArancelService.getDescuento().subscribe( response => {
     this.descuento = response.descuentos;
     this.dataSource.data = this.descuento;
  //   this.dataSource.filterPredicate = (data: Aulas, filter: string) => data.codigo.toString().indexOf(filter) !== -1;
     this.ngAfterViewInit();
     console.log('esto tiene descuento');
     console.log('descuento', this.descuento);
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
   if (confirm('Deseas eliminar el descuento seleccionado?')) {
     this.prueba = id;
     console.log(this.prueba);
     this.DescuentoService.deshabilitarDescuento(id).subscribe((
       response) => {
         console.log(response);
         this.loading = false;
         this._success.next('Arancel eliminado exitosamente');
         this.getDescuentos();
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
 this.DescuentoService.detalleDescuento(id).subscribe((
   response) => {
     this.descuentos2 = response.descuento;
     console.log(this.descuentos2);
     this.ngModal.open(content, { centered: true });
   }, (error) => {
     console.log(error);
   });
}

openDialogCancel(cancelContent) {
 this.ngModal.open(cancelContent, { centered: true });
}

}
