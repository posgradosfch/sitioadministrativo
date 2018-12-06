import { Component, OnInit } from '@angular/core';
import { MantenimientoNoticiasService } from '../servicios/mantenimiento-noticias.service';
import { Noticias } from '../clases/noticias';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../servicios/login.service';



@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  noticias:Noticias[];
  isLoggedOut$: Observable<boolean>;

  constructor(private noticiaServicio:MantenimientoNoticiasService, private login: LoginService) { }


  ngOnInit(): void {
  	this.noticiaServicio.getNoticias().subscribe(noticias => {
  		console.log(noticias);
  		this.noticias = noticias;
      this.isLoggedOut$ = this.login.isLoggedOut;

  	},(error)=>{
  		console.log(error);
  	});

  }

}
