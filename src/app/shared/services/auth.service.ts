import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private url = `${environment.API}/api/login`;

    constructor(private router: Router, private http: HttpClient) { }

    async login(user: any) {

        const result = await this.http.post<any>(this.url, user, {
            observe: 'response',
        }).toPromise();

        const token = result!.headers.get('Authorization');

        if (token) {
            debugger
            window.localStorage.setItem('token', token);
            return result;
        }

        return false;
    }

    getAuthorizationToken() {
        return window.localStorage.getItem('token');
    }


}
