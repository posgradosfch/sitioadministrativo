import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
providedIn: 'root'
})

export class GenerarCodigoService {

  constructor(private http: HttpClient) { }
  generarcodigo(userData): Observable<any> {
    return this.http.post('https://posgradosversiondos.herokuapp.com/generarCodigos/', userData);

  }
}
