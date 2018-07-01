import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
providedIn: 'root'
})

export class UsuarioService {

  baseUrl: string = environment.apiUrl + "services/usuarios/";

  constructor(private http: HttpClient) {
    
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(this.baseUrl, userData, this.getAuthHeaders());
  }

  getUsers(): Observable<any> {
    return this.http.get(this.baseUrl, this.getAuthHeaders());
  }

  private getAuthHeaders(){
  	const token = localStorage.getItem('token');
  	const  headers= new HttpHeaders({'Content-Type': 'application/json; charset-utf-8', 'Authorization': 'token ' + token});
  	return {headers: headers};
  }
}
