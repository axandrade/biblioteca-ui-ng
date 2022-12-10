import { LoansComponent } from './loans.component';
import { LoansRoutingModule } from './loans-routing.module';
import { ComponentModule } from '../components.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';




@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    LoansRoutingModule,
    ComponentModule
  ],
  declarations: [LoansComponent]
})
export class LoansModule { }
