import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrearCitaService {

  constructor(private http: HttpClient) { }
  agendarCita(userData): Observable<any> {
    return this.http.post('https://posgradoscchh.herokuapp.com/citas/crear/', userData);

  }
}
