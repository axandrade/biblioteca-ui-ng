import { Author } from '../models/author';
import { Confirmation } from 'primeng/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, retry, first } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class ConsultaCepService {

    constructor(private httpCliente: HttpClient) { }

    consultaCEP(cep: string){
        cep = cep.replace(/\D/g, '');

        const headers = new HttpHeaders().set('Content-Type', 'application/json');


        return  this.httpCliente.get(`//viacep.com.br/ws/${cep}/json/`, { headers }).pipe(
            catchError(error => {
                throw(error.message);
            })
        );
    }


}
