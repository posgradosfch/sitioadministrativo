import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { User } from '../../clases/user';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../servicios/global.service';
import { Pregunta } from '../../clases/pregunta';
import { Categoria } from '../../clases/categoria';
import { Tipo } from '../../clases/tipo';
import { MantenimientoPreguntaService } from '../../servicios/mantenimiento-pregunta.service';

@Component({
  selector: 'app-pregunta-mantenimiento',
  templateUrl: './pregunta-mantenimiento.component.html',
  styleUrls: ['./pregunta-mantenimiento.component.css']
})
export class PreguntaMantenimientoComponent implements OnInit {

  displayedColumns = ['number', 'titulo', 'categoria', 'tipo', 'opcion'];
  preguntas: Pregunta[];
  categorias: Categoria[];
  tipos: Tipo[];
  dataSource = new MatTableDataSource();
  account: User = new User();
  userSub: Subscription;

  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private preguntaService : MantenimientoPreguntaService, private _router:Router, private global: GlobalService) { 

  }

  ngOnInit(): void {
    //mostrar mensaje
    this.userSub = this.global.user.subscribe(me => this.account = me);	
    //Verificar el logueo
    if (localStorage.getItem('token') && localStorage.getItem('account')){     // 
      this.global.me = JSON.parse(localStorage.getItem('account'));
      this.getPreguntas();
  } else {
      this._router.navigate(['/home']);
  }
}

  getPreguntas(){
    this.preguntaService.getPreguntas().subscribe(preguntas =>{
      //evaluaciones.sort(function(a, b){return a.fecha_ini - b.fecha_ini})
      this.dataSource.data = preguntas;
      this.dataSource.filterPredicate = (data: Pregunta, filter: string) => data.nombre.toString().indexOf(filter) != -1;
      this.preguntas = this.preguntas;
      this.ngAfterViewInit();
      console.log('preguntas', preguntas);
    }, error =>{
      console.log('error', error);
    })
  }

  getCategorias(){
    this.preguntaService.mostrarCategorias().subscribe(categorias =>{
      this.categorias = categorias;
      console.log('categorias', categorias);
    }, error =>{
      console.log('error', error);
    })
  }

  getTipos(){
    this.preguntaService.mostrarTipos().subscribe(tipos =>{
      this.tipos = tipos;
      console.log('tipos', tipos);
    }, error =>{
      console.log('error', error);
    })
  }

  newPregunta(){
    this._router.navigate(['/pregunta']);
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