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

    constructor(private httpCliente: HttpClient) {}

    findAll(): Observable<any[]> {
        const url = `${environment.API}/api/loans`;

        return this.httpCliente.get<any[]>(url)
            .pipe(
                retry(1),
                catchError(error => {
                    return throwError(error.error);
                })
            )
    }

    findById(loan: Loan) {
        const url = `${environment.API}/api/loans`;
        return this.httpCliente.get<Loan>(`${url}/${loan.id}`);
    }

    confirm(confirmation: Confirmation) {
    }

    save(obj: Loan) {
        if (obj.id) {
            return this.update(obj);
        } else {
            return this.create(obj);
        }
    }

    private create(obj: Loan) {
        const url = `${environment.API}/api/loans`;
        return this.httpCliente.post<any>(url, obj).pipe(first());
    }

    private update(obj: Loan) {
        const url = `${environment.API}/api/loans`;

        return this.httpCliente.put<any>(`${url}/${obj.id}`, obj).pipe(first());
    }

    private delete(obj: Loan) {
        const url = `${environment.API}/api/loans`;

        return this.httpCliente.delete<any>(`${url}/${obj.id}`).pipe(first());
    }
}
