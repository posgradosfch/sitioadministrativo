import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CitasProximas } from '../../../clases/citas-proximas';
import { GlobalService } from '../../../servicios/global.service';
import { Subscription } from 'rxjs';
import { NotificarCitaService } from '../../../servicios/notificar-cita-proxima.service';
import { Router } from '@angular/router';
 import { User } from '../../../clases/user';
@Component({
  selector: 'app-notificar-cita',
  templateUrl: './notificar-cita.component.html',
  styleUrls: ['./notificar-cita.component.css']
})
export class NotificarCitaComponent implements OnInit {
  displayedColumns = ['nombre', 'descripcion', 'fechaI', 'fechaF', 'lugar'];
  dataSource = new MatTableDataSource();

  account: User = new User();
  userSub: Subscription;

  notificar: CitasProximas[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private citaProxService: NotificarCitaService, private router: Router, private global: GlobalService ) { }

  ngOnInit() {
    this.userSub = this.global.user.subscribe( me => this.account = me);
    if (localStorage.getItem('token') && localStorage.getItem('account')) {
      this.global.me = JSON.parse(localStorage.getItem('account'));
      this.getCitasProximas();
  } else {
      this.router.navigate(['/home']);
  }
  }

  getCitasProximas() {
      this.citaProxService.getNotificar().subscribe(response => {
      this.notificar = response.citas;
      this.dataSource.data = this.notificar;
      this.ngAfterViewInit();
      this.notificar = this.notificar;
      console.log('notificar', this.notificar);
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}

