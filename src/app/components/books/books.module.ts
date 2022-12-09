import { FormsModule } from '@angular/forms';
import { ComponentModule } from '../components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    BooksRoutingModule,
    ComponentModule
  ],
  declarations: [
    BooksComponent
  ],
})
export class BooksModule { }
