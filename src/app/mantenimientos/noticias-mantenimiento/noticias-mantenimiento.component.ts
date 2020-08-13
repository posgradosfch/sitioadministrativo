import { Component, OnInit, ViewChild } from '@angular/core';
import { MantenimientoNoticiasService } from '../../servicios/mantenimiento-noticias.service';
import { Noticias } from '../../clases/noticias';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { User } from '../../clases/user';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../servicios/global.service';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-noticias-mantenimiento',
  templateUrl: './noticias-mantenimiento.component.html',
  styleUrls: ['./noticias-mantenimiento.component.css']
})
export class NoticiasMantenimientoComponent implements OnInit {

  displayedColumns = ['number', 'titulo', /*'cuerpo',*/ 'fecha', 'opcion'];
  noticia:Noticias[];
  noticias:Noticias[];
  dataSource = new MatTableDataSource();
  account: User = new User();
  userSub: Subscription;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private noticiaService : MantenimientoNoticiasService, private _router:Router,
    private global: GlobalService, private ngModal: NgbModal) { 


  }

  ngOnInit(): void {this.userSub = this.global.user.subscribe(
      me => this.account = me);	
      if (localStorage.getItem('token') && localStorage.getItem('account')){     // 
        this.global.me = JSON.parse(localStorage.getItem('account'));
        this.getNoticias();
    } else {
        this._router.navigate(['/home']);
    }
  }
    getNoticias(){
      this.noticiaService.getNoticias().subscribe(noticias =>{
        this.dataSource.data = noticias;
        this.ngAfterViewInit();
        this.noticias = noticias;
        console.log('noticias', noticias);
      }, error =>{
        console.log('error', error);
      })
    }

  newNoticia(){
    let noticias = new Noticias();
    this.noticiaService.setter(noticias);
    this._router.navigate(['/noticia']);
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  detNoticia(id: number): void {
    this.noticiaService.detNoticia(id).subscribe(
      data => {
        this.noticia = data;
        console.log(this.noticia);
      }, (error)=>{
        //this.loading = false;
        console.log(error);
      });
  }

  deleteUser(noticia: Noticias): void {
    if (confirm('Deseas eliminar el noticia seleccionado?')){
    this.noticiaService.deleteUser(noticia.id)
      .subscribe( data => {
        //this.pasos = this.pasos.filter(u => u !== noticia);
          //this.loading = false;
          //this._success.next('Rol eliminado exitosamente');
          this.getNoticias();
        }, (error)=>{
          //this.loading = false;
          console.log(error);
        });
    }
  };
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
