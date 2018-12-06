import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Documento } from '../clases/documento';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoDocumentosService {
  
  baseUrl: string = environment.apiUrl + "services/documentos/";
  constructor(private http: HttpClient) { }

  registrarDocumento(documentoData: any): Observable<any> {
    return this.http.post(this.baseUrl, documentoData, this.getAuthHeaders());
  }

  getDocumentos(): Observable<Documento[]> {
    return this.http.get<Documento[]>(this.baseUrl, this.getAuthHeaders());
  }

  private getAuthHeaders(){
    const token = localStorage.getItem('token');
    const  headers= new HttpHeaders({'Content-Type': 'application/json; charset-utf-8', 'Authorization': 'token ' + token});
    return {headers: headers};
  }
}
