import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Roles } from "../clases/roles";
import { LoginService } from './login.service';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MantenimientoRolesService {

  baseUrl: string = environment.apiUrl + "services/roles/";
  rol:Roles;

  constructor(private http: HttpClient, private loginService: LoginService) { 
   }

  agregarRol(rol:Roles): Observable<Roles>{
  	return this.http.post<Roles>(this.baseUrl,rol,this.getAuthHeaders());

  }

  getRoles (): Observable<Roles[]>{
    return this.http.get<Roles[]>(this.baseUrl, this.getAuthHeaders());
  }

  errorHandler(error:Response){
    return Observable.throw(error||"SERVER ERROR");
  }

  public setter(rol : Roles) {
    this.rol = rol;
  }

  public getter() {
    return this.rol;
  }

  private getAuthHeaders(){
    const token = localStorage.getItem('token');
    const  headers= new HttpHeaders({'Content-Type': 'application/json; charset-utf-8', 'Authorization': 'token ' + token});
    return {headers: headers};
  }

}
