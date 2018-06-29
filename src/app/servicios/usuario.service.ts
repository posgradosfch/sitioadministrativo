import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
providedIn: 'root'
})

export class UsuarioService {

  constructor(private http: HttpClient) { }
  registerUser(userData): Observable<any> {
    return this.http.post('https://postgrados.herokuapp.com/services/usuarios/', userData);
  }

}
