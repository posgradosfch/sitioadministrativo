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
    
    //this.headers.append("Authorization", localStorage.getItem("token"));
  }

  loginUsuario(username, password) {
    return this.http.post(this.url, {username, password}, {headers:this.headers});
  }
}