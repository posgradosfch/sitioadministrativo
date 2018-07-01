import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url= 'https://postgrados.herokuapp.com/auth/';
  headers= new HttpHeaders({'Content-Type': 'application/json; charset-utf-8'});

  constructor(private http: HttpClient) {
    
  }

  loginUsuario(userData: any): Observable<any> {
    return this.http.post(this.url, userData, {headers:this.headers});
  }
}