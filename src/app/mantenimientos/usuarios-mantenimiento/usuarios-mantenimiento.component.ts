import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { User } from '../../clases/user';
import { GlobalService } from '../../servicios/global.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';


@Component({
  selector: 'app-usuarios-mantenimiento',
  templateUrl: './usuarios-mantenimiento.component.html',
  styleUrls: ['./usuarios-mantenimiento.component.css']
})
export class UsuariosMantenimientoComponent implements OnInit {
  
  account: User = new User();//Crea un nuevo usuario.
  userSub: Subscription;
  users: User[];
  displayedColumns = ['number', 'nombre', 'apellido', 'username', 'email', /*'opcion'*/];
  dataSource = new MatTableDataSource();
  staticAlertClosed = false;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UsuarioService, private router: Router, private global: GlobalService) { }

  ngOnInit() {
    setTimeout(() => 20000);

  	this.userSub = this.global.user.subscribe( 
      me => this.account = me
      );
    this.getUsuarios();
    
  }
  getUsuarios(){
  	this.userService.getUsers().subscribe(users =>{
      this.users = users;
      this.dataSource.data = users;
      this.ngAfterViewInit();
      this.users = users;
  		console.log('users', users);
  	}, error =>{
  		console.log('error', error);
  	})
  }

  newUsuarios(){
  	let usuarios = new User();
  	//this.userService.setter(usuarios);
  	this.router.navigate(['/usuario']);
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
