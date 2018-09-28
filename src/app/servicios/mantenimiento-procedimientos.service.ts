import { Injectable } from '@angular/core';
import { Procedimiento } from '../clases/procedimiento';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoProcedimientosService {

  baseUrl: string = environment.apiUrl + "services/procedimiento/";
  constructor(private http: HttpClient) { }

  registrarProcedimiento(procedimientoData: any): Observable<any> {
    return this.http.post(this.baseUrl, procedimientoData, this.getAuthHeaders());
  }

  getProcedimiento(): Observable<Procedimiento[]> {
    return this.http.get<Procedimiento[]>(this.baseUrl, this.getAuthHeaders());
  }

  private getAuthHeaders(){
    const token = localStorage.getItem('token');
    const  headers= new HttpHeaders({'Content-Type': 'application/json; charset-utf-8', 'Authorization': 'token ' + token});
    return {headers: headers};
  }
}

