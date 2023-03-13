import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable()
export class HtppInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        const userToken = this.authService.getAuthorizationToken();

        req = req.clone({
            setHeaders: {
                'Application-Authorization': `Basic ${environment.TOKEN}`
            }
        })

        if(userToken){
            req = req.clone({
                setHeaders: {
                    'Authorization': userToken
                }
            })
        }

        return next.handle(req);
    }
}
