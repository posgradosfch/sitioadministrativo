import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { EvaluacionDocente } from '../clases/evaluacion-docente';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoEvaluacionService {
  baseUrl: string = environment.apiUrl + "services/encuestas/";
  constructor(private http: HttpClient) { }

  registrarEvaluacion(evaluacionData: any): Observable<any> {
    return this.http.post(this.baseUrl, evaluacionData, this.getAuthHeaders());
  }

  getEvaluaciones(): Observable<EvaluacionDocente[]> {
    return this.http.get<EvaluacionDocente[]>(this.baseUrl, this.getAuthHeaders());
  }

  private getAuthHeaders(){
    const token = localStorage.getItem('token');
    const  headers= new HttpHeaders({'Content-Type': 'application/json; charset-utf-8', 'Authorization': 'token ' + token});
    return {headers: headers};
  }
}
