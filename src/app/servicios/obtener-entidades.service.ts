import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObtenerEntidadesService {

  id_user = localStorage.getItem('id');
 // console.log(id_user);
  baseUrl: string = 'https://posgradoscchh.herokuapp.com/citas/entidades/' + this.id_user;

 constructor(private http: HttpClient) { }

  getEntidades(): Observable<any> {
    return this.http.get<any>('https://posgradoscchh.herokuapp.com/citas/entidades/1/', this.getAuthHeaders());
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    const  headers = new HttpHeaders({'Content-Type': 'application/json; charset-utf-8', 'Authorization': 'token ' + token});
    return {headers: headers};
  }

}
