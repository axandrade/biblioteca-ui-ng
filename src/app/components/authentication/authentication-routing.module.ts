import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';



@NgModule({
	imports: [RouterModule.forChild([
        { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
	])],
	exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
