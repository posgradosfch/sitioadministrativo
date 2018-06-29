import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Noticias } from "./noticias";


@Injectable({
  providedIn: 'root'
})
export class MantenimientoNoticiasService {

  private noturl='/services/noticia';
  private url='https://postgrados.herokuapp.com/services/noticia/'
  private noticia:Noticias;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  getNoticias (): Observable<Noticias[]>{
  	return this.http.get<Noticias[]>(this.url,{headers:this.headers});
  }

  agregarNoticia(noticia:Noticias): Observable<Noticias>{
  	return this.http.post<Noticias>(this.url,noticia,{headers:this.headers});
  }

  public setter(noticia : Noticias) {
    this.noticia = noticia;
  }

  public getter() {
    return this.noticia;
  }
}
