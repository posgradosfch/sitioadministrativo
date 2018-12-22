import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aulas } from '../clases/aulas';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoAulasService {
//  posgradosback.herokuapp.com/services/aulas/all/
  baseUrl: string = environment.apiUrl + 'services/aulas/all/';
  baseUrlDos: string = environment.apiUrl + 'services/aulas/';

  constructor(private http: HttpClient) { }

  getAulas(): Observable<any> {
    return this.http.get<any>(this.baseUrl, this.getAuthHeaders());
  }

  registrarAula(aulasData: any): Observable<any> {
       return this.http.post(this.baseUrlDos, aulasData, this.getAuthHeaders());
  }

  deshabilitarAula(id: number): Observable<any> {
     const url = `${this.baseUrlDos}unable/${id}/`;
     return this.http.put(url, this.getAuthHeaders());
  }
    private getAuthHeaders() {
    const token = localStorage.getItem('token');
    const  headers = new HttpHeaders({'Content-Type': 'application/json; charset-utf-8', 'Authorization': 'token ' + token});
    return {headers: headers};
  }
}
