import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url= 'https://postgrados.herokuapp.com/auth/';
  headers= new HttpHeaders({'Content-Type': 'application/json; charset-utf-8'});
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    if (localStorage.getItem('token') && localStorage.getItem('account')){
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
    return this.loggedIn.asObservable(); // {2}
  }
  constructor(private http: HttpClient) {
    
  }

  loginUsuario(userData: any): Observable<any> {
  	this.loggedIn.next(true);
    return this.http.post(this.url, userData, {headers:this.headers});
  }
  logout(){
  	this.loggedIn.next(false);
  }

}