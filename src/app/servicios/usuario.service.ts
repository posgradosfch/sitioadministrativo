import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Roles } from '../clases/roles'
import { User } from '../clases/user';

@Injectable({
providedIn: 'root'
})

export class UsuarioService {

  baseUrl: string = environment.apiUrl;
  userUrl: string = environment.apiUrl + "services/usuarios/";

  rol: Roles;
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

  constructor(private http: HttpClient) {
    
  }

  loginUser(userData: any): Observable<any>{
    return this.http.post(this.baseUrl + "auth/", userData, {headers: this.httpHeaders});
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(this.userUrl, userData, this.getAuthHeaders());
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl, this.getAuthHeaders());
  }

  private getAuthHeaders(){
  	const token = localStorage.getItem('token');
  	const  headers= new HttpHeaders({'Content-Type': 'application/json; charset-utf-8', 'Authorization': 'token ' + token});
  	return {headers: headers};
  }
}
