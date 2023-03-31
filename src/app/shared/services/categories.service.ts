import { Category } from './../models/category';

import { Confirmation } from 'primeng/api';
import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, first } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    constructor(private httpCliente: HttpClient) { }


    findAll(): Observable<any[]> {
        const url = `${environment.API}/api/categories`;
        return this.httpCliente.get<any[]>(url).pipe(
            catchError((error: HttpResponseBase) => {
                return throwError(error);
            })
        );
    }

    findById(category: Category) {
        const url = `${environment.API}/api/categories`;

        return this.httpCliente.get<Category>(`${url}/${category.categoryId}`);

    }

    confirm(confirmation: Confirmation) {

    }

    save(obj: Category) {

        if (obj.categoryId) {
            return this.update(obj);
        } else {
            return this.create(obj);
        }
    }

    private create(obj: Category) {

        const url = `${environment.API}/api/categories`;
        return this.httpCliente.post<any>(url, obj).pipe(first());
    }

    private update(obj: Category) {
        const url = `${environment.API}/api/categories`;
        return this.httpCliente.put<any>(`${url}/${obj.categoryId}`, obj).pipe(first());
    }

    private delete(obj: Category) {
        const url = `${environment.API}/api/categories`;

        return this.httpCliente.delete<any>(`${url}/${obj.categoryId}`).pipe(first());
    }
}
