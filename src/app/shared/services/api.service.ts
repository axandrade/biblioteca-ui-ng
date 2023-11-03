import { HttpClient, HttpHeaders, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
    providedIn: 'root'
})
export class ApiService {

    public httpOptions: any;

    constructor(private httpCliente: HttpClient) { }

    get(url: string): Observable<any> {

        this.setToken(window.localStorage.getItem('token'));

        return this.httpCliente.get(`${environment.API}` + url, this.httpOptions).pipe(
            catchError((error: any) => { // Mude para 'error: any'
                return throwError(error);
            })
        );
    }

    post(url: string, body: any): Observable<any> {
        this.setToken(window.localStorage.getItem('token'));

        return this.httpCliente.post(`${environment.API}` + url, body, this.httpOptions).pipe(
            catchError((error: any) => { // Mude para 'error: any'
                return throwError(error);
            })
        );
    }

    put(url: string, body: any) {
        debugger
        this.setToken(window.localStorage.getItem('token'));

        return this.httpCliente.put(`${environment.API}` + url, body, this.httpOptions).pipe(
            catchError((error: any) => { // Mude para 'error: any'
                return throwError(error);
            })
        );

    }

    delete(url: string) {
        debugger
        this.setToken(window.localStorage.getItem('token'));

        let teste = environment.API + url;


        return this.httpCliente.delete(teste, this.httpOptions);


    }

    setToken(token: any) {
        this.httpOptions = this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Application-Authorization': `Basic ${environment.TOKEN}`, 'Authorization': token }),

        };
    }


}
