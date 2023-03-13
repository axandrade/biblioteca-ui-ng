import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ErrorService } from './../services/error.service';
import {
    HttpEvent,
    HttpHandler,
    HttpRequest,
    HttpInterceptor,
    HttpResponseBase
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public errorService: ErrorService, private router: Router) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpResponseBase) => {
                    
                    switch (error.status) {
              
                        case 403:                               
                            window.localStorage.removeItem('token');
                            window.sessionStorage.removeItem('menu');
                            //this.router.navigate(['erro-servidor'])
                            break;
                        case 0:
                            //window.localStorage.removeItem('token');
                            this.router.navigate(['erro-servidor'])
                            break;
                        default:
                            break;
                    }

                    return throwError(error);
                })
            )
    }
}