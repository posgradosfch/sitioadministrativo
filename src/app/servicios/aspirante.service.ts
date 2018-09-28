import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Aspirante } from '../clases/aspirante';

@Injectable({
  providedIn: 'root'
})
export class AspiranteService {

  baseUrl: string = environment.apiUrl + "services/aspirante/";
  constructor(private http: HttpClient) {
    
  }

  getAspirantes(): Observable<Aspirante[]> {
    return this.http.get<Aspirante[]>(this.baseUrl, this.getAuthHeaders());
  }

  private getAuthHeaders(){
  	const token = localStorage.getItem('token');
  	const  headers= new HttpHeaders({'Content-Type': 'application/json; charset-utf-8', 'Authorization': 'token ' + token});
  	return {headers: headers};
  }

  getAspiranteId<Data>(id_aspirante: number): Observable<Aspirante> {
    const url = `${this.baseUrl}${id_aspirante}`;
    return this.http.get<Aspirante[]>(url)
      .pipe(
        map(aspirantes => aspirantes[0]),
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} aspirante id_aspirante=${id_aspirante}`);  
        }),
        catchError(this.handleError<Aspirante>(`getAspirante id_aspirante=${id_aspirante}`))
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
