import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ComponentModule } from '../components.module';
import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent } from './home.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HomeRoutingModule,
        ComponentModule
	],
	declarations: [HomeComponent]
})
export class HomeModule { }


