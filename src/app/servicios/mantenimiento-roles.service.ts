import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Roles } from "../clases/roles";
import { LoginService } from './login.service';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MantenimientoRolesService {

  baseUrl: string = environment.apiUrl + "services/roles/";
  unableUrl = this.baseUrl + "unable/";
  rol:Roles;

  constructor(private http: HttpClient, private loginService: LoginService) { 
   }

  agregarRol(rol:Roles): Observable<Roles>{
  	return this.http.post<Roles>(this.baseUrl,rol,this.getAuthHeaders());

  }

  getRoles (): Observable<Roles[]>{
    return this.http.get<Roles[]>(this.baseUrl, this.getAuthHeaders());
  }

  unableRol<Data>(id: number): Observable<any> {
    const url = `${this.unableUrl}${id}/`;
    return this.http.put(url, this.getAuthHeaders())
      .pipe(
        map(roles => roles[0]),
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;id
          this.log(`${outcome} rol id=${id}`);  
        }),
        catchError(this.handleError<Roles>(`unableRol id=${id}`))
      )
  }

  detUsuario<Data>(id: number): Observable<any> {
    const url = `${this.baseUrl}${id}`;
    return this.http.get<any[]>(url);
  }

  errorHandler(error:Response){
    return Observable.throw(error||"SERVER ERROR");
  }

  public setter(rol : Roles) {
    this.rol = rol;
  }

  public getter() {
    return this.rol;
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
