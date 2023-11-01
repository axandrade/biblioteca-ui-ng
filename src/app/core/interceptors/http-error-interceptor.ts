import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpRequest,
    HttpInterceptor,
    HttpResponseBase,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpResponseBase) => {
                let codErro = '';

                switch (error.status) {

                    case 401 || 403:
                        codErro = `Usuário não autorizado, Código Error: ${error.status}`;
                        break;
                    case 409:

                        codErro = `Não é possível gravar este item. Já existe um autor com o mesmo nome: ${error.status}`;
                        break;
                    case 0:
                        codErro = `Problemas de conexão com o Servidor, Código Error: ${error.status}`;
                        break;
                    default:
                        codErro = `teste , Código Error: ${error.status}`;
                        break;
                }

                return throwError(codErro);
            })
        );
    }
}
