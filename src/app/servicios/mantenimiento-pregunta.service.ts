import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pregunta } from '../clases/pregunta';
import { Tipo } from '../clases/tipo';
import { Categoria } from '../clases/categoria';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoPreguntaService {
  url: string = environment.apiUrl + "services/";
  baseUrl: string = environment.apiUrl + "services/pregunta/";

  constructor(private http: HttpClient) { }

  registrarPregunta(preguntaData: any): Observable<any> {
    return this.http.post(this.baseUrl, preguntaData, this.getAuthHeaders());
  }

  getPreguntas(): Observable<Pregunta[]> {
    return this.http.get<Pregunta[]>(this.baseUrl, this.getAuthHeaders());
  }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.baseUrl + "categoria/", this.getAuthHeaders());
  }

  getTipos(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(this.baseUrl + "tipo/", this.getAuthHeaders());
  }

  private getAuthHeaders(){
    const token = localStorage.getItem('token');
    const  headers= new HttpHeaders({'Content-Type': 'application/json; charset-utf-8', 'Authorization': 'token ' + token});
    return {headers: headers};
  }
}
