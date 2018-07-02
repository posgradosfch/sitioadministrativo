import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CodigosAspirante } from './codigos';

@Injectable({
  providedIn: 'root'
})
export class ConsultarCodigosService {
// getCodigosAspirante
private url = 'https://posgrados.herokuapp.com/api/codigos';
private codigoAspirante: CodigosAspirante;
private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getCodigosAspirante(): Observable<CodigosAspirante[]> {
  return this.http.get<CodigosAspirante[]>(this.url, {headers: this.headers});
  }

}
