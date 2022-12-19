import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ComponentModule } from '../components.module';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		CategoriesRoutingModule,
        ComponentModule
	],
	declarations: [CategoriesComponent]
})
export class CategoriesModule { }


