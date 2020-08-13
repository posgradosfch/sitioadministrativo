import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoProgramasService {
baseUrl: string = environment.apiUrl + 'services/programas/all/';
baseUrlDos: string = environment.apiUrl + 'services/programas/';

  constructor(private http: HttpClient) { }

  getProgramas(): Observable<any> {
    return this.http.get<any>(this.baseUrl, this.getAuthHeaders());
  }

  registrarPrograma(programasData: any): Observable<any> {
       return this.http.post(this.baseUrlDos, programasData, this.getAuthHeaders());
  }

  deshabilitarPrograma(id: number): Observable<any> {
     const url = `${this.baseUrlDos}unable/${id}/`;
     return this.http.put(url, this.getAuthHeaders());
  }
    private getAuthHeaders() {
    const token = localStorage.getItem('token');
    const  headers = new HttpHeaders({'Content-Type': 'application/json; charset-utf-8', 'Authorization': 'token ' + token});
    return {headers: headers};
  }

  detallePrograma(id: number): Observable<any> {
    const url = `${this.baseUrlDos}${id}/`;
    return this.http.get<any>(url, this.getAuthHeaders());
  }
}
