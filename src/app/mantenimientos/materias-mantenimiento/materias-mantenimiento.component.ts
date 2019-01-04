import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { User } from '../../clases/user';
import { GlobalService } from '../../servicios/global.service';
import { Subscription } from 'rxjs';
import { MantenimientoMateriasService } from '../../servicios/mantenimiento-materias.service';
import { Materia } from '../../clases/materia';
import { NgbModal, NgbActiveModal} from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { debounceTime } from '../../../../node_modules/rxjs/operators';
import { Subject } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-materias-mantenimiento',
  templateUrl: './materias-mantenimiento.component.html',
  styleUrls: ['./materias-mantenimiento.component.css']
})
export class MateriasMantenimientoComponent implements OnInit {
  account: User = new User();
  userSub: Subscription;
  displayedColumns = ['No', 'codigo', 'programa al que pertenece', 'nombre', 'prerrequisito', 'unidades valorativa', 'ciclo', 'acciones'];
  dataSource = new MatTableDataSource();
  materias: Materia[];
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

  constructor(private global: GlobalService, private router: Router, private MateriasService: MantenimientoMateriasService,
     private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.loading = false;

    this.userSub = this.global.user.subscribe( me => this.account = me);
     if (localStorage.getItem('token') && localStorage.getItem('account')) {
        this.global.me = JSON.parse(localStorage.getItem('account'));
        this.getMaterias();
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

  getMaterias() {
    this.MateriasService.getMaterias().subscribe( response => {
      this.materias = response.materias;
      this.dataSource.data = this.materias;
   //   this.dataSource.filterPredicate = (data: Aulas, filter: string) => data.codigo.toString().indexOf(filter) !== -1;
      this.ngAfterViewInit();
      console.log('esto tiene materias');
      console.log('materias', this.materias);
      this.changeDetectorRefs.detectChanges();
    }, error => {
      console.log('error', error);
    });
  }

  newMaterias() {
    this.router.navigate(['/materia']);
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
    if (confirm('Deseas eliminar la materia seleccionada?')) {
      this.prueba = id;
      console.log(this.prueba);
      this.MateriasService.deshabilitarMateria(id).subscribe((
        response) => {
          console.log(response);
          this.loading = false;
          this._success.next('Materia eliminada exitosamente');
          this.getMaterias();
        }, (error) => {
          this.loading = false;
          console.log(error);
        });
       }
    }

}
