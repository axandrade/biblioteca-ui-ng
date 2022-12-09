import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksComponent } from './books.component';

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild([
		{ path: '', component: BooksComponent }
	])],
	exports: [RouterModule]
})
export class BooksRoutingModule { }
