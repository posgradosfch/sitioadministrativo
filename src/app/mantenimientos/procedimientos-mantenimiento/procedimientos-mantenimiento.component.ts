import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { User } from '../../clases/user';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../servicios/global.service';
import { Procedimiento } from '../../clases/procedimiento';
import { MantenimientoProcedimientosService } from '../../servicios/mantenimiento-procedimientos.service';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-procedimientos-mantenimiento',
  templateUrl: './procedimientos-mantenimiento.component.html',
  styleUrls: ['./procedimientos-mantenimiento.component.css']
})
export class ProcedimientosMantenimientoComponent implements OnInit {
  displayedColumns = ['number', 'nombre', /*'descripcion', */'opcion'];
  procedimientos:Procedimiento[];
  procedimiento:Procedimiento[];
  dataSource = new MatTableDataSource();
  account: User = new User();
  userSub: Subscription;
  staticAlertClosed = false;
  loading: boolean;
  _success = new Subject<string>();
  successMessage: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
      (click)="modal.close('Ok click')">Ok</button>`;

  constructor(private procedimientoService : MantenimientoProcedimientosService, 
    private _router:Router, private global: GlobalService, private ngModal: NgbModal) { 

  }

  ngOnInit(): void {
    //setTimeout(() => this.staticAlertClosed = true, 20000);
    //mostrar mensaje
    this.userSub = this.global.user.subscribe(me => this.account = me);	
    //Verificar el logueo
    if (localStorage.getItem('token') && localStorage.getItem('account')){     // 
      this.global.me = JSON.parse(localStorage.getItem('account'));
      this.getProcedimientos();
  } else {
      this._router.navigate(['/home']);
  }
}
  getProcedimientos(){
    this.procedimientoService.getProcedimiento().subscribe(procedimientos =>{
      this.dataSource.data = procedimientos;
      this.ngAfterViewInit();
      this.procedimientos = procedimientos;
      console.log('procedimientos', procedimientos);
    }, error =>{
      console.log('error', error);
    })
  }

  detProceso(id: number): void {
    this.procedimientoService.detProceso(id).subscribe(
      data => {
        this.procedimiento = data;
        console.log(this.procedimiento);
      }, (error)=>{
        //this.loading = false;
        console.log(error);
      });
  }

  newProcedimiento(){
    this._router.navigate(['/procedimiento']);
  }

  unableProcedimiento(procedimiento: Procedimiento): void {
    //this.loading = true;
    if (confirm('Deseas eliminar el procedimiento seleccionado?')){
      this.procedimientoService.unableProcedimiento(procedimiento.id_procedimiento).subscribe(
        data => {
          console.log(data);
          //this.loading = false;
          this._success.next('Procedimiento eliminado exitosamente');
          this.getProcedimientos();
        }, (error)=>{
          //this.loading = false;
          console.log(error);
        });
    }
    
  }

  deleteUser(procedimiento: Procedimiento): void {
    if (confirm('Deseas eliminar el procedimiento seleccionado?')){
    this.procedimientoService.deleteUser(procedimiento.id_procedimiento)
      .subscribe( data => {
        this.procedimientos = this.procedimientos.filter(u => u !== procedimiento);
          //this.loading = false;
          this._success.next('Rol eliminado exitosamente');
          this.getProcedimientos();
        }, (error)=>{
          //this.loading = false;
          console.log(error);
        });
    }
  };

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  /*
  -Objetivo: Metodo para abrir ventana emergente.
  */


  openDialog(content) {
    this.ngModal.open(content, { centered: true });
  }

  openDialogCancel(cancelContent, documento: User) {
    this.ngModal.open(cancelContent, { centered: true });
  }
}
