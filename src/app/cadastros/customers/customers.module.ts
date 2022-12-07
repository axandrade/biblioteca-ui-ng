import { CadastroModule } from './../cadastros.module';
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
    CadastroModule
  ],
  declarations: [CustomersComponent]
})
export class CustomersModule { }
