import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
providedIn: 'root'
})

export class GenerarCodigoService {

  constructor(private http: HttpClient) { }
  generarcodigo(userData): Observable<any> {
    return this.http.post('https://posgrados.herokuapp.co/codigos/crear', userData);

  }
}
