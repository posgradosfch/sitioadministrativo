import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Noticias } from '../clases/noticias';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoNoticiasService {

  private noturl='/services/noticia';
//  private urlDos='https://postgrados.herokuapp.com/services/noticia/';
  private urlDos = 'https://posgradoscchh.herokuapp.com/services/noticia/';
  private url = 'https://posgradoscchh.herokuapp.com/services/noticia/v2/';
  private noticia: Noticias;
  private apiUrl = 'https://postgrados.herokuapp.com/services/';
  constructor(private http: HttpClient) { }

  getNoticias (): Observable<any>{
  	return this.http.get(this.urlDos,this.getAuthHeaders());
  }

  agregarNoticia(userData: any): Observable<any>{
  	return this.http.post(this.url,userData,this.getAuthHeaders());
  }

  public setter(noticia : Noticias) {
    this.noticia = noticia;
  }

  public getter() {
    return this.noticia;
  }

   private getAuthHeaders() {
    const token = localStorage.getItem('token');
    const  headers = new HttpHeaders({'Content-Type': 'application/json; charset-utf-8', 'Authorization': 'token ' + token});
    return {headers: headers};
  }
  addnoticias(model: any): Observable<any> {
    return this.http.post(this.getUrl('noticia/?format=json'), model).map(this.getDatos).catch(this.error);
}
getDatos(data: Response) {
  let datos = data.json();
  console.log(datos);
  return datos || [];
}
private getUrl(modelo: String) {
  // console.log(this.apiUrl +modelo);
  return this.apiUrl + modelo;
}
private error(error:any){
  let msg= (error.message) ? error.message: 'Error desconocido en la conexion con la Api con noticia';
  console.error(msg);
  return Observable.throw(msg);
}

}
