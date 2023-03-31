import { throwError } from 'rxjs';
import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers: [MessageService]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    userLogin = {
        email: '',
        password: ''
    }

    constructor(
        private router: Router,
        private authService: AuthService,
        private messageService: MessageService
    ) {

        // if (this.authService.isUserLoggedIn()) {
        //     this.router.navigate(['/home']);
        // }

    }

    validationForm() {
        if (!this.userLogin.email)
            throw new Error('O campo email é obrigatório!');

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(this.userLogin.email)) {
            throw new Error('email inválido');
        }

        if (!this.userLogin.password)
            throw new Error('O campo senha é obrigatório!');
    }


    private showToast(severity: string, detail: any) {
        this.messageService.clear();
        this.messageService.add({ severity: severity, detail: detail, life: 6000 });
    }

    async login() {
        try {
            this.validationForm();

            const result = await this.authService.login(this.userLogin);

            if (result)
                this.router.navigate(['/home']);


        } catch (error) {
            this.showToast('error', error);

        }
    }


}
