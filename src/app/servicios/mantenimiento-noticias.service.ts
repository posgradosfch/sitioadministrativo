import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Noticias } from "./noticias";
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MantenimientoNoticiasService {

  baseUrl: string = environment.apiUrl + "services/noticia/";
  //private url='https://postgrados.herokuapp.com/services/noticia/'
  private noticia:Noticias;
  constructor(private http: HttpClient) { }

  getNoticias (): Observable<any>{
  	return this.http.get(this.baseUrl,this.getAuthHeaders());
  }

  agregarNoticia(userData: any): Observable<any>{
  	return this.http.post(this.baseUrl ,userData,this.getAuthHeaders());
  }

  public setter(noticia : Noticias) {
    this.noticia = noticia;
  }

  public getter() {
    return this.noticia;
  }

   private getAuthHeaders(){
    const token = localStorage.getItem('token');
    const  headers= new HttpHeaders({'Content-Type': 'application/json; charset-utf-8', 'Authorization': 'token ' + token});
    return {headers: headers};
  }
}
