import { Component, OnInit, ViewChild } from '@angular/core';
import { MantenimientoDocentesService } from '../../servicios/mantenimiento-docentes.service';
import { Docente } from '../../clases/docente';
import { GlobalService } from '../../servicios/global.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { User } from '../../clases/user';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-docentes-mantenimiento',
  templateUrl: './docentes-mantenimiento.component.html',
  styleUrls: ['./docentes-mantenimiento.component.css']
})
export class DocentesMantenimientoComponent implements OnInit {

  account: User = new User();
  userSub: Subscription;
  docentes: Docente[];
  docente: Docente[];
  displayedColumns = ['number','nombre', 'apellido', /*'telefono', 'movil', 'email', 'formacion',*/ 'titulo', 'opcion'];
  dataSource = new MatTableDataSource();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private docenteService: MantenimientoDocentesService, private router: Router, 
    private global: GlobalService, private ngModal: NgbModal) { }

  ngOnInit() {
  	this.userSub = this.global.user.subscribe( me => this.account = me);	
  	  if (localStorage.getItem('token') && localStorage.getItem('account')){     // 
        this.global.me = JSON.parse(localStorage.getItem('account'));
        this.getDocentes();
    } else {
    	  this.router.navigate(['/home']);
    }
  }
  getDocentes(){
  	this.docenteService.getDocentes().subscribe(docentes =>{
      this.docentes = docentes;
      this.dataSource.data = docentes;
      this.ngAfterViewInit();
      this.docentes = docentes;
  		console.log('docentes', docentes);
  	}, error =>{
  		console.log('error', error);
  	})
  }

  newDocentes(){
  	let docentes = new Docente();
  	//this.userService.setter(usuarios);
  	this.router.navigate(['/docente']);
  }

   /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  detDocente(id_docente: number): void {
    this.docenteService.detDocente(id_docente).subscribe(
      data => {
        this.docente = data;
        console.log(this.docente);
      }, (error)=>{
        //this.loading = false;
        console.log(error);
      });
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
