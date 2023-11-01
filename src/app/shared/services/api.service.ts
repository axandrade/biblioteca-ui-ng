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

    urlBase = environment.API;

    constructor(private httpCliente: HttpClient) { }

    get(url: string) {

        return this.httpCliente.get(this.urlBase + url, this.httpOptions).pipe(
            catchError((error: HttpResponseBase) => {
                return throwError(error);
            })
        );

    }


}
