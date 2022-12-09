import { ComponentModule } from '../components.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    CustomersRoutingModule,
    ComponentModule
  ],
  declarations: [CustomersComponent]
})
export class CustomersModule { }
