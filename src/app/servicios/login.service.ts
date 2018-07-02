import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl: string = environment.apiUrl;

  headers= new HttpHeaders({'Content-Type': 'application/json; charset-utf-8'});
  loggedIn = new BehaviorSubject<boolean>(false);
  loggedOut = new BehaviorSubject<boolean>(true);

  get isLoggedIn() {
    if (localStorage.getItem('token') && localStorage.getItem('account')){
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
    return this.loggedIn.asObservable();
  }

  get isLoggedOut() {
    if (localStorage.getItem('token') && localStorage.getItem('account')){
      this.loggedOut.next(false);
    } else {
      this.loggedOut.next(true);
    }
    return this.loggedOut.asObservable();
  }

  constructor(private http: HttpClient) {
    
  }

  loginUsuario(userData: any): Observable<any> {
    this.loggedIn.next(true);
    this.loggedOut.next(false);
    return this.http.post(this.baseUrl + "auth/", userData, {headers:this.headers});
  }
  logout(){
    this.loggedIn.next(false);
    this.loggedOut.next(true);
  }

}