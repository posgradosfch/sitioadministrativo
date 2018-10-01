import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Cita } from '../clases/cita';

@Injectable({
  providedIn: 'root'
})
export class CrearCitaService {

  baseUrl: string = "https://posgradoscchh.herokuapp.com/citas/";
  constructor(private http: HttpClient) { }

  private getAuthHeaders(){
  	const token = localStorage.getItem('token');
  	const  headers= new HttpHeaders({'Content-Type': 'application/json; charset-utf-8', 'Authorization': 'token ' + token});
  	return {headers: headers};
  }

  agendarCita(userData): Observable<any> {
    return this.http.post('https://posgradoscchh.herokuapp.com/citas/crear/', userData);

  }
  getCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.baseUrl, this.getAuthHeaders());
  }

  getCitasAnio(anio: number): Observable<any>{
    const url = `${this.baseUrl}${anio}`;
    return this.http.get<any>(url);
      
  }

  getDetalleCita(id: number): Observable<any>{
    const url = `${this.baseUrl}detalle/${id}`;
    return this.http.get<any>(url);
      
  }

  updateCita(cita: Cita): Observable<any>{
    const url = `${this.baseUrl}detalle/editar/${cita.id}`;
    return this.http.put(url, cita);
      
  }

  getCitasAnioMes(mes: number, anio: number): Observable<any>{
    const url = `${this.baseUrl}month/${mes}/year/${anio}`;
    return this.http.get<any>(url);
      
  }


}
