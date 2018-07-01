import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MantenimientoNoticiasService } from '../servicios/mantenimiento-noticias.service';
import { Noticias } from '../servicios/noticias';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noticias-mantenimiento',
  templateUrl: './noticias-mantenimiento.component.html',
  styleUrls: ['./noticias-mantenimiento.component.css']
})
export class NoticiasMantenimientoComponent implements OnInit {

  constructor(private noticiaService : MantenimientoNoticiasService, private _router:Router) { 


  }

  ngOnInit(): void {

  }

  newNoticia(){
    let noticias = new Noticias();
    this.noticiaService.setter(noticias);
    this._router.navigate(['/noticia']);
  }
}
