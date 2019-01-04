import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { EvaluacionDocente } from '../clases/evaluacion-docente';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoEvaluacionService {
  baseUrl: string = environment.apiUrl + "services/encuestas/";
  unableUrl = this.baseUrl + "unable/";
  constructor(private http: HttpClient) { }

  registrarEvaluacion(evaluacionData: any): Observable<any> {
    return this.http.post(this.baseUrl, evaluacionData, this.getAuthHeaders());
  }

  getEvaluaciones(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "all/", this.getAuthHeaders());
  }

  getCiclos(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "ciclosActivos/", this.getAuthHeaders());
  }

  private getAuthHeaders(){
    const token = localStorage.getItem('token');
    const  headers= new HttpHeaders({'Content-Type': 'application/json; charset-utf-8', 'Authorization': 'token ' + token});
    return {headers: headers};
  }

  unableEvaluacion<Data>(id_encuesta: number): Observable<any> {
    const url = `${this.unableUrl}${id_encuesta}/`;
    return this.http.put(url, this.getAuthHeaders())
      .pipe(
        map(evaluaciones => evaluaciones[0]),
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} evaluacion id_encuesta=${id_encuesta}`);  
        }),
        catchError(this.handleError<EvaluacionDocente>(`unableEvaluacion id_encuesta=${id_encuesta}`))
      )
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
