import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObtenerEntidadesService {

  // id_user = localStorage.getItem('id');
 // baseUrl: string = 'https://posgradoscchh.herokuapp.com/citas/crear/' + this.id_user;

 constructor(private http: HttpClient) { }

  getEntidades(): Observable<any> {
    return this.http.get<any>('https://posgradoscchh.herokuapp.com/citas/entidades/1');
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    const  headers = new HttpHeaders({'Content-Type': 'application/json; charset-utf-8', 'Authorization': 'token ' + token});
    return {headers: headers};
  }

}
