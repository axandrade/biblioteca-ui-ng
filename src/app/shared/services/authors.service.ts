import { Author } from '../models/author';
import { Confirmation } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, retry, first } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class AuthorsService {

    constructor(private httpCliente: HttpClient) { }

    urlBase : string = 'http://ec2-54-173-235-200.compute-1.amazonaws.com:8080';

    findAll(): Observable<any[]> {
        const url = `${this.urlBase}/api/authors`;

        return this.httpCliente.get<any[]>(url)
            .pipe(
                retry(1),
                catchError(error => {
                    return throwError(error.error);
                })
            )
    }

    findById(author: Author) {
        const url = `${this.urlBase}/api/authors`;

        return this.httpCliente.get<Author>(`${url}/${author.authorId}`);

    }

    save(obj: Author) {

        if (obj.authorId) {
            return this.update(obj);
        } else {
            return this.create(obj);
        }
    }

    private create(obj: Author) {

        const url = `${this.urlBase}/api/authors`;
        return this.httpCliente.post<any>(url, obj).pipe(first());
    }

    private update(obj: Author) {
        const url = `${this.urlBase}/api/authors`;
        return this.httpCliente.put<any>(`${url}/${obj.authorId}`, obj).pipe(first());
    }

    private delete(obj: Author) {
        const url = `${this.urlBase}/api/authors`;

        return this.httpCliente.delete<any>(`${url}/${obj.authorId}`).pipe(first());
    }
}
