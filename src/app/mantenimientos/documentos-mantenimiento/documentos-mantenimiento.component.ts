import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { User } from '../../clases/user';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../servicios/global.service';
import { Paso } from '../../clases/paso';
import { Documento } from '../../clases/documento';
import { MantenimientoPasosService } from '../../servicios/mantenimiento-pasos.service';
import { MantenimientoDocumentosService } from '../../servicios/mantenimiento-documentos.service';

@Component({
  selector: 'app-documentos-mantenimiento',
  templateUrl: './documentos-mantenimiento.component.html',
  styleUrls: ['./documentos-mantenimiento.component.css']
})
export class DocumentosMantenimientoComponent implements OnInit {

  displayedColumns = ['number', 'nombre', 'paso', 'orden', 'opcion'];
  pasos: Paso[];
  documentos: Documento[];
  dataSource = new MatTableDataSource();
  account: User = new User();
  userSub: Subscription;

  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private pasoService : MantenimientoPasosService, private _router:Router, private global: GlobalService, 
    private documentoService : MantenimientoDocumentosService) { 

  }

  ngOnInit(): void {
    //mostrar mensaje
    this.userSub = this.global.user.subscribe(me => this.account = me);	
    //Verificar el logueo
    if (localStorage.getItem('token') && localStorage.getItem('account')){     // 
      this.global.me = JSON.parse(localStorage.getItem('account'));
      this.getPasos();
      this.getDocumentos();
  } else {
      this._router.navigate(['/home']);
  }
}

  getDocumentos(){
    this.documentoService.getDocumentos().subscribe(documentos =>{
      //documentos.sort(function(a, b){return a.id_paso.nombre - b.id_paso.nombre})
      this.dataSource.data = documentos.documentos;
      //this.dataSource.filterPredicate = (data: Paso, filter: string) => data.id_proceimiento.toString().indexOf(filter) != -1;
      this.documentos = this.documentos;
      this.ngAfterViewInit();
      console.log('documentos', documentos);
    }, error =>{
      console.log('error', error);
    })
  }

  getPasos(){
    this.pasoService.getPasos().subscribe(pasos =>{
      this.pasos = pasos;
      console.log('pasos', pasos);
    }, error =>{
      console.log('error', error);
    })
  }

  newDocumento(){
    this._router.navigate(['/documento']);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue= filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
