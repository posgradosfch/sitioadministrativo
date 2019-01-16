import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Roles } from '../clases/roles'
import { User } from '../clases/user';

@Injectable({
providedIn: 'root'
})

export class UsuarioService {

  baseUrl: string = environment.apiUrl;
  userUrl: string = environment.apiUrl + "services/usuarios/";
  unableUrl = this.userUrl + "unable/";

  rol: Roles;
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

  constructor(private http: HttpClient) {
    
  }

  loginUser(userData: any): Observable<any>{
    return this.http.post(this.baseUrl + "auth/", userData, {headers: this.httpHeaders});
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(this.userUrl, userData, this.getAuthHeaders());
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl + "all/", this.getAuthHeaders());
  }

  unableUsuario<Data>(id: number): Observable<any> {
    const url = `${this.unableUrl}${id}/`;
    return this.http.put(url, this.getAuthHeaders())
      .pipe(
        map(usuarios => usuarios[0]),
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;id
          this.log(`${outcome} usuario id=${id}`);  
        }),
        catchError(this.handleError<User>(`unableUsuario id=${id}`))
      )
  }

  detUsuario<Data>(id: number): Observable<any> {
    const url = `${this.userUrl}${id}/`;
    return this.http.get<any[]>(url);
  }

  deleteUser(id: number) {
    return this.http.delete(this.userUrl + id + '/');
  }

  private getAuthHeaders(){
    const token = localStorage.getItem('token');
    const  headers= new HttpHeaders({'Content-Type': 'application/json; charset-utf-8', 'Authorization': 'token ' + token});
    return {headers: headers};
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {

}
}
