import { HttpClient, HttpHeaders, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
    providedIn: 'root'
})
export class ApiService {

    public httpOptions = {
        headers: new HttpHeaders(
            {
                'Content-Type': 'application/json'
            }
        )
    };

    constructor(private httpCliente: HttpClient) { }

    findAll(): Observable<any[]> {
        const url = `${environment.API}/api/authors`;

        return this.httpCliente.get<any[]>(url).pipe(
            catchError((error: HttpResponseBase) => {
                return throwError(error);
            })
        );
    }

    get(url: string) {

        return this.httpCliente.get(`${environment.API}` + url, this.httpOptions).pipe(
            catchError((error: HttpResponseBase) => {
                return throwError(error);
            })
        );

    }


}
