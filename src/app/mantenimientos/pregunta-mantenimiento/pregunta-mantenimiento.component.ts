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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pregunta-mantenimiento',
  templateUrl: './pregunta-mantenimiento.component.html',
  styleUrls: ['./pregunta-mantenimiento.component.css']
})
export class PreguntaMantenimientoComponent implements OnInit {

  displayedColumns = ['number', 'titulo', /*'categoria', 'tipo', */'opcion'];
  pregunta: Pregunta[];
  categorias: Categoria[];
  tipos: Tipo[];
  dataSource = new MatTableDataSource();
  account: User = new User();
  userSub: Subscription;

  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private preguntaService : MantenimientoPreguntaService, private _router:Router,
    private global: GlobalService, private ngModal: NgbModal) { 

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
    this.preguntaService.getPreguntas().subscribe(response =>{
      //evaluaciones.sort(function(a, b){return a.fecha_ini - b.fecha_ini})
      this.dataSource.data = response.preguntas;
      this.dataSource.filterPredicate = (data: Pregunta, filter: string) => data.titulo.toString().indexOf(filter) != -1;
      this.ngAfterViewInit();
      console.log('preguntas', this.dataSource.data);
    }, error =>{
      console.log('error', error);
    })
  }

  getCategorias(){
    this.preguntaService.mostrarCategorias().subscribe(response =>{
      this.categorias = response;
      console.log('categorias', response);
    }, error =>{
      console.log('error', error);
    })
  }

  getTipos(){
    this.preguntaService.mostrarTipos().subscribe(response =>{
      this.tipos = response.tipos;
      console.log('tipos', response.tipos);
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

  detPregunta(id_pregunta: number): void {
    this.preguntaService.detPregunta(id_pregunta).subscribe(
      data => {
        this.pregunta = data.pregunta;
        console.log(this.pregunta);
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


}
