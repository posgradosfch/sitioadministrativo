/*
-Nombre del Módulo: Agregar Editar Rol.
-Dirección física: src/app/crear-editar/agregar-editar-rol.ts
-Objetivo: Modulo para realizar el ingreso y la edicion de un rol.
-Desarrollado por: Marisol García.
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { Roles } from '../../clases/roles';
import { Permisos } from '../../clases/permisos';
import { MantenimientoRolesService } from '../../servicios/mantenimiento-roles.service';
import { Router } from '@angular/router';
import { MantenimientoPermisosService } from '../../servicios/mantenimiento-permisos.service';
import { SelectionModel } from '../../../../node_modules/@angular/cdk/collections';
import { MatTableDataSource, MatPaginator } from '../../../../node_modules/@angular/material';
import { FormGroup, Validators, FormBuilder } from '../../../../node_modules/@angular/forms';
import { Subject } from '../../../../node_modules/rxjs';
import { NgbModal } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { debounceTime } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-agregar-editar-rol',
  templateUrl: './agregar-editar-rol.component.html',
  styleUrls: ['./agregar-editar-rol.component.css']
})
export class AgregarEditarRolComponent implements OnInit {

  register:FormGroup;
  loading: boolean;
  _success = new Subject<string>();
  rol: Roles;
  permisos: Permisos[];
  displayedColumns: string[] = ['select', 'number', 'name'];
  dataSource = new MatTableDataSource<Permisos>();
  selection = new SelectionModel<Permisos>(true, []);
  staticAlertClosed = false;
  successMessage: string;
  closeResult: string;
  hide = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _rolService : MantenimientoRolesService,
    private _router:Router,
    private permisoServicio: MantenimientoPermisosService,
    private fb: FormBuilder, private ngModal: NgbModal) { }

  /*
  -Objetivo: Todos los datos contenidos en este metodo son 
  inicializadas al cargar la vista.
  */
  ngOnInit(): void{
    this.loading = false;
    /*
    -Objetivo: Este metodo es para realizar las validaciones del formulario
    */
    this.register = this.fb.group({
      name: ['', Validators.required],
      permissions: [this.selection.selected] 
    });
    this.permisoServicio.getPermisos().subscribe(permisos => {
      this.dataSource.data = permisos;
      this.ngAfterViewInit();
      console.log(permisos);
      this.permisos = permisos;
    }, (error)=> {
      console.log(error);
    })
    /*
    -Objetivo: Muestra un mensaje tipo alerta de exito cuando el registro se realiza correctamente.
    */
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => {
      this.successMessage = null;
      this._router.navigate(['/mantenimientoRoles']);
    });
  }
  /*
  -Objetivo: Este metodo es para realizar el registro de los roles
  */
  registrarRoles(){
    this.loading = true;
    this.register.value.permissions = this.selection.selected;//asigna los permisos seleccionados a la variable permissions
    this._rolService.agregarRol(this.register.value).subscribe((
      response)=>{        
        this.loading = false;
        this._success.next(`Rol creado exitosamente`);
        console.log(response);
      }, (error)=>{
        this.loading = false;
        console.log(error);
      });
  }

  /*
  -Objetivo: Metodo para abrir ventana emergente al cancelar el formulario.
  */
  openVerticallyCentered(content) {
    this.ngModal.open(content, { centered: true });
  }

  /*
  -Objetivo: Verifica que el numero de elementos seleccionado
  sea igual al total de elemtos registrados.
  */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /*
  -Objetivo: Selecciona todas las filas si no han sido seleccionadas; 
  o viseversa limpia la seleccion.
  */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  /*
  -Objetivo: Muestra la paginacion sobre los datos registrados.
  */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
