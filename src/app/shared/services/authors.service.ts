import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { Author } from '../models/author';
import { ApiService } from './api.service';
import { Pageable } from '../models/pageable';
import { PageSort } from '../models/pagesort';

@Injectable({
    providedIn: 'root'
})
export class AuthorsService {

    url = `/api/authors/filter`;

    constructor(private httpCliente: HttpClient,
        private apiService: ApiService) { }

    getDataPaginated(pageableData: Pageable, pagesortData: PageSort) {

       return this.apiService.get(`${this.url}?page=${pageableData.page}&size=${pageableData.size}`)

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
