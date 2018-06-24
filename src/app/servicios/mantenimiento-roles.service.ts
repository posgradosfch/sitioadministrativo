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

  agregarRol(rol:Roles){
  	return this.http.post(this.urlRol,rol,{headers:this.headers});

  }

  getRoles (){
  	return this.http.get(this.rolesurl,{headers:this.headers});
  }

  editarRol (rol:Roles){
  	return this.http.put(this.urlRol,rol,{headers:this.headers});
  }

   eliminarRol (id:number){
  	return this.http.delete(this.urlRol+'/'+id,{headers:this.headers});
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

}
