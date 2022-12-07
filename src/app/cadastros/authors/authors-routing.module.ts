import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthorsComponent } from './authors.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: AuthorsComponent }
	])],
	exports: [RouterModule]
})
export class AuthorsRoutingModule { }
