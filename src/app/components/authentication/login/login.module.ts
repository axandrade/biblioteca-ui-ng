import { AuthenticationModule } from './../authentication.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        AuthenticationModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule { }
