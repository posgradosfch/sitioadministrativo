import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Noticias } from '../clases/noticias';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoNoticiasService {

  baseUrl: string = environment.apiUrl;
  noturl='/services/noticia';
//  private urlDos='https://postgrados.herokuapp.com/services/noticia/';
  urlDos = this.baseUrl + 'services/noticia/';
  url = this.baseUrl + 'services/noticia/v2/';
  noticia: Noticias;
  apiUrl = this.baseUrl + 'services/';
  constructor(private http: HttpClient) { }

  getNoticias (): Observable<any>{
  	return this.http.get(this.urlDos,this.getAuthHeaders());
  }

  agregarNoticia(notiData: any): Observable<any>{
  	return this.http.post(this.url,notiData,this.getAuthHeaders());
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
