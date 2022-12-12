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

    findAll(): Observable<any[]> {
        const url = `${environment.API}/api/authors`;

        return this.httpCliente.get<any[]>(url)
            .pipe(
                retry(1),
                catchError(error => {
                    return throwError(error.error);
                })
            )
    }

    findById(author: Author) {
        const url = `${environment.API}/api/authors`;

        return this.httpCliente.get<Author>(`${url}/${author.id}`);

    }

    confirm(confirmation: Confirmation) {

    }

    save(obj: Author) {

        if (obj.id) {
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
        return this.httpCliente.put<any>(`${url}/${obj.id}`, obj).pipe(first());
    }

    private delete(obj: Author) {
        const url = `${environment.API}/api/authors`;

        return this.httpCliente.delete<any>(`${url}/${obj.id}`).pipe(first());
    }
}
