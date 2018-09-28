import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Aspirante } from '../clases/aspirante';

@Injectable({
  providedIn: 'root'
})
export class EventService {

    baseUrl: "https://posgradoscchh.herokuapp.com/citas/";
    constructor(private http: HttpClient) {
    
    }

    private getAuthHeaders(){
        const token = localStorage.getItem('token');
        const  headers= new HttpHeaders({'Content-Type': 'application/json; charset-utf-8', 'Authorization': 'token ' + token});
        return {headers: headers};
    }

    getCitas(){

    }
  
    getEvents(): Observable<any> {
        const dateObj = new Date();
        const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
        let data: any = [
    
    {
        title: 'Lunch',
        start: yearMonth + '-12T12:00:00'
    },
    {
        title: 'Meeting',
        start: yearMonth + '-09T18:30:00'
    },
    {
        title: 'Happy Hour',
        start: yearMonth + '-12T17:30:00'
    },
    {
        title: 'Dinner',
        start: yearMonth + '-12T20:00:00'
    },
    {
        title: 'Birthday Party',
        start: yearMonth + '-13T07:00:00'
    },
    {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: yearMonth + '-28'
    }];
    return Observable.of(data);
}
};
