import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url= 'https://postgrados.herokuapp.com/auth/';
  loggedInStatus = false;

  constructor(private http: HttpClient) { }

  getUserDetails(username, password) {
    return this.http.post(this.url, {
      username,
      password
      }).subscribe(data => {
      console.log(data,"logueado")
    })
  }
}