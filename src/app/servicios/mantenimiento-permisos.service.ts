import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permisos } from "../clases/permisos";

@Injectable({
  providedIn: 'root'
})
export class MantenimientoPermisosService {

  private url='https://postgrados.herokuApp.com/services/permisos'
  private permiso:Permisos;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  getPermisos(): Observable<Permisos[]>{
  	return this.http.get<Permisos[]>(this.url,{headers:this.headers});
  }
}
