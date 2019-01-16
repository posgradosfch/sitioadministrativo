import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoArancelesService {
  baseUrl: string = environment.apiUrl + 'services/aranceles/all/';
  baseUrlDos: string = environment.apiUrl + 'services/aranceles/';
  baseUrlTres: string = environment.apiUrl + 'services/cuotas/';
  baseUrlCuatro: string = environment.apiUrl + 'services/aranceles/tipos/';

  constructor(private http: HttpClient) { }

  getAranceles(): Observable<any> {
    return this.http.get<any>(this.baseUrl, this.getAuthHeaders());
  }

  registrarAranceles(arancelesData: any): Observable<any> {
       return this.http.post(this.baseUrlDos , arancelesData, this.getAuthHeaders());
  }

  deshabilitarAranceles(id: number): Observable<any> {
    const url = `${this.baseUrlDos}unable/${id}/`;
     return this.http.put(url, this.getAuthHeaders());
  }

  detalleArancel(id: number): Observable<any> {
    const url = `${this.baseUrlDos}${id}/`;
    return this.http.get<any>(url, this.getAuthHeaders());
  }

  generarCuotas(Data: any): Observable<any> {
       return this.http.post(this.baseUrlTres , Data, this.getAuthHeaders());
  }

  tipoAranceles(): Observable<any> {
    return this.http.get<any>(this.baseUrlCuatro, this.getAuthHeaders());
  }

    private getAuthHeaders() {
    const token = localStorage.getItem('token');
    const  headers = new HttpHeaders({'Content-Type': 'application/json; charset-utf-8', 'Authorization': 'token ' + token});
    return {headers: headers};
  }

}
