import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { NgModule } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
@NgModule({
	imports: [
        CommonModule,
        AuthenticationRoutingModule
	],
    exports: [
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        PasswordModule
    ]

})
export class AuthenticationModule { }


