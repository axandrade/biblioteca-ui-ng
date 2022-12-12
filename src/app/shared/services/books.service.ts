import { Book } from '../models/book';

import { Confirmation } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, retry, first } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class BooksService {

    constructor(private httpCliente: HttpClient) { }

    findAll(): Observable<any[]> {
        const url = `${environment.API}/api/books`;

        return this.httpCliente.get<any[]>(url)
            .pipe(
                retry(1),
                catchError(error => {
                    return throwError(error.error);
                })
            )
    }

    findById(obj: Book) {
        const url = `${environment.API}/api/books`;

        return this.httpCliente.get<Book>(`${url}/${obj.id}`);

    }

    findBookByTitle(title: string){

        const url = `${environment.API}/api/customers/title/${title}`;

        return this.httpCliente.get<any[]>(url)
        .pipe(
            retry(1),
            catchError(error => {
                return throwError(error.error);
            })
        )
    }

    save(obj: Book) {
        if (obj.id) {
            return this.update(obj);
        } else {
            return this.create(obj);
        }
    }

    private create(obj: Book) {

        const url = `${environment.API}/api/books`;
        return this.httpCliente.post<any>(url, obj).pipe(first());
    }

    private update(obj: Book) {
        const url = `${environment.API}/api/books`;

        return this.httpCliente.put<any>(`${url}/${obj.id}`, obj).pipe(first());
    }

    private delete(obj: Book) {
        const url = `${environment.API}/api/books`;

        return this.httpCliente.delete<any>(`${url}/${obj.id}`).pipe(first());
    }
}
