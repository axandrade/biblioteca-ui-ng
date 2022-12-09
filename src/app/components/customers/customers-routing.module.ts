import { CustomersComponent } from './customers.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CustomersComponent }
	])],
	exports: [RouterModule]
})
export class CustomersRoutingModule { }
