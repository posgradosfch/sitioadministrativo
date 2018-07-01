import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Roles } from "./roles";
import { LoginService } from '../servicios/login.service';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MantenimientoRolesService {

  private rolesurl='/services/roles';
  baseUrl: string = environment.apiUrl + "services/roles/";
  private rol:Roles;
  headers = new HttpHeaders();
  token= localStorage.getItem('token');
  constructor(private http: HttpClient, private loginService: LoginService) { 
    this.headers.append('Content-Type', 'application/json; charset=utf-8');
   // this.headers.append (localStorage.getItem("token");
    this.headers.append('Authorization', localStorage.getItem('token'));
}

  agregarRol(rol:Roles): Observable<Roles>{
  	return this.http.post<Roles>(this.baseUrl,rol, {headers: this.headers});

  }

  getRoles (): Observable<Roles[]>{
  	return this.http.get<Roles[]>(this.baseUrl, {headers:this.headers});
  }

  /*editarRol (rol:Roles): Observable<Roles>{
  	return this.http.put<Roles>(this.urlRol,rol,{headers:this.headers});
  }

  eliminarRol (id:number): Observable<{}>{
    const url = `${this.rolesurl}/${id}`;
  	return this.http.delete(url,{headers:this.headers});
  }*/

  errorHandler(error:Response){
    return Observable.throw(error||"SERVER ERROR");
  }

  public setter(rol : Roles) {
    this.rol = rol;
  }

  public getter() {
    return this.rol;
  }

}
