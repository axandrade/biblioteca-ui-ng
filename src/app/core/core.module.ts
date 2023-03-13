import { ToastModule } from 'primeng/toast';
import { FooterComponent } from './components/footer/footer.component';
import { MessagesComponent } from './../shared/components/errors/messages/messages.component';
import { ErrorService } from './services/error.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule
  ],
  exports: [
    //shared modules
    BrowserModule,
    BrowserAnimationsModule,

    //shared components
    HeaderComponent,
    FooterComponent
  ],
})
export class CoreModule { }
