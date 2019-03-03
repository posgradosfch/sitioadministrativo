import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ConsultarPagoService {
  baseUrl: string = environment.apiUrl + 'services/estudiantes/all/';
  baseUrlDos: string = environment.apiUrl + 'services/estudiantes/';
  baseUrlTres: string = environment.apiUrl + 'services/consultarPagos/estudiante/';

  constructor(private http: HttpClient) { }
  getEstudiante(): Observable<any> {
    return this.http.get<any>(this.baseUrl, this.getAuthHeaders());
  }

  detallePago(id: number): Observable<any> {
    const url = `${this.baseUrlDos}${id}/`;
    return this.http.get<any>(url, this.getAuthHeaders());
   }

   cuotasEstudiante(id: number, anio: number): Observable<any> {
    const url = `${this.baseUrlTres}${id}/year/${anio}`;
    return this.http.get<any>(url, this.getAuthHeaders());
   }

   private getAuthHeaders() {
    const token = localStorage.getItem('token');
    const  headers = new HttpHeaders({'Content-Type': 'application/json; charset-utf-8', 'Authorization': 'token ' + token});
    return {headers: headers};
  }

}
