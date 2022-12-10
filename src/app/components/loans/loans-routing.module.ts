import { LoansComponent } from './loans.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: LoansComponent }
	])],
	exports: [RouterModule]
})
export class LoansRoutingModule { }
