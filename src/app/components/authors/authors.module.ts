import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ComponentModule } from '../components.module';
import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorsComponent } from './authors.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		AuthorsRoutingModule,
        ComponentModule
	],
	declarations: [AuthorsComponent]
})
export class AuthorsModule { }


