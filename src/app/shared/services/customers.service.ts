import { Customer } from '../models/customer';
import { Confirmation } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, retry, first } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CustomersService {

    constructor(private httpCliente: HttpClient) { }

    findAll(): Observable<any[]> {
        const url = `${environment.API}/api/customers`;

        return this.httpCliente.get<any[]>(url)
            .pipe(
                retry(1),
                catchError(error => {
                    return throwError(error.error);
                })
            )
    }

    findById(costumerId: number) {
        const url = `${environment.API}/api/customers`;
        return this.httpCliente.get<Customer>(`${url}/${costumerId}`);

    }

    findCustomerByNameOrCpf(nomeCpf: string){

        const url = `${environment.API}/api/customers/name/${nomeCpf}`;

        return this.httpCliente.get<any[]>(url)
        .pipe(
            retry(1),
            catchError(error => {
                return throwError(error.error);
            })
        )
    }



    save(obj: Customer) {
        if (obj.customerId) {
            return this.update(obj);
        } else {
            return this.create(obj);
        }
    }

    private create(obj: Customer) {

        const url = `${environment.API}/api/customers`;
        return this.httpCliente.post<any>(url, obj).pipe(first());
    }

    private update(obj: Customer) {
        const url = `${environment.API}/api/customers`;

        return this.httpCliente.put<any>(`${url}/${1}`, obj).pipe(first());
    }

    private delete(obj: Customer) {
        const url = `${environment.API}/api/customers`;

        return this.httpCliente.delete<any>(`${url}/${1}`).pipe(first());
    }
}
