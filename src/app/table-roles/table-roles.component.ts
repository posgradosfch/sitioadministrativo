import { Component, OnInit, ViewChild } from '@angular/core';
import { MantenimientoRolesService } from '../servicios/mantenimiento-roles.service';
import { Roles } from '../servicios/roles';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '../../../node_modules/@angular/material';

@Component({
  selector: 'app-table-roles',
  templateUrl: './table-roles.component.html',
  styleUrls: ['./table-roles.component.css']
})
export class TableRolesComponent implements OnInit {
  
  displayedColumns = ['name', 'permissions'];
  roles:Roles[];
  dataSource = new MatTableDataSource();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _rolService: MantenimientoRolesService, private _router:Router) { 
    
  }

  ngOnInit():void {
  	
    if (localStorage.getItem('token') && localStorage.getItem('account')){
      localStorage.getItem('token');
      this._rolService.getRoles().subscribe(roles => {
      this.dataSource.data = roles;
      this.ngAfterViewInit;
      console.log(roles);
    },(error)=>{
      console.log(error);
    });
    } else {
      this._router.navigate(['/home']);
    }
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

