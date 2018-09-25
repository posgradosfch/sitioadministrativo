import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Docente } from '../clases/docente'

@Injectable({
  providedIn: 'root'
})
export class MantenimientoDocentesService {

  baseUrl: string = environment.apiUrl + "services/docentes/";
  docente: Docente;
  constructor(private http: HttpClient) {
    
  }

  registrarDocente(userData: any): Observable<any> {
    return this.http.post(this.baseUrl, userData, this.getAuthHeaders());
  }

  getDocentes(): Observable<Docente[]> {
    return this.http.get<Docente[]>(this.baseUrl, this.getAuthHeaders());
  }

  private getAuthHeaders(){
  	const token = localStorage.getItem('token');
  	const  headers= new HttpHeaders({'Content-Type': 'application/json; charset-utf-8', 'Authorization': 'token ' + token});
  	return {headers: headers};
  }}
