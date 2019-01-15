import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Documento } from '../clases/documento';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoDocumentosService {
  
  baseUrl: string = environment.apiUrl + "services/documentos/";
  unableUrl = this.baseUrl + "unable/";
  constructor(private http: HttpClient) { }

  registrarDocumento(documentoData: any): Observable<any> {
    return this.http.post(this.baseUrl, documentoData, this.getAuthHeaders());
  }

  getDocumentos(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'all', this.getAuthHeaders());
  }

  unableDocumento<Data>(id_documento: number): Observable<any> {
    const url = `${this.unableUrl}${id_documento}/`;
    return this.http.put(url, this.getAuthHeaders())
      .pipe(
        map(documentos => documentos[0]),
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;id_documento
          this.log(`${outcome} documento id_documento=${id_documento}`);  
        }),
        catchError(this.handleError<Documento>(`unableDocumento id_documento=${id_documento}`))
      )
  }

  detDocumento<Data>(id_documento: number): Observable<any> {
    const url = `${this.baseUrl}${id_documento}/`;
    return this.http.get<any[]>(url);
  }

  updateDocumento<Data>(id_documento: number, data): Observable<any> {
    const url = `${this.unableUrl}${id_documento}/`;
    return this.http.put(url, data, this.getAuthHeaders())
      .pipe(
        map(documentos => documentos[0]),
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;id_documento
          this.log(`${outcome} documento id_documento=${id_documento}`);  
        }),
        catchError(this.handleError<Documento>(`unableDocumento id_documento=${id_documento}`))
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
