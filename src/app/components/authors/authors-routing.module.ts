import { AuthGuard } from './../../shared/auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthorsComponent } from './authors.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: AuthorsComponent,
        canLoad: [AuthGuard],
        canActivate: [AuthGuard] }
	])],
	exports: [RouterModule]
})
export class AuthorsRoutingModule { }
