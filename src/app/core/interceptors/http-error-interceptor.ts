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
                debugger
                switch (error.status) {

                    case 403:
                        codErro = `Problemas de conexão com o Servidor, Código Error: ${error.status}`;
                        break;
                    case 0:
                        codErro = `Problemas de conexão com o Servidor, Código Error: ${error.status}`;
                        break;
                    default:
                        break;
                }

                return throwError(codErro);
            })
        );
    }
}
