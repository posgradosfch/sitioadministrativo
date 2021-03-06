import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { User } from '../../clases/user';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../servicios/global.service';
import { Paso } from '../../clases/paso';
import { Procedimiento } from '../../clases/procedimiento';
import { MantenimientoPasosService } from '../../servicios/mantenimiento-pasos.service';
import { MantenimientoProcedimientosService } from '../../servicios/mantenimiento-procedimientos.service';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {debounceTime} from 'rxjs/operators';

export interface Paso {
    id_paso: number;
    nombre: string;
    id_proceimiento: number;
    descripcion: string;
}

@Component({
  selector: 'app-pasos-mantenimiento',
  templateUrl: './pasos-mantenimiento.component.html',
  styleUrls: ['./pasos-mantenimiento.component.css']
})

export class PasosMantenimientoComponent implements OnInit {

  displayedColumns = ['number', 'nombre', /*'descripcion', 'procedimiento', 'orden', */'opcion'];
  pasos: Paso[];
  paso: Paso[];
  procedimientos: Procedimiento[];
  dataSource = new MatTableDataSource();
  account: User = new User();
  userSub: Subscription;

  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private pasoService : MantenimientoPasosService, private _router:Router, private global: GlobalService, 
    private procedimientoService : MantenimientoProcedimientosService, private ngModal: NgbModal) { 

  }

  ngOnInit(): void {
    //mostrar mensaje
    this.userSub = this.global.user.subscribe(me => this.account = me);	
    //Verificar el logueo
    if (localStorage.getItem('token') && localStorage.getItem('account')){     // 
      this.global.me = JSON.parse(localStorage.getItem('account'));
      this.getPaso();
      this.getProcedimimentos();
  } else {
      this._router.navigate(['/home']);
  }
}

  getPaso(){
    this.pasoService.getPasos().subscribe(pasos =>{
      pasos.sort(function(a, b){return a.id_proceimiento - b.id_proceimiento})
      this.dataSource.data = pasos;
      this.dataSource.filterPredicate = (data: Paso, filter: string) => data.id_proceimiento.toString().indexOf(filter) != -1;
      this.pasos = this.pasos;
      this.ngAfterViewInit();
      console.log('pasos', pasos.sort(function(a, b){return a.id_proceimiento - b.id_proceimiento}));
    }, error =>{
      console.log('error', error);
    })
  }

  getProcedimimentos(){
    this.procedimientoService.getProcedimiento().subscribe(procedimentos =>{
      this.procedimientos = procedimentos;
      console.log('procedimientos', procedimentos);
    }, error =>{
      console.log('error', error);
    })
  }

  newPaso(){
    this._router.navigate(['/paso']);
  }

  detPaso(id_paso: number): void {
    this.pasoService.detPaso(id_paso).subscribe(
      data => {
        this.paso = data;
        console.log(this.paso);
      }, (error)=>{
        //this.loading = false;
        console.log(error);
      });
  }

  deleteUser(paso: Paso): void {
    if (confirm('Deseas eliminar el paso seleccionado?')){
    this.pasoService.deleteUser(paso.id_paso)
      .subscribe( data => {
        //this.pasos = this.pasos.filter(u => u !== paso);
          //this.loading = false;
          //this._success.next('Rol eliminado exitosamente');
          this.getPaso();
        }, (error)=>{
          //this.loading = false;
          console.log(error);
        });
    }
  };

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue= filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  handleChange(procedimiento) {
   this.pasos = procedimiento.id_procedimiento;
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
