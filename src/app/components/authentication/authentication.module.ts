import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { NgModule } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@NgModule({
	imports: [
        CommonModule,
        AuthenticationRoutingModule
	],
    exports: [
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        PasswordModule,
        ToastModule
    ]


})
export class AuthenticationModule { }


