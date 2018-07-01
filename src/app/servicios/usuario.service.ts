import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
providedIn: 'root'
})

export class UsuarioService {

 private url= 'https://postgrados.herokuapp.com/auth/';

  constructor(private http: HttpClient) {
    
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post('https://postgrados.herokuapp.com/services/usuarios/', userData, this.getAuthHeaders());
  }

  getUsers(): Observable<any> {
    return this.http.get('https://postgrados.herokuapp.com/services/usuarios/', this.getAuthHeaders());
  }

  private getAuthHeaders(){
  	const token = localStorage.getItem('token');
  	const  headers= new HttpHeaders({'Content-Type': 'application/json; charset-utf-8', 'Authorization': 'token ' + token});
  	return {headers: headers};
  }
}
