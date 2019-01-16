import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { User } from '../../clases/user';
import { GlobalService } from '../../servicios/global.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-usuarios-mantenimiento',
  templateUrl: './usuarios-mantenimiento.component.html',
  styleUrls: ['./usuarios-mantenimiento.component.css']
})
export class UsuariosMantenimientoComponent implements OnInit {
  
  account: User = new User();//Crea un nuevo usuario.
  userSub: Subscription;
  users: User[];
  user: User[];
  displayedColumns = ['number', 'nombre', 'apellido', 'username', /*'email',*/ 'opcion'];
  dataSource = new MatTableDataSource();
  staticAlertClosed = false;
  loading: boolean;
  _success = new Subject<string>();
  successMessage: string;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
      (click)="modal.close('Ok click')">Ok</button>`;

  constructor(private userService: UsuarioService, private router: Router, 
    private global: GlobalService, private ngModal: NgbModal) { }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this.userSub = this.global.user.subscribe( 
      me => this.account = me
      );
    this.getUsuarios();
    
  }
  getUsuarios(){
  	this.userService.getUsers().subscribe(users =>{
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

  unableUsuario(user: User): void {
    //this.loading = true;
    if (confirm('Deseas eliminar el usuario seleccionado?')){
      this.userService.unableUsuario(user.id).subscribe(
        data => {
          console.log(data);
          //this.loading = false;
          this._success.next('Usuario eliminado exitosamente');
          this.getUsuarios();
        }, (error)=>{
          //this.loading = false;
          console.log(error);
        });
    }
    
  }

  detUsuario(id: number): void {
    this.userService.detUsuario(id).subscribe(
      data => {
        this.user = data;
        console.log(this.user);
      }, (error)=>{
        //this.loading = false;
        console.log(error);
      });
  }

  deleteUser(user: User): void {
    //this.loading = true;
    if (confirm('Deseas eliminar el usuario seleccionado?')){
    this.userService.deleteUser(user.id)
      .subscribe( data => {
          console.log(data);
          this.users = this.users.filter(u => u !== user);
          //this.loading = false;
          this._success.next('Usuario eliminado exitosamente');
          this.getUsuarios();
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
