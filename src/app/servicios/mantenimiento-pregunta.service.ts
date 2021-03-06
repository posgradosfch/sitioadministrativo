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
  baseUrl: string = environment.apiUrl + "services/pregunta/";
  tipoUrl: string = environment.apiUrl + "services/tipos/all/";
  catUrl: string = environment.apiUrl + "services/categorias/all/";
  claUrl: string = environment.apiUrl + "services/clasificacion/all/";

  constructor(private http: HttpClient) { }

  registrarPregunta(preguntaData: any): Observable<any> {
    return this.http.post(this.baseUrl, preguntaData, this.getAuthHeaders());
  }

  getPreguntas(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "all/", this.getAuthHeaders());
  }

  mostrarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.catUrl, this.getAuthHeaders());
  }

  mostrarClasificacion(): Observable<any> {
    return this.http.get<any>(this.claUrl, this.getAuthHeaders());
  }

  mostrarTipos(): Observable<any> {
    return this.http.get<any>(this.tipoUrl, this.getAuthHeaders());
  }

  detPregunta<Data>(id_pregunta: number): Observable<any> {
    const url = `${this.baseUrl}${id_pregunta}/`;
    return this.http.get<any[]>(url);
  }

  private getAuthHeaders(){
    const token = localStorage.getItem('token');
    const  headers= new HttpHeaders({'Content-Type': 'application/json; charset-utf-8', 'Authorization': 'token ' + token});
    return {headers: headers};
  }
}
