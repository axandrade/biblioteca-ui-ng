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

    urlBase : string = 'http://ec2-54-173-235-200.compute-1.amazonaws.com:8080';

    findAll(): Observable<any[]> {
        const url = `${this.urlBase}/api/books`;

        return this.httpCliente.get<any[]>(url)
            .pipe(
                retry(1),
                catchError(error => {
                    return throwError(error.error);
                })
            )
    }

    findBooksByStatus(): Observable<any[]> {
        const url = `${this.urlBase}/api/books/disponiveis`;

        return this.httpCliente.get<any[]>(url)
            .pipe(
                retry(1),
                catchError(error => {
                    return throwError(error.error);
                })
            )
    }

    findById(obj: Book) {
        const url = `${this.urlBase}/api/books`;

        return this.httpCliente.get<Book>(`${url}/${obj.bookId}`);

    }

    findBookByTitle(title: string){

        const url = `${this.urlBase}/api/customers/title/${title}`;

        return this.httpCliente.get<any[]>(url)
        .pipe(
            retry(1),
            catchError(error => {
                return throwError(error.error);
            })
        )
    }

    save(obj: Book) {
        if (obj.bookId) {
            return this.update(obj);
        } else {
            return this.create(obj);
        }
    }

    private create(obj: Book) {

        const url = `${this.urlBase}/api/books`;
        return this.httpCliente.post<any>(url, obj).pipe(first());
    }

    private update(obj: Book) {
        const url = `${this.urlBase}/api/books`;

        return this.httpCliente.put<any>(`${url}/${obj.bookId}`, obj).pipe(first());
    }

    private delete(obj: Book) {
        const url = `${this.urlBase}/api/books`;

        return this.httpCliente.delete<any>(`${url}/${obj.bookId}`).pipe(first());
    }
}
