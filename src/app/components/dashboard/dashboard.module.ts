import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ComponentModule } from '../components.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		DashboardRoutingModule,
        ComponentModule
	],
	declarations: [DashboardComponent]
})
export class DashboardModule { }


