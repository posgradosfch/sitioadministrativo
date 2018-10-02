import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { User } from '../clases/user';
import { Subscription } from 'rxjs';
import { GlobalService } from '../servicios/global.service';
import { Aspirante } from '../clases/aspirante';
import { AspiranteService } from '../servicios/aspirante.service';

@Component({
  selector: 'app-aceptacion-aspirantes',
  templateUrl: './aceptacion-aspirantes.component.html',
  styleUrls: ['./aceptacion-aspirantes.component.css']
})
export class AceptacionAspirantesComponent implements OnInit {

  account: User = new User();
  userSub: Subscription;
  aspirante: Aspirante[];
  displayedColumns = ['number', 'nombre_aspirante', 'apellido_aspirante', 'titulo_pre', 'aceptado', 'opcion'];
  dataSource = new MatTableDataSource();
  aceptado: string;
  estado: boolean = null;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private aspiranteService : AspiranteService, private _router:Router, 
    private global: GlobalService, private route: ActivatedRoute) { 
      console.log(this.route.snapshot.paramMap.get('aceptado'));

  }

  ngOnInit(): void {
    //mostrar mensaje
    this.userSub = this.global.user.subscribe(me => this.account = me);	
    //Verificar el logueo
    if (localStorage.getItem('token') && localStorage.getItem('account')){     // 
      this.global.me = JSON.parse(localStorage.getItem('account'));
      this.getAspirantes();
  } else {
      this._router.navigate(['/home']);
  }
}
  
  getAspirantes(){
    this.aspiranteService.getAspirantes().subscribe(aspirantes =>{
      this.dataSource.data = aspirantes;
      this.ngAfterViewInit();
      console.log('aspirantes', aspirantes);
    }, error =>{
      console.log('error', error);
    })
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

  getAspiranteId(aspirante: Aspirante): void {
    this.aspiranteService.getAspiranteId(aspirante.id_aspirante).subscribe(data => {
      console.log(data);
    });
  }

}
