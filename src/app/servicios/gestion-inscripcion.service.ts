import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionInscripcionService {
  baseUrl: string = environment.apiUrl + 'services/ciclos/all/';
  baseUrlDos: string = environment.apiUrl + 'services/gruposT/';
  baseUrlTres: string = environment.apiUrl + 'services/inscripciones/';
  baseUrlCuatro: string = environment.apiUrl + 'services/inscripciones/all/';
  baseUrlCinco = 'http://apicchh19.herokuapp.com/services/inscripciones/';

  constructor(private http: HttpClient) { }

  getCiclos(): Observable<any> {
    return this.http.get<any>(this.baseUrl, this.getAuthHeaders());
  }

  registrarGrupoT(Data: any): Observable<any> {
       return this.http.post(this.baseUrlDos, Data, this.getAuthHeaders());
  }

  periodoInscripcion(Data: any) {
    return this.http.post(this.baseUrlTres, Data, this.getAuthHeaders());
  }

  guardarPI(Data: any) {
    return this.http.post(this.baseUrlCinco, Data, this.getAuthHeaders());
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    const  headers = new HttpHeaders({'Content-Type': 'application/json; charset-utf-8', 'Authorization': 'token ' + token});
    return {headers: headers};
  }

  getInscripciones(): Observable<any> {
    return this.http.get<any>(this.baseUrlCuatro, this.getAuthHeaders());
  }

  deshabilitarInscripcion(id: number): Observable<any> {
    const url = `${this.baseUrlTres}unable/${id}/`;
    return this.http.put(url, this.getAuthHeaders());
 }

}
