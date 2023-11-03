import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpResponseBase } from '@angular/common/http';
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

    url = `/api/authors`;

    constructor(private httpCliente: HttpClient,
        private apiService: ApiService) { }

    getDataPaginated(pageableData: Pageable, pagesortData: PageSort) {

        return this.apiService.get(`${this.url + '/filter'}?sortDirection=${pagesortData.direction}
        &sortField=${pagesortData.field}
        &page=${pageableData.page}
        &size=${pageableData.size}`)

    }

    save(obj: Author) {

        if (obj.authorId) {
            return this.update(obj);
        } else {
            return this.create(obj);
        }
    }

    private create(obj: Author) {
        return this.apiService.post(this.url, obj);
    }

    private update(obj: Author) {//PUT
        return this.apiService.put(this.url + `?authorId=${obj.authorId}`, obj);
    }

    delete(obj: Author) {

        return this.apiService.delete(this.url + `/${obj.authorId}`);
    }

    findById(author: Author) {
        const url = `${environment.API}/api/authors`;

        return this.httpCliente.get<Author>(`${url}/${author.authorId}`);

    }
}
