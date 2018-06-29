import { Component, OnInit } from '@angular/core';
import { Noticias } from '../servicios/noticias';
import { MantenimientoNoticiasService } from '../servicios/mantenimiento-noticias.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-editar-noticia',
  templateUrl: './agregar-editar-noticia.component.html',
  styleUrls: ['./agregar-editar-noticia.component.css']
})
export class AgregarEditarNoticiaComponent implements OnInit {

  private noticia: Noticias;

  constructor(private noticiasService : MantenimientoNoticiasService,
    private _router:Router) { }

  ngOnInit(): void{
      this.noticia=this.noticiasService.getter();
  	}

  processForm(){
    this.noticiasService.agregarNoticia(this.noticia).subscribe((noticia)=>{
        console.log(this.noticia);
        this._router.navigate(['/mantenimientoNoticias']);
      }, (error)=>{
        console.log(error);
      });
  }

}
