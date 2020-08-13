import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { User } from '../../clases/user';
import { GlobalService } from '../../servicios/global.service';
import { Subscription } from 'rxjs';
import { MantenimientoAulasService } from '../../servicios/mantenimiento-aulas.service';
import { Aulas } from '../../clases/aulas';
import { NgbModal, NgbActiveModal} from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { debounceTime } from '../../../../node_modules/rxjs/operators';
import { Subject } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-aulas-mantenimiento',
  templateUrl: './aulas-mantenimiento.component.html',
  styleUrls: ['./aulas-mantenimiento.component.css']
})
export class AulasMantenimientoComponent implements OnInit {
  account: User = new User();
  userSub: Subscription;
  displayedColumns = ['No', 'codigo', 'ubicacion', 'acciones'];
  dataSource = new MatTableDataSource();
  aulas: Aulas[];
  aulas2: Aulas;
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

  constructor(private global: GlobalService, private router: Router, private AulasService: MantenimientoAulasService,
     private changeDetectorRefs: ChangeDetectorRef, private ngModal: NgbModal) { }

  ngOnInit() {
    this.loading = false;

    this.userSub = this.global.user.subscribe( me => this.account = me);
     if (localStorage.getItem('token') && localStorage.getItem('account')) {
        this.global.me = JSON.parse(localStorage.getItem('account'));
        this.getAulas();
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

  getAulas() {
     this.AulasService.getAulas().subscribe( response => {
      this.aulas = response.aulas;
      this.dataSource.data = this.aulas;
   //   this.dataSource.filterPredicate = (data: Aulas, filter: string) => data.codigo.toString().indexOf(filter) !== -1;
      this.ngAfterViewInit();
      console.log('esto tiene aulas');
      console.log('aulas', this.aulas);
      this.changeDetectorRefs.detectChanges();
    }, error => {
      console.log('error', error);
    });
  }

  newAulas() {
    this.router.navigate(['/aula']);
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
    if (confirm('Deseas eliminar el aula seleccionada?')) {
      this.prueba = id;
      console.log(this.prueba);
      this.AulasService.deshabilitarAula(id).subscribe((
        response) => {
          console.log(response);
          this.loading = false;
          this._success.next('Aula eliminada exitosamente');
          this.getAulas();
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
  this.AulasService.detalleAula(id).subscribe((
    response) => {
      this.aulas2 = response.aula;
      console.log(this.aulas2);
      this.ngModal.open(content, { centered: true });
    }, (error) => {
      console.log(error);
    });
}

openDialogCancel(cancelContent) {
  this.ngModal.open(cancelContent, { centered: true });
}

}

