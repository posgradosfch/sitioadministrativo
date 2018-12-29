import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { User } from '../../clases/user';
import { GlobalService } from '../../servicios/global.service';
import { Subscription } from 'rxjs';
import { GestionInscripcionService } from '../../servicios/gestion-inscripcion.service';
import { Inscripcion } from '../../clases/inscripcion';
import { NgbModal, NgbActiveModal} from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { debounceTime } from '../../../../node_modules/rxjs/operators';
import { Subject } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-inscripcion-mantenimiento',
  templateUrl: './inscripcion-mantenimiento.component.html',
  styleUrls: ['./inscripcion-mantenimiento.component.css'],
 // providers: [ { provide: LOCALE_ID, useValue: 'es-ES' }, ]
})
export class InscripcionMantenimientoComponent implements OnInit {
  account: User = new User();
  userSub: Subscription;
  // 
  displayedColumns = ['id', 'nombre', 'ciclo', 'Fecha y hora de inicio', 'Fecha y hora de fin', 'Estado', 'acciones'];
  dataSource = new MatTableDataSource();
  inscripciones: Inscripcion[];
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

  constructor(private global: GlobalService, private router: Router, private inscripcionService: GestionInscripcionService,
    private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.loading = false;

    this.userSub = this.global.user.subscribe( me => this.account = me);
     if (localStorage.getItem('token') && localStorage.getItem('account')) {
        this.global.me = JSON.parse(localStorage.getItem('account'));
        this.getInscripciones();
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

  getInscripciones() {
    this.inscripcionService.getInscripciones().subscribe( response => {
      this.inscripciones = response.inscripciones;
      this.dataSource.data = this.inscripciones;
   //   this.dataSource.filterPredicate = (data: Aulas, filter: string) => data.codigo.toString().indexOf(filter) !== -1;
      this.ngAfterViewInit();
      console.log('esto tiene inscripciones');
      console.log('inscripciones', this.inscripciones);
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
    if (confirm('Deseas eliminar la inscripcion seleccionada?')) {
      this.prueba = id;
      console.log(this.prueba);
      this.inscripcionService.deshabilitarInscripcion(id).subscribe((
        response) => {
          console.log(response);
          this.loading = false;
          this._success.next('Inscripcion eliminada exitosamente');
          this.getInscripciones();
        }, (error) => {
          this.loading = false;
          console.log(error);
        });
       }
    }
}
