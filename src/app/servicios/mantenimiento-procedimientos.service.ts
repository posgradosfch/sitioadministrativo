import { Injectable } from '@angular/core';
import { Procedimiento } from '../clases/procedimiento';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoProcedimientosService {

  baseUrl: string = environment.apiUrl + "services/procedimiento/";
  constructor(private http: HttpClient) { }

  registrarProcedimiento(procedimientoData: any): Observable<any> {
    return this.http.post(this.baseUrl, procedimientoData, this.getAuthHeaders());
  }

  getProcedimiento(): Observable<Procedimiento[]> {
    return this.http.get<Procedimiento[]>(this.baseUrl, this.getAuthHeaders());
  }

  detProceso<Data>(id: number): Observable<any> {
    const url = `${this.baseUrl}${id}/`;
    return this.http.get<any[]>(url);
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + id + '/');
  }
  
  unableProcedimiento<Data>(id: number): Observable<any>{
    const url = `${this.baseUrl}${id}/`;
    return this.http.put(url, this.getAuthHeaders())
      .pipe(
        map(procedimientos => procedimientos[0]),
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;id
          this.log(`${outcome} usuario id=${id}`);  
        }),
        catchError(this.handleError<Procedimiento>(`unableProcedimiento id=${id}`))
      )
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

