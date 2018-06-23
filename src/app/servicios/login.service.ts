import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginUsuario(userData): Observable<any> {
  	return this.http.post('https://posgrados.herokuapp.com/services/', userData);
  }
}