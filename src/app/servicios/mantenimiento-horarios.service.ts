import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoHorariosService {
  baseUrl: string = environment.apiUrl + 'services/horarios/all/';
  baseUrlDos: string = environment.apiUrl + 'services/horarios/';

  constructor(private http: HttpClient) { }

  getHorarios(): Observable<any> {
    return this.http.get<any>(this.baseUrl, this.getAuthHeaders());
  }

  registrarHorarios(horariosData: any): Observable<any> {
       return this.http.post(this.baseUrlDos, horariosData, this.getAuthHeaders());
  }

  deshabilitarHorarios(id: number): Observable<any> {
     const url = `${this.baseUrlDos}unable/${id}/`;
     return this.http.put(url, this.getAuthHeaders());
  }
    private getAuthHeaders() {
    const token = localStorage.getItem('token');
    const  headers = new HttpHeaders({'Content-Type': 'application/json; charset-utf-8', 'Authorization': 'token ' + token});
    return {headers: headers};
  }
}
