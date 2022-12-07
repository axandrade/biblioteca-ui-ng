import { FormsModule } from '@angular/forms';
import { CadastroModule } from '../cadastros.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    BooksRoutingModule,
    CadastroModule
  ],
  declarations: [
    BooksComponent
  ],
})
export class BooksModule { }
