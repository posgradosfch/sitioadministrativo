import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permisos } from "../clases/permisos";
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MantenimientoPermisosService {
  baseUrl: string = environment.apiUrl + "services/permisos/";
  private permiso:Permisos;

  constructor(private http: HttpClient) { }

  getPermisos(): Observable<Permisos[]>{
  	return this.http.get<Permisos[]>(this.baseUrl, this.getAuthHeaders());
  }

  private getAuthHeaders(){
    const token = localStorage.getItem('token');
    const  headers= new HttpHeaders({'Content-Type': 'application/json; charset-utf-8', 'Authorization': 'token ' + token});
    return {headers: headers};
  }
}
