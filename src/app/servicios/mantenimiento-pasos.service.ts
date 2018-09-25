import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paso } from '../clases/paso';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoPasosService {

  baseUrl: string = environment.apiUrl + "services/pasos/";
  constructor(private http: HttpClient) { }

  registrarPaso(pasoData: any): Observable<any> {
    return this.http.post(this.baseUrl, pasoData, this.getAuthHeaders());
  }

  getPasos(): Observable<Paso[]> {
    return this.http.get<Paso[]>(this.baseUrl, this.getAuthHeaders());
  }

  private getAuthHeaders(){
    const token = localStorage.getItem('token');
    const  headers= new HttpHeaders({'Content-Type': 'application/json; charset-utf-8', 'Authorization': 'token ' + token});
    return {headers: headers};
  }
}