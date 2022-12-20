import { Loan } from '../models/loan';
import { Confirmation } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, retry, first } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class LoansService {

    constructor(private httpCliente: HttpClient) { }

    urlBase : string = 'http://localhost:8080';


    findAll(): Observable<any[]> {
        const url = `${this.urlBase}/api/loans`;

        return this.httpCliente.get<any[]>(url)
            .pipe(
                retry(1),
                catchError(error => {
                    return throwError(error.error);
                })
            )
    }

    findLoansByCustomer(id: number): Observable<any> {
        const url = `${this.urlBase}/api/loans`;

        return this.httpCliente.get<any[]>(`${url}/${id}`)
            .pipe(
                retry(1),
                catchError(error => {
                    return throwError(error.error);
                })
            )
    }

    save(obj: Loan) {
        if (obj.loanId) {
            return this.update(obj);
        } else {
            return this.create(obj);
        }
    }

    private create(obj: Loan) {

        const url = `${this.urlBase}/api/loans`;
        return this.httpCliente.post<any>(url, obj).pipe(first());
    }

    private update(obj: Loan) {
        const url = `${this.urlBase}/api/loans`;

        return this.httpCliente.put<any>(`${url}/${obj.loanId}`, obj).pipe(first());
    }

    private delete(obj: Loan) {
        const url = `${this.urlBase}/api/loans`;

        return this.httpCliente.delete<any>(`${url}/${obj.loanId}`).pipe(first());
    }
}
