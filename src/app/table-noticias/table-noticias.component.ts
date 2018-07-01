import { Component, OnInit } from '@angular/core';
import { MantenimientoNoticiasService } from '../servicios/mantenimiento-noticias.service';
import { Noticias } from '../servicios/noticias';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-noticias',
  templateUrl: './table-noticias.component.html',
  styleUrls: ['./table-noticias.component.css']
})
export class TableNoticiasComponent implements OnInit {

   noticias:Noticias[];

  constructor(private noticiaServicio: MantenimientoNoticiasService, private _router:Router) { }

  ngOnInit():  void {
  	this.noticiaServicio.getNoticias().subscribe(noticias => {
  		console.log(noticias);
  	  this.noticias = noticias;
    },(error)=>{
      console.log(error);
  	});
  }

}
