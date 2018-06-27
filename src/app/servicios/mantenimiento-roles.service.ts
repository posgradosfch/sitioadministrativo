import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Roles } from "./roles";


@Injectable({
  providedIn: 'root'
})
export class MantenimientoRolesService {

  private rolesurl='/services/roles';
  private urlRol='https:postgrados.herokuApp.com/services/roles'
  private rol:Roles;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  agregarRol(rol:Roles): Observable<Roles>{
  	return this.http.post<Roles>(this.urlRol,rol,{headers:this.headers});

  }

  getRoles (): Observable<Roles[]>{
  	return this.http.get<Roles[]>(this.rolesurl,{headers:this.headers});
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
