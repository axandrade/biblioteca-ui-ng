import { catchError } from 'rxjs/operators';
import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private url = `${environment.API}/api/login`;

    constructor(private router: Router, private http: HttpClient) { }

    async login(user: any) {
        try {
            const result = await this.http.post<any>(this.url, user, {
                observe: 'response',
            }).pipe(
                catchError((error: HttpResponseBase) => {
                    return throwError(error);
                })
            ).toPromise();

            const token = result!.headers.get('Authorization');

            if (token) {
                window.localStorage.setItem('token', token);
                return result;
            }

            return false;
        } catch (error) {
            throw error;
        }
    }

    getAuthorizationToken() {
        return window.localStorage.getItem('token');
    }

    isTokenExpired(token?: string): boolean {
        if (!token) {
          return true;
        }

        const date = this.getTokenExpirationDate(token);
        if (date === undefined) {
          return false;
        }

        return !(date.valueOf() > new Date().valueOf());
      }

      getTokenExpirationDate(token: string): Date {
        try {

          const decoded: any = jwtDecode(token);

          if (decoded.exp === undefined) {
            return null as any
          }

          const date = new Date(0);
          date.setUTCSeconds(decoded.exp);
          return date;

        } catch (error) {
          console.error(error);
          window.localStorage.removeItem('token');
          this.router.navigate(['']);
        }

        return null as any;
      }


}
function jwtDecode(token: string): any {
    throw new Error('Function not implemented.');
}

