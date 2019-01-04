import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoMateriasService {
   baseUrl: string = environment.apiUrl + 'services/materias/all/';
   baseUrlDos: string = environment.apiUrl + 'services/materias/';

  constructor(private http: HttpClient) { }
  getMaterias(): Observable<any> {
    return this.http.get<any>(this.baseUrl, this.getAuthHeaders());
  }

  registrarMateria(materiasData: any): Observable<any> {
       return this.http.post(this.baseUrlDos, materiasData, this.getAuthHeaders());
  }

  deshabilitarMateria(id: number): Observable<any> {
     const url = `${this.baseUrlDos}unable/${id}/`;
     return this.http.put(url, this.getAuthHeaders());
  }
    private getAuthHeaders() {
    const token = localStorage.getItem('token');
    const  headers = new HttpHeaders({'Content-Type': 'application/json; charset-utf-8', 'Authorization': 'token ' + token});
    return {headers: headers};
  }

}
