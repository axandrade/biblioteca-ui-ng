import { AuthGuard } from '../../shared/auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DashboardComponent,
        canLoad: [AuthGuard],
        canActivate: [AuthGuard] }
	])],
	exports: [RouterModule]
})
export class DashboardRoutingModule { }
