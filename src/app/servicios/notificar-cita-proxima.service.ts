import { Injectable } from '@angular/core';
// import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificarCitaService {

 // baseUrl: string = environment.apiUrl + "services/notificar/";
  //  notificar: notificar ;

  constructor(private http: HttpClient, private loginService: LoginService) {
  }
  getNotificar(): Observable<any> {
     return this.http.get<any>('https://posgradoscchh.herokuapp.com/citas/citasProximas/', this.getAuthHeaders());
  }

  getCantidadNotificaciones(): Observable<any> {
    return this.http.get<any>('https://posgradoscchh.herokuapp.com/citas/notificaciones/', this.getAuthHeaders());
 }

  errorHandler(error: Response) {
    return Observable.throw(error||"SERVER ERROR");
  }
/*
  public setter(notificar: notificar) {
    this.notificar = notificar;
  }

  public getter() {
    return this.notificar;
  }
*/
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    const  headers = new HttpHeaders({'Content-Type': 'application/json; charset-utf-8', 'Authorization': 'token ' + token});
    return {headers: headers};
  }

}
