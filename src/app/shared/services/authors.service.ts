import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, first, retry } from 'rxjs/operators';

import { Author } from '../models/author';

@Injectable({
    providedIn: 'root'
})
export class AuthorsService {

    constructor(private httpCliente: HttpClient) { }

    findAll(): Observable<any[]> {
        const url = `${environment.API}/api/authors`;

        return this.httpCliente.get<any[]>(url)
            .pipe(
                retry(1),
                catchError(error => {
                    throw new Error('Houve algum problema de comunicação com o servidor');
                })
            );
    }

    findById(author: Author) {
        const url = `${environment.API}/api/authors`;

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

        const url = `${environment.API}/api/authors`;
        return this.httpCliente.post<any>(url, obj).pipe(first());
    }

    private update(obj: Author) {
        const url = `${environment.API}/api/authors`;
        return this.httpCliente.put<any>(`${url}/${obj.authorId}`, obj).pipe(first());
    }

    private delete(obj: Author) {
        const url = `${environment.API}/api/authors`;

        return this.httpCliente.delete<any>(`${url}/${obj.authorId}`).pipe(first());
    }
}
