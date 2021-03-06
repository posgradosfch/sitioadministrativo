import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoDescuentosService {
  baseUrlDos: string = environment.apiUrl + 'services/descuentos/';

  constructor(private http: HttpClient) { }

registrarDescuento(arancelesData: any): Observable<any> {
    return this.http.post(this.baseUrlDos , arancelesData, this.getAuthHeaders());
}

deshabilitarDescuento(id: number): Observable<any> {
 const url = `${this.baseUrlDos}unable/${id}/`;
  return this.http.put(url, this.getAuthHeaders());
}

detalleDescuento(id: number): Observable<any> {
 const url = `${this.baseUrlDos}${id}/`;
 return this.http.get<any>(url, this.getAuthHeaders());
}

private getAuthHeaders() {
  const token = localStorage.getItem('token');
  const  headers = new HttpHeaders({'Content-Type': 'application/json; charset-utf-8', 'Authorization': 'token ' + token});
  return {headers: headers};
}
}
